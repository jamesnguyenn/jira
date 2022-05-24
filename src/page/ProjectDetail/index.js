import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import { getProjectDetailThunk } from '../../redux/thunk';
import { getProjectDetail } from '../../redux/selectors';
import { getProjectDetailRequest } from '../../redux/reducer/projectDetailSlice';

import ProjectDetailHeader from '../../component/ProjectDetailHeader';
import ProjectDetailBody from '../../component/ProjectDetailBody';
import Loading from '../../component/Loading';

import { Breadcrumb } from 'antd';

function ProjectDetail() {
    const { id: projectId } = useParams();
    const projectDetail = useSelector(getProjectDetail);
    const { data, isLoading } = projectDetail;
    console.log('🚀 ~ data', data);
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProjectDetailRequest());
        const getProjectDetail = getProjectDetailThunk(projectId);
        dispatch(getProjectDetail);
    }, [dispatch, projectId]);

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
                            <ProjectDetailHeader listMember={members} id={id} />
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
