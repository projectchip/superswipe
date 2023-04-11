/* eslint-disable no-tabs */
// import imageCompression from 'browser-image-compression';
import Compressor from "compressorjs";
import { useRouter } from "next/router";
import { ChangeEventHandler, useState } from "react";

const TITLELIMIT = 64;
const DESCRIPTIONLIMIT = 2048;
const GENERALLIMIT = 128;
const SOURCEURL = 256;

const getBase64Image = (file: any, setBase64Image: Function) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setBase64Image(reader.result);
  };
};

const handleMultipleImageUpload = (files: any, listingId: string) =>{
	for (const file of files) {
		new Compressor(file, {
			quality: 0.7,
			mimeType: 'image/jpeg',
			success(result : Blob) {
				const compressedFile = new File([result], file.name, {
				type: result.type,
				lastModified: Date.now(),
				});
				const reader = new FileReader();
				reader.readAsDataURL(compressedFile);
				reader.onload = () => {
					fetch('/api/uploadPhoto', {
						method: 'POST',
						headers: {
						'Content-Type': 'application/json',
						},
						body: JSON.stringify({listingId: listingId, image : reader.result}),
					});
				};
			},
			error(err: any) {
			  console.error(err.message);
			},
		  });
	}
};

const handleImage = async (e: any, setImage: Function, setBase64Image: Function) => {
	if (e.target.files.length > 6) {
		return;
	}
	const file: any = e?.target.files;
	setImage(file[0]);

	new Compressor(file[0], {
		quality: 0.3,
		mimeType: 'image/jpeg',
		success(result : Blob) {
		const compressedFile = new File([result], file.name, {
			type: result.type,
			lastModified: Date.now(),
		});
		getBase64Image(compressedFile, setBase64Image);
		},
		error(err: any) {
		console.error(err.message);
		},
	});
};

const validateTitle = (title: string, setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (title.length < 20 || title.length > TITLELIMIT) {
    setErrorMessage('Title must be between 20 and 64 characters long');
    setOpenSnackbar(true);
    return false;
  }
  return true;
};

const validateDescription = (description: string, setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (description.length < 50 || description.length > DESCRIPTIONLIMIT) {
    setErrorMessage(
        'Description must be between 50 and 2048 characters long');
    setOpenSnackbar(true);
  }
  return description.length > 50 && description.length <= DESCRIPTIONLIMIT;
};

const validateAuthor = (author: string, setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (author.length < 2 || author.length > GENERALLIMIT) {
    setErrorMessage('Author must be between 2 and 128 characters long');
    setOpenSnackbar(true);
  }
  return author.length >=2 && author.length <= GENERALLIMIT;
};

const validateIndustry = (industry:string, setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (industry.length < 2 || industry.length > GENERALLIMIT) {
    setErrorMessage('Industry must be between 2 and 128 characters long');
    setOpenSnackbar(true);
  }
  return industry.length >= 2 && industry.length <= 128;
};

const validateCategory = (category: string, setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (category.length < 2 || category.length > GENERALLIMIT) {
    setErrorMessage('Category must be between 2 and 128 characters long');
    setOpenSnackbar(true);
  }
  return category.length >= 2 && category.length <= 128;
};
const validateSource = (source: string, setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (source.length < 2 || source.length > SOURCEURL) {
    setErrorMessage('Source must be between 2 and 256 characters long');
    setOpenSnackbar(true);
  }
  return source.length >= 2 && source.length <= 256;
};

