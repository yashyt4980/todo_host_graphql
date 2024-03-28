import { gql } from 'apollo-server-express';
const todoTypeDef = gql `
    type Task {
        task: String!
        deadline: String!
        _id: ID!
    }
`
export default todoTypeDef;