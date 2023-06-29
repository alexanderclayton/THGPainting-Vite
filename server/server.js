import mongoose from 'mongoose';
import express from 'express';
import http from 'http';
import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import bodyParser from 'body-parser';
import resolvers from './schemas/resolvers.js';
import typeDefs from './schemas/typeDefs.js';
import { authMiddleware } from './utils/authMiddleware.js';
import { clientMiddleware } from './utils/clientMiddleware.js';

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thgpainting', { //the database name can be changed
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const httpServer = http.createServer(app);
const API_PORT = process.env.API_PORT || 3001;

const server = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startApolloServer = async () => {

    await server.start();

    app.use(
        '/',
        cors(),
        bodyParser.json({ limit: '50mb' }),
        expressMiddleware(server, {
            context: authMiddleware, clientMiddleware,
        }),
    );

    await new Promise((resolve) => httpServer.listen({ port: API_PORT }, resolve));
    console.log(`API server running on port ${API_PORT}`);
}

startApolloServer();