import { useParams } from 'react-router-dom';
import styles from './similarProducts.module.scss'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { FC, useEffect } from 'react';
import { fetchProducts } from '../../features/productSlice';
import HeartSVG from '../../assets/icons/HeartSVG';

const SimilarProducts: FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch()
    const product = useAppSelector(
        (state) => state.productSlice?.products
    )

    useEffect(() => {
        dispatch(fetchProducts())

    }, [dispatch])

    const currentProduct = product.find(item => item._id === id)
    const products = product.filter(item => item.categories[0]._id === currentProduct?.categories[0]._id)

    return (
        <div className={styles.products}>
            <div className={styles.similar_text}>
                <div className={styles.line}></div>
                <div className={styles.title}>Similar Products</div>
            </div>
            <div className={styles.products_cards}>
                {
                    products.map(item => (
                        <div className={styles.product_card}>
                            <HeartSVG className={styles.heart} />
                            <img className={styles.product_img} src={`http://localhost:3010/${item.photo[0]}`} alt="img" />
                            <div className={styles.product_detail}>
                                <div className={styles.product_title}>{item.title}</div>
                                <div className={styles.product_price}>₽{item.price}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SimilarProducts