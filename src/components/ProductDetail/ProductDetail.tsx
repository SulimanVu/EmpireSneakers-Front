import React, { useEffect } from "react";
import styles from "./productDetail.module.scss";
import Header from "../Header/Header";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { fetchOneProduct } from "../../features/productSlice";
import { useParams } from "react-router-dom";
import size_arrow from "../../assets/icons/size_arrow.png"
import BasketSVG from "../../assets/icons/BasketSVG";
import { addToBasket } from "../../features/basketSlice";
import Slider from "../Slider/Slider";
import PossibilitiesProduct from "../PossibilitesProduct/PossibilitiesProduct";
import RatingInfo from "../RatingInfo/RatingInfo";
import SimilarProducts from "../SimilarProducts/SimilarProducts";
import Footer from "../Footer/Footer";


const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch()
    const product = useAppSelector(
        (state) => state.productSlice.oneProduct
    )

    useEffect(() => {
        id && dispatch(fetchOneProduct(id))
    }, [dispatch, id])


    const user = useAppSelector((state) => state.userSlice.user.basket);

    const handleAddToCart = () => {

        dispatch(addToBasket({
            id: user,
            product: id as string,
            size: 42
        }));
    };
    

    return (
        <>
            <Header />
            <div className={styles.product_detail}>
                <Slider />
                <div className={styles.product_descr}>
                    <h1 className={styles.descr_title}>{product?.title}</h1>
                    <RatingInfo/>
                    <div className={styles.product_size_title}>
                        <div className={styles.select_size}>Select Size</div>
                        <div className={styles.size_guide}>Size Guide</div>
                        <div className="size_arrow"><img src={size_arrow} alt="" /></div>
                    </div>
                    <div className={styles.product_size}>
                        {product?.sizes.map(item => item.quantity > 0 && <div className={styles.product_size_item}>{item.size}</div>)}
                    </div>
                    <div className={styles.colours_title}>Colours Available </div>
                    <div className={styles.add_cart}>
                        <div onClick={handleAddToCart} className={styles.cart_btn}><BasketSVG /> Add to cart</div>
                        <div className={styles.cart_count}>₽{product?.price}</div>
                    </div>
                    <div className={styles.line}></div>
                    <PossibilitiesProduct/>
                </div>
            </div>
            <SimilarProducts/>
            <Footer/>
        </>
    );
};

export default ProductDetail;
