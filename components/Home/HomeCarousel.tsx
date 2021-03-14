import React from 'react';
import dynamic from 'next/dynamic';

// import '@brainhubeu/react-carousel/lib/style.css';
// import Carousel, { slidesToShowPlugin, arrowsPlugin, autoplayPlugin } from '@brainhubeu/react-carousel';
import Icon from '../Icon';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

export type FeaturedCourse = {
    category: string,
    name: string,
    description: string,
    thumbnail: string,
}

type FeaturedCourseCardProps = {
    course: FeaturedCourse,
}

function FeaturedCourseCard({ course }: FeaturedCourseCardProps) {
    return (
        <div className="single_course" style={{margin: '0px 8px'}}>
            <div className="course_head">
                <img className="img-fluid" src={course.thumbnail} alt={`Imágen de ${course.name}`} />
            </div>
            <div className="course_content">
                <div>
                    <span className="tag mb-4 d-inline-block">{course.category}</span>
                </div>
                <h4 className="mb-3">
                    <a href="#">{course.name}</a>
                </h4>
                <p> {course.description} </p>
                <div className="course_meta d-flex justify-content-lg-between align-items-lg-center flex-lg-row flex-column mt-4">
                    <div className="authr_meta">
                        <a href="#" className="primary-btn wapp-redirect" wapp-text={`Estoy interesado en el curso de ${course.name}`}>
                            <Icon icon="whatsapp"/> Me interesa
                        </a>
                    </div>
                    <div className="mt-lg-0 mt-3">
                        <span className="meta_info">
                            <a href="https://www.facebook.com/centrodeestudiosintensivo"> <i className="ti-heart mr-2"></i>35 </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export type HomeCarouselProps = {
    courses: FeaturedCourse[]
}

export function ClientHomeCarousel({ courses = [] }: HomeCarouselProps) {
    
    // const plugins: any[] = [
    //     'infinite',
    //     {
    //         resolve: slidesToShowPlugin,
    //         options: {
    //             numberOfSlides: 3
    //         }
    //     },
    //     {
    //         resolve: arrowsPlugin,
    //         options: {
    //             arrowLeft: <Icon icon="whatsapp" />,
    //             arrowRight: <Icon icon="whatsapp" />,
    //             addArrowClickHandler: true,
    //         }
    //     },
    // ];
    
    // if (courses.length > 3) {
    //     plugins.push({ 
    //         resolve: autoplayPlugin,
    //         options: {
    //             interval: 5000
    //         }
    //     });
    // }

    return (
        // <Carousel plugins={plugins}
        //     breakpoints={{
        //         767: {
        //         plugins: [
        //         {
        //             resolve: slidesToShowPlugin,
        //             options: {
        //             numberOfSlides: 1
        //             }
        //         },
        //         ]
        //         },
        //         991: {
        //         plugins: [
        //         {
        //             resolve: slidesToShowPlugin,
        //             options: {
        //             numberOfSlides: 2
        //             }
        //         },
        //         ]
        //         }
        //     }}>
        // {  courses.map((course, i) => <FeaturedCourseCard key={i} course={course}/> ) }
        // </Carousel>
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={125}
            totalSlides={3}
            >
            <ButtonBack>Back</ButtonBack>
            <Slider>
                <Slide index={0}>I am the first Slide.</Slide>
                <Slide index={1}>I am the second Slide.</Slide>
                <Slide index={2}>I am the third Slide.</Slide>
            </Slider>
            <ButtonNext>Next</ButtonNext>
        </CarouselProvider>
    )
}

export default ClientHomeCarousel;