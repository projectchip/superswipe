'use-client'
import React, {useEffect, useState} from 'react';
import styles from "../styles/header.module.css";
import mainCard from '../styles/mainData.module.css'
import detailStyles from '../styles/details.module.css';
import Chip from '@mui/material/Chip';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRouter } from 'next/router';

const ContentComponent = ({content} : {content: Array<any>}) => {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [authorization, setAuthorization] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if (token && JSON.parse(token).role == "admin") {
            setIsAdmin(true);
            setAuthorization(JSON.parse(token).key);
        } else {
            setIsAdmin(false);
        }
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const requestDeletion = async () => {
        const response = await fetch(`/api/deleteListing?id=${content[0]._id}`, {
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
        <div className={mainCard.mainCard} style={{marginTop: '-30px', marginBottom: '20px', paddingTop: '70px'}}>
            {
                isAdmin ?
                <div className={detailStyles.muiIcons}>
                    <ModeEditIcon color="primary" sx={{cursor:'pointer'}} onClick={() => {router.push(`/editListing?id=${content[0]._id}`)}}/>
                    <DeleteForeverIcon color="error" sx={{cursor:'pointer'}} onClick={()=> handleShow()}/>
                </div> : null
            }
            <h1 style={{marginBottom: 0, fontSize: '46px', lineHeight: '1.2', letterSpacing: '-.03em'}}>
                {content[0].title}
            </h1>
            <p className={styles.heroParagraph} style={{maxWidth: 'unset', marginBottom: '20px'}}>
                {content[0].description}
            </p>
            <div>
                <div className={detailStyles.detailsContainer}>
                    <div role="listitem">
                        <strong>Author : </strong>{content[0].author}
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>Category : </strong>{content[0].category}
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>Industry : </strong>{content[0].industry}
                    </div>
                </div>
                <div className={detailStyles.detailsContainer}>
                    <div role="listitem">
                        <strong>Source : </strong>{content[0].source}
                    </div>
                    <div role="listitem" className={detailStyles.textContainer}>
                        <strong>URL : </strong>{content[0].url}
                    </div>
                </div>
                <div role="listitem">
                    <strong>Tags : </strong>
                    {
                        content[0].tags.split('#').map((tag: string) => {
                            if (tag.length > 0) return (<Chip style={{margin: '2px'}} label={tag} key={tag} variant="outlined" />)
                        })
                    }
                </div>
                
            </div>
            <div
                id={`confirmation-modal${content[0]._id}`}
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
    );
};

export default ContentComponent;