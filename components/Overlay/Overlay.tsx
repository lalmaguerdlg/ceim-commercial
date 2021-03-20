import React, { FC, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { createUUID, isServerSide } from '../util/utils';

export interface OverlayProps { 
    uid ?: string
    shouldDisplay : boolean
};

export const Overlay : FC<OverlayProps> = ({ uid, shouldDisplay = false, children }) => {

    const uniqueId = useMemo(() => uid ?? createUUID(), []);

    if ( isServerSide() ) {
        throw new Error('Overlay does not currently supports SSR');
    }

    const parent = document.getElementById("overlay-renderer");
    if(!parent) {
        throw new Error('There is no OverlayRenderer in the app.');
    }

    const content = shouldDisplay ? (
        <div key={uniqueId} uid={uniqueId} className="ceim-overlay">
            {children}
        </div>
    ) : null;

    return ReactDOM.createPortal(content, parent);
}

export default Overlay;