import React, { memo } from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/reducer/modalAdjustSlice';
import { getViewPort, getVisibleModal } from '../../redux/selectors';

function LayoutModal({ children }) {
    const { visible } = useSelector(getVisibleModal);
    const dispatch = useDispatch();
    const onClose = () => {
        dispatch(closeModal());
    };
    const viewPort = useSelector(getViewPort);
    const { width, height } = viewPort.data;
    return (
        <>
            <Drawer
                onClose={onClose}
                width={width <= 1023 ? '100%' : '720px'}
                visible={visible} //Visible get from store will set here
                bodyStyle={{
                    paddingBottom: 80,
                }}
                style={{ zIndex: 100 }}
            >
                {children}
            </Drawer>
        </>
    );
}

export default memo(LayoutModal);
