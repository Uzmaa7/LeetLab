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
        ref: "ProblemsInList"
    }],//[doc_id1, doc_id2]



}, {timestamps:true});

listSchema.index({ createdBy: 1, title: 1,  }, { unique: true });

const List = mongoose.model("List", listSchema);

export default List;