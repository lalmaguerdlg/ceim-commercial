import React, { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';

import Icon from '../Icon';

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useBreakpoint } from '../util/hooks';
import { useFeaturedCourses } from './featuredHooks';

export type FeaturedCourse = {
    category: string,
    name: string,
    description: string,
    thumbnail: string,
}

type FeaturedCourseCardProps = {
    course: FeaturedCourse,
    className?: string,
}

function FeaturedCourseCard({ course, className = '' }: FeaturedCourseCardProps) {
    return (
        <div className={`single_course ${className}`} style={{margin: '0px 8px'}}>
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
                            <Icon type="brands" icon="whatsapp"/> Me interesa
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
    const breakpoint = useBreakpoint();

    const visibleSlides = useMemo(() => {
        switch (breakpoint) {
            case 'sm':
                return 1;
            case 'md':
                return 2;     
            default:
                return 3;
        }
    }, [breakpoint]);

    const showButtons = courses.length > visibleSlides;

    return (
        <CarouselProvider
            naturalSlideWidth={100}
            naturalSlideHeight={175}
            isIntrinsicHeight
            totalSlides={courses.length}
            visibleSlides={visibleSlides}
            dragEnabled={showButtons}
            infinite
            isPlaying
            >
            <div className="carousel-container">
                { showButtons ? <ButtonBack className="button icon"><Icon type="solid" icon="chevron-left"/></ButtonBack> : null }
                <Slider className="slider">
                    { courses.map((course, i) => (
                        <Slide key={i} index={i} innerClassName="slide">
                            <FeaturedCourseCard course={course} className="slide__item" />
                        </Slide>
                    ))}
                </Slider>
                { showButtons ? <ButtonNext className="button icon"><Icon type="solid" icon="chevron-right"/></ButtonNext> : null }
            </div>
        </CarouselProvider>
    )
}

export function ServerHomeCarousel() {
    const courses = useFeaturedCourses();
    return (
        <div className="server-carousel-container">
            { courses.map((course, i) => (
                <FeaturedCourseCard key={i} course={course} className="slide__item" />
            ))}
        </div>
    )
}

export default ClientHomeCarousel;