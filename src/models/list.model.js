import mongoose from "mongoose";


const listSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        
    },

    description :{
        type: String,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    problemsInList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProblemsInPlaylist"
    }],



}, {timestamps:true});

listSchema.index({ title: 1, createdBy: 1 }, { unique: true });

const List = mongoose.model("List", listSchema);

export default List;