import React, { FC, MouseEventHandler } from 'react';
import { useComponentClases } from '../util/hooks';

export interface UnderlayProps { 
    onClick ?: MouseEventHandler<HTMLElement>
    backdrop : boolean
    className ?: string
};

export const Underlay : FC<UnderlayProps> = ({ className = '', children, onClick, backdrop = false }) => {
    const clases = useComponentClases([
        className, 'underlay', { backdrop }
    ], [backdrop, className]);

    return (
        <div className={clases} onClick={onClick}>
            { children }
        </div>
    );
}

export default Underlay;