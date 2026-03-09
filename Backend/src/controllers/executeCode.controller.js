import ProblemSolved from "../models/problemSolved.model.js";
import Submission from "../models/submission.model.js";
import { SubmissionStatus } from "../utils/constants.js";
import { getLanguageIdFromJudgeO, getLanguageNameFromJudgeO, pollBatchResults, submitBatch } from "../utils/judgeO.js";
import TestcaseResult from "../models/testcaseResult.model.js";

const executeCode = async (req, res) => {
    try {
        const {source_code, language_id, stdin, expected_outputs, problemId} = req.body;

        const userId = req.user._id;

        // 1.validate testcases
        if(
            !Array.isArray(stdin) 
            || stdin.length === 0 
            || !Array.isArray(expected_outputs)
            || expected_outputs.length !== stdin.length
        ){
            return res.status(400).json({
                message: "Invalid or Missing test cases"
            })
        }

        // 2. Prepare each testcase for judge0
        const submissions = stdin.map((input) => ({
            source_code,
            stdin: input,
            language_id,
        }))

        // 3. Send batch of submissions to judge0
        const submitResponse = await submitBatch(submissions);

        // 4.  fetch the tokens strings from submitResponse
        const tokens = submitResponse.map((res) => res.token);

        // 5. poll judge0 for results of all  submitted test cases
        const results = await pollBatchResults(tokens);

        console.log('Result------------------');
        console.log(results);

        // 6. analyse the result of all the test cases :
        let allTestCasePassed = true;
        const detailedResults = results.map( (result , i) => {
            const stdout = result.stdout?.trim();
            const expected_output = expected_outputs[i]?.trim();
            const passed = stdout === expected_output;

            console.log(`Testcase #${i+1}`);
            console.log(` Given Input ${stdin[i]}`);
            console.log(`Expected Output for the testcase is : ${expected_output}`);
            console.log(`Output from judge0 ${stdout}`);

            console.log(`Matched : ${passed}`);
            console.log("======================================");

            if(!passed){
                allTestCasePassed = false;
            }

            return {
                testCase: i+1,
                passed,
                stdout,
                expectedOutput: expected_output,
                stderr:result.stderr || null ,
                compileOutput: result.compile_output || null,
                status: result.status.description,
                memory: result.memory ? `${result.memory} KB` : undefined,
                time: result.time ? `${result.time} s` : undefined,
            }

            
        })
        console.log(detailedResults);

        // 7. store this detailed analysis of testcase in db
        const submission = await Submission.create({
            submitBy: userId,
            problem: problemId,
            sourceCode: source_code,
            language: getLanguageNameFromJudgeO(language_id),
            stdin: stdin.join("\n"),
            stdout: JSON.stringify(detailedResults.map((d) => d.stdout)),
            stderr: detailedResults.some((d) => d.stderr)
            ? JSON.stringify(detailedResults.map((d) => d.stderr))
            : null,
            compileOutput: detailedResults.some((d) => d.compile_output)
            ? JSON.stringify(detailedResults.map((d) => d.compile_output))
            : null,
            status: allTestCasePassed ? SubmissionStatus.ACCEPTED : SubmissionStatus.WRONG_ANSWER,
            memory: detailedResults.some((d) => d.memory)
            ? JSON.stringify(detailedResults.map((d) => d.memory))
            : null,
            time: detailedResults.some((d) => d.time)
            ? JSON.stringify(detailedResults.map((d) => d.time))
            : null,
        })

        // 8. if allTestCasePassed = true -> mark problem as solved for user
        if(allTestCasePassed){
            await ProblemSolved.findOneAndUpdate(
                {solvedBy: userId, problem: problemId},
                {isSolved: true},
                {upsert: true},
            )
        }

        // 9. Save individual test case results using detailedResults
        const testCaseResults = detailedResults.map((result) => ({
            submissionId: submission._id,
            testCase: result.testCase,
            passed: result.passed,
            stdout: result.stdout,
            expectedOutput: result.expectedOutput,
            stderr:result.stderr,
            compileOutput: result.compileOutput,
            status: result.status,
            memory: result.memory,
            time: result.time,

        }))

        // console.log("1" , testCaseResults)

        const savedTestCases = await TestcaseResult.insertMany(testCaseResults);
        // console.log("2",savedTestCases);

        //Linking (Submission ke andar Test Cases ki IDs daalna)
        submission.testCases = savedTestCases.map(tc => tc._id);
        await submission.save();

        const finalSubmission = await Submission.findById(submission._id).populate("testCases");
        // console.log("3", finalSubmission);

        res.status(200).json({
            success: true,
            message: "code executed",
            submission:finalSubmission,

        })

    } catch (error) {
        // console.log("!", error);
        console.log("Error executing code:", error);
        res.status(500).json({
            message: "Failed to execute code"
        })
    }
}

export {executeCode};