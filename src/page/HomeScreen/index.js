import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    getAllProject,
    getUserInfo,
    getUserSearch,
    getVisibleModal,
} from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Space,
    Table,
    Tag,
    Avatar,
    Modal,
    Popover,
    AutoComplete,
    Popconfirm,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    QuestionCircleOutlined,
    UsergroupAddOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import {
    assignUserAction,
    deleteProjectAction,
    getListProjectAction,
    getUserAction,
    removeUserFromProjectAction,
} from '../../redux/thunk';
import ReactHtmlParser from 'react-html-parser';
import { closeModal, openModal } from '../../redux/reducer/modalAdjustSlice';
import { NavLink } from 'react-router-dom';
import LayoutModal from '../../layout/LayoutModal/LayoutModal';
import FormCreateEditProject from '../../component/FormCreateEditProject';
import { http } from '../../axios';
import { updateProject } from '../../axios/apiURL';
import { toast } from 'react-toastify';

const { confirm } = Modal;

function HomeScreen() {
    const dispatch = useDispatch();
    const searchRef = useRef(null);

    const { visible } = useSelector(getVisibleModal);
    const { project } = useSelector(getAllProject);

    const { userSearch } = useSelector(getUserSearch);
    const { id: userId } = useSelector(getUserInfo);
    const edit = useSelector((state) => state.editProject.editProject);

    const [keyword, setKeyword] = useState('');

    const { id, projectName, description, categoryId } = edit;
    // ------------------ ANT DESIGN ---------------------
    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});

    const showDeleteConfirm = useRef(null);
    showDeleteConfirm.current = (id, creatorId) => {
        if (creatorId === userId) {
            confirm({
                title: 'Are you sure delete this project?',
                icon: <ExclamationCircleOutlined />,
                okText: 'Yes',
                okType: 'danger',
                cancelText: 'No',

                onOk() {
                    deleteProject(id);
                },

                onCancel() {},
            });
        } else {
            toast.error('You do not have permission to delete this project !', {
                autoClose: 1000,
            });
        }
    };

    const handleChange = useCallback((pagination, filters, sorter) => {
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    }, []);

    // Render all project
    useEffect(() => {
        const action = getListProjectAction();
        dispatch(action);
    }, [dispatch]);

    //Delete project
    const deleteProject = useCallback(
        (projectID) => {
            const action = deleteProjectAction(projectID);
            dispatch(action);
        },
        [dispatch]
    );

    //Submit to Edit project
    const onSubmit = useCallback(
        async (data, description) => {
            const { categoryId, projectName } = data;
            const dataUpdate = {
                id: id,
                projectName: projectName,
                creator: userId,
                description: description,
                categoryId: String(categoryId),
            };
            try {
                const result = await http.put(
                    `${updateProject}?projectId=${id}`,
                    dataUpdate
                );
                dispatch({
                    type: 'UPDATE_PROJECT',
                    data: data,
                });
                const actionGetList = getListProjectAction();
                dispatch(actionGetList);
                dispatch(closeModal());
                toast.success('Edit Project Successfully ', {
                    autoClose: 1000,
                });
            } catch (error) {
                toast.error('Cannot Edit Project', {
                    autoClose: 1000,
                });
            }
        },
        [dispatch, id, userId]
    );

    const columns = useMemo(() => {
        return [
            // ID
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                sorter: (item2, item1) => {
                    return Number(item2.id) - Number(item1.id);
                },
            },
            //ProjectName
            {
                title: 'Project Name',
                dataIndex: 'projectName',
                key: 'projectName',
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <NavLink
                            to={`/project-detail/${record.id}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#000',
                            }}
                        >
                            {text}
                        </NavLink>
                    );
                },
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
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            {ReactHtmlParser(text)}
                        </div>
                    );
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
                align: 'center',
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
                align: 'center',
                render: (text, record, index) => {
                    return (
                        <Avatar.Group
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                minWidth: '150px',
                            }}
                        >
                            <Popover
                                placement="top"
                                trigger="hover"
                                content={() => {
                                    return (
                                        <div>
                                            <h3 className="text-center mb-3 font-weight-bold">
                                                Members
                                            </h3>
                                            <table className="table">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th>User ID</th>
                                                        <th>Name</th>
                                                        {record.creator.id ===
                                                            userId && (
                                                            <th>Action</th>
                                                        )}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {record.members.map(
                                                        (member, index) => {
                                                            return (
                                                                <tr
                                                                    key={index}
                                                                    className="text-center"
                                                                >
                                                                    <td>
                                                                        {
                                                                            member.userId
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            member.name
                                                                        }
                                                                    </td>
                                                                    {record
                                                                        .creator
                                                                        .id ===
                                                                        userId && (
                                                                        <td>
                                                                            <Popconfirm
                                                                                title="Do you still want to delete this member?"
                                                                                icon={
                                                                                    <QuestionCircleOutlined
                                                                                        style={{
                                                                                            fontSize: 25,
                                                                                        }}
                                                                                    />
                                                                                }
                                                                                onConfirm={() => {
                                                                                    dispatch(
                                                                                        removeUserFromProjectAction(
                                                                                            {
                                                                                                projectId:
                                                                                                    record.id,
                                                                                                userId: member.userId,
                                                                                            }
                                                                                        )
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <Button
                                                                                    type="danger"
                                                                                    shape="circle"
                                                                                    icon={
                                                                                        <CloseOutlined
                                                                                            style={{
                                                                                                fontSize:
                                                                                                    '20px',
                                                                                            }}
                                                                                        />
                                                                                    }
                                                                                />
                                                                            </Popconfirm>
                                                                        </td>
                                                                    )}
                                                                </tr>
                                                            );
                                                        }
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    );
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    {record.members
                                        .slice(0, 2)
                                        .map((user, index) => {
                                            return (
                                                <Avatar
                                                    key={index}
                                                    size="default"
                                                    src={user.avatar}
                                                />
                                            );
                                        })}

                                    {record.members.length > 2 ? (
                                        <Avatar
                                            style={{
                                                backgroundColor: '#f56a00',
                                                color: '#fff',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            size="default"
                                        >
                                            <span style={{ fontSize: '11px' }}>
                                                +{record.members.length - 2}
                                            </span>
                                        </Avatar>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            </Popover>
                            <Popover
                                placement="topLeft"
                                title="Add User"
                                trigger="click"
                                content={() => {
                                    return (
                                        <AutoComplete
                                            style={{
                                                width: 200,
                                            }}
                                            placeholder="Search member"
                                            onSearch={(user) => {
                                                if (searchRef.current) {
                                                    clearTimeout(
                                                        searchRef.current
                                                    );
                                                }
                                                searchRef.current = setTimeout(
                                                    () => {
                                                        dispatch(
                                                            getUserAction(user)
                                                        );
                                                    },
                                                    400
                                                );
                                            }}
                                            options={userSearch?.map(
                                                (member, index) => {
                                                    return {
                                                        label: member.name,
                                                        value: member.userId.toString(),
                                                    };
                                                }
                                            )}
                                            value={keyword}
                                            onChange={(keyword) => {
                                                setKeyword(keyword);
                                            }}
                                            onSelect={(value, option) => {
                                                if (
                                                    record.creator.id === userId
                                                ) {
                                                    setKeyword(option.label);
                                                    dispatch(
                                                        assignUserAction({
                                                            projectId:
                                                                record.id,
                                                            userId: value, //value in onSelect
                                                        })
                                                    );
                                                } else {
                                                    toast.error(
                                                        'You do not have permission to assign member to this project',
                                                        {
                                                            autoClose: 1000,
                                                        }
                                                    );
                                                }
                                            }}
                                        />
                                    );
                                }}
                            >
                                <Button
                                    type="transparent"
                                    shape="circle"
                                    size="middle"
                                    icon={
                                        <UsergroupAddOutlined
                                            style={{
                                                fontSize: '25px',
                                            }}
                                        />
                                    }
                                />
                            </Popover>
                        </Avatar.Group>
                    );
                },
            },
            //Action
            {
                title: 'Action',
                key: 'action',
                align: 'center',
                render: (_, record, index, text) => (
                    <Space size="middle">
                        <Button
                            onClick={(e) => {
                                if (record.creator.id === userId) {
                                    dispatch(openModal());
                                    dispatch({
                                        type: 'FILL_INPUT',
                                        data: record,
                                    });
                                } else {
                                    toast.error(
                                        'You do not have permission to edit this project !',
                                        {
                                            autoClose: 1000,
                                        }
                                    );
                                }
                            }}
                            icon={<EditOutlined style={{ fontSize: '20px' }} />}
                            className="btn btn-primary"
                            style={{
                                minWidth: '30px',
                                borderRadius: '2px',
                            }}
                        />
                        <Button
                            onClick={() => {
                                showDeleteConfirm.current(
                                    record.id,
                                    record.creator.id
                                );
                            }}
                            icon={
                                <DeleteOutlined style={{ fontSize: '20px' }} />
                            }
                            className="btn btn-primary"
                            style={{
                                minWidth: '30px',
                                borderRadius: '2px',
                                backgroundColor: 'red',
                            }}
                        />
                    </Space>
                ),
            },
        ];
    }, [dispatch, keyword, userId, userSearch]);

    // ---------------------------------------

    return (
        <>
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
        </>
    );
}
export default HomeScreen;
