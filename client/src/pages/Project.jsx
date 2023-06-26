import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PROJECT } from '../utils/queries';
import UpdateProject from '../components/UpdateProject';
import Sidebar from '../components/Sidebar';

const Project = () => {
    const [showUpdateProjectForm, setShowUpdateProjectForm] = useState(false);
    const [showUpdateProjectButton, setShowUpdateProjectButton] = useState(true);

    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id: id }
    });

    const startingDate = new Date(data?.getProject?.startDate).toLocaleDateString();
    const endingDate = new Date(data?.getProject?.endDate).toLocaleDateString();

    let isItPaid;
    if (data?.getProject?.paid === true) {
        isItPaid = "Yes"
    } else {
        isItPaid = "No"
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    const handleUpdateProjectFormSubmit = () => {
        setShowUpdateProjectForm(false);
        setShowUpdateProjectButton(true);
    };

    const handleUpdateProjectButtonClick = () => {
        setShowUpdateProjectForm(true);
        setShowUpdateProjectButton(false);
    };

    console.log(data)

    return (
        <div className="project">
            <Sidebar />
            <div>
                <p>Description: {data?.getProject?.description}</p>
                <p>Project Type: {data?.getProject?.projectType}</p>
                <p>Start Date: {startingDate}</p>
                <p>End Date: {endingDate}</p>
                <p>Paid: {isItPaid}</p>
                <p>Payment Type: {data?.getProject?.paymentType}</p>
                <p>Images:</p>
                {data?.getProject?.images.map((image) => (
                    <img src={image} style={{ width: '200px', height: 'auto' }} alt="current project" key={image} />
                ))}
                {showUpdateProjectForm && (
                    <UpdateProject
                        project={data?.getProject}
                        onSubmit={() => handleUpdateProjectFormSubmit()}
                    />
                )}
                {showUpdateProjectButton && (
                    <button onClick={() => handleUpdateProjectButtonClick()}>
                        Update Project
                    </button>
                )}
            </div>
        </div>
    )
}

export default Project;