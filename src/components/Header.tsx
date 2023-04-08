import React from "react";
import styles from '../styles/header.module.css'

const Header = () => {
    return (
        <div className={styles.header}>
            <h1 className={styles.titleMedium}>
                world wide news & articles
            </h1>
            <h1 style={{marginBottom: 0, fontSize: '54px', lineHeight: '1.2', letterSpacing: '-.03em'}}>
                SUPER SWIPE
            </h1>
            <p className={styles.heroParagraph}>
                Superswipe is the worlds largest Advertisement resource site. Explore endless artilcles and news to keep up with the fast moving world world.
            </p>
        </div>
    )
}

export default Header;