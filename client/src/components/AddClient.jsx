import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_CLIENT } from '../utils/mutations';

const schema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  email: yup.string().email().required(),
  phoneNumber: yup.string().required(),
});

const AddClient = ({ onFormSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [addClient, { loading, error }] = useMutation(ADD_CLIENT);

  if (loading) { console.log("Loading...")};
  if (error) { console.log (error)};
  

  const onSubmit = async (data) => {
    try {
      await addClient({ variables: data });
      onFormSubmit();
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input type="text" {...register('name')} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>

      <div>
        <label>Address:</label>
        <input type="text" {...register('address')} />
        {errors.address && <span>{errors.address.message}</span>}
      </div>

      <div>
        <label>Email:</label>
        <input type="text" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Phone Number:</label>
        <input type="text" {...register('phoneNumber')} />
        {errors.phoneNumber && <span>{errors.phoneNumber.message}</span>}
      </div>

      <button type="submit">Add Client</button>
    </form>
  );
};

export default AddClient;