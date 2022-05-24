import React from 'react';

import { Avatar, Tooltip } from 'antd';
import { Tag } from 'antd';

function ProjectDetailBody({ lstTask = [] }) {
    return (
        <>
            <div className="cards">
                {lstTask.length > 0 &&
                    lstTask.map((lstItem) => {
                        const { lstTaskDeTail } = lstItem;

                        return (
                            <div className="task" key={lstItem.statusId}>
                                <div className="task__header">
                                    {lstItem.statusName}
                                </div>
                                <ul className="task__lists">
                                    {lstTaskDeTail.length > 0 &&
                                        lstTaskDeTail.map(
                                            (lstTaskDeTailItem) => {
                                                const priority =
                                                    lstTaskDeTailItem
                                                        ?.priorityTask
                                                        ?.priority;
                                                const id =
                                                    lstTaskDeTailItem.taskId;
                                                const taskName =
                                                    lstTaskDeTailItem.taskName;
                                                const members =
                                                    lstTaskDeTailItem.assigness;
                                                return (
                                                    <li
                                                        className="task__item"
                                                        key={id}
                                                    >
                                                        <div className="task__itemHeader">
                                                            {taskName}
                                                        </div>
                                                        <div className="task__itemBody">
                                                            <Tag
                                                                color={
                                                                    priority ===
                                                                    'High'
                                                                        ? 'red'
                                                                        : priority ===
                                                                          'Medium'
                                                                        ? 'blue'
                                                                        : 'green'
                                                                }
                                                            >
                                                                {priority}
                                                            </Tag>

                                                            <Avatar.Group
                                                                maxCount={2}
                                                                size="small"
                                                                maxStyle={{
                                                                    color: '#f56a00',
                                                                    backgroundColor:
                                                                        '#fde3cf',
                                                                }}
                                                            >
                                                                {members.length >
                                                                    0 &&
                                                                    members.map(
                                                                        (
                                                                            member
                                                                        ) => {
                                                                            return (
                                                                                <Tooltip
                                                                                    key={
                                                                                        member.id
                                                                                    }
                                                                                    title={
                                                                                        member.name
                                                                                    }
                                                                                    placement="top"
                                                                                >
                                                                                    <Avatar
                                                                                        src={
                                                                                            member.avatar
                                                                                        }
                                                                                        style={{
                                                                                            cursor: 'pointer',
                                                                                        }}
                                                                                    />
                                                                                </Tooltip>
                                                                            );
                                                                        }
                                                                    )}
                                                            </Avatar.Group>
                                                        </div>
                                                    </li>
                                                );
                                            }
                                        )}
                                </ul>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default ProjectDetailBody;
