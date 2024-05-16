import React from "react";
import logo from "./logo.svg";
import styles from "./Footer.module.scss";
function Footer() {
    return (
        <div className={styles.footer}>
            <img className={styles.footer_text_img} src={logo} alt="logo_footer"></img>
            <div className={styles.footer_text} >
            <p className={styles.footer_text_p}>г. Москва, Цветной б-р, 40 <br />
              +7 495 771 21 11 <br />
              info@skan.ru
            </p>
            <p>Copyright. 2024</p>
            </div>
        </div>
    );
}
export default Footer;
