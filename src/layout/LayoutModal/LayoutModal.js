import React, { memo, useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  closeModal,
  openModal,
} from '../../redux/reducer/modalAdjustSlice';
import { getProjectDetail } from '../../redux/selectors';

function LayoutModal({ children }) {
  const { visible } = useSelector((state) => state.modalAdjust);
  const dispatch = useDispatch();

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

export default memo(LayoutModal);
