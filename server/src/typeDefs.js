import { gql } from 'apollo-server-express';
import todoTypeDef from './graphql.typedefs/todoTypeDefs.js';

const rootTypeDef = gql `
    type Query {
        getTasks: [Task]
        getTask(_id: ID!): Task
    }
    
    type Mutation {
        addTask(
            task: String!
            deadline: String!
        ): Task

        deleteTask(
            _id: ID!
        ): Task

        updateTask(
            _id: ID!
            task: String!
            deadline: String!
        ): Task
    }
`
const typeDefs = [ rootTypeDef, todoTypeDef ];

export default typeDefs;