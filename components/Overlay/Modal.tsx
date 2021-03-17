import React, { FC } from 'react';
import { getSlotFromChildren, filterSlotsFromChildren } from '../util/utils';
import Overlay from './Overlay';
import Underlay from './Underlay';

export interface ModalProps { 
    isOpen : boolean
    onRequestClose ?: () => void;
};

export const Modal : FC<ModalProps> = ({ isOpen = false, onRequestClose, children }) => {

    const headerSlot = getSlotFromChildren('header', children);
    const bodySlot = filterSlotsFromChildren(children);
    const footerSlot = getSlotFromChildren('footer', children);

    return (
        <Overlay shouldDisplay={isOpen}>
            <Underlay onClick={onRequestClose}>
                <div className="ceim-modal">
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