import React, { memo, useState } from 'react';
import { Modal, Button } from 'antd';

function LayoutModalPopUp({ title, visible, setVisible, children }) {
    return (
        <>
            <Modal
                title={title}
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                {children}
            </Modal>
        </>
    );
}

export default memo(LayoutModalPopUp);
