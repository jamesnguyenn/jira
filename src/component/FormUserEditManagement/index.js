import React, { memo, useState } from 'react';

import { Modal, Col, Form, Select, Input } from 'antd';
import Highlighter from 'react-highlight-words';
import { deleteUserManageAction, getAllUserAction } from '../../redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserManagement, getVisibleModal } from '../../redux/selectors';
import { http } from '../../axios';
import { getAllUsersManagement, updateUserManage } from '../../axios/apiURL';
import { openModal } from '../../redux/reducer/modalAdjustSlice';
import { toast } from 'react-toastify';
const { confirm } = Modal;
const { Option } = Select;

function FormUseEditManagement({
    modal,
    closeModal,
    name,
    phoneNumber,
    email,
    userId,
}) {
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        id: userId,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
    });

    const handleChangeInput = (event) => {
        let { id, value } = event.target;
        setValues({
            ...values,
            [id]: value,
        });
    };

    async function submitInfo() {
        try {
            const result = await http.put(updateUserManage, values);

            console.log(result);

            const action = getAllUserAction();
            dispatch(action);

            toast.success('Update Information Successfully !', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Cannot Update Information !');
        }
    }

    return (
        <Modal
            okText="Submit"
            visible={modal}
            title="Edit User Information"
            centered
            onOk={() => {
                submitInfo();
            }}
            onCancel={() => closeModal(false)}
        >
            <Form layout="vertical" hideRequiredMark>
                <Form.Item
                    label="Name"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter user name',
                        },
                    ]}
                >
                    <Input
                        defaultValue={name}
                        value={values.name}
                        onChange={handleChangeInput}
                        id="name"
                        name="name"
                        size="large"
                        placeholder="Please enter your name"
                    />
                </Form.Item>

                <Col>
                    <Form.Item
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter email',
                            },
                        ]}
                    >
                        <Input
                            defaultValue={email}
                            value={values.email}
                            onChange={handleChangeInput}
                            id="email"
                            name="email"
                            size="large"
                            placeholder="Please enter your email"
                        />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your phone number',
                            },
                        ]}
                    >
                        <Input
                            defaultValue={phoneNumber}
                            value={values.phoneNumber}
                            onChange={handleChangeInput}
                            id="phoneNumber"
                            name="phoneNumber"
                            size="large"
                            placeholder="Please enter your phone number"
                        />
                    </Form.Item>
                </Col>
            </Form>
        </Modal>
    );
}

export default memo(FormUseEditManagement);
