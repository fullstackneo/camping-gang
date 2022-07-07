import { Table, Button, Popconfirm, message, Input, Carousel } from 'antd';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { useEffect } from 'react';
import { API } from '../../config';
import './index.css';
import useState from 'react-usestateref';
import AddSite from '../../components/campsites/AddSite';
import EditSite from '../../components/campsites/EditSite';

const { Search } = Input;

function SiteList() {
  // const state=[xxx]
  // setState, Async function
  // const state= (()=>{return {....}})()

  const [state, setState, ref] = useState({
    dataSource: [],
    total: 0,
    pageSize: 3,
    pageNumber: 1,
    searchContent: '',
    showAddSiteModal: false,
    showEditSiteModal: false,
    currentEdit: '',
  });

  const handleDelete = pid => {
    // fetch(`/goods/delete/${pid}`);
    axios.delete(`/goods/delete/${pid}`).then(res => {
      if (res.data.code === 'ok') {
        message.info('删除成功');
        loadData();
      } else {
        message.error('删除失败');
      }
    });
  };

  const handleEdit = pid => {
    axios
      .get('/goods/get', { params: { goodsId: pid } })
      .then(res => {
        setState({
          ...state,
          showEditSiteModal: true,
          currentEdit: res.data,
        });
      })
      .catch(err => console.log(err));
  };

  const loadData = async () => {
    const params = {
      pageSize: ref.current.pageSize,
      pageNumber: ref.current.pageNumber,
      search: ref.current.searchContent,
    };
    await axios.get('/goods', { params }).then(res => {
      setState({
        ...ref.current,
        dataSource: res.data.list,
        total: res.data.totalCount,
      });
    });
  };

  // const handleState = (page, pageSize) => {
  //   const newState = { ...state, pageSize: pageSize, pageNumber: page };
  //   setState(newState);
  //   return newState;
  // };

  const changePage = (page, pageSize) => {
    setState({
      ...state,
      pageNumber: page,
      pageSize: pageSize,
    });
    loadData();
  };

  const onSearch = value => {
    setState({
      ...state,
      searchContent: value,
    });
    loadData();
  };

  const columns = [
    {
      title: 'Number',
      render: (text, record, index) => `${index + 1}`,
      align: 'center',
      key: 'number',
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
      align: 'center',
    },
    {
      title: 'Location',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'Pictures',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      width: '200px',
      align: 'center',
      render: record => (
        <div style={{ width: 200, margin: '0 auto' }}>
          {/* <img src={`${API}` + record} width="200px" height="200px" alt="" />
          <img src={`${API}` + record} width="200px" height="200px" alt="" /> */}
          <Carousel>
            <div>
              <img
                src={`${API}` + record}
                width="200px"
                height="200px"
                alt=""
              />
            </div>
            <div>
              <img
                src={`${API}` + record}
                width="200px"
                height="200px"
                alt=""
              />
            </div>
          </Carousel>
        </div>
      ),
    },
    {
      title: 'Operation',
      dataIndex: 'id',
      align: 'center',
      key: 'id',
      render: (text, record) => (
        <>
          <Popconfirm
            okText="Yes"
            cancelText="No"
            title="Are you sure？"
            onConfirm={() => {
              handleDelete(record.id);
            }}
          >
            <Button type="primary" style={{ margin: '0 5px' }}>
              Delete
            </Button>
          </Popconfirm>
          <Button
            type="parimary"
            style={{ margin: '0 5px' }}
            onClick={() => handleEdit(record.id)}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        style={{ width: 600, marginBottom: 20, marginTop: 20 }}
        onSearch={onSearch}
      />
      <Button
        type="primary"
        size="large"
        style={{ margin: '20px 10px' }}
        onClick={() => {
          setState({ ...state, showAddSiteModal: true });
        }}
      >
        Add Site
      </Button>
      <Table
        dataSource={state.dataSource}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: state.pageSize,
          defaultCurrent: state.pageNumber,
          onChange: changePage,
          total: state.total,
        }}
      />

      {/* render when showAddSiteModal is true */}
      {state.showAddSiteModal ? (
        <AddSite
          visible={state.showAddSiteModal}
          closeModal={() => {
            setState({ ...state, showAddSiteModal: false });
            loadData();
          }}
        />
      ) : null}

      {/* render when showEditSiteModal is true */}
      {state.showEditSiteModal ? (
        <EditSite
          visible={state.showEditSiteModal}
          closeModal={() => {
            setState({ ...state, showEditSiteModal: false });
            loadData();
          }}
          currentEdit={state.currentEdit}
        />
      ) : null}
    </div>
  );
}

export default SiteList;
