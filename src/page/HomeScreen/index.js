<<<<<<< HEAD
import React, { useCallback, useEffect, useRef } from 'react';
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
  Select,
  Popconfirm,
=======
import React, { useCallback, useEffect } from 'react';
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
>>>>>>> 2ebd08eb0e9ce3035ab851c0ba27fb6e5064dcf2
} from 'antd';
import { useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
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
  registerThunk,
  removeUserFromProjectAction,
  updateProjectAction,
=======
    assignUserAction,
    deleteProjectAction,
    delProjectAction,
    getListProjectAction,
    getProjectDetailAction,
    getProjectDetailThunk,
    getUserAction,
    updateProjectAction,
>>>>>>> 2ebd08eb0e9ce3035ab851c0ba27fb6e5064dcf2
} from '../../redux/thunk';
import { delProject, updateProjects } from '../../redux/reducer/projectSlice';
import ReactHtmlParser from 'react-html-parser';
import { openModal } from '../../redux/reducer/modalAdjustSlice';
<<<<<<< HEAD
import { useNavigate, NavLink } from 'react-router-dom';
=======
import { NavLink, useNavigate } from 'react-router-dom';
>>>>>>> 2ebd08eb0e9ce3035ab851c0ba27fb6e5064dcf2
import LayoutModal from '../../layout/LayoutModal/LayoutModal';
import FormCreateEditProject from '../../component/FormCreateEditProject';
import HtmlParser from 'react-html-parser/lib/HtmlParser';
import { http } from '../../axios';
<<<<<<< HEAD
import { getUserAddProject, updateProject } from '../../axios/apiURL';
import DebounceSelectMember from '../../component/DebounceSelectMember';
=======
import { updateProject } from '../../axios/apiURL';
>>>>>>> 2ebd08eb0e9ce3035ab851c0ba27fb6e5064dcf2
import { toast } from 'react-toastify';
const { confirm } = Modal;
const { Option } = Select;

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
          <NavLink to={`/project-detail/${record.id}`}>
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
          <Avatar.Group>
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
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {record.members.map((member, index) => {
                          return (
                            <tr key={index} className="text-center">
                              <td>{member.userId}</td>
                              <td>{member.name}</td>
                              <td>
                                <Popconfirm
                                  title="Do you still want to delete this member?"
                                  icon={
                                    <QuestionCircleOutlined
                                      style={{ fontSize: 25 }}
                                    />
                                  }
                                  onConfirm={() => {
                                    dispatch(
                                      removeUserFromProjectAction({
                                        projectId: record.id,
                                        userId: member.userId,
                                      })
                                    );
                                  }}
                                >
                                  <Button
                                    type="danger"
                                    shape="circle"
                                  >
                                    X
                                  </Button>
                                </Popconfirm>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }}
            >
              {record.members.slice(0, 2).map((user, index) => {
                return (
                  <Avatar
                    key={index}
                    size="large"
                    src={user.avatar}
                  />
                );
              })}

              {record.members.length > 2 ? (
                <Avatar
                  style={{
                    backgroundColor: '#6dbcdb',
                    color: 'black',
                  }}
                  size="large"
                >
                  +{record.members.length - 2}
                </Avatar>
              ) : (
                ''
              )}
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
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch(getUserAction(user));
                      }, 400);
                    }}
                    options={userSearch?.map((member, index) => {
                      return {
                        label: member.name,
                        value: member.userId.toString(),
                      };
                    })}
                    value={keyword}
                    onChange={(keyword) => {
                      setKeyword(keyword);
                    }}
                    onSelect={(value, option) => {
                      setKeyword(option.label);
                      dispatch(
                        assignUserAction({
                          projectId: record.id,
                          userId: value, //value in onSelect
                        })
                      );
                    }}
                  />
                );
              }}
            >
              <Button type="transparent" shape="circle" size="large">
                +
              </Button>
            </Popover>
          </Avatar.Group>
        );

        {
          /* <Popover
              placement="topLeft"
              title={'Add User'}
              content={() => {
                return (
                  <AutoComplete
                    //onSearch use to call api backend
                    onSearch={(user) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      // //useRef to avoid re-render do UI
                      // //use setTimeOut because when user typing their name
                      // //each time user typing it's will call API each time user types, it's will affect to the server (lagging)
                      // //so need to setTimeOut about 2-3s, after 2-3s, it's will call API
                      searchRef.current = setTimeout(() => {
                        const action = getUserAction(user);
                        dispatch(action);
                      }, 200);
                    }}
                    //map data from api
                    //userSearch get from store userSearchSlice
                    options={userSearch.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(), //toString() to not get warning at console.log
                      };
                    })}
                    //onSelect to set value of input
                    onSelect={(value, option) => {
                      setValue(option.label);
                      //Call api
                      const action = assignUserAction({
                        projectId: record.id,
                        userId: value, //value in onSelect
                      });
                      dispatch(action);
                    }}
                    // the value (state) is when user search their name
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
            </Popover> */
        }
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
            onClick={() => {
              showDeleteConfirm(record.id);
            }}
            icon={<DeleteOutlined style={{ fontSize: 30 }} />}
            type="danger"
            size="large"
          ></Button>

          <Button
            onClick={(e) => {
              dispatch(openModal());
              dispatch({
                type: 'FILL_INPUT',
                data: record,
              });
            }}
            icon={<EditOutlined style={{ fontSize: 30 }} />}
            type="primary"
            size="large"
          ></Button>
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
  const [keyword, setKeyword] = useState('');
  const searchRef = useRef(null);
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
      try {
        const result = await http.put(
          `${updateProject}?projectId=${id}`,
          data
        );
        dispatch({
          type: 'UPDATE_PROJECT',
          data: data,
        });

        const actionGetList = getListProjectAction();
        dispatch(actionGetList);
      } catch (error) {
        console.log(error);
      }
    },
    [id]
  );

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
=======
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
            render: (text, record, index) => (
                <NavLink
                    to={`/project-detail/${record.id}`}
                    style={{ color: '#000' }}
                >
                    {text}
                </NavLink>
            ),
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
                            return (
                                <Avatar key={index} src={user.avatar}></Avatar>
                            );
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
                                        options={userSearch.map(
                                            (user, index) => {
                                                return {
                                                    label: user.name,
                                                    value: user.userId.toString(), //toString() to not get warning at console.log
                                                };
                                            }
                                        )}
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
                            <Button style={{ borderRadius: '100%' }}>+</Button>
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
    const { id, projectName, description, categoryId, projectCategory } = edit;

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
            try {
                // const result = await http.put(
                //     `${updateProject}?projectId=${id}`,
                //     data
                // );
                // const action = updateProjects(result.data.content);
                // dispatch(action);
                // console.log('RESULT', result.data.content);
            } catch (error) {
                console.log(error);
            }
        },
        [id]
    );

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
>>>>>>> 2ebd08eb0e9ce3035ab851c0ba27fb6e5064dcf2
}
export default HomeScreen;
