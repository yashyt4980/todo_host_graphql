import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import dbConnect from './src/config/dbConnect.js';
import resolvers from './src/resolvers.js';
import typeDefs from './src/typeDefs.js';
const conn = dbConnect();
if(conn) {
    console.log("Database connected Successfully");
} else {
    console.log("Can' t connect to database");
    process.exit(0);
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});
  
const { url } = await startStandaloneServer(server, {
    listen: { port:  process.env.PORT || 5000 },
});
  
console.log(`🚀  Server ready at: ${url}`);