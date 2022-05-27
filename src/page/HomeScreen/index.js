import React, { useCallback, useEffect } from 'react';
<<<<<<< HEAD
import {
  getAllProject,
  getUserSearch,
  getVisibleModal,
} from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Space,
  Table,
  Tag,
  Divider,
  Avatar,
  Tooltip,
  Modal,
  Image,
  Popover,
  AutoComplete,
=======
import { getAllProject, getVisibleModal } from '../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
    Button,
    Space,
    Table,
    Tag,
    Divider,
    Avatar,
    Tooltip,
    Modal,
>>>>>>> 4fcc1dc3aa2b1401b958cd78418e947f0faeb9c6
} from 'antd';
import { useState } from 'react';
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    UserOutlined,
    AntDesignOutlined,
} from '@ant-design/icons';
import {
<<<<<<< HEAD
  assignUserAction,
  deleteProjectAction,
  delProjectAction,
  getListProjectAction,
  getProjectDetailAction,
  getProjectDetailThunk,
  getUserAction,
  updateProjectAction,
=======
    deleteProjectAction,
    delProjectAction,
    getListProjectAction,
    getProjectDetailAction,
    getProjectDetailThunk,
    updateProjectAction,
>>>>>>> 4fcc1dc3aa2b1401b958cd78418e947f0faeb9c6
} from '../../redux/thunk';
import {
  delProject,
  updateProjects,
} from '../../redux/reducer/projectSlice';
import ReactHtmlParser from 'react-html-parser';
import { openModal } from '../../redux/reducer/modalAdjustSlice';
import { useNavigate } from 'react-router-dom';
import LayoutModal from '../../layout/LayoutModal/LayoutModal';
import FormCreateEditProject from '../../component/FormCreateEditProject';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { http } from '../../axios';
import { updateProject } from '../../axios/apiURL';
const { confirm } = Modal;

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

<<<<<<< HEAD
  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const showDeleteConfirm = (id) => {
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
      render: (text, record, index) => {
        return (
          <div key={index}>
            {record.members?.slice(0, 2).map((user, index) => {
              return <Avatar key={index} src={user.avatar}></Avatar>;
            })}
            {record.members?.length > 2 ? <Avatar>...</Avatar> : ''}

            <Popover
              placement="topLeft"
              title={'Add User'}
              content={() => {
                return (
                  <AutoComplete
                    //onSearch use to call api backend
                    onSearch={(user) => {
                      const action = getUserAction(user);
                      dispatch(action);
                    }}
                    //map data from api
                    options={userSearch.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(), //toString() to not get warning at console.log
                      };
                    })}
                    //onSelect to set value of input
                    onSelect={(value, option) => {
                      console.log(option);
                      setValue(option.label);
                      //Call api
                      const action = assignUserAction({
                        projectId: record.id,
                        userId: value,
                      });
                      dispatch(action);
                    }}
                    value={value}
                    //use onChange and setValue in this situation because
                    // when user search and choose their name, the name will change into a number
                    onChange={(text) => {
                      setValue(text);
                    }}
                    style={{ width: '100%' }}
                  />
                );
              }}
              trigger="click"
            >
              <Button style={{ borderRadius: '55%' }}>+</Button>
            </Popover>
          </div>
        );
      },
    },
    //Action
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index, text) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => {
              showDeleteConfirm(record.id);
            }}
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
  const { userSearch } = useSelector(getUserSearch);
  const [value, setValue] = useState('');
  const edit = useSelector((state) => state.editProject.editProject);
  const {
    id,
    projectName,
    description,
    categoryId,
    projectCategory,
  } = edit;

  // Render all project
  useEffect(() => {
    const action = getListProjectAction();
    dispatch(action);
  }, [dispatch]);

  //Delete project
  const deleteProject = (projectID) => {
    const action = deleteProjectAction(projectID);
    dispatch(action);
  };

  //Update project
  const onSubmit = useCallback(
    async (data, description) => {
      console.log('IDPROJECT', id);
      try {
        const result = await http.put(
          `${updateProject}?projectId=${id}`,
          data
        );
        const action = updateProjects(result.data.content);
        dispatch(action);

        console.log('RESULT', result.data.content);
      } catch (error) {
        console.log(error);
      }
    },
    [id]
  );
=======
    const setAgeSort = () => {
        setSortedInfo({
            order: 'descend',
            columnKey: 'age',
        });
    };
>>>>>>> 4fcc1dc3aa2b1401b958cd78418e947f0faeb9c6

    const showDeleteConfirm = (projectID) => {
        confirm({
            title: 'Are you sure delete this project?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',

            onOk() {
                deleteProject(projectID);
            },

            onCancel() {},
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
                        onClick={() => {
                            console.log(record.id);
                            showDeleteConfirm(record.id);
                        }}
                        className="btn btn-danger font-weight-light"
                        style={{ fontSize: 25 }}
                    />

                    <EditOutlined
                        onClick={() => {
                            dispatch({
                                type: 'FILL_INPUT',
                                data: record,
                            });
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
    const navigate = useNavigate();
    const { project } = useSelector(getAllProject);

    const edit = useSelector((state) => state.editProject.editProject);
    const { visible } = useSelector(getVisibleModal);
    const {
        id,
        alias,
        projectName,
        description,
        categoryId,
        categoryName,
        projectCategory,
    } = edit;

    useEffect(() => {
        const action = getListProjectAction();
        dispatch(action);
    }, [dispatch]);

    const onSubmit = useCallback(
        async (data, description) => {
            try {
                const result = await http.put(
                    `${updateProject}?projectId=${id}`,
                    data
                );
                dispatch({
                    type: 'UPDATE_PROJECT',
                    data: result.data.content,
                });
            } catch (error) {}
        },
        [dispatch, id]
    );

    const deleteProject = (projectID) => {
        const action = deleteProjectAction(projectID);
        dispatch(action);
    };

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
                        categoryID={categoryId}
                        textButton="Edit Project"
                    ></FormCreateEditProject>
                )}
            </LayoutModal>
        </div>
    );
}
export default HomeScreen;
