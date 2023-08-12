// some-inner-component.jsx
import { useSwiper } from 'swiper/react';

export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button className='swiper-button-prev' onClick={() => swiper.slidePrev()}>back</button>
  );
}