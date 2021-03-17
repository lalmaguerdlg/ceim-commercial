import React, { FC, useEffect } from 'react';
import Modal from 'react-modal';

export interface OverlayRendererProps { };


Modal.setAppElement('#overlay-renderer');

export const OverlayRenderer : FC<OverlayRendererProps> = ({ children }) => {
    return (
        <div id="overlay-renderer"></div>
    );
}

export default OverlayRenderer;