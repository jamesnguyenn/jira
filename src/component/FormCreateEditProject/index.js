import React, { memo, useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { http } from '../../axios';
import { getProjectCategory } from '../../axios/apiURL';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Loading from '../Loading';
import Input from '../../utils/Input';
import Select from '../../utils/Select';

const schemaValidations = Yup.object({
    projectName: Yup.string().required('Project name is required'),
});

function FormCreateEditProject({
    title,
    onSubmiting,
    projectName,
    desc,
    categoryID = 0,
    textButton = 'Create Project',
}) {
    const { register, formState, handleSubmit, reset } = useForm({
        mode: 'all',
        resolver: yupResolver(schemaValidations),
    });

    const [description, setDescription] = useState('');
    const [projectCategory, setProjectCategory] = useState([]);

    const { errors, isSubmitting } = formState;

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
        if (categoryID) {
            reset({ categoryId: categoryID });
        }
        return () => {};
    }, [categoryID, reset]);

    useEffect(() => {
        if (desc) {
            setDescription(desc);
        }
    }, [desc]);

    return (
        <section className="formCreateEditProject">
            <h2>{title}</h2>
            <form
                onSubmit={handleSubmit((data) =>
                    onSubmiting(data, description)
                )}
            >
                <Input
                    id="projectName"
                    type="text"
                    placeholder="Enter project name..."
                    labelName="Project Name"
                    register={register}
                    registerName="projectName"
                    errors={errors?.projectName}
                    errorsMessage={errors?.projectName?.message}
                    defaultValue={projectName}
                />
                <div className="textEditor">Description</div>

                <ReactQuill
                    theme="snow"
                    defaultValue={description || ''}
                    value={description}
                    onChange={setDescription}
                    modules={modules}
                    formats={formats}
                />
                <Select
                    register={register}
                    registerName="categoryId"
                    id="projectCategory"
                    name="projectCategory"
                >
                    {projectCategory.length > 0 &&
                        projectCategory.map((item) => {
                            return (
                                <option
                                    key={item.id}
                                    className="selectCategory__option"
                                    value={item.id}
                                >
                                    {item.projectCategoryName}
                                </option>
                            );
                        })}
                </Select>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? <Loading /> : textButton}
                </button>
            </form>
        </section>
    );
}

export default memo(FormCreateEditProject);
const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'color', 'strike'],
            ['link', 'image', 'video'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['clean'],
        ],
    },
};
const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'color',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];
