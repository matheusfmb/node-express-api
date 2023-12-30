const moongose = require("mongoose");

const taskSchema = moongose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    CreationDate: {
        type: Date,
        require: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;