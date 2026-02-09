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

        // 6. analyse the result of all the test cases :
        let allTestCasePassed = true;
        const detailedResults = results.map( (result , i) => {
            const stdout = result.stdout?.trim();
            const expected_output = expected_outputs[i]?.trim();
            const passed = stdout === expected_output;

            // console.log(`Testcase #${i+1}`);
            // console.log(` Given Input ${stdin[i]}`);
            // console.log(`Expected Output for the testcase is : ${expected_output}`);
            // console.log(`Output from judge0 ${stdout}`);

            // console.log(`Matched : ${passed}`);
            // console.log("======================================");

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


        res.status(200).json({
            message: "code executed"
        })

    } catch (error) {
        // console.log("!", error);
    }
}

export {executeCode};