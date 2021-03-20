import { ReactNode, useMemo } from "react";

export function isClientSide() {
    return typeof window !== 'undefined';
}

export function isServerSide() {
    return typeof window === 'undefined';
}

export function extractChildren( node : any ) : ReactNode {
    let result = null;
    if (!node?.props?.children) { return null }

    if (Array.isArray(node.props.children) || (typeof node.props.children === 'object')) {
        result = node.props.children
    }
    else if(typeof node.props.children === 'string'){
        result = node.props.children;
    }
    return result;
}

export function getSlot(slot : string, children : any) : ReactNode {
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
            result = extractChildren(filtered[0]);
        }
    } 
    else if (typeof children === 'object') {
        if(children.props?.slot === slot) {
            result = children;
        }
    }

    return result;
}

export function filterSlots( children : any ) : ReactNode {
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
    
    const result = clases
        .filter((c) => c !== '')
        .map((current) => {
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

export function createUUID() : string {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}