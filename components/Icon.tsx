import React from 'react';

type IconProps = {
    className?: string,
    icon: string,
}

function Icon({ className = "", icon }: IconProps) {
    return (
        <i className={`fab fa-${icon} ${className}`}></i>
    )
}

export default Icon;