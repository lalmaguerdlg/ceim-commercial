import React, { FC, useState } from 'react';
import Modal, { ModalProps } from '../Overlay/Modal';
import { createUUID } from '../util/utils';

export interface SuccesModalProps extends ModalProps { };
export const SuccesModal : FC<SuccesModalProps> = ({ isOpen, onRequestClose }) => {

    const [count, setCount] = useState(0);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            backdrop
            className="">
            <slot name="header">
                <h2>¡Gracias!</h2>
            </slot>
            
            <p>Tu mensaje ha sido enviado correctamente</p>
            <p>Nos pondremos en contacto contigo</p>

            <slot name="footer">
                <button onClick={() => setCount(c => c + 1)}>Increment</button>
                <h2>{count}</h2>
            </slot>
        </Modal>
    );
}

export default SuccesModal;