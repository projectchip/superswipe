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
    const [loading, setLoading] = useState(true);
    const [imagesLoading, setImagesLoading] = useState(true);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const token = localStorage.getItem("token");

        if (!token || JSON.parse(token).role !== "admin") {
            if (accessToken) {
            const {expiry} = JSON.parse(accessToken);
            const currentDateTime = new Date();
        
            if (expiry<currentDateTime.toISOString()) {
                localStorage.clear();
                router.push('/')
            }
            } else {
            router.push('/')
            }
        }
    })

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
        setLoading(false);
        setContent(result);
    }

    const getListingImages = async () => {
        const conents = await fetch(`/api/listingPhotos?id=${router.query.id}`)
        const result = await conents.json();
        setImagesLoading(false);
        setPhotos(result);
    }

    return (
        <div className={styles.header} style={{minHeight: "80vh"}}>
            {
                content.length > 0 ? 
                <>
                    <ContentComponent content={content} />
                    {
                        !imagesLoading ? 
                            photos.length > 0 ?
                            <GalleryComponent photos={photos}/> : 
                            <h2>No photos uploaded</h2>
                        :
                        <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
                            <CircularProgress />
                        </Box>
                        
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