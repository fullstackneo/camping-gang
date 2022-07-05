import { Table, Button, Popconfirm, message, Input } from 'antd';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { useState } from 'react';
import { API } from '../../../config/api';

// import AddProduct from '../conponents/products/AddProducts';
const { Search } = Input;

function GoodsList() {
  const [state, setState] = useState({
    dataSource: [], //存储商品数据
    total: 0, //总的记录数
    pageSize: 3,
    pageNumber: 1,
    searchContent: '',
    showAddProductDialog: false, // 控制窗口隐藏
  });

  const loadData = () => {
    const params = {
      pageSize: state.pageSize,
      pageNumber: state.pageNumber,
      search: state.searchContent,
    };
    console.log('params=', params);
    axios.get('/goods', { params }).then(res => {
      //   console.log(res);
      setState({ dataSource: res.data.list, total: res.data.totalCount });
    });
  };
  //删除商品
  const handleDelete = pid => {
    axios.delete('/goods/delete', { params: { id: pid } }).then(res => {
      if (res.data.code === 'ok') {
        message.info('删除成功');
        loadData();
      } else {
        message.error('删除失败');
      }
    });
  };
  //分页
  const changePage = (page, pageSize) => {
    // console.log("page=", page);
    // console.log("pageSize=", pageSize);
    // const params = {
    //   pageNumber: page,
    //   pageSize: pageSize,
    // };
    // loadData(params);
    setState({ pageNumber: page, pageSize: pageSize }, () => {
      loadData();
    });
  };

  const onSearch = value => {
    setState(
      preState => {
        preState.searchContent = value;
      },
      () => loadData()
    );
    console.log(value);
  };
  //   componentDidMount() {
  //     loadData();
  //   }

  const handleAdd = () => {
    setState({
      showAddProductDialog: true,
    });
  };

  const closeAddDialog = () => {
    setState({
      showAddProductDialog: false,
    });
  };

  const columns = [
    {
      title: '编号1',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '单价',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '商品图片',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: record => (
        <img src={`${API}` + record} width="200px" height="200px" alt="" />
      ),
    },
    {
      title: '操作',
      dataIndex: 'id',
      key: 'id',
      render: record => (
        <Popconfirm
          okText="确定"
          cancelText="取消"
          title="你确定要删除该记录吗？"
          onConfirm={() => {
            //   message.info(record);
            handleDelete(record);
          }}
        >
          <Button type="primary">删除</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Search
        placeholder="input search text"
        allowClear
        enterButton="Search"
        onSearch={onSearch}
        size="large"
        style={{
          width: 500,
          marginTop: 10,
          marginBottom: 20,
        }}
      />
      <Button
        type="primary"
        onClick={handleAdd}
        style={{ margin: '10px', height: '40px' }}
      >
        Add Product
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
      {/* <AddProduct
          visible={state.showAddProductDialog}
          closeAddDialog={closeAddDialog}
        ></AddProduct> */}
    </div>
  );
}

export default GoodsList;
