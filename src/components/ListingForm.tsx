import TextField from '@mui/material/TextField';
import React, {ChangeEventHandler, useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styles from '@/src/styles/admin.module.css';
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

const ListingForm = ({editItem}: {editItem: any}) => {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(
            editItem ? editItem.title : '');
    const [description, setDescription] = useState(
            editItem ? editItem.description : '');
    const [category, setCategory] = useState(
            editItem ? editItem.category : '');
    const [industry, setIndustry] = useState(
            editItem ? editItem.industry : '');
    const [author, setAuthor] = useState(
            editItem ? editItem.author : '');
    const [tags, setTags] = useState(
            editItem ? editItem.tags : '');
    const [source, setSource] = useState(
            editItem ? editItem.source : '');
    const [url, setUrl] = useState(
            editItem ? editItem.url : '');
    const [image, setImage] = useState(null);
    const [base64Image, setBase64Image] = useState('');

    const clearAllFields = () => {
        setShow(false);
        setTags('');
        setTitle('');
        setDescription('');
        setAuthor('');
        setCategory('');
        setIndustry('');
        setSource('');
        setUrl('');
        setImage(null);
        setBase64Image('');
      };
    
    const handleUpdate = async () => {
        const result = await updateExistingEntry({
            id: editItem._id,
            title,
            description,
            author,
            category,
            industry,
            source,
            url,
            tags,
            image: base64Image}, image, setShow,
        setLoading, setOpenSnackbar,
        setErrorMessage);
    }

    return (
        <div id="new-listing-form-container" className={styles.listingFormDiv}>
            <div id="form-container" className={styles.formContainer}>
                <h3>New Lising Form</h3>
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
                    placeholder='Image (max 3MB)'
                    required
                    onChange={(event: any) => {
                        handleImage(event, setImage, setBase64Image);
                    }}
                    />
                </form>
                {
                            image ?
                            <Image alt='Selected Image' src={URL.createObjectURL(image)}
                            style={{width: '100%'}}/> : null
                }
                <Button variant="primary" onClick={() => {
                    editItem ? handleUpdate() :
                    submitNewEntry({
                        title,
                        description,
                        author,
                        category,
                        industry,
                        source,
                        url,
                        tags,
                        image: base64Image},
                    image, setLoading, setOpenSnackbar,
                    clearAllFields, setErrorMessage);
                }}>
                    Save Lising
                </Button>
                <SnackBar
                openSnackbar={openSnackbar}
                setOpenSnackbar={setOpenSnackbar}
                message={errorMessage} />
            </div>
        </div>
    )
}

export default ListingForm;