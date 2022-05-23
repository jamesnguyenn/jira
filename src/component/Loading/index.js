import React, { memo } from 'react';

function Loading({ color = '#fff' }) {
    return (
        <div
            className="spinning"
            style={{ borderColor: color, borderLeftColor: 'transparent' }}
        ></div>
    );
}

export default memo(Loading);
