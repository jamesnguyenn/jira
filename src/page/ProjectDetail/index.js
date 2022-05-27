import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getProjectDetailThunk } from '../../redux/thunk';
import { getProjectDetail, getUserInfo } from '../../redux/selectors';
import { getProjectDetailRequest } from '../../redux/reducer/projectDetailSlice';

import ProjectDetailHeader from '../../component/ProjectDetailHeader';
import ProjectDetailBody from '../../component/ProjectDetailBody';
import Loading from '../../component/Loading';

import { Breadcrumb, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LayoutModal from '../../layout/LayoutModal/LayoutModal';
import { openModal } from '../../redux/reducer/modalAdjustSlice';
import FormCreateEditTask from '../../component/FormCreateEditTask';

function ProjectDetail() {
    const [isMemberInProject, setIsMemberInProject] = useState(false);
    const { id: userId } = useSelector(getUserInfo);
    const { id: projectId } = useParams();
    const dispatch = useDispatch();
    const projectDetail = useSelector(getProjectDetail);
    const { data, isLoading } = projectDetail;

    const {
        projectName,
        description,
        id,
        creator,
        lstTask,
        projectCategory,
        alias,
        members,
    } = data;

    //Load Api Project Detail
    useEffect(() => {
        dispatch(getProjectDetailRequest());
        const getProjectDetail = getProjectDetailThunk(projectId);
        dispatch(getProjectDetail);
    }, [dispatch, projectId]);

    //Check member is logged in belonging to projectDetail or not
    useEffect(() => {
        if (members || creator) {
            const allMemberInProject = [
                ...members.map((member) => member.userId),
                creator.id,
            ];
            setIsMemberInProject(
                Boolean(allMemberInProject.find((item) => item === userId))
            );
        }
    }, [creator, members, userId]);

    //Open Layout Modal to add Task
    const handleOpenLayoutModal = () => {
        dispatch(openModal());
    };

    return (
        <>
            <section className="projectDetail">
                {/* NavLink */}
                <div className="projectDetail__breadCrumb">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <NavLink to="/">Project Management</NavLink>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            {id
                                ? `Project ${projectName}`
                                : 'Project Not Found'}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>

                {/* Project Detail */}
                {isLoading ? (
                    <Loading color="#000" />
                ) : (
                    <>
                        <h2>
                            {id
                                ? `Project ${projectName}`
                                : 'Project Not Found'}
                        </h2>
                        <div className="projectDetail__header">
                            <ProjectDetailHeader
                                listMember={members}
                                id={id}
                                isMemberInProject={isMemberInProject}
                                creator={creator}
                            />
                        </div>
                        <div className="projectDetail__body">
                            <ProjectDetailBody lstTask={lstTask} />
                        </div>
                    </>
                )}

                {/* Add Task Button */}
                {creator?.id === userId && (
                    <div
                        className="projectDetail__addTaskButton"
                        onClick={handleOpenLayoutModal}
                    >
                        <Tooltip title="Create Task">
                            <Button
                                shape="circle"
                                icon={
                                    <PlusOutlined style={{ color: '#fff' }} />
                                }
                                size="large"
                                style={{
                                    backgroundColor: '#001529',
                                    border: 'none',
                                    outline: 'none',
                                }}
                            />
                        </Tooltip>
                    </div>
                )}
                <LayoutModal>
                    <FormCreateEditTask
                        projectName={projectName}
                        projectId={id}
                        title="Create Task"
                        statusDefaultValue={1}
                        priorityDefaultValue={1}
                        taskTypeDefaultValue={1}
                    />
                </LayoutModal>
            </section>
        </>
    );
}

export default ProjectDetail;
