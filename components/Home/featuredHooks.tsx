import React, { useContext } from "react";
import { FeaturedCourse } from "./HomeCarousel";

const FeaturedCoursesContext = React.createContext<FeaturedCourse[]>([]);

export function FeaturedProvider({ courses, children }) {
  return (
    <FeaturedCoursesContext.Provider value={courses}>
      {children}
    </FeaturedCoursesContext.Provider>
  )
}

export function useFeaturedCourses() {
  const ctx = useContext(FeaturedCoursesContext);
  if (!ctx) {
    throw new Error('Missing FeaturedProvider component');
  }
  return ctx;
}
