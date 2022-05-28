import React, {
    memo,
    useCallback,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';

import ReactHtmlParser from 'react-html-parser';

import {
    MessageOutlined,
    LinkOutlined,
    BugOutlined,
    RocketOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { Popconfirm, Select } from 'antd';
import { toast } from 'react-toastify';
import { http } from '../../axios';
import {
    getAllPriorityURL,
    getAllStatusURL,
    getAllTaskTypeURL,
    getUserByProjectIdURL,
} from '../../axios/apiURL';
import {
    deleteTaskDetailThunk,
    updateTaskDetailThunk,
} from '../../redux/thunk';
import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import DebounceSelectMember from '../../component/DebounceSelectMember';

const { Option } = Select;

function TaskDetail({
    taskDetailData,
    isCreatorProject,
    projectId,
    setVisibleModal,
}) {
    //Store Data Select Field from  API response
    const [dataField, setDataField] = useState({
        status: [],
        priority: [],
        taskType: [],
    });

    console.log(dataField);

    //Task Detail
    const {
        taskTypeDetail,
        priorityTask,
        taskName,
        description,
        statusId,
        assigness,
        taskId,
        originalEstimate,
        timeTrackingRemaining,
        timeTrackingSpent,
    } = taskDetailData;
    console.log('🚀 ~ taskDetailData', taskDetailData);

    //Type of task
    const [taskTypeUpdate, setTypeUpdate] = useState(taskTypeDetail.id);

    const [members, setMembers] = useState(
        assigness.map((member) => {
            return {
                key: member.id,
                label: member.name,
                value: member.id,
            };
        }) || []
    );

    const [descriptionUpdate, setDescriptionUpdate] = useState(description);
    const dispatch = useDispatch();

    //Load All API Input fields
    useLayoutEffect(() => {
        const getAllField = async () => {
            try {
                let arrayField = ['status', 'priority', 'taskType'];
                const getStatusAPI = http.get(getAllStatusURL);
                const getPriorityAPI = http.get(getAllPriorityURL);
                const getTaskTypeAPI = http.get(getAllTaskTypeURL);
                Promise.all([
                    getStatusAPI,
                    getPriorityAPI,
                    getTaskTypeAPI,
                ]).then((data) => {
                    const newData = data.map((item, index) => {
                        return {
                            [arrayField[index]]: item.data.content,
                        };
                    });
                    let objectData = {};
                    newData.forEach((item) => {
                        objectData = { ...objectData, ...item };
                    });

                    setDataField({
                        ...dataField,
                        ...objectData,
                    });
                });
            } catch (err) {
                toast.error('Cannot get data field!');
            }
        };
        getAllField();
    }, []);

    //Handle Copy Link Project
    const handleCopyLink = useCallback(async () => {
        const promise = new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                navigator.clipboard.writeText(window.location.href);
                clearTimeout(timer);
                resolve('Copy Successfully');
            }, [300]);
        });
        promise.then((data) => {
            toast.success('Copy Link Successfully', {
                autoClose: 500,
            });
        });
    }, []);

    //Handle Change Type TaskDetail (newTask, bug)
    const handleChangeTypeTask = useCallback(
        (e) => {
            const dataUpdate = {
                listUserAsign: assigness.map((user) => user.id),
                taskId: String(taskId),
                taskName: taskName,
                description: description,
                statusId: statusId,
                originalEstimate: originalEstimate,
                timeTrackingSpent: timeTrackingSpent,
                timeTrackingRemaining: timeTrackingRemaining,
                projectId: Number(projectId),
                typeId: e,
                priorityId: priorityTask.priorityId,
            };

            const updateTaskApi = updateTaskDetailThunk(
                dataUpdate,
                setTypeUpdate
            );
            dispatch(updateTaskApi);
        },
        [
            assigness,
            description,
            dispatch,
            originalEstimate,
            priorityTask.priorityId,
            projectId,
            statusId,
            taskId,
            taskName,
            timeTrackingRemaining,
            timeTrackingSpent,
        ]
    );
    //Handle Delete Task
    const handleDeleteTask = useCallback(() => {
        const removeTaskApi = deleteTaskDetailThunk(
            taskId,
            statusId,
            setVisibleModal
        );
        dispatch(removeTaskApi);
    }, [dispatch, setVisibleModal, statusId, taskId]);

    const handleChangeStatusTask = useCallback(() => {}, []);

    async function fetchUserList() {
        try {
            const response = await http.get(
                `${getUserByProjectIdURL}?idProject=${projectId}`
            );
            return response.data.content.map((user) => ({
                label: user.name,
                value: user.userId,
            }));
        } catch (err) {
            toast.error('Cannot load data user');
        }
    }

    return (
        <>
            <section className="taskDetail">
                {/* Header */}
                <div className="taskDetailHeader">
                    <div className="taskDetailHeader__left">
                        <div className="taskDetailHeader__leftItem">
                            <div className="taskDetailHeader__leftItem">
                                {taskTypeUpdate === 1 ? (
                                    <BugOutlined
                                        style={{
                                            color:
                                                colorFlag[
                                                    priorityTask?.priority
                                                ] || '#000',
                                        }}
                                    />
                                ) : (
                                    <RocketOutlined
                                        style={{
                                            color:
                                                colorFlag[
                                                    priorityTask?.priority
                                                ] || '#000',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="taskDetailHeader__leftItem">
                            <Select
                                style={{ width: 120 }}
                                defaultValue={taskTypeDetail.id}
                                onChange={handleChangeTypeTask}
                            >
                                {dataField?.taskType.length > 0 &&
                                    dataField?.taskType.map((item) => {
                                        return (
                                            <Option
                                                key={item.id}
                                                value={item.id}
                                                disabled={!isCreatorProject}
                                            >
                                                {item.taskType}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </div>
                        <div className="taskDetailHeader__leftItem">
                            {taskName}
                        </div>
                    </div>
                    <div className="taskDetailHeader__right">
                        <div className="taskDetailHeader__rightItem">
                            <MessageOutlined />
                            <span>Give feedback</span>
                        </div>
                        <div
                            className="taskDetailHeader__rightItem"
                            onClick={() => {
                                handleCopyLink();
                            }}
                        >
                            <LinkOutlined />
                            <span>Copy Link</span>
                        </div>
                        {isCreatorProject && (
                            <div className="taskDetailHeader__rightItem">
                                <Popconfirm
                                    placement="top"
                                    title="Are you sure to delete this task?"
                                    onConfirm={handleDeleteTask}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <DeleteOutlined />
                                </Popconfirm>
                            </div>
                        )}
                    </div>
                </div>
                {/* Body */}
                <div className="taskDetailBody">
                    <div className="taskDetailBody__left">
                        <div className="taskDetailBody__leftItem">
                            <h3>
                                {`This is an issue of type :  ${taskTypeDetail.taskType}`}
                            </h3>
                        </div>
                        <div className="taskDetailBody__leftItem">
                            <h4>Description</h4>
                            <div>
                                {isCreatorProject ? (
                                    <ReactQuill
                                        theme="snow"
                                        defaultValue={descriptionUpdate}
                                        // value={descriptionUpdate}
                                        // onChange={setDescriptionUpdate}
                                        modules={modules}
                                        formats={formats}
                                    >
                                        <div className="my-editing-area" />
                                    </ReactQuill>
                                ) : (
                                    ReactHtmlParser(description)
                                )}
                            </div>
                        </div>
                        <div className="taskDetailBody__leftItem">
                            <h4>Comment</h4>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quod laboriosam exercitationem voluptatibus
                            omnis quisquam nihil labore reprehenderit id sint
                            fugiat consequatur obcaecati, expedita ipsam aut
                            dolore dicta quos excepturi accusantium. Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. Quod
                            laboriosam exercitationem voluptatibus omnis
                            quisquam nihil labore reprehenderit id sint fugiat
                            consequatur obcaecati, expedita ipsam aut dolore
                            dicta quos excepturi accusantium. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Quod
                            laboriosam exercitationem voluptatibus omnis
                            quisquam nihil labore reprehenderit id sint fugiat
                            consequatur obcaecati, expedita ipsam aut dolore
                            dicta quos excepturi accusantium. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Quod
                            laboriosam exercitationem voluptatibus omnis
                            quisquam nihil labore reprehenderit id sint fugiat
                            consequatur obcaecati, expedita ipsam aut dolore
                            dicta quos excepturi accusantium. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Quod
                            laboriosam exercitationem voluptatibus omnis
                            quisquam nihil labore reprehenderit id sint fugiat
                            consequatur obcaecati, expedita ipsam aut dolore
                            dicta quos excepturi accusantium. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Quod
                            laboriosam exercitationem voluptatibus omnis
                            quisquam nihil labore reprehenderit id sint fugiat
                            consequatur obcaecati, expedita ipsam aut dolore
                            dicta quos excepturi accusantium. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Quod
                            laboriosam exercitationem voluptatibus omnis
                            quisquam nihil labore reprehenderit id sint fugiat
                            consequatur obcaecati, expedita ipsam aut dolore
                            dicta quos excepturi accusantium. Lorem ipsum dolor
                            sit amet consectetur adipisicing elit. Quod
                            laboriosam exercitationem voluptatibus omnis
                            quisquam nihil labore reprehenderit id sint fugiat
                            consequatur obcaecati, expedita ipsam aut dolore
                            dicta quos excepturi accusantium.
                        </div>
                    </div>
                    <div className="taskDetailBody__right">
                        <div className="taskDetailBody__rightItem">
                            <h4>STATUS</h4>
                            <Select
                                style={{ width: '100%' }}
                                defaultValue={statusId}
                                onChange={handleChangeStatusTask}
                            >
                                {dataField?.status.length > 0 &&
                                    dataField?.status.map((item) => {
                                        return (
                                            <Option
                                                key={item.statusId}
                                                value={item.statusId}
                                                disabled={!isCreatorProject}
                                            >
                                                {item.statusName}
                                            </Option>
                                        );
                                    })}
                            </Select>
                        </div>
                        <div className="taskDetailBody__rightItem">
                            <h4>ASSIGNEES</h4>
                            <DebounceSelectMember
                                mode="multiple"
                                value={members}
                                placeholder="No member be assigned to this task..."
                                fetchOptions={fetchUserList}
                                onChange={(newValue) => {
                                    setMembers(newValue);
                                }}
                                style={{
                                    width: '100%',
                                }}
                                disabled={!isCreatorProject}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default memo(TaskDetail);
const colorFlag = {
    High: 'red',
    Medium: '#096dd9',
    Low: '#1eb290',
    Lowest: '#1eb290',
};
let modules = {
    toolbar: [
        [{ header: [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ color: [] }, { background: [] }],
    ],
};

let formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
];
