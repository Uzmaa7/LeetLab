import User from "../models/user.model.js";
import { UserRolesEnum } from "../utils/constants.js";
import { getLanguageIdFromJudgeO, submitBatch, pollBatchResults } from "../utils/judgeO.js";
import Problem from "../models/problem.model.js";
import axios from "axios";

const createProblem = async(req, res) => {
    //get data
    const {title,description, difficulty, tags,constraints ,hints,
    examples,testcases,codeSnippets,referenceSolution} = req.body;

    try {
            //user is admin?
            const userId = req.user._id
            const user = await User.findById(userId);
            if(user.role !== UserRolesEnum.ADMIN){
                return res.status(403).json({
                    message: "Only admin can create problems"
                })
            }
        
            //language and solutionCode
            // const referenceSolutions = {
            //     javascript: "console.log('hello')",
            //     python: "print('hello')",
            //     cpp: "cout << 'hello';"
            // };
            //Object.entries(referenceSolutions) -> [
                                                //     ["javascript", "console.log('hello')"],
                                                //     ["python", "print('hello')"],
                                                //     ["cpp", "cout << 'hello';"]
                                                //  ]
            for(const [language, solutionCode] of Object.entries(referenceSolution)){
                    const languageId = getLanguageIdFromJudgeO(language);
                    if(!languageId){
                        return res.status(400).json({
                            message: `Language ${language} is not supported`
                        })
                    }
            
                    
                    const submissions = testcases.map(({input, output}) => ({
                        source_code: solutionCode,
                        language_id: languageId,
                        stdin : input,
                        expected_output: output
                    }))
                    // submissions = [
                    //   {           
                    //      source_code: "console.log(...)",
                    //      language_id: 63,
                    //      stdin: "2 3",
                    //      expected_output: "5",
                    //   },
                    //   {
                    //     source_code: "console.log(...)",
                    //     language_id: 63,
                    //     stdin: "10 20",
                    //     expected_output: "30",
                    //   }
                    // ]
            
                    const submissionResults = await submitBatch(submissions);
                    // submissionResults = [
                    //     { token: "a1b2c3d4" },
                    //     { token: "x9y8z7w6" }
                    // ]
                    console.log("1", submissionResults);
                    const tokens =  submissionResults.map((res) => res.token);
                    // tokens = ["a1b2c3d4", "x9y8z7w6"]
            
                    const results = await pollBatchResults(tokens);
            
                    for(let i = 0; i < results.length; i++){
                        const result = results[i];
            
                        if(result.status.id !== 3){
                            return res.status(400).json({
                                message: `Testcase ${i+1} failed for language ${language}`
                            })
                        }
                    }
                
                //save the problem to the database
                const newProblem = await Problem.create({
                    
                        title,
                        description,
                        difficulty, 
                        tags,
                        constraints,
                        hints,
                        examples,
                        testcases,
                        codeSnippets,
                        referenceSolution,
                        createdBy: userId,
                    
                })
            
                return res.status(201).json({
                   success: true,
                   message: "Problem created successfully",
                   problem: newProblem,
                })
            }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error while creating problem"
        })
    }
    
}

export {createProblem};