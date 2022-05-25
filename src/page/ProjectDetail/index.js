import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getProjectDetailThunk } from '../../redux/thunk';
import { getProjectDetail, getUserInfo } from '../../redux/selectors';
import { getProjectDetailRequest } from '../../redux/reducer/projectDetailSlice';

import ProjectDetailHeader from '../../component/ProjectDetailHeader';
import ProjectDetailBody from '../../component/ProjectDetailBody';
import Loading from '../../component/Loading';

import { Breadcrumb } from 'antd';

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

    return (
        <>
            <section className="projectDetail">
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
            </section>
        </>
    );
}

export default ProjectDetail;
