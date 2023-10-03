import styles from './footer.module.scss'
import facebook from '../../assets/icons/f.png'
import instagram from '../../assets/icons/instagram.png'
import twitter from '../../assets/icons/twitter.png'
import ins from '../../assets/icons/in.png'
import play from '../../assets/icons/playmarket.png'
import appStore from '../../assets/icons/appStore.png'
import arrow from '../../assets/icons/arrow.png'
import { FC } from 'react'

const Footer:FC = () => {
    return (
        <footer>
            <div className={styles.footer_inner}>
                <div className={styles.footer_info}>
                    <div>Need Help</div>
                    <ul className={styles.footer_list}>
                        <li>Contact Us</li>
                        <li>Track Order</li>
                        <li>Returns & Refunds</li>
                        <li>FAQ's</li>
                        <li>Career</li>
                    </ul>
                </div>
                <div className={styles.footer_info}>
                    <div>Company</div>
                    <ul className={styles.footer_list}>
                        <li>About Us</li>
                        <li>euphoria Blog</li>
                        <li>euphoriastan</li>
                        <li>Collaboration</li>
                        <li>Media</li>
                    </ul>
                </div>
                <div className={styles.footer_info}>
                    <div>More Info</div>
                    <ul className={styles.footer_list}>
                        <li>Term and Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Shipping Policy</li>
                        <li>Sitemap</li>
                    </ul>
                </div>
                <div className={styles.footer_info}>
                    <div>Location</div>
                    <ul className={styles.footer_list}>
                        <li>support@euphoria.in</li>
                        <li>Eklingpura Chouraha, Ahmedabad Main Road</li>
                        <li>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</li>
                    </ul>
                </div>
            </div>
            <div className={styles.footer_bottom_content}>
                <ul className={styles.footer_social}>
                    <li className={styles.footer_social_icons}><img src={facebook} alt="facebook" /></li>
                    <li className={styles.footer_social_icons}><img src={instagram} alt="facebook" /></li>
                    <li className={styles.footer_social_icons}><img src={twitter} alt="facebook" /></li>
                    <li className={styles.footer_social_icons}><img src={ins} alt="facebook" /></li>
                </ul>
                <div className={styles.footer_download}>
                    <div className={styles.footer_download_title}>
                        Download The App
                    </div>
                    <div className={styles.footer_download_img}>
                        <img src={play} alt="play" />
                        <img src={appStore} alt="appStore" />

                    </div>
                </div>
            </div>
            <div className={styles.footer_bottom}>
                <div>
                    <div className={styles.footer_title}>Popular</div>
                    <div className={styles.footer_title}>Popular</div>
                </div>
                <div className={styles.arrow}>
                    <img src={arrow} alt="arrow" />
                </div>
            </div>
            <div className={styles.text_end}>
                Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer