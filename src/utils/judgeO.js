import dotenv from "dotenv";
import axios from "axios";
dotenv.config({
    path: "./.env"
})


export const getLanguageIdFromJudgeO =  (language) => {
    const languageMap = {
        "CPP" : 54,
        "JAVA" : 62,
        "JAVASCRIPT" : 63,
    }

    return languageMap[language.toUpperCase()];
}


export const submitBatch = async (submissions) => {
    const {data} = await axios.post(`${process.env.JUDGEO_API_URL}/submissions/batch?base64_encoded=false`,
        {submissions}
    )

    console.log("Submission Results: ", data);
    return data; // [{tokens}, {tokens}, {tokens}]
}


const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

//tokens = ["a1b2c3d4", "x9y8z7w6"]
export const pollBatchResults = async (tokens) => {
    while(true){
        const {data} = await axios.get(`${process.env.JUDGEO_API_URL}/submissions/batch`,
            {params: {
                    tokens: tokens.join(","),
                    base64_encoded:false,
                } 
            }
        )

        const results = data.submissions;

        const isAllDone = results.every((r) => r.status.id !== 1 && r.status.id !== 2);

        if(isAllDone)return results;

        await sleep(1000);

    }
}