import React, { useState } from 'react';
import { ref } from 'firebase/storage';
import { useMutation } from '@apollo/client';
import { useFileUpload } from '../utils/firebase';
import { ADD_CLIENT_HOME_PHOTO } from '../utils/mutations';

const AddHomePhoto = ({clientId}) => {
    const [homePhoto, setHomePhoto] = useState(null);
    const [homePhotoPreview, setHomePhotoPreview] = useState(null);

    const { fileUpload, storage } = useFileUpload();
    const [addHomePhoto] = useMutation(ADD_CLIENT_HOME_PHOTO);

    const handleImageChange = (e) => {
        setHomePhoto(e.target.files[0]);
        setHomePhotoPreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleUpload = async () => {
        const storageRef = ref(storage, `homePhotos/${clientId}/${homePhoto.name}`);
        const downloadURL = await fileUpload(homePhoto, storageRef);
        console.log("AddHomePhoto downloadURL:", downloadURL);

        addHomePhoto({
            variables: { downloadURL: downloadURL, clientId: clientId },
        });
    };

    return (
        <div>
            {homePhotoPreview ? (
                <img src={homePhotoPreview} style={{ width: '200px', height: 'auto' }} alt='preview' />
            ) : (
                <div className='placeholder'>Choose an image</div>
            )}
            <input type='file' onChange={handleImageChange} />
            <button type='button' onClick={handleUpload}>Upload Image</button>
        </div>
    )
}

export default AddHomePhoto;