'use-client'
import React, {useEffect, useState} from "react";
import styles from '../styles/header.module.css'
import GalleryComponent from "./GalleryComponent";
import ContentComponent from "./ContentComponent";
import { useRouter } from "next/router";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const BodyComponent = () => {
    const router = useRouter();
    const queryId = router.query.id;
    const [content, setContent] = useState([]);
    const [photos, setPhotos] = useState([]);
    // console.log(router.query.id);

    useEffect(()=> {
        document.title = 'Listing Details';
        if (!queryId) {
            return;
        }
        getListingDetails();
        getListingImages();
    }, [queryId]);

    const getListingDetails = async () => {
        const conents = await fetch(`/api/listingDetails?id=${router.query.id}`)
        const result = await conents.json();
        setContent(result);
    }

    const getListingImages = async () => {
        const conents = await fetch(`/api/listingPhotos?id=${router.query.id}`)
        const result = await conents.json();
        setPhotos(result);
    }

    return (
        <div className={styles.header}>
            {
                content.length > 0 ? 
                <>
                    <ContentComponent content={content} />
                    {
                        photos.length > 0 ?
                        <GalleryComponent photos={photos}/> : 
                        <h2>No photos uploaded</h2>
                    }
                </> :
                    <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
                        <CircularProgress />
                    </Box>
            }
        </div>
    )
};

export default BodyComponent;