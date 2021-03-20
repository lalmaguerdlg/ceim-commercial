import React, { FC, MouseEvent } from 'react';
import { useComponentClases, useFilterSlots, useSlot } from '../util/hooks';
import { createUUID } from '../util/utils';
import Overlay from './Overlay';
import Underlay from './Underlay';

import ReactModal from 'react-modal';

function ModalHeader({ children, closeButton = true, onRequestClose }) {

    const showHeader = !!children || closeButton;

    const content = showHeader ? (
        <div className="modal__header">
            <div className="modal__header_content">
                { children }
            </div>
            { closeButton ? (
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onRequestClose}>
                    <i className="ti-close"></i>
                </button>
            ) : null }
        </div>
    ) : null;

    return content;
}

function ModalBody ({ children }) {
    return (
        <div className="modal__body">
            {children}
        </div>
    )
}

function ModalFooter ({ children }) {
    const content = children ? (
        <div className="modal__footer">
            {children}
        </div>
    ) : null;
    return content;
}

export interface ModalProps { 
    isOpen : boolean
    onRequestClose ?: () => void;
    backdrop ?: boolean
    closeButton ?: boolean
    className ?: string
};
export const Modal : FC<ModalProps> = ({ className = '', isOpen = false, onRequestClose, backdrop = false, closeButton = true, children }) => {
    const headerSlot = useSlot('header', children);
    const bodySlot = useFilterSlots(children);
    const footerSlot = useSlot('footer', children);

    const componentClases = useComponentClases(['ceim-modal', className], [className]);

    const overlayClases = useComponentClases([
        'ceim-overlay', { backdrop }, 'blur'
    ], [backdrop]);

    return (
        <ReactModal 
            isOpen={isOpen}
            className={componentClases}
            overlayClassName={overlayClases}
            onRequestClose={onRequestClose}>
            <div className="modal__content">
                <ModalHeader closeButton={closeButton} onRequestClose={onRequestClose}>
                    {headerSlot}
                </ModalHeader>
                
                <ModalBody>
                    {bodySlot}
                </ModalBody>

                <ModalFooter>
                    {footerSlot}
                </ModalFooter>
            </div>
        </ReactModal>
    );
}

export default Modal;