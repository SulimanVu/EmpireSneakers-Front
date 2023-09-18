import { FC, useState } from "react";
import styles from "./mainSlider.module.scss"
import RightArrowSVG from "../../assets/icons/RightArrowSVG";
import LeftArrowSVG from "../../assets/icons/LeftArrowSVG";

const MainSlider: FC = () => {
  const slides: string[] = [
    "https://fikiwiki.com/uploads/posts/2022-02/1644972802_1-fikiwiki-com-p-kartinki-krasivie-na-android-1.jpg",
    "https://img1.akspic.ru/previews/7/4/7/9/6/169747/169747-ikanvas-art-pechat_na_holste-poster-oblako-500x.jpg",
    "https://img3.akspic.ru/previews/6/4/2/8/6/168246/168246-skazhi_igru-lyudo_king-kosti-igra_v_kosti-azartnaya_igra-500x.jpg",
  ];

  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = (): void => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = (): void => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderController}>
        <button className={styles.prevBtn} onClick={prevSlide}>
          <LeftArrowSVG className={styles.arrowControl} />
        </button>
        <button className={styles.nextBtn} onClick={nextSlide}>
          <RightArrowSVG className={styles.arrowControl} />
        </button>
      </div>
      <div className={styles.activeSlideContainer}>
        <img src={slides[currentSlide]} alt="текущий слайд" />
      </div>
    </div>
  );
};

export default MainSlider;