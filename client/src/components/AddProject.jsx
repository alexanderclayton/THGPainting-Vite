import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../utils/mutations';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const schema = yup.object().shape({
  description: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  clientId: yup.string().required(),
  projectType: yup.string().required(),
  paid: yup.boolean().required(),
  paymentType: yup.string(),
  images: yup.string(),
  paintColors: yup.string()
});

const AddProject = ({ clientId, onFormSubmit }) => {

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [paid, setPaid] = useState(null);

  const { register, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [addProject, { loading, error }] = useMutation(ADD_PROJECT);
  if (loading) { return <p>Loading...</p> }
  if (error) { return <p>Error</p> }

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

  const onSubmit = async (data) => {
    let { description, startDate, endDate, clientId, projectType, paid, paymentType, images } = data;
    console.log('New project submitted', data)
    if (!images) {
      images = []
    }
    if(!paymentType) {
      paymentType = "NONE"
    }
    try {
      await addProject({
        variables: { description, startDate, endDate, clientId, projectType, paid, paymentType, images },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior

    const formData = new FormData(event.target); // extract form data

    // convert form data to JSON object
    const data = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value;
    }

    // Add the startDate property to the data object
    data.startDate = startDate;
    data.endDate = endDate;
    data.clientId = clientId;
    data.paid = paid;

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor='description'>Project Description</label>
        <input className="border" type='text' {...register('description')} />
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <br />
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          onBlur={handleStartDateBlur}
          dateFormat="MM/dd/yyyy"
          minDate={new Date()}
          className={`form-control border ${errors.startDate ? "is-invalid" : ""}`}
        />
        {errors.startDate && (
          <div className="invalid-feedback">{errors.startDate.message}</div>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="endDate">End Date</label>
        <br />
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          onBlur={handleEndDateBlur}
          dateFormat="MM/dd/yyyy"
          minDate={startDate}
          className={`form-control border ${errors.endDate ? "is-invalid" : ""}`}
        />
        {errors.endDate && (
          <div className="invalid-feedback">{errors.endDate.message}</div>
        )}
      </div>
      <div>
        <label>Project Type:</label>
        <select {...register("projectType")}>
          {projectTypeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.projectType && <span>{errors.projectType.message}</span>}
      </div>

      <div>
        <label>Paid:</label>
        <input
          type="checkbox"
          name="paid"
          value={true}
          checked={watch("paid") === true}
          onChange={handleCheckboxChange}
        />
        <span>Yes</span>
        <input
          type="checkbox"
          name="paid"
          value={false}
          checked={watch("paid") === false}
          onChange={handleCheckboxChange}
        />
        <span>No</span>
        {errors.paid && <span>{errors.paid.message}</span>}
      </div>

      <button className="border" type="submit">Add Project</button>
    </form>
  );
};

export default AddProject;