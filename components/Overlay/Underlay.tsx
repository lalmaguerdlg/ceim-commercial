import React, { FC, MouseEventHandler } from 'react';

export interface UnderlayProps { 
    onClick ?: MouseEventHandler<HTMLElement>
};

export const Underlay : FC<UnderlayProps> = ({ children, onClick }) => {
    return (
        <div className="underlay" onClick={onClick}>
            { children }
        </div>
    );
}

export default Underlay;