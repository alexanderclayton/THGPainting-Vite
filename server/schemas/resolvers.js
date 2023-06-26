import { AuthenticationError } from 'apollo-server-express';
import { UserInputError } from 'apollo-server-errors';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Client from '../models/Client.js';
import Project from '../models/Project.js';
import { signToken } from '../utils/authMiddleware.js';

const resolvers = {
    Query: {
        getClients: async (parent, { }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Must be an authorized user to view this page.');
            }
            try {
                const clients = await Client.find().populate('projects').exec();
                return clients;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getClient: async (_, { id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Must be an authorized user to view this page.');
            }
            try {
                const client = await Client.findById(id).populate('projects').exec();
                if (!client) {
                    throw new Error(`No client with id: ${id} found...`);
                }
                return client;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },

        getProjects: async (_, { }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Must be an authorized user to view this page.');
            }
            try {
                const projects = await Project.find();
                return projects;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getProject: async (_, { id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Must be an authorized user to view this page.');
            }
            try {
                const project = await Project.findById(id);
                if (!project) {
                    throw new Error(`No project with id ${id} found...`)
                }
                return project;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        getProjectImages: async (_, { projectId }, context) => {
            if (!context.user) {
                throw new AuthenticationError('Must be an authorized user to view this page.');
            }
            const images = await firebaseProjectImages(projectId);
            return images;
        },
    },
    Mutation: {
        addClient: async (_, { name, address, email, phoneNumber, homePhoto }) => {
            try {
                const client = new Client({ name, address, email, phoneNumber, homePhoto });
                await client.save();
                return client;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        updateClient: async (_, { id, name, address, email, phoneNumber }) => {
            try {
                const updatedClient = await Client.findByIdAndUpdate(
                    id,
                    { name, address, email, phoneNumber },
                    { new: true }
                ).populate('projects');
                return updatedClient;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        deleteClient: async (_, { id }) => {
            try {
                const deletedClient = await Client.findByIdAndDelete(id);
                if (!deletedClient) {
                    throw new Error('Client not found.');
                }
                // delete all projects associated with the client
                const deletedProjects = await Project.deleteMany({
                    clientId: deletedClient.id
                });
                console.log(`Deleted ${deletedProjects.deletedCount} projects.`);
                return deletedClient;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },

        addProject: async (_, { description, startDate, endDate, projectType, paid, paymentType, images, paintColors, clientId }) => {
            try {
                const project = new Project({ description, startDate, endDate, clientId, projectType, paid, paymentType, images, paintColors });
                await project.save();
                const client = await Client.findByIdAndUpdate(clientId.toString(), { $push: { projects: project.id } });
                return project;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },

        updateProject: async (_, { id, description, startDate, endDate, clientId, projectType, paid, paymentType, paintColors }) => {
            try {
                const updatedProject = await Project.findByIdAndUpdate(
                    id,
                    { description, startDate, endDate, clientId, projectType, paid, paymentType, paintColors },
                    { new: true }
                );
                return updatedProject;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },

        deleteProject: async (_, { id }) => {
            try {
                const deletedProject = await Project.findByIdAndDelete(id);
                const client = await Client.findByIdAndUpdate(
                    deletedProject.clientId,
                    { $pull: { projects: deletedProject._id } }
                );
                return deletedProject;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        addUser: async (parent, { name, email, password, avatar }) => {
            if (!avatar) {
                avatar = ''
            }
            const user = await User.create({ name, email, password, avatar });
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("No user with this email found!");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect password!");
            }

            const token = signToken(user);
            return { token, user };
        },
        addProjectImage: async (_, { projectId, downloadURL }, context) => {
            // First, check if the user is authenticated
            console.log("projectId:", typeof projectId, projectId)
            if (!context.user) {
                throw new AuthenticationError('User must be authenticated');
            }
            if (!mongoose.Types.ObjectId.isValid(projectId)) {
                throw new UserInputError('Invalid projectId');
            }
            // Then, find the project with the given projectId
            const project = await Project.findById(projectId);

            // If project not found, throw an error
            if (!project) {
                throw new UserInputError('Project not found');
            }

            // Push the downloadURL to the images array and save the project
            project.images.push(downloadURL);
            const updatedProject = await project.save();

            return updatedProject;
        },
        addHomePhoto: async (_, { clientId, downloadURL }, context) => {
            console.log("clientId:", typeof clientId, clientId)
            if (!context.user) {
                throw new AuthenticationError('User must be authenticated');
            }
            if (!mongoose.Types.ObjectId.isValid(clientId)) {
                throw new UserInputError('Invalid clientId');
            }
            const client = await Client.findById(clientId);
            if (!client) {
                throw new UserInputError('Client not found');
            }
            client.homePhoto.push(downloadURL);
            const updatedClient = await client.save();

            return updatedClient; 
        }
    },
};

export default resolvers;

  