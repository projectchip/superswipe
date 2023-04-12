import React, { useEffect, useState } from "react";
import styles from '../styles/dataCard.module.css'
import { Image } from "react-bootstrap";
import Link from 'next/link';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from "next/router";

const DataCard = ({data}: {data: any}) => {
    return (
        <div role="listitem">
            <Link href={`/information?id=${data._id}`} style={{textDecoration: 'none', color: 'black'}}>
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