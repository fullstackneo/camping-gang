import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { API } from '../../../config';
import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Upload, message } from 'antd';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const EditSiteForm = ({ closeModal, data }) => {
  const { title, price, thumbnail, goodsDetail } = data;
  console.log(data);
  const [form] = Form.useForm();

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const editorReference = useRef();

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  // change html to editorState
  const htmlToState = (html = '') => {
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks
      );
      const editorState = EditorState.createWithContent(contentState);
      return editorState;
    }
  };

  // run after first render
  useEffect(() => {
    // initialize the form item
    form.setFieldsValue({
      title: title,
      price: price,
      upload: [
        {
          // name: thumbnail,
          url: `${API}` + thumbnail,
          response: { msg: thumbnail },
        },
      ],
    });

    // initialize the editor
    setEditorState(htmlToState(goodsDetail));
    // console.log(editorReference.current);
    // editor gets focus
    editorReference.current.focusEditor();
  }, []);

  // run after form submission
  const onFinish = values => {
    console.log(values);

    // change state to html
    let html = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    var params = {
      title: values.title,
      price: values.price,
      thumbnail:
        values.upload[0].response !== undefined
          ? values.upload[0].response.msg
          : values.thumbnail[0].name,
      goodsDetail: html,
      goodsId: data.id,
    };

    axios
      .post('/goods/edit', params)
      .then(res => {
        message.info('edit successfully');
        closeModal();
      })
      .catch(err => console.log(err));
  };

  const onFinishFailed = () => {};

  const normFile = e => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }
    const arr = [];
    // only save the lastest pic
    arr.push(e.fileList[e.fileList.length - 1]);
    return e && arr;
    // return e?.fileList;
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
              message: 'Please upload the picture for this site',
            },
          ]}
        >
          <Upload
            action={`${API}goods/fileUpload`}
            listType="picture"
            beforeUpload={file => {
              console.log(file.name);
              const isPNG =
                file.type === 'image/png' || 'image/png' || 'image/gif';
              if (!isPNG) {
                message.error(`${file.name} is not a valid file`);
              }
              return isPNG || Upload.LIST_IGNORE;
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
            ref={editorReference}
            onEditorStateChange={onEditorStateChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
          {/* <textarea
            disabled
            value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          /> */}
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};
export default EditSiteForm;
