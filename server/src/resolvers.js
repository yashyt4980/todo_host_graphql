import { addTask, deleteTask, getTask, getTasks, updateTask } from "./graphql.queries/todoQueries.js";

const resolvers = {
    Query: {
        getTask,
        getTasks,
    },

    Mutation: {
        addTask,
        deleteTask,
        updateTask,
    }
}

export default resolvers;