import Link from 'next/link';
import React, { FC } from 'react';
import { Banner, BannerTitle } from '../components/Banner';
import Page from '../components/Page';

function FeatureItem({ heading, content, icon }) {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="single_feature">
                <div className="icon"><span className={`flaticon-${icon}`}></span></div>
                <div className="desc">
                    <h4 className="mt-3 mb-2">{heading}</h4>
                    <p>
                        {content}
                    </p>
                </div>
            </div>
        </div>
    )
}

function FeatureArea() {
    return (
        <section className="feature_area section_gap_top title-bg">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="main_title">
                            <h2 className="mb-3 text-white">Alcanza tus metas</h2>
                            <p>
                                Educación de calidad a tu alcance
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <FeatureItem 
                        icon="student" 
                        heading="Prepara tu siguiente profesión" 
                        content="Prepara tu siguiente profesión"/>
                    <FeatureItem 
                        icon="book" 
                        heading="Domina nuevas habilidades" 
                        content="Completa tus herramientas para tu futuro."/>
                    <FeatureItem 
                        icon="student" 
                        heading="Amplio campo laboral" 
                        content="Educación garantizada para el mundo laboral."/>
                </div>
            </div>
        </section>
    )
}


export interface AboutUsProps { };
export const AboutUs : FC<AboutUsProps> = ({ children }) => {
    return (
        <Page theme="light">
            <Banner>
                <BannerTitle>
                    Nosotros
                </BannerTitle>
                <slot name="links">
                    <Link href='/'>
                        <a>Inicio</a>
                    </Link>
                    <Link href='/about-us'>
                        <a>Nosotros</a>
                    </Link>
                </slot>
            </Banner>

            <section className="about_area section_gap">
                <div className="container">
                    <div className="row h_blog_item">
                        <div className="col-lg-6">
                            <div className="h_blog_img">
                                <img className="img-fluid" src="img/about.png" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="h_blog_text">
                                <div className="h_blog_text_inner left right">
                                    <h4>Bienvenidos a nuestro centro de estudios</h4>
                                    <p>
                                        Subdue whales void god which living don't midst lesser
                                        yielding over lights whose. Cattle greater brought sixth fly
                                        den dry good tree isn't seed stars were.
                                    </p>
                                    <p>
                                        Subdue whales void god which living don't midst lesser yieldi
                                        over lights whose. Cattle greater brought sixth fly den dry
                                        good tree isn't seed stars were the boring.
                                    </p>
                                    <Link href="/contact">
                                        <a className="primary-btn">
                                            Contactanos <i className="ti-arrow-right ml-1"></i>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <FeatureArea/>
        </Page>
    )
}

export default AboutUs;