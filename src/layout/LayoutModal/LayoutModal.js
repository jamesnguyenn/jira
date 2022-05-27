import React, { memo } from 'react';
import { Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../redux/reducer/modalAdjustSlice';
import { getVisibleModal } from '../../redux/selectors';

function LayoutModal({ children }) {
    const { visible } = useSelector(getVisibleModal);
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
