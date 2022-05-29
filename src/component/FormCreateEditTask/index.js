import React, { memo, useEffect, useRef, useState, useMemo } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Input from '../../utils/Input';
import Select from '../../utils/Select';

import { http } from '../../axios';
import { toast } from 'react-toastify';
import { Slider } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';

import {
    getAllPriorityURL,
    getAllStatusURL,
    getAllTaskTypeURL,
    getUserByProjectIdURL,
} from '../../axios/apiURL';
import DebounceSelectMember from '../DebounceSelectMember';
import ReactQuill from 'react-quill';
import { createTaskThunk } from '../../redux/thunk';
import { useDispatch } from 'react-redux';

const schemaValidations = Yup.object({
    taskName: Yup.string().required('Task name is required'),
    originalEstimate: Yup.string().required('Original estimate is required'),
    timeTrackingSpent: Yup.string().required('Time spent is required'),
    timeTrackingRemaining: Yup.string().required('Time remaining is required'),
});

function FormCreateEditTask({
    projectId,
    projectName,
    title,
    statusDefaultValue,
    priorityDefaultValue,
    taskTypeDefaultValue,
}) {
    const { register, handleSubmit, formState, watch, reset } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaValidations),
        defaultValues: {
            statusId: statusDefaultValue,
            priorityId: priorityDefaultValue,
            typeId: taskTypeDefaultValue,
        },
    });
    const { errors } = formState;

    const dispatch = useDispatch();
    const [dataField, setDataField] = useState({
        status: [],
        priority: [],
        taskType: [],
    });
    const [members, setMembers] = useState([]);

    const [description, setDescription] = useState('');
    const timeSpentValue = watch('timeTrackingSpent');
    const timeTrackingRemaining = watch('timeTrackingRemaining');
    const priority = watch('priorityId');

    //Load All API Input fields
    useEffect(() => {
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

    const onSubmit = (data) => {
        const listUserAssign = members.map((member) => member.value);
        const {
            originalEstimate,
            timeTrackingSpent,
            statusId,
            timeTrackingRemaining,
            typeId,
            taskName,
            priorityId,
        } = data;

        const dataSubmit = {
            listUserAsign: listUserAssign,
            taskName: String(taskName),
            description: String(description),
            statusId: String(statusId),
            originalEstimate: Number(originalEstimate),
            timeTrackingSpent: Number(timeTrackingSpent),
            timeTrackingRemaining: Number(timeTrackingRemaining),
            projectId: Number(projectId),
            typeId: Number(typeId),
            priorityId: Number(priorityId),
        };

        const createTaskAPI = createTaskThunk(dataSubmit);
        dispatch(createTaskAPI);
    };

    return (
        <section className="formCreateEditTask">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="text-field" style={{ opacity: '0.4' }}>
                    <label htmlFor={projectName}>Project Name</label>
                    <input
                        defaultValue={projectName || ''}
                        autoComplete="off"
                        type="text"
                        id={projectName}
                        disabled
                    />
                </div>
                <Input
                    id="taskName"
                    type="text"
                    placeholder="Enter task name..."
                    labelName="Task Name"
                    register={register}
                    registerName="taskName"
                    errors={errors?.taskName}
                    errorsMessage={errors?.taskName?.message}
                />
                <div className="formCreateEditTask__column">
                    <span className="formCreateEditTask__fieldTitle">
                        Status
                    </span>
                    <Select
                        register={register}
                        registerName="statusId"
                        id="status"
                        name="status"
                    >
                        {dataField?.status.length > 0 &&
                            dataField?.status.map((item) => {
                                return (
                                    <option
                                        key={item.statusId}
                                        className="selectCategory__option"
                                        value={item.statusId}
                                    >
                                        {item.statusName}
                                    </option>
                                );
                            })}
                    </Select>
                </div>
                <div className="formCreateEditTask-flex">
                    <div className="formCreateEditTask-flexItem">
                        <div className="formCreateEditTask__column">
                            <span className="formCreateEditTask__fieldTitle">
                                Priority
                            </span>
                            <Select
                                register={register}
                                registerName="priorityId"
                                id="priorityId"
                                name="priorityId"
                            >
                                {dataField?.priority.length > 0 &&
                                    dataField?.priority.map((item) => {
                                        return (
                                            <option
                                                key={item.priorityId}
                                                className="selectCategory__option"
                                                value={item.priorityId}
                                                style={{
                                                    color: colorFlag[
                                                        item.priority
                                                    ],
                                                }}
                                            >
                                                {item.priority}
                                            </option>
                                        );
                                    })}
                            </Select>
                        </div>
                    </div>
                    <div className="formCreateEditTask-flexItem">
                        <div className="formCreateEditTask__column">
                            <span className="formCreateEditTask__fieldTitle">
                                Task Type
                            </span>
                            <Select
                                register={register}
                                registerName="typeId"
                                id="taskType"
                                name="taskType"
                            >
                                {dataField?.taskType.length > 0 &&
                                    dataField?.taskType.map((item) => {
                                        return (
                                            <option
                                                key={item.id}
                                                className="selectCategory__option"
                                                value={item.id}
                                            >
                                                {item.taskType}
                                            </option>
                                        );
                                    })}
                            </Select>
                        </div>
                    </div>
                </div>

                <div className="formCreateEditTask-flex">
                    <div className="formCreateEditTask-flexItem">
                        <div className="formCreateEditTask__column">
                            <span className="formCreateEditTask__fieldTitle">
                                Assignees
                            </span>
                            <DebounceSelectMember
                                mode="multiple"
                                value={members}
                                placeholder="Select member..."
                                fetchOptions={fetchUserList}
                                onChange={(newValue) => {
                                    setMembers(newValue);
                                }}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </div>
                    </div>
                    <div className="formCreateEditTask-flexItem">
                        <div className="formCreateEditTask__column">
                            <span className="formCreateEditTask__fieldTitle">
                                Time tracking
                            </span>
                            <Slider
                                max={
                                    Number(timeSpentValue) +
                                    Number(timeTrackingRemaining)
                                }
                                value={timeSpentValue}
                                style={{
                                    margin: '0',
                                    pointerEvents: 'none',
                                }}
                                trackStyle={{
                                    backgroundColor: '#001529',
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <div className="formCreateEditTask__fieldTitle">
                                    {timeSpentValue || 0}h logged
                                </div>
                                <div className="formCreateEditTask__fieldTitle">
                                    {timeTrackingRemaining || 0}h remaining
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="formCreateEditTask-flex">
                    <div className="formCreateEditTask-flexItem">
                        <div className="formCreateEditTask__column">
                            <Input
                                id="originalEstimate"
                                type="number"
                                labelName="Original Estimate"
                                register={register}
                                registerName="originalEstimate"
                                errors={errors?.originalEstimate}
                                errorsMessage={
                                    errors?.originalEstimate?.message
                                }
                                defaultValue="0"
                            />
                        </div>
                    </div>
                    <div className="formCreateEditTask-flexItem">
                        <div className="formCreateEditTask__column">
                            <Input
                                id="timeTrackingSpent"
                                type="number"
                                labelName="Time spent"
                                register={register}
                                registerName="timeTrackingSpent"
                                errors={errors?.timeTrackingSpent}
                                errorsMessage={
                                    errors?.timeTrackingSpent?.message
                                }
                                defaultValue="0"
                            />
                        </div>
                    </div>
                    <div className="formCreateEditTask-flexItem">
                        <div className="formCreateEditTask__column">
                            <Input
                                id="timeTrackingRemaining"
                                type="number"
                                labelName="Time remaining"
                                register={register}
                                registerName="timeTrackingRemaining"
                                errors={errors?.timeTrackingRemaining}
                                errorsMessage={
                                    errors?.timeTrackingRemaining?.message
                                }
                                defaultValue="0"
                            />
                        </div>
                    </div>
                </div>
                <div className="formCreateEditTask__column">
                    <div className="formCreateEditTask__fieldTitle">
                        Description
                    </div>
                    <ReactQuill
                        theme="snow"
                        defaultValue=""
                        onChange={setDescription}
                        modules={modules}
                        formats={formats}
                    >
                        <div className="my-editing-area" />
                    </ReactQuill>
                </div>
                <div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        // disabled={isSubmitting}
                    >
                        Create Task
                    </button>
                </div>
            </form>
        </section>
    );
}

export default memo(FormCreateEditTask);

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

const colorFlag = {
    High: 'red',
    Medium: '#096dd9',
    Low: '#1eb290',
    Lowest: '#1eb290',
};
