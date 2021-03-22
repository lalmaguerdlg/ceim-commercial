import React, { FC, useMemo } from 'react';
import { useComponentClases, useScrollOffset } from './util/hooks';

const DEFAULT_OFFSET_Y = 310

export interface FloatingButtonProps { 
    offsetY ?: number
    alwaysVisible ?: boolean
};
export const FloatingButton : FC<FloatingButtonProps> = ({ offsetY = DEFAULT_OFFSET_Y, alwaysVisible = false,  children }) => {
    const scrollY = useScrollOffset();

    const isVisible = useMemo(() => scrollY >= offsetY || alwaysVisible, [scrollY, alwaysVisible]);

    const clases = useComponentClases([
        'floating-button', 
        { 'visible' : isVisible }
    ], [isVisible]);

    return (
        <nav className={clases}>
            {children}
        </nav>
    );
}

export default FloatingButton;


// function floatingButton() {
//     if ($(".floating-button").length) {
//       $(window).scroll(function() {
//         var scroll = $(window).scrollTop();
//         if (scroll >= nav_offset_top) {
//           $(".floating-button").addClass("visible");
//         } else {
//           $(".floating-button").removeClass("visible");
//         }
//       });
//     }
//   }
//   floatingButton();
