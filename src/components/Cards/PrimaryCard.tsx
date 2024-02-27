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
}
export const PrimaryCard: React.FC<TPrimaryCard> = ({
  name,
  image,
  description,
  id,
}) => {
  AOS.init(); // Initialize AOS directly

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
        <p className="text-lg md:text-xl font-semibold text-center py-3 brand-text-color">
          English | Bangla | Math | Physics | Chemistry
        </p>

        <p className="text-sm text-center text-neutral-600 dark:text-neutral-400 hidden md:block">
          {description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Alias culpa ipsum tempora in dolorum officiis, consectetur omnis ab
          quo iste.
        </p>
        <div className="flex justify-center items-center">
          <Link
            to={`/${id}`}
            className="rounded-full px-8 py-4  text-white space-x-1 bg-black mt-4 text-lg hover:bg-slate-600
             font-bold dark:bg-zinc-800"
          >
            See Details
          </Link>
        </div>
      </BackgroundGradient>
    </div>
  );
};
