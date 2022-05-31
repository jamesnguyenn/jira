import React, { memo, useState } from 'react';
import { Modal, Col, Form, Input } from 'antd';
import { getAllUserAction } from '../../redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/selectors';
import { ACCESSTOKEN, http } from '../../axios';
import { updateUserManage } from '../../axios/apiURL';
import { toast } from 'react-toastify';
import { logOut } from '../../redux/reducer/userSlice';

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
        editUser_email: email,
        editUser_phoneNumber: phoneNumber,
    });

    const { id: currentUserID } = useSelector(getUserInfo);
    const handleChangeInput = (event) => {
        let { id, value } = event.target;
        setValues({
            ...values,
            [id]: value,
        });
    };

    async function submitInfo() {
        if (
            values.editUser_email
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                ) &&
            !isNaN(values.editUser_phoneNumber)
        ) {
            const {
                id,
                name,
                editUser_email: email,
                editUser_phoneNumber: phoneNumber,
            } = values;
            const newUserInfoUpdate = {
                id,
                name,
                email,
                phoneNumber,
            };
            try {
                await http.put(updateUserManage, newUserInfoUpdate);
                if (values.id === currentUserID) {
                    dispatch(logOut());
                    localStorage.removeItem(ACCESSTOKEN);
                    toast.success(
                        'Update Information Successfully!. Please help us re-login to update your information!',
                        {
                            autoClose: 2000,
                        }
                    );
                } else {
                    toast.success('Update Information Successfully !', {
                        autoClose: 1000,
                    });
                    const action = getAllUserAction();
                    dispatch(action);
                }
            } catch (error) {
                toast.error('Cannot Update Information !');
            }
        } else {
            toast.error(
                'Cannot Update Information. Your email or your phone number not valid type'
            );
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
            <Form
                name="editUser"
                layout="vertical"
                hideRequiredMark
                scrollToFirstError
                initialValues={{
                    ['email']: email,
                    ['name']: name,
                    ['phoneNumber']: phoneNumber,
                }}
            >
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
                        value={values.editUser_email}
                        onChange={handleChangeInput}
                        id="email"
                        name="email"
                        colon="yes"
                        size="large"
                        placeholder="Please enter your email"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid e-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your e-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item
                        value={values.editUser_phoneNumber}
                        onChange={handleChangeInput}
                        id="phoneNumber"
                        name="phoneNumber"
                        label="Phone Number"
                        colon="yes"
                        size="large"
                        placeholder="Please enter your phone number"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your phone number',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Form>
        </Modal>
    );
}

export default memo(FormUseEditManagement);
