import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useScrollOffset } from './util/hooks';
import type { PageTheme } from './Page';


interface NavbarRoute {
    route: string 
    label: string
}

const NavbarLink : FC<NavbarRoute> = ({ route, label }) => {
    const router = useRouter();
    const activeClass = route === router.route ? 'active' : '';

    return (
        <li className={`nav-item ${activeClass}`}>
            <Link href={route}>
                <a className="nav-link">{label}</a>
            </Link>
        </li>
    )
} 

export interface NavbarListProps { 
    routes: NavbarRoute[]
};
const NavbarList : FC<NavbarListProps> = ({ routes = [] }) => {
    return (
        <div className="collapse navbar-collapse offset" id="navbarSupportedContent">
            <ul className="nav navbar-nav menu_nav ml-auto">
                { routes.map((route, i) => (
                    <NavbarLink key={i} route={route.route} label={route.label}/>
                ))}
            </ul>
        </div>
    )
}

export interface NavbarProps { 
    routes: NavbarRoute[]
    theme?: PageTheme
};
export const Navbar : FC<NavbarProps> = ({ routes = [], theme = 'light' }) => {
    const headerRef = useRef(null);
    const [headerOffset, setHeaderOffset] = useState(50);
    const scrollY = useScrollOffset();
    
    useEffect(() => {
        setHeaderOffset(headerRef?.current?.clientHeight + 50);
    }, [headerRef.current]);

    const isSticky = useMemo(() => scrollY >= headerOffset, [headerOffset, scrollY]);

    const renderRoutes = useMemo(() => <NavbarList routes={routes}/>, [routes]);

    return (
        <header className={`header_area ${isSticky ? 'navbar_fixed' : ''}`}>
            <div ref={headerRef} className="main_menu">
                <nav className={`navbar navbar-expand-lg navbar-${theme}`}>
                    <div className="container">
                        {/* <!-- Brand and toggle get grouped for better mobile display --> */}
                        <Link href="/">
                            <a className="navbar-brand logo_h">
                                <h2> <span className="logo-highlight">CE</span>IM </h2>
                            </a>
                        </Link>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="icon-bar"></span> <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
                        {renderRoutes}
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar;