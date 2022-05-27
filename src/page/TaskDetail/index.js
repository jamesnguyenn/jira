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
} from '@ant-design/icons';
import { Select } from 'antd';
import { toast } from 'react-toastify';
import { http } from '../../axios';
import {
    getAllPriorityURL,
    getAllStatusURL,
    getAllTaskTypeURL,
} from '../../axios/apiURL';

const { Option } = Select;

function TaskDetail({ taskDetailData }) {
    const [dataField, setDataField] = useState({
        status: [],
        priority: [],
        taskType: [],
    });

    const { taskTypeDetail, priorityTask, taskName, description } =
        taskDetailData;
    const [taskTypeUpdate, setTypeUpdate] = useState(taskTypeDetail.id);
    console.log('🚀 ~ taskTypeUpdate', taskDetailData);

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

    const handleChangeTypeTask = useCallback(async (e) => {
        setTypeUpdate(e);
    }, []);

    return (
        <section className="taskDetail">
            <div className="taskDetailHeader">
                <div className="taskDetailHeader__left">
                    <div className="taskDetailHeader__leftItem">
                        <div className="taskDetailHeader__leftItem">
                            {taskTypeUpdate === 1 ? (
                                <BugOutlined
                                    style={{
                                        color:
                                            colorFlag[priorityTask?.priority] ||
                                            '#000',
                                    }}
                                />
                            ) : (
                                <RocketOutlined
                                    style={{
                                        color:
                                            colorFlag[priorityTask?.priority] ||
                                            '#000',
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
                                        <Option key={item.id} value={item.id}>
                                            {item.taskType}
                                        </Option>
                                    );
                                })}
                        </Select>
                    </div>
                    <div className="taskDetailHeader__leftItem">{taskName}</div>
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
                </div>
            </div>
            <div className="taskDetailBody">
                <div className="taskDetailBody__left">
                    <div className="taskDetailBody__leftItem">
                        <h3>
                            This is an issue of type: {taskTypeDetail.taskType}
                        </h3>
                    </div>
                    <div className="taskDetailBody__leftItem">
                        <h4>Description</h4>
                        <div>{ReactHtmlParser(description)}</div>
                    </div>
                    <div className="taskDetailBody__leftItem">
                        <div>Comment</div>
                    </div>
                </div>
                <div className="taskDetailBody__right"></div>
            </div>
        </section>
    );
}

export default memo(TaskDetail);
const colorFlag = {
    High: 'red',
    Medium: '#096dd9',
    Low: '#1eb290',
    Lowest: '#1eb290',
};
