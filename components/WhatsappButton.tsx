import React, { FC } from 'react';
import { useComponentClases } from './util/hooks';

const WAPP_URL = `https://wa.me/${process.env.NEXT_PUBLIC_WAPP_CONTACT_PHONE}?text=`;

export interface WhatsappButtonProps {
    message : string
    className ?: string
};
export const WhatsappButton : FC<WhatsappButtonProps> = ({ message, className }) => {

    const componentClases = useComponentClases(['wapp-button wapp-redirect', className]);
    const href = WAPP_URL + message;

    return (
        <a href={href} className={componentClases}>
          <i className="fab fa-whatsapp"></i>
        </a>
    );
}

export default WhatsappButton;