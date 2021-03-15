import React, { FC } from 'react';

export interface RegistrationFormProps { };

export const RegistrationForm : FC<RegistrationFormProps> = ({ children }) => {

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e);
    }

    return (
        <div className="register_form">
            <h3 className="mb-3">Solicita información</h3>
            <form className="form_area" id="contactForm" method="POST" onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-lg-12 form_group">
                    <input
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        type="text"
                        required
                    />
                    <input
                        id="phone"
                        name="phone"
                        placeholder="Teléfono (opcional)"
                        type="tel"
                    />
                    <input
                        id="email"
                        name="email"
                        placeholder="Correo electrónico"
                        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                        type="email"
                        required
                    />
                    </div>
                    <div className="col-lg-12 text-center">
                    <button id="submitContact" className="primary-btn">Envíar</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;