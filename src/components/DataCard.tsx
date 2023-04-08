import React from "react";
import styles from '../styles/dataCard.module.css'
import { Image } from "react-bootstrap";

const DataCard = () => {
    return (
        <div role="listitem">
            <a href="/details?id=123456" style={{textDecoration: 'none', color: 'black'}}>
                <div className={styles.dataCard}>
                    <div className={styles.dataImage}>
                        <Image src="/placeholder.png" alt="Place Holder for Item Image" />
                    </div>
                    <div className={styles.dataContent}>
                        <div className={styles.dataContentTitle}>
                            Test Title For now and to check the long title.
                        </div>
                        <p>
                            Category - Industry
                        </p>
                    </div>
                </div>
            </a>
        </div>
    )
}


export default DataCard;