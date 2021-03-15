import Head from 'next/head';
import React from 'react';

import dynamic from 'next/dynamic';
import Page from '../components/Page';
import type { FeaturedCourse } from '../components/Home/HomeCarousel';
import Navbar from '../components/Navbar';

const ClientHomeCarousel = dynamic(
  () => import('../components/Home/HomeCarousel'),
  { ssr: false },
);

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
      {/*<!--================ End Header Menu Area =================--> */}

      {/* <!--================ Start Home Banner Area =================--> */}
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
                    {/* <!-- Centro de Estudios Intensivos Monterrey --> */}
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
      {/* <!--================ End Home Banner Area =================--> */}

      {/* <!--================ Start Feature Area =================--> */}
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
      {/* <!--================ End Feature Area =================--> */}

      <div className="section-splitter">
        <hr/>
      </div>

      {/* <!--================ Start Popular Courses Area =================--> */}
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
              <ClientHomeCarousel courses={featuredCourses}></ClientHomeCarousel>
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
      {/* <!--================ End Popular Courses Area =================--> */}

      {/* <!--================ Start Registration Area =================--> */}
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
              <div className="register_form">
                <h3 className="mb-3">Solicita información</h3>
                {/* <!-- <p>It is high time for learning</p> --> */}
                <form
                  className="form_area"
                  id="contactForm"
                  method="POST"
                  // novalidate="novalidate"
                  onsubmit="return false"
                >
                  <div className="row">
                    <div className="col-lg-12 form_group">
                      <input
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        type="text"
                        required
                      />
                      <input
                        id="phone"
                        name="phone"
                        placeholder="Teléfono (opcional)"
                        type="tel"
                      />
                      <input
                        id="email"
                        name="email"
                        placeholder="Correo electrónico"
                        pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
                        type="email"
                        required
                      />
                    </div>
                    <div className="col-lg-12 text-center">
                      <button id="submitContact" className="primary-btn">Envíar</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================ End Registration Area =================--> */}
      
      {/* <!--================ Start footer Area  =================--> */}
      <footer className="footer-area py-5">
        <div className="container">
          <div className="row footer-bottom d-flex justify-content-between">
            <p className="col-lg-8 col-sm-12 footer-text m-0 text-white">
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="ti-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
            </p>
            <div className="col-lg-4 col-sm-12 footer-social">
              <a href="https://www.facebook.com/centrodeestudiosintensivo"><i className="ti-facebook"></i></a>
              <a href="#" className="wapp-redirect" wapp-text="Buen día, me interesa conocer más sobre los cursos"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
      </div>
      </footer>
      {/* <!--================ End footer Area  =================--> */}

      {/* <!--================Contact Success and Error message Area =================--> */}
      <div id="success" className="modal modal-message fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti-close"></i>
              </button>
              <h2>¡Gracias!</h2>
              <p>Tu mensaje ha sido enviado correctamente</p>
              <p>Nos pondremos en contacto contigo</p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modals error --> */}

      <div id="error" className="modal modal-message fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="ti-close"></i>
              </button>
              <h2>Una disculpa</h2>
              <p>Algo ha salido mal.</p>
              <p>Por favor, vuelve a intenarlo más tarde</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!--================End Contact Success and Error message Area =================--> */}

      <nav className="floating-button">
        <a href="#" className="tertiary-btn icon-btn wapp-button ml-sm-3 ml-0 wapp-redirect" wapp-text="Buen día, me interesa conocer más sobre los cursos">
          <i className="fab fa-whatsapp"></i>
        </a>
      </nav>
    </Page>
  )
}
