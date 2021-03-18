import React, { FC, MouseEventHandler } from 'react';
import { getComponentClases, useComponentClases } from '../util/utils';

export interface UnderlayProps { 
    onClick ?: MouseEventHandler<HTMLElement>
    backdrop : boolean
};

export const Underlay : FC<UnderlayProps> = ({ children, onClick, backdrop = false }) => {
    const clases = useComponentClases([
        'underlay', { backdrop }
    ], [backdrop]);

    return (
        <div className={clases} onClick={onClick}>
            { children }
        </div>
    );
}

export default Underlay;