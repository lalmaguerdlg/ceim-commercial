import React from 'react';

type IconType = 'brands' | 'solid';

interface IconProps {
    className?: string,
    icon: string,
    type?: IconType,
};

const types = {
    'brands': 'fab',
    'solid': 'fas',
} as const;

function Icon({ className = "", icon, type = 'solid' }: IconProps) {
    return (
        <i className={`${types[type]} fa-${icon} ${className}`}></i>
    )
}

export default Icon;