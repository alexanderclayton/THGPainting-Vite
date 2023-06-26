import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_PROJECT, DELETE_PROJECT } from '../utils/mutations';
import { useFileUpload } from '../utils/firebase';
import AddImage from './AddImage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const UpdateProject = ({ project, onSubmit }) => {
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [startDate, setStartDate] = useState(new Date(project.startDate));
  const [endDate, setEndDate] = useState(new Date(project.endDate));
  const [paid, setPaid] = useState(null);

  const { deleteFile } = useFileUpload();

  const { register, setValue, watch, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      description: project.description,
      startDate: new Date(project.startDate),
      endDate: new Date(project.endDate),
      projectType: project.projectType,
      paid: project.paid,
      paymentType: project.paymentType,
      images: project.images,
    },
  });

  console.log(project)

  const [updateProject] = useMutation(UPDATE_PROJECT);
  const [deleteProject] = useMutation(DELETE_PROJECT);

  const handleStartDateChange = (date) => {
    console.log('Selected start date:', date);
    setValue('startDate', date, { shouldValidate: true });
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    console.log('Selected end date:', date);
    setValue('endDate', date, { shouldValidate: true });
    setEndDate(date);
  };

  const handleStartDateBlur = () => {
    register('startDate').onBlur();
  };

  const handleEndDateBlur = () => {
    register('endDate').onBlur();
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    const newValue = checked ? value === "true" : false; // set a default value of false if checkbox is not checked
    setValue(name, newValue);
    setPaid(newValue)
  };

  const projectTypeOptions = ["PAINTING", "CHRISTMAS_LIGHTS", "OTHER"];
  const paymentTypeOptions = ["CASH", "CHECK", "VENMO", "NONE"];

  const handleFormSubmit = async (data) => {
    try {
      const updatedProject = {
        id: project.id,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        clientId: project.clientId,
        projectType: data.projectType,
        paid: data.paid,
        paymentType: data.paymentType,
        images: data.images,
      };
      await updateProject({
        variables: {
          id: project._id,
          clientId: project.clientId,
          ...updatedProject,
        },
      });
      setUpdateSuccessful(true);
      setShowForm(false);
      onSubmit();
    } catch (error) {
      console.error(error)
    }
  };

  const images = project.images;
  console.log("images:", images)

  const handleDelete = async (projectId) => {
    try {
      const imageUrls = images.map((url) => url);
      await Promise.all(imageUrls.map((url) => deleteFile(url))); // delete all images in parallel
      await deleteProject({
        variables: { id: projectId },
      });
      window.location.replace('/all-projects')
    } catch (error) {
      console.error(error)
    }
  };



  return (
    <>
      {showForm && (
        <form className="update-project-form" onSubmit={handleSubmit(handleFormSubmit)}>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" {...register("description")} />
          {errors.description && <span className="error">{errors.description.message}</span>}

          <label htmlFor="startDate">Start Date:</label>
          <DatePicker id="startDate" selected={startDate} onChange={handleStartDateChange} onBlur={handleStartDateBlur} />

          <label htmlFor="endDate">End Date:</label>
          <DatePicker id="endDate" selected={endDate} onChange={handleEndDateChange} onBlur={handleEndDateBlur} />

          <label htmlFor="projectType">Project Type:</label>
          <select id="projectType" {...register("projectType")}>
            {projectTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div>
            <label>Paid:</label>
            <input
              type="checkbox"
              name="paid"
              value={true}
              checked={watch("paid") === true}
              onChange={handleCheckboxChange}
              id="paid-yes"
            />
            <label htmlFor="paid-yes">Yes</label>
            <input
              type="checkbox"
              name="paid"
              value={false}
              checked={watch("paid") === false}
              onChange={handleCheckboxChange}
              id="paid-no"
            />
            <label htmlFor="paid-no">No</label>
            {errors.paid && <span>{errors.paid.message}</span>}
          </div>

          <label htmlFor="paymentType">Payment Type:</label>
          <select id="paymentType" {...register("paymentType")}>
            {paymentTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div>
            <label htmlFor="images">Images:</label>
            <AddImage projectId={project.id} />
          </div>

          <div className="form-buttons">
            <button type="submit">Update Project</button>
            <button type="button" onClick={() => handleDelete(project.id)}>Delete Project</button>
            <button type="button" onClick={() => onSubmit()}>Cancel</button>
          </div>
        </form>
      )}

      {updateSuccessful && <p>Project updated successfully!</p>}
    </>
  )
};

export default UpdateProject;