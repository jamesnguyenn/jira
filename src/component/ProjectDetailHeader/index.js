import React, { memo, useRef, useCallback } from 'react';

import { Avatar, Result, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';
import lodash from 'lodash';

function ProjectDetailHeader({
    listMember = [],
    id,
    isMemberInProject,
    creator,
    setSearchTask,
    setTaskOfMember,
    taskOfMember,
    userId,
}) {
    const inputSearch = useRef(null);

    const debouncedFilter = useRef(
        lodash.debounce((payload) => {
            setSearchTask(payload);
        }, 800)
    );
    const handleChangeSearchText = useCallback((e) => {
        debouncedFilter.current(e.target.value);
    }, []);

    return (
        <>
            {id ? (
                <>
                    <div className="searchContainer">
                        <input
                            ref={inputSearch}
                            type="text"
                            id="box"
                            placeholder="Search task..."
                            className="search__box"
                            onChange={handleChangeSearchText}
                        />
                        <i className="fas fa-search search__icon" id="icon" />
                    </div>
                    <div className="memberContainer">
                        <Avatar.Group
                            maxCount={4}
                            size="default"
                            maxStyle={{
                                color: '#f56a00',
                                backgroundColor: '#fde3cf',
                            }}
                        >
                            <Tooltip
                                title={`Creator: ${creator.name}`}
                                placement="top"
                            >
                                <Avatar
                                    style={{
                                        backgroundColor: '#f56a00',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => setTaskOfMember(0)}
                                >
                                    {creator.name[0].toUpperCase()}
                                </Avatar>
                            </Tooltip>
                            {listMember.length > 0 &&
                                listMember.map((member) => {
                                    return (
                                        <Tooltip
                                            key={member.userId}
                                            title={member.name}
                                            placement="top"
                                        >
                                            {member.avatar ? (
                                                <Avatar
                                                    src={member.avatar}
                                                    style={{
                                                        cursor: 'pointer',
                                                        backgroundColor:
                                                            'white',
                                                    }}
                                                    onClick={() => {
                                                        setTaskOfMember(
                                                            member.userId
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <Avatar
                                                    style={{
                                                        backgroundColor: '#000',
                                                    }}
                                                    onClick={() => {
                                                        setTaskOfMember(
                                                            member.userId
                                                        );
                                                    }}
                                                >
                                                    {creator.name[0].toUpperCase()}
                                                </Avatar>
                                            )}
                                        </Tooltip>
                                    );
                                })}
                        </Avatar.Group>
                    </div>
                    {isMemberInProject && (
                        <span
                            className="projectDetail__header-text"
                            onClick={() =>
                                setTaskOfMember(() => {
                                    if (taskOfMember === userId) return false;
                                    return userId;
                                })
                            }
                            style={{
                                backgroundColor:
                                    taskOfMember === userId && 'red',
                                borderColor: taskOfMember === userId && 'red',
                                color: taskOfMember === userId && '#fff',
                            }}
                        >
                            Only My Issues
                        </span>
                    )}

                    <span className="projectDetail__header-text">
                        Recently Updated
                    </span>
                </>
            ) : (
                <>
                    <div className="center__column">
                        <Result
                            status="404"
                            extra={
                                <NavLink
                                    to="/"
                                    className="projectDetail__header-text"
                                    style={{
                                        backgroundColor: '#000',
                                        color: '#fff',
                                        textDecoration: 'none',
                                    }}
                                >
                                    Back To Home
                                </NavLink>
                            }
                        />
                    </div>
                </>
            )}
        </>
    );
}

export default memo(ProjectDetailHeader);
