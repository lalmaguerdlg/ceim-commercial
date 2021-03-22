import React, { FC } from 'react';
import Modal, { ModalProps } from '../Overlay/Modal';

export interface ErrorModalProps extends ModalProps { };

export const ErrorModal : FC<ErrorModalProps> = ({ isOpen, onRequestClose, children }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            backdrop
            blur
            className="error-modal">
            <slot name="header">
                <h2>Una disculpa</h2>
            </slot>
            
            <p>Algo ha salido mal.</p>
            <p>Por favor, vuelve a intenarlo más tarde</p>

        </Modal>
    );
}

export default ErrorModal;