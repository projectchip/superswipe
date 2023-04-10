import React from "react";
import styles from '../styles/dataCard.module.css'
import { Image } from "react-bootstrap";
import Link from 'next/link';

const DataCard = ({data}: {data: any}) => {
    return (
        <div role="listitem">
            <Link href={`/details?id=${data._id}`} style={{textDecoration: 'none', color: 'black'}}>
                <div className={styles.dataCard}>
                    <div className={styles.dataImage}>
                        <Image src={data.image} alt="Place Holder for Item Image" />
                    </div>
                    <div className={styles.dataContent}>
                        <div className={styles.dataContentTitle}>
                            {data.title}
                        </div>
                        <p>
                            {data.category} - {data.industry}
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}


export default DataCard;