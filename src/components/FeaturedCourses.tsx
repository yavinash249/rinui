"use client";

import React from "react";
import courseData from "../data/data.json";
import Link from "next/link";
import { BackgroundGradient } from "./ui/background-gradient";

interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  isfeatured: boolean;
  instructor: string;
}

export default function FeaturedCourses() {
  const featuredCourses = courseData.courses.filter(
    (course: Course) => course.isfeatured
  );
  return (
    <div className="py-12 bg-gray-900 ">
      <div>
        <div className="text-center">
          <h1 className="text-base text-teal-600 font-semibold tracking-wide uppercase">
            {" "}
            Featured Course
          </h1>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Learn with Best{" "}
          </p>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {featuredCourses.map((course: Course) => (
            <div key={course.id} className="flex justify-center m-2">
              <BackgroundGradient className="flex flex-col rounded-[22px] bg-white dark:bg-zinc-900 overflow-hidden h-full max-w-sm">
                <div className="p-5 sm:p-6 flex flex-col items-center text-center flex-grow">
                  <p className="text-lg sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                    {course.title}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-grow">
                    {course.description}
                  </p>
                  <Link href={`/courses/${course.slug}`}>Learn More</Link>
                </div>
              </BackgroundGradient>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 text-center">
        <Link href={"/course"}>All course</Link>
      </div>
    </div>
  );
}