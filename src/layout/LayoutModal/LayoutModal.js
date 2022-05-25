import React, { useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from 'antd';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  openModal,
  getProjectDetailModal,
} from '../../redux/reducer/modalAdjustSlice';
import ReactQuill from 'react-quill';
import { getProjectDetail } from '../../redux/selectors';
import { getProjectDetailThunk } from '../../redux/thunk';
const { Option } = Select;

export default function LayoutModal({ children }) {
  const { visible } = useSelector((state) => state.modalAdjust);
  const { data } = useSelector(getProjectDetail);
  const dispatch = useDispatch();
  const showDrawer = () => {
    dispatch(openModal());
  };

  const onClose = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <Drawer
        onClose={onClose}
        width={720}
        visible={visible} //Visible get from store will set here
        bodyStyle={{
          paddingBottom: 80,
        }}
      >
        {children}
      </Drawer>
    </>
  );
}
