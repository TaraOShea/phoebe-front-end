// some-inner-component.jsx
import { useSwiper } from 'swiper/react';

export default function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button className='swiper-button-next' onClick={() => swiper.slideNext()}>next</button>
  );
}