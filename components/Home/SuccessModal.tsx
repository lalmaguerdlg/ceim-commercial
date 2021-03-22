import React, { FC, useState } from 'react';
import Modal, { ModalProps } from '../Overlay/Modal';
import { createUUID } from '../util/utils';

export interface SuccesModalProps extends ModalProps { };
export const SuccesModal : FC<SuccesModalProps> = ({ isOpen, onRequestClose, children}) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            backdrop
            blur
            className="success-modal">
            <slot name="header">
                <h2>¡Gracias!</h2>
            </slot>
            
            <p>Tu mensaje ha sido enviado correctamente</p>
            <p>Nos pondremos en contacto contigo</p>
        </Modal>
    );
}

export default SuccesModal;