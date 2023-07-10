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
            <div>
                <p className="text-content">All Clients</p>
                {data.getClients.map(client => (
                    <Link to={`client/${client.id}`} className="all-client-card" key={client.id}>
                        <p className="client-name">{client.name}</p>
                        <p className="client-address">{client.address}</p>
                        <p className="client-email">{client.email}</p>
                        <p className="client-phone">{client.phoneNumber}</p>
                    </Link>
                ))}
                {showForm && <AddClient onFormSubmit={handleFormSubmit} />}
                <button className="btn" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'cancel' : 'Add Client'}
                </button>
            </div>
        </div>
    );
}

export default AllClients;