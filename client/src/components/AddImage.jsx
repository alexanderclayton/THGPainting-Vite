import React, { useState } from "react";
import { ref } from 'firebase/storage';
import { useMutation } from '@apollo/client';
import { useFileUpload } from "../utils/firebase";
import { ADD_PROJECT_IMAGE } from "../utils/mutations";

const AddImage = ({ projectId }) => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { fileUpload, storage } = useFileUpload();
  const [addProjectImage] = useMutation(ADD_PROJECT_IMAGE);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpload = async () => {
    const storageRef = ref(storage, `projectImages/${projectId}/${image.name}`);
    const downloadURL = await fileUpload(image, storageRef);
    console.log("AddImage downloadURL:", downloadURL);

    addProjectImage({
      variables: { downloadURL: downloadURL, projectId: projectId },
    });
  };

  return (
    <div>
      {imagePreview ? (
        <img src={imagePreview} style={{ width: '200px', height: 'auto' }} alt="preview" />
      ) : (
        <div className="placeholder">Choose an image</div>
      )}
      <input type="file" onChange={handleImageChange} />
      <button type="button" onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default AddImage;