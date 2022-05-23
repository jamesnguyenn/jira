import React, { useEffect } from 'react';
import { getAllProject } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProjectAction } from '../../redux/thunk';
import { Button, Space, Table } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function HomeScreen() {
  // ------------------ ANT DESIGN ---------------------
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const columns = [
    // ID
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder:
        sortedInfo.columnKey === 'name' ? sortedInfo.order : null,
      ellipsis: true,
    },
    //ProjectName
    {
      title: 'projectName',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: (a, b) => a.age - b.age,
      sortOrder:
        sortedInfo.columnKey === 'age' ? sortedInfo.order : null,
      ellipsis: true,
    },
    //Description
    {
      title: 'desription',
      dataIndex: 'desription',
      key: 'desription',
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder:
        sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
    //Creator
    {
      title: 'Creator',
      dataIndex: 'Creator',
      key: 'Creator',
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder:
        sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
    //Members
    {
      title: 'Members',
      dataIndex: 'Members',
      key: 'Members',
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder:
        sortedInfo.columnKey === 'address' ? sortedInfo.order : null,
      ellipsis: true,
    },
    //Action
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined
            className="btn btn-danger font-weight-light"
            style={{ fontSize: 25 }}
          />

          <EditOutlined
            className="btn btn-primary"
            style={{ fontSize: 25 }}
          />
        </Space>
      ),
    },
  ];

  // ---------------------------------------
  const dispatch = useDispatch();
  const { project } = useSelector(getAllProject);

  useEffect(() => {
    const action = getAllProjectAction;
    dispatch(action);
  }, []);
  return (
    <div>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={project}
        onChange={handleChange}
      />
    </div>
  );
}

export default HomeScreen;
