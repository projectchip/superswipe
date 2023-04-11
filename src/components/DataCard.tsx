import React, { useState } from "react";
import styles from '../styles/dataCard.module.css'
import { Image } from "react-bootstrap";
import Link from 'next/link';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from "next/router";

const DataCard = ({data}: {data: any}) => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [authorization, setAuthorization] = useState('');
    useState(()=>{
        const token = localStorage.getItem('token');
        if (token && JSON.parse(token).role == "admin") {
            setIsAdmin(true);
            setAuthorization(JSON.parse(token).key);
        } else {
            setIsAdmin(false);
        }
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const requestDeletion = async () => {
        const response = await fetch(`/api/deleteListing?id=${data._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authorization,
          },
        });
        response.status == 200 ? handleClose() : null;
        window.location.reload();
    };
    
    
    return (
        <div role="listitem">
            {
                isAdmin ?
                <div className={styles.muiIcons}>
                    <ModeEditIcon color="primary" sx={{cursor:'pointer'}} onClick={() => {router.push(`/editListing?id=${data._id}`)}}/>
                    <DeleteForeverIcon color="error" sx={{cursor:'pointer'}} onClick={()=> handleShow()}/>
                </div> : null
            }
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
            <div
                id={`confirmation-modal${data._id}`}
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Listing</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{display: 'flex', flexDirection: "column", alignItems:'center', justifyContent: 'center'}}>
                    <p>Are you sure you want to DELETE it?</p>
                    <p>(This action is not reversiable)</p>
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="outline-danger"
                        onClick={() => {requestDeletion()}}
                    >DELETE</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    )
}


export default DataCard;