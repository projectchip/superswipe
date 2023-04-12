import React, {useState} from 'react';
import mainStyle from '../styles/mainData.module.css';
import gellaryStyles from '../styles/gallery.module.css';
import "node_modules/react-image-gallery/styles/css/image-gallery.css";
import "../styles/gallery.module.css";
import ImageGallery from 'node_modules/react-image-gallery';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const GalleryComponent = ({photos}) => {
    const images = []

    photos.forEach((photo) => {
        images.push({
            id: photo._id,
            original: photo.image,
            thumbnail: photo.image
        })
    })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const requestDeletion = async () => {
        // const response = await fetch(`/api/deleteListing?id=${content[0]._id}`, {
        //   method: 'DELETE',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': authorization,
        //   },
        // });
        // response.status == 200 ? handleClose() : null;
        // window.location.reload();
    };



    return (
        <>
            <div className={mainStyle.mainCard} style={{width: '100%'}}>
                <ImageGallery
                    items={images}
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
        </>
    );
};

export default GalleryComponent;