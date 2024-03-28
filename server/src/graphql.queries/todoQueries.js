import Task from "../models/Task.js";

export const addTask = async (parent, { task, deadline }) => {
    try {
        const task_created = await Task.create({task,deadline});
        task_created.__v = undefined;
        if(task_created) {
            return(task_created);
        } else {
            throw new Error("cannot create data right now")
        }
    } catch(error) {
        throw new Error(error.message);
    }
} 

export const deleteTask = async (parent, { _id }) => {
    try {
        const task_deleted = await Task.findByIdAndDelete({_id});
        task_deleted.__v = undefined;
        if(task_deleted) {
            return(task_deleted);
        } else {
            throw new Error("Cannot delete task right now");
        }
    } catch(error) {
        throw new Error(error.message);
    }
} 

export const updateTask = async (parent, { task, deadline, _id }) => {
    try {
        const task_updated = await Task.findByIdAndUpdate({_id}, {task,deadline}, { new: true });
        task_updated.__v = undefined;
        if(task_updated) {
            return(task_updated);
        } else {
            throw new Error("Cannot update task right now");
        }
    } catch(error) {
        throw new Error(error.message);
    }
} 

export const getTask = async (parent, { _id }) => {
    try {
        const task = await Task.findById({_id});
        task.__v = undefined;
        if(task) {
            return(task);
        } else {
            throw new Error("Task not found!");
        }
    } catch(error) {
        throw new Error(error.message);
    }
}

export const getTasks = async () => {
    try {
        const tasks = await Task.find().select("task deadline _id");
        if(tasks) {
            return(tasks);
        } else {
            throw new Error("Cant fetch tasks");
        }
    } catch(error) {
        throw new Error(error.message);
    }
} 

 