"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import { Link } from "react-router-dom";
import { BackgroundGradientRound } from "../ui/round-gradient";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../App.css";

interface TPrimaryCard {
  image: string;
  name: string;
  description: string;
  id: string;
  subjects: string[];
}
export const PrimaryCard: React.FC<TPrimaryCard> = ({
  name,
  image,
  description,
  id,
  subjects,
}) => {
  AOS.init(); // Initialize AOS directly

  const showSubjects = [];
  for (let i = 0; i < subjects.length; i++) {
    if (i == subjects.length - 1) {
      showSubjects.push(subjects[i]);
    } else {
      showSubjects.push(subjects[i] + " | ");
    }
  }

  return (
    <div data-aos="zoom-in" data-aos-delay="50" data-aos-duration="1000">
      <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-zinc-900">
        <div className="flex justify-center items-center">
          <BackgroundGradientRound>
            <img className=" rounded-full size-48" src={image} alt="" />
          </BackgroundGradientRound>
        </div>
        <p className="text-xl md:text-3xl font-bold capitalize text-center mt-4 mb-2 text-neutral-200">
          {name}
        </p>
        <p className="text-lg md:text-base font-semibold text-center py-1 brand-text-color">
          {showSubjects}
        </p>

        <p className="text-sm text-center text-neutral-600 dark:text-neutral-400 hidden md:block">
          {description}
        </p>
        <div className="flex justify-center items-center">
          <Link
            to={`/${id}`}
            className="rounded-xl px-8 py-4  text-white space-x-1 mt-4 text-lg hover:bg-slate-600
             font-bold bg-zinc-800"
          >
            See Details
          </Link>
        </div>
      </BackgroundGradient>
    </div>
  );
};
