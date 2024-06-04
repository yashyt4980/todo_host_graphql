import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import dbConnect from './src/config/dbConnect.js';
import resolvers from './src/resolvers.js';
import typeDefs from './src/typeDefs.js';
import path from 'path';

const app = express();
const httpServer = http.createServer(app);
const conn = dbConnect();

if(conn) {
    console.log("Database connected Successfully");
} else {
    console.log("Can't connect to database");
    process.exit(0);
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin
    credentials: true, // If you need to send cookies or authorization headers
};

app.use(
    '/',
    express.static(path.join(path.resolve(), '../client/dist')),
    cors(corsOptions), // Add CORS configuration here
    express.json(),
    expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: process.env.PORT || 5000 }, resolve));
console.log(`🚀Server ready at: http://localhost:${process.env.PORT || 5000}/`);