const validateURL = (url: string, setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (url.length < 6 || url.length > SOURCEURL) {
    setErrorMessage('URL must be between 6 and 256 characters long');
    setOpenSnackbar(true);
    return false;
  }
  // eslint-disable-next-line max-len
  const regx = /^(http(s)?:\/\/.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  if (!regx.test(url)) {
    setErrorMessage('Please enter a valid URL');
    setOpenSnackbar(true);
    return false;
  }
  return true;
};

const validateTags = (tags: string, setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (tags.length < 2 || tags.length > GENERALLIMIT) {
    setErrorMessage('Tags must be between 2 and 128 characters long');
    setOpenSnackbar(true);
  }
  return tags.length > 2 && tags.length <= 256;
};

const validateImage = (base64Image: string, image: Blob|null,
    setOpenSnackbar: Function, setErrorMessage: Function) => {
  if (base64Image.length == 0 || image == null) {
    setErrorMessage('Please select an Image');
    setOpenSnackbar(true);
    return false;
  }
  if (!['image/png', 'image/jpeg', 'image/gif'].includes(image.type)) {
    setErrorMessage('Invalid File Type - Only JPEG, GIF, PNG are allowed');
    setOpenSnackbar(true);
    return false;
  }
  if (image.size > 3170000) {
    setErrorMessage('Image is too Large - Max file size allowed is 3MB');
    setOpenSnackbar(true);
    return false;
  }
  return true;
};

const validateAllInputs = (data: any, image: Blob|null, setOpenSnackbar: Function, setErrorMessage: Function) => {
  return (
    validateTitle(data.title, setOpenSnackbar, setErrorMessage) &&
		validateDescription(data.description, setOpenSnackbar, setErrorMessage) &&
		validateCategory(data.category, setOpenSnackbar, setErrorMessage) &&
		validateIndustry(data.industry, setOpenSnackbar, setErrorMessage) &&
		validateAuthor(data.author, setOpenSnackbar, setErrorMessage) &&
		validateSource(data.source, setOpenSnackbar, setErrorMessage) &&
		validateURL(data.url, setOpenSnackbar, setErrorMessage) &&
		validateTags(data.tags, setOpenSnackbar, setErrorMessage) &&
		validateImage(data.image, image, setOpenSnackbar, setErrorMessage)
  );
};

const toTitleCase = (str: string) => {
	return str.toLowerCase().split(' ').map(function (word) {
	  return (word.charAt(0).toUpperCase() + word.slice(1));
	}).join(' ');
}

const submitNewEntry = async (
    data: any, image: Blob|null, setLoading: Function, setOpenSnackbar: Function,
    clearAllFields: Function, setErrorMessage: Function, uploadImages: Array<any>) => {
		const validation = validateAllInputs(data, image,
			setOpenSnackbar, setErrorMessage);
		if (validation) {
			setLoading(true);
			const newEntry = {
				title: toTitleCase(data.title),
				description : data.description,
				author: toTitleCase(data.author),
				category: toTitleCase(data.category),
				industry: toTitleCase(data.industry),
				source: data.source,
				url: data.url,
				tags: data.tags,
				image: data.image
			};
			const response = await fetch('/api/newEntry', {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				},
				body: JSON.stringify({newEntry}),
			});
			const result = await response.json();
			if (response.status == 201) {
				handleMultipleImageUpload(uploadImages, result.listingId);
				// clearAllFields();
				setLoading(false);
			} else {
				setLoading(false);
			}
		};
};

const updateExistingEntry = async (
    data: any, image: Blob|null, setLoading: Function, setOpenSnackbar: Function,
    setErrorMessage: Function, uploadImages: Array<any>) => {
  const InputValidation = (
    validateTitle(data.title, setOpenSnackbar, setErrorMessage) &&
		validateDescription(data.description, setOpenSnackbar, setErrorMessage) &&
		validateCategory(data.category, setOpenSnackbar, setErrorMessage) &&
		validateIndustry(data.industry, setOpenSnackbar, setErrorMessage) &&
		validateAuthor(data.author, setOpenSnackbar, setErrorMessage) &&
		validateSource(data.source, setOpenSnackbar, setErrorMessage) &&
		validateURL(data.url, setOpenSnackbar, setErrorMessage) &&
		validateTags(data.tags, setOpenSnackbar, setErrorMessage));

    const imageValidation = image ? validateImage(
        data.image, image, setOpenSnackbar, setErrorMessage) : true;
    
    uploadImages.length > 0 ? handleMultipleImageUpload(uploadImages, data.id) : null;

  if (InputValidation && imageValidation) {
    setLoading(true);
    const updated = data;
    const response = await fetch('/api/updateListing', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({updated}),
    });

    if (response.status == 200) {
      setLoading(false);
      return data;
    } else {
      setLoading(false);
      return null;
    }
  };
};

const validateEmail = (email: string) => {
  return email.trim().match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
};


export {
  submitNewEntry,
  updateExistingEntry,
  handleImage,
  validateEmail,
  handleMultipleImageUpload,
  TITLELIMIT,
  DESCRIPTIONLIMIT,
  GENERALLIMIT,
  SOURCEURL,
};
