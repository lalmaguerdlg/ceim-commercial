import React, { FC, useState } from 'react';
import Modal, { ModalProps } from '../Overlay/Modal';

export interface SuccesModalProps extends ModalProps { };
export const SuccesModal : FC<SuccesModalProps> = ({ isOpen, onRequestClose }) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            backdrop>
            <slot name="header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onRequestClose}>
                    <i className="ti-close"></i>
                </button>
            </slot>
            
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>¡Gracias!</h2>
                        <p>Tu mensaje ha sido enviado correctamente</p>
                        <p>Nos pondremos en contacto contigo</p>
                    </div>
                </div>
            </div>
        </Modal>
        // <div id="success" className="modal modal-message fade" role="dialog">
        //     <div className="modal-dialog">
        //         <div className="modal-content">
        //             <div className="modal-header">
        //                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        //                     <i className="ti-close"></i>
        //                 </button>
        //                 <h2>¡Gracias!</h2>
        //                 <p>Tu mensaje ha sido enviado correctamente</p>
        //                 <p>Nos pondremos en contacto contigo</p>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
}

export default SuccesModal;