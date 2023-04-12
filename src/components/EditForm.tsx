import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '@/src/styles/admin.module.css';
import TextField from '@mui/material/TextField';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {Image} from 'react-bootstrap';
import PropTypes from 'prop-types';
import InputAdornment from '@mui/material/InputAdornment';
import SnackBar from '../components/SnackBar';
// import LoadingPopup from './LoadingPopup';
import {
  submitNewEntry,
  updateExistingEntry,
  handleImage,
  TITLELIMIT,
  DESCRIPTIONLIMIT,
  GENERALLIMIT,
  SOURCEURL,
} from '../util/inputValidation';


const EditForm = () => {
    const router = useRouter();
    const queryId = router.query.id;
    const [loading, setLoading] = useState(true);
    // const [content, setContent] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [industry, setIndustry] = useState('');
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState('');
    const [source, setSource] = useState('');
    const [url, setUrl] = useState('');
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState('');
    const [uploadImages, setUploadImages] = useState([]);

    useEffect(() => {
        if (!queryId) {
            return;
        }
        getListingDetails();
        console.log(router.query.id);
    }, [queryId]);

    const getListingDetails = async () => {
        const conents = await fetch(`/api/listingDetails?id=${router.query.id}`)
        const result = await conents.json();
        
        setId(result[0]._id);
        setTitle(result[0].title);
        setDescription(result[0].description);
        setCategory(result[0].category);
        setIndustry(result[0].industry);
        setAuthor(result[0].author);
        setSource(result[0].source);
        setUrl(result[0].url);
        setTags(result[0].tags);
        setLoading(false);
    }

    const handleUpdate = async () => {
        const result = await updateExistingEntry({
            id: queryId,
            title,
            description,
            author,
            category,
            industry,
            source,
            url,
            tags,
            image: base64Image}, image,
        setLoading, setOpenSnackbar,
        setErrorMessage, uploadImages);
        result ? router.push("/information?id="+queryId): null;
    }
    
    return (
        <div style={{minHeight: "80vh"}}>
            {
                loading ? 
                    <Box sx={{display: 'flex', flexGrow: 1, justifyContent: 'center'}}>
                        <CircularProgress />
                    </Box>
                :
                <div id="new-listing-form-container" className={styles.listingFormDiv}>
                    <div id="form-container" className={styles.formContainer}>
                        <h3>New Listing Form</h3>
                        <form style={{display: 'flex', flexDirection: 'column'}}>
                            <TextField
                            id='formTitle'
                            className={styles.entryformInput}
                            inputProps={{
                                maxLength: TITLELIMIT,
                            }}
                            label="Title"
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                {`${title.length}/${TITLELIMIT}`}</InputAdornment>,
                            }}
                            required
                            error={false}
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            />
                            <textarea
                            className={styles.textArea}
                            id='formDescription'
                            placeholder='Description (Min 50 and Max 1024 characters)'
                            required
                            minLength={50}
                            maxLength={DESCRIPTIONLIMIT}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                            />
                            <span style={{
                            alignSelf: 'end',
                            marginTop: '-30px',
                            marginRight: '12px',
                            paddingBottom: '30px',
                            color: 'gray',
                            }}>
                            {`${description.length}/${DESCRIPTIONLIMIT}`}
                            </span>
                            <TextField
                            className={styles.entryformInput}
                            inputProps={{maxLength: 40}}
                            label='Category'
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                {`${category.length}/${GENERALLIMIT}`}
                                </InputAdornment>,
                            }}
                            required
                            value={category}
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            />
                            <TextField
                            className={styles.entryformInput}
                            inputProps={{maxLength: 40}}
                            label='Industry'
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                {`${industry.length}/${GENERALLIMIT}`}
                                </InputAdornment>,
                            }}
                            required
                            value={industry}
                            onChange={(e) => {
                                setIndustry(e.target.value);
                            }}
                            />
                            <TextField
                            className={styles.entryformInput}
                            inputProps={{maxLength: 40}}
                            label='Author'
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                {`${author.length}/${GENERALLIMIT}`}
                                </InputAdornment>,
                            }}
                            required
                            value={author}
                            onChange={(e) => {
                                setAuthor(e.target.value);
                            }}
                            />
                            <TextField
                            className={styles.entryformInput}
                            inputProps={{maxLength: 128}}
                            label='Source'
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                {`${source.length}/${GENERALLIMIT}`}
                                </InputAdornment>,
                            }}
                            required
                            value={source}
                            onChange={(e) => {
                                setSource(e.target.value);
                            }}
                            />
                            <TextField
                            className={styles.entryformInput}
                            inputProps={{maxLength: 256}}
                            label='URL'
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                {`${url.length}/${SOURCEURL}`}
                                </InputAdornment>,
                            }}
                            required
                            value={url}
                            onChange={(e) => {
                                setUrl(e.target.value);
                            }}
                            />
                            <TextField
                            className={styles.entryformInput}
                            inputProps={{maxLength: 256}}
                            label='Tags'
                            InputProps={{
                                endAdornment: <InputAdornment position="end">
                                {`${tags.length}/${SOURCEURL}`}
                                </InputAdornment>,
                            }}
                            required
                            value={tags}
                            onChange={(e) => {
                                setTags(e.target.value);
                            }}
                            />
                            <TextField
                            className={styles.entryformInput}
                            type='file'
                            id='imageSelector'
                            placeholder='Image (max 3MB)'
                            required
                            inputProps={{
                                multiple: true,
                                accept:["image/png", "image/gif", "image/jpeg"]
                            }}
                            onChange={(event: any) => {
                                if (event.target.files.length > 0 && event.target.files.length <= 6){
                                    setUploadImages(event.target.files);
                                    handleImage(event, setImage, setBase64Image);
                                } else {
                                    setErrorMessage('Maximum of 6 pictures are allowed in a single upload');
                                    setOpenSnackbar(true);
                                }
                            }}
                            />
                        </form>
                        <div style={{minWidth: "350px", display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant="primary" onClick={() => {handleUpdate()}}>
                                Update Listing
                            </Button>
                            <Button variant="primary" onClick={() => {router.push("/information?id="+queryId)}}>
                                Cancel
                            </Button>
                        </div>
                        {
                            image ?
                            <Image alt='Selected Image' src={URL.createObjectURL(image)}
                            style={{width: '100%'}}/> : null
                        }
                        <SnackBar
                        openSnackbar={openSnackbar}
                        setOpenSnackbar={setOpenSnackbar}
                        message={errorMessage} />
                    </div>
                </div>
            }
        </div>
    )
}

export default EditForm;