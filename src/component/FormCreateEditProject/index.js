import React, { memo, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { http } from '../../axios';
import { createProject, getProjectCategory } from '../../axios/apiURL';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading';

const schemaValidations = Yup.object({
    projectName: Yup.string().required('Project name is required'),
});

function CreateProject({
    title,
    onSubmiting,
    projectName,
    desc,
    category = 0,
}) {
    const { register, formState, handleSubmit } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaValidations),
    });
    const [description, setDescription] = useState(desc || '');
    const [projectCategory, setProjectCategory] = useState([]);

    const { errors, isSubmitting } = formState;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProjectCategory = async () => {
            try {
                const response = await http.get(getProjectCategory);
                setProjectCategory(response.data.content);
            } catch (e) {
                toast.error('Cannot Load Project Categories');
            }
        };
        fetchProjectCategory();
        return () => {};
    }, []);

    return (
        <section className="createProject">
            <h2>{title}</h2>
            <form
                onSubmit={handleSubmit((data) =>
                    onSubmiting(data, description)
                )}
            >
                <div className="text-field">
                    <label htmlFor="name">Project Name</label>
                    <input
                        defaultValue={projectName || ''}
                        autoComplete="off"
                        type="text"
                        id="name"
                        placeholder="Enter project name..."
                        {...register('projectName')}
                    />
                    {errors.projectName && (
                        <span className="text-field-error">
                            {errors.projectName.message}
                        </span>
                    )}
                </div>
                <div className="textEditor">Description</div>
                <ReactQuill
                    theme="snow"
                    defaultValue={description || ''}
                    value={description}
                    onChange={setDescription}
                />
                <div className="projectCategory">
                    <select
                        className="projectCategory__select"
                        name="projectCategory"
                        id="projectCategory"
                        {...register('categoryId')}
                    >
                        {projectCategory.length > 0 &&
                            projectCategory.map((item) => {
                                if (category) {
                                    return (
                                        <option
                                            key={item.id}
                                            className="projectCategory__option"
                                            value={item.id}
                                            selected
                                        >
                                            {item.projectCategoryName}
                                        </option>
                                    );
                                }
                                return (
                                    <option
                                        key={item.id}
                                        className="projectCategory__option"
                                        value={item.id}
                                    >
                                        {item.projectCategoryName}
                                    </option>
                                );
                            })}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Loading /> : ' Create Project'}
                </button>
            </form>
        </section>
    );
}

export default memo(CreateProject);
