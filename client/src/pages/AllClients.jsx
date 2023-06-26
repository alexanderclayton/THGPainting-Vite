import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_CLIENTS } from '../utils/queries';
import AddClient from '../components/AddClient';
import Sidebar from '../components/Sidebar';

const AllClients = () => {

    const [showForm, setShowForm] = useState(false);

    const { loading, error, data } = useQuery(GET_CLIENTS);
    console.log('data:', data)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    const handleFormSubmit = () => {
        console.log('Added new client!');
        alert('Client added successfully!')
        window.location.reload();
    };



    return (
        <div className="all-clients">
            <Sidebar />
            <div className="bg-red-700">
                <p>All Clients</p>
                {data.getClients.map(client => (
                    <Link to={`client/${client.id}`} className="client-card" key={client.id}>
                        <p>{client.name}</p>
                        <p>{client.address}</p>
                        <p>{client.email}</p>
                        <p>{client.phoneNumber}</p>
                    </Link>
                ))}
                {showForm && <AddClient onFormSubmit={handleFormSubmit} />}
                <button onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'cancel' : 'Add Client'}
                </button>
            </div>
        </div>
    );
}

export default AllClients;