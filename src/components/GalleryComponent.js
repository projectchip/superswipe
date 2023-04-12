import React, {useEffect, useState} from 'react';
import mainStyle from '../styles/mainData.module.css';
import gellaryStyles from '../styles/gallery.module.css';
import "node_modules/react-image-gallery/styles/css/image-gallery.css";
import "../styles/gallery.module.css";
import ImageGallery from 'node_modules/react-image-gallery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Image } from 'react-bootstrap';
import ClearIcon from '@mui/icons-material/Clear';

const GalleryComponent = ({photos}) => {
    const images = [];
    const [data, setData] = useState(images);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [deletingIds, setDeleteIds] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [authorization, setAuthorization] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token && JSON.parse(token).role == "admin") {
            setIsAdmin(true);
            setAuthorization(JSON.parse(token).key);
        } else {
            setIsAdmin(false);
        }
    }, [ data])

    photos.forEach((photo) => {
        images.push({
            id: photo._id,
            original: photo.image,
            thumbnail: photo.image
        })
    })

    const requestDeletion = async () => {
        handleClose();
        for (const photoId of deletingIds) {
            const response = await fetch(`/api/deletePhoto?id=${photoId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authorization,
            },
            });
        }
    };

    return (
        <>
            <div className={mainStyle.mainCard} style={{width: '100%'}}>
                {
                    isAdmin ? 
                    <Button style={{
                        position: 'absolute',
                        top: '10px', right: '10px'
                    }}
                    onClick={() => handleShow()}
                    >Manage Photos</Button> : null
                }
                <ImageGallery
                    items={data}
                    lazyLoad
                    additionalClass={gellaryStyles.imageGallery}
                    defaultImage={'.placeholder.png'}
                    showPlayButton={false}
                    thumbnailPosition={'right'}
                    thumbnailClass={gellaryStyles.imageGalleryThumbnails}
                />
            </div>
            <div
                id={`confirmation-modal`}
                style={{ display: 'block', position: 'initial' }}
                >
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete Listing</Modal.Title>
                    </Modal.Header>

                    <Modal.Body style={{display: 'flex', flexDirection: "row", alignItems:'center', justifyContent: 'center', flexWrap: 'wrap'}}>
                    {
                        data.map((photo) => {
                            return (
                                <div key={photo.id} className={gellaryStyles.deleteThumbnails}>
                                    <ClearIcon color='warning' 
                                        style={{cursor: 'pointer'}}
                                        onClick={() => {
                                            setDeleteIds([...deletingIds, photo.id])
                                            // deletingIds.push(photo.id);
                                            const filtered = data.filter((image) => {
                                                return (image.id !== photo.id)
                                            })
                                            setData(filtered);
                                    }} />
                                    <Image src={photo.original} alt={"place holder..."}
                                        width={200} height={300}
                                    />
                                </div>
                            )
                        })
                    }
                    </Modal.Body>

                    <Modal.Footer>
                    <Button variant="secondary" onClick={
                        () => {
                            setDeleteIds([]);
                            setData(images);
                            handleClose();
                        }
                    }>
                        Cancel
                    </Button>
                    <Button variant="outline-danger"
                        onClick={() => {requestDeletion()}}
                    >Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default GalleryComponent;