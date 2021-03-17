import Head from 'next/head';
import React from 'react';

import dynamic from 'next/dynamic';
import Page from '../components/Page';
import type { FeaturedCourse } from '../components/Home/HomeCarousel';
import RegistrationForm from '../components/Home/RegistrationForm';
import OverlayRenderer from '../components/Overlay/OverlayRenderer';

const ClientHomeCarousel = dynamic(
  () => import('../components/Home/HomeCarousel'),
  { ssr: false },
);

function HomeBanner() {
  return (
    <section className="home_banner_area">
      <div className="banner_inner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner_content text-center">
                <p className="">
                  Centro de Estudios Intensivos Monterrey
                </p>
                <h2 className="mt-4 mb-5">
                  Educación y Cursos para tu crecimiento
                </h2>
                <div className="banner_actions">
                  <a href="#learn_more" className="primary-btn2 mb-3 mb-sm-0">Conoce más</a>
                  <a href="contact.html" className="primary-btn ml-sm-3 mb-3 mb-sm-0 ml-0">Contactanos</a>
                  <a href="#" className="tertiary-btn icon-btn wapp-button ml-sm-3 ml-0 wapp-redirect" wapp-text="Buen día, me interesa conocer más sobre los cursos">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureSection() {
  return (
    <section id="learn_more" className="feature_area section_gap_top">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="main_title">
              <h2 className="mb-3">Alcanza tus metas</h2>
              <p>
                Educación de calidad a tu alcance
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="single_feature">
              <div className="icon"><span className="flaticon-student"></span></div>
              <div className="desc">
                <h4 className="mt-3 mb-2">Prepara tu siguiente profesión</h4>
                <p>
                  Aprende lo indispensable para tu siguientes pasos
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="single_feature">
              <div className="icon"><span className="flaticon-book"></span></div>
              <div className="desc">
                <h4 className="mt-3 mb-2">Domina nuevas habilidades</h4>
                <p>
                  Completa tus herramientas para tu futuro.
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <div className="single_feature">
              <div className="icon"><span className="flaticon-earth"></span></div>
              <div className="desc">
                <h4 className="mt-3 mb-2">Amplio campo laboral</h4>
                <p>
                  Educación garantizada para el mundo laboral.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionSplitter() {
  return (
    <div className="section-splitter">
      <hr/>
    </div>
  )
}

interface PopularCoursesSectionProps {
  courses: FeaturedCourse[]
}
function PopularCoursesSection({ courses = [] } : PopularCoursesSectionProps) {
  return (
    <div className="popular_courses section_gap_top">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-5">
            <div className="main_title">
              <h2 className="mb-3">Nuestros Cursos</h2>
              <p>
                Nunca es tarde para aprender algo nuevo
              </p>
            </div>
          </div>
        </div>
        
        <div className="row">
          <div className="col-lg-12">
            <ClientHomeCarousel courses={courses}></ClientHomeCarousel>
          </div>
        </div>

        <div className="row">
          {/* <!-- single course --> */}
          <div className="col-lg-12">
            {/* <!-- <div className="owl-carousel active_course"> --> */}
            <div className="owl-carousel active_course">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RegistrationSection() {
  return (
    <div className="section_gap registration_area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="row clock_sec clockdiv" id="clockdiv">
              <div className="col-lg-12">
                <h1 className="mb-3">Solicitar más información</h1>
                <p>
                  Estamos a tu disposición para resolver cualquier duda.
                </p>
                <p>
                  No esperes más y empieza ahora.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1">
            <RegistrationForm/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {

  const featuredCourses : FeaturedCourse[] = [
    { 
      category: 'Tecnología',
      name: 'Computación',
      description: "One make creegggpeth magggn bearing their one firmament won't fowl meat over sea",
      thumbnail: 'img/courses/c1.jpg',
    },
    { 
      category: 'Pedagogía',
      name: 'Licenciatura en Educación Preescolar',
      description: 'Préparate como profesionista con el compromiso de enseñanza a la población infantil.',
      thumbnail: 'img/courses/c2.jpg',
    },
    { 
      category: 'Administración',
      name: 'Secretariado Ejecutivo Bilingüe',
      description: 'Formamos profesionistas de la asistencia, el auxilio y la colaboración administrativa a nivel ejecutivo',
      thumbnail: 'img/courses/c3.jpg',
    },
  ]

  return (
    <Page theme="dark">
      
      <HomeBanner/>

      <FeatureSection/>

      <SectionSplitter/>

      <PopularCoursesSection courses={featuredCourses} />

      <RegistrationSection />

      <nav className="floating-button">
        <a href="#" className="tertiary-btn icon-btn wapp-button ml-sm-3 ml-0 wapp-redirect" wapp-text="Buen día, me interesa conocer más sobre los cursos">
          <i className="fab fa-whatsapp"></i>
        </a>
      </nav>

    </Page>
  )
}
