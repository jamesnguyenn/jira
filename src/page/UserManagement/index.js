import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    SearchOutlined,
    ExclamationCircleOutlined,
    DeleteOutlined,
    EditOutlined,
} from '@ant-design/icons';
import { Button, Input, Space, Table, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { deleteUserManageAction, getAllUserAction } from '../../redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserManagement } from '../../redux/selectors';

import FormUseEditManagement from '../../component/FormUserEditManagement';

const { confirm } = Modal;

function UserManagement() {
    // --------------------- ANT DESIGN ----------------
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const showConfirm = useRef();
    showConfirm.current = (userId) => {
        confirm({
            title: 'Are you sure delete this user?',
            icon: <ExclamationCircleOutlined />,
            content: `If you cannot delete this user, it's because this user is a creator of a member of a project !`,
            onOk() {
                deleteUser(userId);
            },

            onCancel() {},
        });
    };

    const getColumnSearchProps = useCallback(
        (dataIndex) => ({
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
                    <Input
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) =>
                            setSelectedKeys(
                                e.target.value ? [e.target.value] : []
                            )
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
                        <div
                            style={{
                                width: '100px',
                                height: '25px',
                                borderRadius: '4px',
                            }}
                            className="btn btn-primary"
                            onClick={() =>
                                handleSearch(selectedKeys, confirm, dataIndex)
                            }
                        >
                            Search
                        </div>
                        <div
                            style={{
                                width: '100px',
                                height: '25px',
                                borderRadius: '4px',
                            }}
                            className="btn btn-secondary"
                            onClick={() =>
                                clearFilters && handleReset(clearFilters)
                            }
                        >
                            Reset
                        </div>
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
        }),
        [searchText, searchedColumn]
    );

    const columns = useMemo(() => {
        return [
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
                    return (
                        Number(item2.phoneNumber) - Number(item1.phoneNumber)
                    );
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
                                onClick={(e) => {
                                    setModal(true);
                                    dispatch({
                                        type: 'FILL_INPUT',
                                        data: record,
                                    });
                                }}
                                icon={
                                    <EditOutlined
                                        style={{ fontSize: '20px' }}
                                    />
                                }
                                className="btn btn-primary"
                                style={{
                                    minWidth: '30px',
                                    borderRadius: '2px',
                                }}
                            />
                            <Button
                                onClick={() => {
                                    showConfirm.current(record.userId);
                                }}
                                icon={
                                    <DeleteOutlined
                                        style={{ fontSize: '20px' }}
                                    />
                                }
                                className="btn btn-primary"
                                style={{
                                    minWidth: '30px',
                                    borderRadius: '2px',
                                    backgroundColor: 'red',
                                }}
                            />
                        </Space>
                    );
                },
            },
        ];
    }, [dispatch, getColumnSearchProps, showConfirm]);

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
        </div>
    );
}

export default UserManagement;
