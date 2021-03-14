import React, { FC } from 'react';
import Head from 'next/head';

export type PageProps = {}

export const Page: FC<PageProps> = ({ children }) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
                />
                <link rel="icon" href="img/favicon.png" type="image/png" />
                <title>Edustage Education</title>
                <link rel="stylesheet" href="css/bootstrap.css" />
                <link rel="stylesheet" href="css/flaticon.css" />
                <link rel="stylesheet" href="css/themify-icons.css" />
                <link rel="stylesheet" href="vendors/owl-carousel/owl.carousel.min.css" />
                <link rel="stylesheet" href="vendors/nice-select/css/nice-select.css" />
                <link rel="stylesheet" href="vendors/fontawesome/css/fontawesome.css" />
                <link rel="stylesheet" href="vendors/fontawesome/css/brands.css" />
                <link rel="stylesheet" href="vendors/fontawesome/css/solid.css" />
            </Head>
            { children }

            {/* <!-- Optional JavaScript --> */}
            {/* <!-- jQuery first, then Popper.js, then Bootstrap JS --> */}
            <script src="js/jquery-3.2.1.min.js"></script>
            <script src="js/popper.js"></script>
            <script src="js/bootstrap.min.js"></script>
            <script src="vendors/nice-select/js/jquery.nice-select.min.js"></script>
            <script src="vendors/owl-carousel/owl.carousel.min.js"></script>
            <script src="js/owl-carousel-thumb.min.js"></script>
            <script src="js/jquery.validate.min.js"></script>
            <script src="js/jquery.ajaxchimp.min.js"></script>
            {/* <!-- <script src="js/mail-script.js"></script> --> */}
            {/* <!--gmaps Js--> */}
            {/* <!-- <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjCGmQ0Uq4exrzdcL6rvxywDDOvfAu6eE"></script> --> */}
            {/* <!-- <script src="js/gmaps.min.js"></script> --> */}
            <script src="js/contact.js"></script>
            <script src="js/theme.js"></script>

            <script src="js/wapp.js" type="text/javascript"></script>

        </>
    )
}

export default Page;