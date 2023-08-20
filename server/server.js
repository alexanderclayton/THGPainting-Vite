import path from 'path';
import express from 'express';
import {ApolloServer} from 'apollo-server-express'; //package needs to be updated October 2023
import typeDefs from './schemas/typeDefs.js';
import resolvers from './schemas/resolvers.js';
import { authMiddleware } from './utils/authMiddleware.js';
import { clientMiddleware } from './utils/clientMiddleware.js';
import db from './config/connection.js';

const __dirname = path.resolve();
const PORT = process.env.PORT || 5174;
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

console.log("dirname:", __dirname);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    })
} else {
    app.use(express.static(path.join(__dirname, '../client')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
    });
}

const startApolloServer = async () => {
    await server.start();

    server.applyMiddleware({ app });

    db.once('open', () => {
        app.listen(PORT, () => {
            console.log(`API server running on port ${PORT}`);
            console.log(`Use GraphQL at http://127.0.0.1:${PORT}${server.graphqlPath}`);
            console.log(server)
        });
    });
};

startApolloServer();