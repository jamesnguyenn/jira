import React, { useCallback, useEffect } from 'react';
import { getAllProject, getVisibleModal } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { getListProjectAction } from '../../redux/thunk';
import { delProject } from '../../redux/reducer/projectSlice';
import ReactHtmlParser from 'react-html-parser';
import { openModal } from '../../redux/reducer/modalAdjustSlice';
import { useNavigate } from 'react-router-dom';
import LayoutModal from '../../layout/LayoutModal/LayoutModal';
import FormCreateEditProject from '../../component/FormCreateEditProject';
import { updateProject } from '../../axios/apiURL';
import { http } from '../../axios';

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
            render: (_, record, index, text) => (
                <Space size="middle">
                    <DeleteOutlined
                        className="btn btn-danger font-weight-light"
                        style={{ fontSize: 25 }}
                    />

                    <EditOutlined
                        onClick={(e) => {
                            dispatch(openModal());
                            dispatch({
                                type: 'FILL_INPUT',
                                data: record,
                            });
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
    const navigate = useNavigate();

    const { visible } = useSelector(getVisibleModal);
    const { project } = useSelector(getAllProject);

    const edit = useSelector((state) => state.editProject.editProject);
    const { id, projectName, description, categoryId, projectCategory } = edit;

    useEffect(() => {
        const action = getListProjectAction();
        dispatch(action);
    }, [dispatch]);

    const onSubmit = useCallback(async (data, description) => {
        try {
            console.log(data, description);
            // const { projectName, categoryId } = data;
            // const dataSubmit = {
            //     id,
            //     projectName,
            //     description,
            //     categoryId: Number(categoryId),
            // };
            // const result = await http.put(updateProject, dataSubmit);
            // console.log('RESULT UPDATE', result);
        } catch (error) {}
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
                {visible && (
                    <FormCreateEditProject
                        title="Edit Project"
                        onSubmiting={onSubmit}
                        projectName={projectName}
                        desc={description}
                        textButton="Edit Project"
                        categoryID={categoryId}
                    />
                )}
            </LayoutModal>
        </div>
    );
}

export default HomeScreen;
