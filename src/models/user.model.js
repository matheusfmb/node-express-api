const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type:String,
        require:true,
        minlength: 5
    }
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;