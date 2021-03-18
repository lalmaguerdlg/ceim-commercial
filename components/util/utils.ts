import { ReactNode, useMemo } from "react";

export function isClientSide() {
    return typeof window !== 'undefined';
}

export function isServerSide() {
    return typeof window === 'undefined';
}

export function extractFromSlot( slot : any ) : ReactNode {
    let result = null;
    if (!slot?.props?.children) { return null }

    if (Array.isArray(slot.props.children) || (typeof slot.props.children === 'object')) {
        result = slot.props.children
    }
    else if(typeof slot.props.children === 'string'){
        result = slot.props.children;
    }
    return result;
}

export function getSlotFromChildren( slot : string, children : any) : ReactNode {
    let result = null;

    if (!children) {
        return children;
    }

    if (Array.isArray(children)) {
        const filtered = children.filter((node : any) => node?.type === 'slot' && node?.props?.name === slot);
        if (filtered.length > 1) {
            result = filtered;
            console.warn(`There is more than one slot with the name ${slot}`)
        }
        else {
            result = extractFromSlot(filtered[0]);
        }
    } 
    else if (typeof children === 'object') {
        if(children.props?.slot === slot) {
            result = children;
        }
    }

    return result;
}

export function filterSlotsFromChildren( children : any ) : ReactNode {
    let result = null;

    if (!children) {
        return children;
    }

    if (Array.isArray(children)) {
        result = children.filter((node : any) => node?.type !== 'slot');
    } 
    else if (typeof children === 'object') {
        if(!children.props?.slot) {
            result = children;
        }
    }
    else {
        result = children;
    }

    return result;
}


export type ComponentClass = string | { [key:string] : boolean }
export function getComponentClases(clases : ComponentClass[]) : string {
    
    const result = clases.map((current) => {
        let result = '';
        if ( typeof current === 'object' ) {
            result = Object.keys(current)
                .filter((key) => current[key])
                .join(' ');
        }
        else {
            result = current
        }
        return result;
    }).join(' ');

    return result;
}

export function useComponentClases(clases : ComponentClass[], dependencies ?: any[]) {
    return useMemo(() => getComponentClases(clases), dependencies);
}