import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./productDetail.module.scss";
import Header from "../Header/Header";
import arrow_top from "../../assets/icons/aroow_top.png"
import arrow_bottom from "../../assets/icons/arrow_bottom.png"
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchOneProduct } from "../../features/productSlice";
import { useParams } from "react-router-dom";
import message from "../../assets/icons/message_icon.jpg"

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch()
    const product = useAppSelector(
        (state) => state.productSlice.oneProduct
    )
    useEffect(() => {
        id && dispatch(fetchOneProduct(id))
    }, [dispatch])

    const slides: string[] = [
        "https://fikiwiki.com/uploads/posts/2022-02/1644972802_1-fikiwiki-com-p-kartinki-krasivie-na-android-1.jpg",
        "https://img1.akspic.ru/previews/7/4/7/9/6/169747/169747-ikanvas-art-pechat_na_holste-poster-oblako-500x.jpg",
        "https://img3.akspic.ru/previews/6/4/2/8/6/168246/168246-skazhi_igru-lyudo_king-kosti-igra_v_kosti-azartnaya_igra-500x.jpg",
    ];
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const showSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    const nextSlide = (): void => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    const prevSlide = (): void => {
        setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    const handleScroll = (index: React.MouseEvent<HTMLDivElement>): void => {
        setCurrentSlide(+index);
    };

    return (
        <>
            <Header />
            <div className={styles.product_detail}>
                <div className={styles.product_detail_img}>
                    <div className={styles.slider_controls_container}>

                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className={`${styles.slide} ${index === currentSlide ? styles.active : ""
                                    }`}
                                onClick={() => handleScroll(index)}
                            >
                                <img className={`${styles.slide} ${index === currentSlide ? styles.active_slide : ""
                                    }`} src={slide} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}

                        <div className={styles.controls}>
                            <button id="prevButton" onClick={prevSlide}>
                                <img src={arrow_top} />
                            </button>
                            <button id="nextButton" onClick={nextSlide}>
                                <img src={arrow_bottom} />
                            </button>
                        </div>
                    </div>

                    <div className={styles.active_slide_container}>
                        <img src={slides[currentSlide]} alt="Active Slide" />
                    </div>
                </div>
                <div className={styles.product_descr}>
                    <h1 className={styles.descr_title}>{product?.title}</h1>
                    <div className={styles.rating_info}>
                        <div className={styles.rating}>
                            <div className={styles.rating__body}>
                                <div className={styles.rating__active} style={{ width: `${product?.rating / 0.05}%` }}></div>
                                <div className={styles.rating__items}>
                                    <input type="radio" className={styles.rating__item} value="1" name="rating" />
                                    <input type="radio" className={styles.rating__item} value="2" name="rating" />
                                    <input type="radio" className={styles.rating__item} value="3" name="rating" />
                                    <input type="radio" className={styles.rating__item} value="4" name="rating" />
                                    <input type="radio" className={styles.rating__item} value="5" name="rating" />
                                </div>
                            </div>
                        </div>
                        <div className={styles.rating__value}>{product?.rating}</div>
                        <img src={message} alt="message" />
                        <div className={styles.comments}>120 comment</div>
                    </div>
                    <div className={styles.product_size}>
                        <div className={styles.select_size}>Select Size</div>
                        <div className={styles.size_guide}>Size Guide</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
