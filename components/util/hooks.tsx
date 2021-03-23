import { ReactNode, useEffect, useMemo, useState } from "react";
import throttle from 'lodash.throttle';
import { ComponentClass, filterSlots, getComponentClases, getSlot, isClientSide, isServerSide } from "./utils";

type Breakpoint = 'sm' | 'md' | 'lg';

export function getDeviceBreakpoint(width) : Breakpoint {
    if (width < 768) {
        return 'sm';
    } else if (width >= 768 && width < 1200) {
        return 'md';
    } else if (width >= 1200) {
        return 'lg';
    }
}

export function useBreakpoint() : Breakpoint {
    if (isServerSide()) {
        console.warn('useBreakpoint is not supported with SSR');
    }

    const [breakpoint, setBreakpoint] = useState(getDeviceBreakpoint(isClientSide() ? window.innerWidth : 0));

    useEffect(() => {
        const handleResize = throttle(() => {
            setBreakpoint(getDeviceBreakpoint(window.innerWidth));
        }, 200);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return breakpoint;
}

export function useScrollOffset() : number {
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = throttle(() => {
            setOffsetY(window.scrollY);
        }, 200);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return offsetY;
}

export function useComponentClases(clases : ComponentClass[], dependencies ?: any[]) {
    return useMemo(() => getComponentClases(clases), dependencies);
}

export function useSlot(slot : string, children : ReactNode) {
    return useMemo(() => getSlot(slot, children), [slot, children]);
}

export function useFilterSlots(children : ReactNode) {
    return useMemo(() => filterSlots(children), [children]);
}