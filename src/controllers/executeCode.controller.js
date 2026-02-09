import { pollBatchResults, submitBatch } from "../utils/judgeO.js";


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

        res.status(200).json({
            message: "code executed"
        })
    } catch (error) {
        console.log("!", error);
    }
}

export {executeCode};