import styles from './footer.module.scss'

const Footer = () => {
    return (
        <footer>
            <div className={styles.footer_inner}>
                <div className={styles.footer_info}>
                    <div>Need Help</div>
                    <ul>
                        <li>Contact Us</li>
                        <li>Track Order</li>
                        <li>Returns & Refunds</li>
                        <li>FAQ's</li>
                        <li>Career</li>
                    </ul>
                </div>
                <div className={styles.footer_info}>
                    <div>Company</div>
                    <ul>
                        <li>About Us</li>
                        <li>euphoria Blog</li>
                        <li>euphoriastan</li>
                        <li>Collaboration</li>
                        <li>Media</li>
                    </ul>
                </div>
                <div className={styles.footer_info}>
                <div>More Info</div>
                    <ul>
                        <li>Term and Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Shipping Policy</li>
                        <li>Sitemap</li>
                    </ul>
                </div>
                <div className={styles.footer_info}>
                <div>Location</div>
                    <ul>
                        <li>support@euphoria.in</li>
                        <li>Eklingpura Chouraha, Ahmedabad Main Road</li>
                        <li>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer