import React, { memo, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import Input from '../../utils/Input';
import Select from '../../utils/Select';

import { http } from '../../axios';
import { toast } from 'react-toastify';

import {
    getAllPriorityURL,
    getAllStatusURL,
    getAllTaskTypeURL,
} from '../../axios/apiURL';

const schemaValidations = Yup.object({
    taskName: Yup.string().required('Task name is required'),
});

function FormCreateEditTask({
    projectId,
    projectName,
    title,
    status,
    statusDefaultValue,
    priorityDefaultValue,
    taskTypeDefaultValue,
}) {
    const { register, handleSubmit, formState } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaValidations),
    });
    const { errors } = formState;

    const [dataField, setDataField] = useState({
        status: [],
        priority: [],
        taskType: [],
    });

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

                    setDataField(objectData);
                });
            } catch (err) {
                toast.error('Cannot get status field!');
            }
        };
        getAllField();
    }, []);

    const onSubmit = (data) => {
        console.log(data);
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
                        defaultValue={statusDefaultValue}
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
                                defaultValue={priorityDefaultValue}
                            >
                                {dataField?.priority.length > 0 &&
                                    dataField?.priority.map((item) => {
                                        return (
                                            <option
                                                key={item.priorityId}
                                                className="selectCategory__option"
                                                value={item.priorityId}
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
                                defaultValue={taskTypeDefaultValue}
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
            </form>
        </section>
    );
}

export default memo(FormCreateEditTask);
