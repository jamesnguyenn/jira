import React, { memo, useState } from 'react';
import { Modal, Button } from 'antd';

function LayoutModalPopUp({ title, visible, setVisible, children }) {
    return (
        <>
            <Modal
                title={title}
                centered
                visible={visible}
                onCancel={() => setVisible(false)}
                width={1100}
                cancelButtonProps={{ style: { display: 'none' } }}
                okButtonProps={{ style: { display: 'none' } }}
                footer={null}
            >
                {children}
            </Modal>
        </>
    );
}

export default memo(LayoutModalPopUp);
