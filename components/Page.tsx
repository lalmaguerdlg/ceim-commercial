import React, { FC } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import WhatsappButton from './WhatsappButton';

const routes = [
    { 
        route: "/", 
        label: "Inicio"
    },
    { 
        route: "/about-us", 
        label: "Nosotros"
    },
    { 
        route: "/contact", 
        label: "Contacto"
    },
]

export type PageTheme = 'light' | 'dark';

function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="footer-area py-5">
            <div className="container">
                <div className="row footer-bottom d-flex justify-content-between">
                    <p className="col-lg-8 col-sm-12 footer-text m-0 text-white">
                        {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                        Copyright &copy;{year} All rights reserved | This template is made with <i className="ti-heart" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                        {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
                    </p>
                    <div className="col-lg-4 col-sm-12 footer-social">
                        <a href="https://www.facebook.com/centrodeestudiosintensivo"><i className="ti-facebook"></i></a>
                        <WhatsappButton message="Buen día, me interesa conocer más sobre los cursos" />
                    </div>
                </div>
            </div>
      </footer>
    )
}


export interface PageProps {
    theme?: PageTheme
}
export const Page: FC<PageProps> = ({ children, theme = 'light' }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link rel="icon" href="img/favicon.png" type="image/png" />
                <title>Centro de Estudios Intensivos Monterrey</title>
                <link rel="stylesheet" href="css/bootstrap.css" />
                <link rel="stylesheet" href="css/flaticon.css" />
                <link rel="stylesheet" href="css/themify-icons.css" />
                {/* <link rel="stylesheet" href="vendors/owl-carousel/owl.carousel.min.css" /> */}
                {/* <link rel="stylesheet" href="vendors/nice-select/css/nice-select.css" /> */}
                <link rel="stylesheet" href="vendors/fontawesome/css/fontawesome.css" />
                <link rel="stylesheet" href="vendors/fontawesome/css/brands.css" />
                <link rel="stylesheet" href="vendors/fontawesome/css/solid.css" />
            </Head>
            <Navbar routes={routes} theme={theme}/>
            { children }
            <Footer />
            {/* <!-- Optional JavaScript --> */}
            {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
            <script src="js/jquery-3.2.1.min.js"></script>
            {/* <script src="js/popper.js"></script> */}
            <script src="js/bootstrap.min.js"></script>
            {/* <script src="vendors/nice-select/js/jquery.nice-select.min.js"></script> */}
            {/* <script src="vendors/owl-carousel/owl.carousel.min.js"></script> */}
            {/* <script src="js/owl-carousel-thumb.min.js"></script> */}
            {/* <script src="js/jquery.validate.min.js"></script> */}
            {/* <script src="js/jquery.ajaxchimp.min.js"></script> */}
            {/* <!-- <script src="js/mail-script.js"></script> --> */}
            {/* <!--gmaps Js--> */}
            {/* <!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjCGmQ0Uq4exrzdcL6rvxywDDOvfAu6eE"></script> --> */}
            {/* <!-- <script src="js/gmaps.min.js"></script> --> */}
            {/* <script src="js/contact.js"></script> */}

            {/* <script src="js/theme.js"></script> */}

            {/* <script src="js/wapp.js" type="text/javascript"></script> */}

        </>
    )
}

export default Page;