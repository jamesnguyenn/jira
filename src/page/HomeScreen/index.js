import React, { useCallback, useEffect } from 'react';
import { getAllProject } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Space, Table, Tag, Divider, Avatar, Tooltip } from 'antd';
import { useState } from 'react';
import {
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
    AntDesignOutlined,
} from '@ant-design/icons';
import { delProjectAction, getListProjectAction } from '../../redux/thunk';
import { delProject } from '../../redux/reducer/projectSlice';
import ReactHtmlParser from 'react-html-parser';
import { openModal } from '../../redux/reducer/modalAdjustSlice';
import { useNavigate } from 'react-router-dom';
import LayoutModal from '../../layout/LayoutModal/LayoutModal';
import FormCreateEditProject from '../../component/FormCreateEditProject';

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

function HomeScreen(props) {
    // ------------------ ANT DESIGN ---------------------
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (item2, item1) => {
                return Number(item2.id) - Number(item1.id);
            },
            sortDirections: ['descend'],
        },
        //ProjectName
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            sorter: (item2, item1) => {
                let projectName1 = item1.projectName.trim().toLowerCase();
                let projectName2 = item2.projectName.trim().toLowerCase();
                if (projectName2 < projectName1) {
                    return -1;
                }
                return 1;
            },
        },
        //Description
        {
            title: 'Category',
            dataIndex: 'categoryName',
            key: 'categoryName',
            render: (text, record, index) => {
                return <div>{ReactHtmlParser(text)}</div>;
            },
            sorter: (item2, item1) => {
                let categoryName1 = item1.categoryName.trim().toLowerCase();
                let categoryName2 = item2.categoryName.trim().toLowerCase();
                if (categoryName2 < categoryName1) {
                    return -1;
                }
                return 1;
            },
        },
        //Creator
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            render: (text, record, index) => {
                console.log('text', text.name);
                return <Tag color="green">{text.name}</Tag>;
            },
            sorter: (item2, item1) => {
                let creator1 = item1.creator.name.trim().toLowerCase();
                let creator2 = item2.creator.name.trim().toLowerCase();
                if (creator2 < creator1) {
                    return -1;
                }
                return 1;
            },
        },
        //Members
        {
            title: 'Members',
            dataIndex: 'Members',
            key: 'Members',
        },
        //Action
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index) => (
                <Space size="middle">
                    <DeleteOutlined
                        className="btn btn-danger font-weight-light"
                        style={{ fontSize: 25 }}
                    />

                    <EditOutlined
                        onClick={() => {
                            dispatch(openModal());
                        }}
                        className="btn btn-primary"
                        style={{ fontSize: 25 }}
                    />
                </Space>
            ),
        },
    ];

    // ---------------------------------------
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { project } = useSelector(getAllProject);

    useEffect(() => {
        const actionThunk = getListProjectAction();
        dispatch(actionThunk);
    }, []);

    const onSubmit = useCallback(async (data, description) => {
        console.log(data, description);
    }, []);

    return (
        <div>
            <Space
                style={{
                    marginBottom: 16,
                }}
            ></Space>
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={project}
                onChange={handleChange}
            />
            <LayoutModal>
                <FormCreateEditProject
                    title="Edit Project"
                    onSubmitting={onSubmit}
                    projectName="Hello Khoa"
                    category={2}
                    desc="Hello Khoa"
                    textButton="Edit Project"
                ></FormCreateEditProject>
            </LayoutModal>
        </div>
    );
}

export default HomeScreen;
