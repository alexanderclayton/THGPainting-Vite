import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { GET_CLIENT } from '../utils/queries';
import AddProject from '../components/AddProject';
import UpdateClient from '../components/UpdateClient';
import Sidebar from '../components/Sidebar';

const Client = () => {
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [showUpdateClientForm, setShowUpdateClientForm] = useState(false);
  const [showUpdateClientButton, setShowUpdateClientButton] = useState(true);

  const { id } = useParams();

  const { loading, error, data } = useQuery(GET_CLIENT, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const handleUpdateClientFormSubmit = () => {
    setShowUpdateClientForm(false);
    setShowUpdateClientButton(true);
  };

  const handleUpdateClientButtonClick = () => {
    setShowUpdateClientForm(true);
    setShowUpdateClientButton(false);
  };

  console.log("photoURL:", data?.getClient.homePhoto)

  return (
    <div className="client">
      <Sidebar />
      <div>
        <p>Client: {data?.getClient?.name}</p>
        <p>Address: {data?.getClient?.address}</p>
        <p>Email: {data?.getClient?.email}</p>
        <p>Phone Number: {data?.getClient?.phoneNumber}</p>
        <p>Photos:</p>
        {data?.getClient?.homePhoto.map((image) => (
          <img src={image} style={{width: '200px', height: 'auto' }} alt='clients home' key={image} />
        ))}
        <p>Projects:</p>
        {data.getClient.projects.map((project) => (
          <Link to={`../all-projects/project/${project.id}`} className="project-card" key={project.id}>
            <p>{project.startDate}</p>
            <p>{project.endDate}</p>
          </Link>
        ))}
        {showUpdateClientForm && (
          <UpdateClient
            client={data?.getClient}
            onSubmit={() => handleUpdateClientFormSubmit()}
          />
        )}
        {showUpdateClientButton && (
          <button className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={() => handleUpdateClientButtonClick()}>
            Update Client
          </button>
        )}
        {showAddProjectForm && <AddProject clientId={data?.getClient?.id} />}
        <button className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={() => setShowAddProjectForm(!showAddProjectForm)}>
          {showAddProjectForm ? 'cancel' : 'Add Project'}
        </button>
      </div>
    </div>
  );
};

export default Client;