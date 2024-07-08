"use client";
import { ReactNode, useEffect, useState } from "react";
import { Swiper, SwiperProps } from "swiper/react";

import "./slide.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface SliderProps {
  settings: SwiperProps;
  children: ReactNode;
  month: number;
}

export default function Slider({ settings, children, month }: SliderProps) {
  const [initialSlide, setInitialSlide] = useState(month);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    setInitialSlide(currentMonth);
  }, []);

  return (
    <Swiper initialSlide={initialSlide} centeredSlides {...settings}>
      {children}
    </Swiper>
  );
}
