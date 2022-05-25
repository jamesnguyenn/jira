import React, { memo } from 'react';

function Select({ register, registerName, id, name, children }) {
    return (
        <div className="selectCategory">
            <select
                className="selectCategory__select"
                name={name}
                id={id}
                {...register(registerName)}
            >
                {children}
            </select>
        </div>
    );
}

export default memo(Select);
