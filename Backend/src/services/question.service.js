import Question from "../models/question.model.js";
import { ApiError } from "../utils/ApiError.js";
import URL from "url";

const normalizeUrlService = async(url) => {
    try {
        new URL(url)
    } catch (error) {
        throw new ApiError(400, "Invalid problem URL")
    }

    return url
        .trim()
        .toLowerCase()           // collapse case differences
        .replace(/\/+$/, "")     // remove trailing slash
        .split("?")[0];          // remove tracking params
}

const uploadQuestionService = async (userId, title, platform, difficulty, questionUrl, topics=[]) =>  {
    try {

        return await Question.create(
            {
                addedBy : userId,
                title : title.trim(),
                platform : platform.trim(),
                difficulty : difficulty.trim().toLowerCase(),
                questionUrlOriginal : questionUrl,
                questionUrlNormalized : normalizeUrlService(questionUrl),
                topics : [...new Set(topics
                .filter((t) => typeof(t) === "string" && t.trim())//Sab strings hain aur empty nahi hain
                .map((t) => t.trim().toLowerCase())//Sabko lowercase aur trim kiya
                )]                                 //Duplicates hata diye -> new Set
            }
        )
        
    } catch (error) {
        if(error.code === 11000){
            // Mongo duplicate key error
            throw new ApiError(409, "You have already added this question")
        }
        console.error("Upload Question Error:", error);
        throw new ApiError(400, "Error while uploading question")
    }
}

export {uploadQuestionService, normalizeUrlService};


// Maan lo user ne topics mein ek aisi string bhej di jisme sirf spaces hain: "   "
// typeof("  ") === "string" ===> true
// "  ".trim() ===> toh result "" (empty string) aata hai. JavaScript mein empty string falsy hoti hai.
// Isliye .filter() use turant nikaal deta hai.
