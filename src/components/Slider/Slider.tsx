import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import arrow_bottom from "../../assets/icons/arrow_bottom.png"
import arrow_top from "../../assets/icons/aroow_top.png"
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { Product, fetchOneProduct } from '../../features/productSlice';



const Slider = () => {

    const { id } = useParams<{ id: string }>();
    


    const dispatch = useAppDispatch()
    const product = useAppSelector(
        (state) => state.productSlice.oneProduct
    ) as Product



    const [currentSlide, setCurrentSlide] = useState<number>(0);

    
    const showSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    const nextSlide = (): void => {
        setCurrentSlide((currentSlide + 1) %  product?.photo.length);
    };

    const prevSlide = (): void => {
        setCurrentSlide((currentSlide - 1 + product.photo.length) % product.photo.length);
    };

    const handleScroll = (index: React.MouseEvent<HTMLDivElement>): void => {
        setCurrentSlide(+index);
    };

  return (
                 <div className={styles.product_detail_img}>
                    <div className={styles.slider_controls_container}>

                        {product?.photo.map((slide, index) => (
                            <div
                                key={index}
                                className={`${styles.slide} ${index === currentSlide ? styles.active : ""
                                    }`}
                                onClick={() => handleScroll(index)}
                            >
                                <img className={`${styles.slide} ${index === currentSlide ? styles.active_slide : ""
                                    }`} src={`http://localhost:3010/${slide}`} alt={`Slide ${index + 1}`} />
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
                        <img src={`http://localhost:3010/${product?.photo[currentSlide]}`} alt="Active Slide" />
                    </div>
                </div> 
  )
}

export default Slider