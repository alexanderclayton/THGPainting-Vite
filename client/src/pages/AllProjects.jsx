import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { GET_PROJECTS } from '../utils/queries';
import Sidebar from '../components/Sidebar';

const AllProjects = () => {

    const { loading, error, data } = useQuery(GET_PROJECTS);
    console.log('data:', data)

    if (loading) return <p>Loading...</p>
    if (error) return <p>{error.message}</p>

    return (
        <div className="all-projects">
            <Sidebar />
            <div>
                <p className="text-content">All Projects</p>
                {data.getProjects.map(project => (
                    <Link to={`project/${project.id}`} className="all-project-card" key={project.id}>
                        <p className="project-description">{project.description}</p>
                        <p className="project-start">{project.startDate}</p>
                        <p className="project-end">{project.endDate}</p>
                        <p classname="project-type">{project.projectType}</p>
                        <p className="project-paid">{project.paid}</p>
                        <p className="project-payment-type">{project.paymentType}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default AllProjects;
