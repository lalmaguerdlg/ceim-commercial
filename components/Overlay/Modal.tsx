import React, { FC, MouseEvent } from 'react';
import { getSlotFromChildren, filterSlotsFromChildren } from '../util/utils';
import Overlay from './Overlay';
import Underlay from './Underlay';

export interface ModalProps { 
    isOpen : boolean
    onRequestClose ?: () => void;
    backdrop ?: boolean
};

export const Modal : FC<ModalProps> = ({ isOpen = false, onRequestClose, backdrop = false, children }) => {

    const headerSlot = getSlotFromChildren('header', children);
    const bodySlot = filterSlotsFromChildren(children);
    const footerSlot = getSlotFromChildren('footer', children);

    const handleModalClick = (e : MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    }

    return (
        <Overlay shouldDisplay={isOpen}>
            <Underlay onClick={onRequestClose} backdrop={backdrop}>
                <div className="ceim-modal" onClick={handleModalClick}>
                    <div className="modal__content">
                        <div className="modal__header">
                            {headerSlot}
                        </div>
                        <div className="modal__body">
                            {bodySlot}
                        </div>
                        <div className="modal__footer">
                            {footerSlot}
                        </div>
                    </div>
                </div>
            </Underlay>
        </Overlay>     
    );
}

export default Modal;