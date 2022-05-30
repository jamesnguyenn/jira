import React, { memo, useRef } from 'react';

import { Avatar, Result, Tooltip } from 'antd';
import { NavLink } from 'react-router-dom';

function ProjectDetailHeader({
    listMember = [],
    id,
    isMemberInProject,
    creator,
}) {
    const inputSearch = useRef(null);

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
                                <Avatar style={{ backgroundColor: '#f56a00' }}>
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
                                                />
                                            ) : (
                                                <Avatar
                                                    style={{
                                                        backgroundColor: '#000',
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
                        <span className="projectDetail__header-text">
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
