<<<<<<< HEAD
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
=======
import React, { memo } from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/reducer/modalAdjustSlice';
import { getVisibleModal } from '../../redux/selectors';

function LayoutModal({ children }) {
    const { visible } = useSelector(getVisibleModal);
>>>>>>> 7fb56e41e325dfad5d0db7eced11ecd9f57f1a70

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
