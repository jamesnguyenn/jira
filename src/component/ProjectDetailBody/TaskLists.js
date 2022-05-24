import { Avatar, Tag, Tooltip } from 'antd';
import React, { memo } from 'react';

function TaskLists({ data }) {
    const { taskName, priority, members } = data;
    return (
        <>
            <div className="task__itemHeader">{taskName}</div>
            <div className="task__itemBody">
                <Tag
                    color={
                        priority === 'High'
                            ? 'red'
                            : priority === 'Medium'
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
                        backgroundColor: '#fde3cf',
                    }}
                >
                    {members.length > 0 &&
                        members.map((member) => {
                            return (
                                <Tooltip
                                    key={member.id}
                                    title={member.name}
                                    placement="top"
                                >
                                    <Avatar
                                        src={member.avatar}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                </Tooltip>
                            );
                        })}
                </Avatar.Group>
            </div>
        </>
    );
}

export default memo(TaskLists);
