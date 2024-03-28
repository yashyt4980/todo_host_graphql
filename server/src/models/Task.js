import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
        trim: true,
    }, 
    deadline: {
        type: String,
        required: true,
        trim: true,
    }
})

const Task = mongoose.model("Task", taskSchema);
export default Task;