import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { UPDATE_CLIENT, DELETE_CLIENT } from '../utils/mutations';
import AddHomePhoto from './AddHomePhoto';

const UpdateClient = ({ client, onSubmit }) => {
  const [updateSuccessful, setUpdateSuccessful] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: client.name,
      address: client.address,
      email: client.email,
      phoneNumber: client.phoneNumber,
    },
  });

  const [updateClient] = useMutation(UPDATE_CLIENT);
  const [deleteClient] = useMutation(DELETE_CLIENT);

  const handleFormSubmit = async (data) => {
    try {
      const updatedClient = {
        id: client.id,
        name: data.name,
        address: data.address,
        email: data.email,
        phoneNumber: data.phoneNumber,
      };
      await updateClient({
        variables: {
          id: client._id,
          ...updatedClient,
        },
      });
      setUpdateSuccessful(true);
      setShowForm(false); // hide the form after successful update
      onSubmit(); // callback to show the update client button again
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteClient({
        variables: {
          id: id,
        },
      });
      window.location.replace('/all-clients');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      {showForm && (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
          />
          {errors.name && <span>Name is required</span>}
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            {...register('address', { required: true })}
          />
          {errors.address && <span>Address is required</span>}
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>Email is required</span>}
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            {...register('phoneNumber', { required: true })}
          />
          {errors.phoneNumber && (
            <span>Phone Number is required</span>
          )}
          <div>
            <label htmlFor='homePhotos'>Home Photos:</label>
            <AddHomePhoto clientId={client.id} />
          </div>
          <button type="submit">Update Client</button>
          <button type="button" onClick={() => handleDelete(client.id)}>Delete Client</button>
        </form>
      )}
      {updateSuccessful && (
        <p>Client updated successfully!</p>
      )}
    </>
  );
};

export default UpdateClient;