import React, { FC } from 'react';

export interface ErrorModalProps { };

export const ErrorModal : FC<ErrorModalProps> = ({ children }) => {
    return (
        <div id="error" className="modal modal-message fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="ti-close"></i>
                        </button>
                        <h2>Una disculpa</h2>
                        <p>Algo ha salido mal.</p>
                        <p>Por favor, vuelve a intenarlo más tarde</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ErrorModal;