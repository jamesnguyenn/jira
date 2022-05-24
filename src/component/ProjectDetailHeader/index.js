import React, { useRef } from 'react';

import { Avatar, Tooltip } from 'antd';

function ProjectDetailHeader({ listMember = [] }) {
    const inputSearch = useRef(null);

    return (
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
                    maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                >
                    {listMember.length > 0 &&
                        listMember.map((member) => {
                            return (
                                <Tooltip
                                    key={member.userId}
                                    title={member.name}
                                    placement="top"
                                >
                                    <Avatar
                                        src={member.avatar}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Tooltip>
                            );
                        })}
                </Avatar.Group>
            </div>
            <span className="projectDetail__header-text">Only My Issues</span>
            <span className="projectDetail__header-text">Recently Updated</span>
        </>
    );
}

export default ProjectDetailHeader;
