import React, { memo } from 'react';
import { Result } from 'antd';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();
    return (
        <section
            style={{
                width: '100%',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                    <span
                        className="btn btn-primary"
                        onClick={() => navigate('/')}
                    >
                        Back Home
                    </span>
                }
            />
        </section>
    );
}

export default memo(NotFoundPage);
