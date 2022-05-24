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

export default function ModalAdjust(props) {
  const { visible } = useSelector((state) => state.modalAdjust);
  const { data } = useSelector(getProjectDetail);
  console.log('data', data);
  const dispatch = useDispatch();
  console.log('visible', visible);

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
        visible={visible} //Visible get from store will set in here
        bodyStyle={{
          paddingBottom: 80,
        }}
        footer={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={onClose}
              type="submit"
              className="bg-primary text-white"
            >
              Submit
            </Button>
          </Space>
        }
      >
        <Form>
          <section className="createProject">
            <h2>Adjust Information</h2>
            <form>
              <div className="text-field">
                <label htmlFor="name">Project Name</label>
                <input
                  name="projectName"
                  autoComplete="off"
                  type="text"
                  id="name"
                  placeholder="Enter project name..."
                  className="p-4"
                />
              </div>
              <div className="textEditor">Description</div>
              <ReactQuill theme="snow" style={{ height: 300 }} />
              <div className="projectCategory">
                <select
                  className="projectCategory__select mt-5"
                  name="projectCategory"
                  id="projectCategory"
                ></select>
              </div>
            </form>
          </section>
        </Form>
      </Drawer>
    </>
  );
}
