import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { http } from '../../axios';
import { createProject } from '../../axios/apiURL';

import FormCreateEditProject from '../../component/FormCreateEditProject';

function CreateProject() {
    const navigate = useNavigate();

    const onSubmit = useCallback(
        async (data, description) => {
            try {
                const { projectName, categoryId } = data;
                const dataSubmit = {
                    projectName,
                    description,
                    categoryId: Number(categoryId),
                    alias: '',
                };
                const response = await http.post(createProject, dataSubmit);
                toast.success('Create Project Successfully');
                navigate('/');
            } catch (e) {
                if (e.code === 'ERR_NETWORK') {
                    toast.error(
                        'Error while creating project. Please try again later'
                    );
                } else {
                    toast.error(e.response.data.content);
                }
            }
        },
        [navigate]
    );

    return (
        <FormCreateEditProject
            title="Create New Project"
            onSubmiting={onSubmit}
        ></FormCreateEditProject>
    );
}

export default CreateProject;
