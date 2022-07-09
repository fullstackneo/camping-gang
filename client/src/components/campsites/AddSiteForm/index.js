import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { API } from '../../../config';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, message } from 'antd';
import { useState } from 'react';
import axios from 'axios';

const AddSiteForm = ({ closeModal }) => {
  //   let state = { editorText: '' };
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  const onFinish = values => {
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    console.log(values);
    var params = {
      title: values.title,
      price: values.price,
      thumbnail: values.upload[0].response.msg,
      goodsDetail: html,
    };

    axios
      .post('/goods/add', params)
      .then(res => {
        message.info('add successfully');
        closeModal();
      })
      .catch(e => console.log(e));
  };

  const onFinishFailed = () => {};

  const normFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };
  return (
    <div>
      <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Name"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please eneter the name of your product',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: 'Please eneter the price of your product',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="upload"
          label="Picture"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Please upload the picture of this site',
            },
          ]}
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            action={`${API}goods/fileUpload`}
            listType="picture"
            beforeUpload={file => {
              console.log(file.name);
              const isValid =
                file.type === 'image/png' || 'image/jpg' || 'image/gif';
              if (!isValid) {
                message.error(`${file.name} is not a valid file`);
              }
              return isValid || Upload.LIST_IGNORE;
            }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please eneter the description of your product',
            },
          ]}
        >
          <Editor
            editorState={editorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            onEditorStateChange={onEditorStateChange}
          />
          {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          /> */}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};
export default AddSiteForm;
