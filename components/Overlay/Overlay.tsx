import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { isServerSide } from '../util/utils';

export interface OverlayProps { 
    shouldDisplay : boolean
};

export const Overlay : FC<OverlayProps> = ({ shouldDisplay = false, children }) => {
    if ( isServerSide() ) {
        throw new Error('Overlay does not currently supports SSR');
    }

    const parent = document.getElementById("overlay-renderer");
    if(!parent) {
        throw new Error('There is no OverlayRenderer in the app.');
    }

    const content = shouldDisplay ? (
        <div className="ceim-overlay">
            {children}
        </div>
    ) : null;

    return ReactDOM.createPortal(content, parent);
}

export default Overlay;