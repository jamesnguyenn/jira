import React, { memo, useEffect, useRef, useState } from 'react';
import {
  SearchOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Space,
  Table,
  Tag,
  Modal,
  Col,
  Drawer,
  Form,
  Row,
  Select,
  Input,
  DatePicker,
} from 'antd';
import Highlighter from 'react-highlight-words';
import {
  deleteUserManageAction,
  getAllUserAction,
} from '../../redux/thunk';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllUserManagement,
  getVisibleModal,
} from '../../redux/selectors';
import { http } from '../../axios';
import { getAllUsersManagement } from '../../axios/apiURL';
import { openModal } from '../../redux/reducer/modalAdjustSlice';
const { confirm } = Modal;
const { Option } = Select;

function FormUseEditManagement({
  modal,
  closeModal,
  name,
  phoneNumber,
  email,
  submitInfo,
}) {
  return (
    <Modal
      okText="Submit"
      visible={modal}
      title="Edit User Information"
      centered
      onOk={() => submitInfo}
      onCancel={() => closeModal(false)}
    >
      <Form layout="vertical" hideRequiredMark>
        <Col>
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter user name',
              },
            ]}
          >
            <Input
              value={name}
              placeholder="Please enter your name"
            />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: 'Please enter email',
              },
            ]}
          >
            <Input
              value={email}
              placeholder="Please enter your email"
            />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please enter your phone number',
              },
            ]}
          >
            <Input
              value={phoneNumber}
              placeholder="Please enter your phone number"
            />
          </Form.Item>
        </Col>
      </Form>
    </Modal>
  );
}

export default memo(FormUseEditManagement);
