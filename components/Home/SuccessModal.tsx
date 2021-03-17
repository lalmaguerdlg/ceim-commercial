import React, { FC } from 'react';

export interface SuccesModalProps { };

export const SuccesModal : FC<SuccesModalProps> = ({ children }) => {
    return (
        <div id="success" className="modal modal-message fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="ti-close"></i>
                        </button>
                        <h2>¡Gracias!</h2>
                        <p>Tu mensaje ha sido enviado correctamente</p>
                        <p>Nos pondremos en contacto contigo</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SuccesModal;