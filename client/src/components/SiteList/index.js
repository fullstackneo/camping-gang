import { Table, Button, Popconfirm, message, Input, Carousel } from 'antd';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { useEffect } from 'react';
import { API } from '../../config';
import './index.css';
import useState from 'react-usestateref';

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
    showAddProductDialog: false,
  });

  const loadData = () => {
    const params = {
      pageSize: ref.current.pageSize,
      pageNumber: ref.current.pageNumber,
      search: ref.current.searchContent,
    };

    console.log('params=', params);
    axios.get('/goods', { params }).then(res => {
      // console.log(res);
      setState({
        ...state,
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
    // const newState = handleState(page, pageSize);
    // console.log(newState);
    setState({
      ...state,
      pageNumber: page,
      pageSize: pageSize,
    });
    loadData();
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

  const handleAdd = () => {
    setState({
      showAddProductDialog: true,
    });
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
        <Popconfirm
          okText="Yes"
          cancelText="No"
          title="Are you sure？"
          onConfirm={() => {
            console.log(record);
            // handleDelete(record.id);
          }}
        >
          <Button type="primary">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
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
    </div>
  );
}

export default SiteList;