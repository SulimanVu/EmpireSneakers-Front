import { FC } from 'react'
import styles from './ratingInfo.module.scss'
import { useAppSelector } from '../../app/hook'
import message from "../../assets/icons/message_icon.jpg"

const RatingInfo: FC = () => {
    const product = useAppSelector(
        (state) => state.productSlice.oneProduct
    )
    // Проверяем, существует ли product и имеет ли он свойство rating
    const rating = product?.rating ?? 0;
    
    return (
        <div className={styles.rating_info}>
            <div className={styles.rating}>
                <div className={styles.rating__body}>
                    <div className={styles.rating__active} style={{ width: `${rating / 0.05}%` }}></div>
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
    )
}

export default RatingInfo