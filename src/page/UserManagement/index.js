import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Space,
  Table,
  Tag,
  Modal,
  Col,
  Drawer,
  Form,
  Row,
  Select,
  DatePicker,
} from 'antd';
import Highlighter from 'react-highlight-words';
import {
  deleteUserManageAction,
  getAllUserAction,
} from '../../redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUserManagement,
  getVisibleModal,
} from '../../redux/selectors';
import { http } from '../../axios';
import {
  getAllUsersManagement,
  updateUserManage,
} from '../../axios/apiURL';
import { openModal } from '../../redux/reducer/modalAdjustSlice';
import FormUseEditManagement from '../../component/FormUserEditManagement';
import { toast } from 'react-toastify';
const { confirm } = Modal;
const { Option } = Select;

function UserManagement() {
  // --------------------- ANT DESIGN ----------------
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const showConfirm = (userId) => {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleOutlined />,
      content: `If you cannot delete this user, it's because this user is a creator of a member of a project !`,
      onOk() {
        deleteUser(userId);
      },

      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        {/* <Input
          placeholder={'Search here'}
          onChange={(event) => {
            let { value } = event.target;
            setSearchInput(value);
          }}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        /> */}
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined style={{ fontSize: 20 }} />}
            size="small"
            style={{
              fontSize: '15px',
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
              fontSize: '15px',
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
          fontSize: 30,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    //USER ID
    {
      title: 'UserID',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
      width: '5%',
      sorter: (item2, item1) => {
        return Number(item2.userId) - Number(item1.userId);
      },
    },
    //NAME
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
      align: 'center',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend'],
    },
    //EMAIL
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '20%',

      align: 'center',
      ...getColumnSearchProps('email'),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ['descend', 'ascend'],
    },
    //PHONE
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: '20%',
      align: 'center',
      sorter: (item2, item1) => {
        return Number(item2.phoneNumber) - Number(item1.phoneNumber);
      },
      ...getColumnSearchProps('phoneNumber'),
    },
    //ACTION
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '20%',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Space size="middle">
            <Button
              onClick={() => {
                showConfirm(record.userId);
              }}
              type="danger"
            >
              Delete
            </Button>

            <Button
              onClick={(e) => {
                setModal(true);
                dispatch({
                  type: 'FILL_INPUT',
                  data: record,
                });
              }}
              type="primary"
            >
              Edit
            </Button>
          </Space>
        );
      },
    },
  ];
  //------------------------------------
  const { userManagement } = useSelector(getAllUserManagement);
  const { editUserManagement } = useSelector(getAllUserManagement);
  const { name, phoneNumber, email, userId } = editUserManagement;
  const [modal, setModal] = useState(false);
  //   const [searchInput, setSearchInput] = useState('');
  const dispatch = useDispatch();
  const deleteUser = (userId) => {
    const action = deleteUserManageAction(userId);
    dispatch(action);
  };
  useEffect(() => {
    const action = getAllUserAction();
    dispatch(action);
  }, [dispatch]);

  return (
    <div>
      <h2 className="mb-3">User Management</h2>
      <Table
        rowKey={'userId'}
        columns={columns}
        dataSource={userManagement}
      />
      {modal && (
        <FormUseEditManagement
          modal={modal}
          closeModal={setModal}
          userId={userId}
          name={name}
          email={email}
          phoneNumber={phoneNumber}
        />
      )}
      {/* <Modal
        okText="Submit"
        title="Edit User Information"
        centered
        visible={modal2Visible}
        onOk={() => setModal2Visible(false)}
        onCancel={() => setModal2Visible(false)}
      >
        <Form layout="vertical" hideRequiredMark>
          <Col>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter user name',
                },
              ]}
            >
              <Input placeholder="Please enter your name" />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please enter email',
                },
              ]}
            >
              <Input placeholder="Please enter your email" />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone number',
                },
              ]}
            >
              <Input placeholder="Please enter your phone number" />
            </Form.Item>
          </Col>
        </Form>
      </Modal> */}

      {/* <Drawer
        title="Edit User Information"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Col>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: 'Please enter user name',
                },
              ]}
            >
              <Input placeholder="Please enter user name" />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please enter email',
                },
              ]}
            >
              <Input placeholder="Please enter your email" />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  message: 'Please enter email',
                },
              ]}
            >
              <Input placeholder="Please enter your email" />
            </Form.Item>
          </Col>
        </Form>
      </Drawer> */}
    </div>
  );
}

export default UserManagement;
