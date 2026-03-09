// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import Editor from "@monaco-editor/react";
// // import { getProblemByIdService } from "../services/execution.service";
// // import { executeCodeService } from "../services/execution.service";
// // import { toast } from "react-hot-toast";

// // const ProblemPage = () => {
// //     const { problemId } = useParams();
// //     const [problem, setProblem] = useState(null);
// //     const [code, setCode] = useState("");
// //     const [loading, setLoading] = useState(false);
// //     const [results, setResults] = useState(null);

// //     useEffect(() => {
// //         const fetchProblem = async () => {
// //             const data = await getProblemByIdService(problemId);
// //             setProblem(data.problem);
// //             // Set default starter code based on language
// //             setCode("// Write your code here...");
// //         };
// //         fetchProblem();
// //     }, [problemId]);

// //     const handleRunCode = async () => {
// //         setLoading(true);
// //         try {
// //             const payload = {
// //                 source_code: code,
// //                 language_id: 63, // Default to Node.js for now
// //                 stdin: problem.testCases.map(tc => tc.input),
// //                 expected_outputs: problem.testCases.map(tc => tc.output),
// //                 problemId: problemId
// //             };

// //             const response = await executeCodeService(payload);
// //             setResults(response.submission);
// //             toast.success("Execution Completed!");
// //         } catch (error) {
// //             toast.error(error.message || "Execution Failed");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     if (!problem) return <div className="p-10 text-white">Loading Problem...</div>;

// //     return (
// //         <div className="flex flex-col h-[calc(100vh-64px)] bg-[#1e1e1e] text-gray-200">
// //             {/* Toolbar */}
// //             <div className="flex justify-between items-center p-2 bg-[#2d2d2d] border-b border-gray-700">
// //                 <h1 className="text-lg font-bold ml-4">{problem.title}</h1>
// //                 <button 
// //                     onClick={handleRunCode}
// //                     disabled={loading}
// //                     className="bg-green-600 hover:bg-green-700 px-6 py-1.5 rounded text-white font-medium transition"
// //                 >
// //                     {loading ? "Running..." : "Submit Code"}
// //                 </button>
// //             </div>

// //             <div className="flex flex-1 overflow-hidden">
// //                 {/* Left Side: Description */}
// //                 <div className="w-1/3 p-6 overflow-y-auto border-r border-gray-700 bg-[#121212]">
// //                     <h2 className="text-xl font-semibold mb-4 text-green-400">Description</h2>
// //                     <div className="prose prose-invert max-w-none">
// //                         <p>{problem.description}</p>
// //                         <h3 className="mt-4 text-sm text-gray-400">Constraints:</h3>
// //                         <pre className="text-xs bg-black p-2 mt-2">{problem.constraints}</pre>
// //                     </div>
// //                 </div>

// //                 {/* Right Side: Editor & Results */}
// //                 <div className="w-2/3 flex flex-col">
// //                     <div className="flex-1">
// //                         <Editor
// //                             height="100%"
// //                             theme="vs-dark"
// //                             defaultLanguage="javascript"
// //                             value={code}
// //                             onChange={(value) => setCode(value)}
// //                             options={{ fontSize: 14, minimap: { enabled: false } }}
// //                         />
// //                     </div>
                    
// //                     {/* Console/Result Section */}
// //                     <div className="h-1/3 border-t border-gray-700 bg-[#121212] p-4 overflow-y-auto">
// //                         <h3 className="text-sm font-bold uppercase text-gray-500 mb-2">Test Case Results</h3>
// //                         {results ? (
// //                             <div className="space-y-2">
// //                                 {results.testCases.map((tc, idx) => (
// //                                     <div key={idx} className={`p-2 rounded ${tc.passed ? 'bg-green-900/20 border border-green-700' : 'bg-red-900/20 border border-red-700'}`}>
// //                                         <span className={tc.passed ? "text-green-400" : "text-red-400"}>
// //                                             {tc.passed ? "✓ Passed" : "✗ Failed"} - Case {idx + 1}
// //                                         </span>
// //                                         {!tc.passed && <div className="text-xs mt-1 text-gray-400">Expected: {tc.expectedOutput} | Got: {tc.stdout}</div>}
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         ) : (
// //                             <p className="text-gray-600 italic text-sm">Run your code to see results...</p>
// //                         )}
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default ProblemPage;


// import React, { useState, useEffect } from "react";
// import Editor from "@monaco-editor/react";
// import {
//   Play,
//   FileText,
//   MessageSquare,
//   Lightbulb,
//   Bookmark,
//   Share2,
//   Clock,
//   ChevronRight,
//   BookOpen,
//   Terminal,
//   Code2,
//   Users,
//   ThumbsUp,
//   Home,
// } from "lucide-react";
// import { Link, useParams } from "react-router-dom";
// import { useProblemStore } from "../store/useProblemStore";
// import { getLanguageId } from "../lib/lang";
// import { useExecutionStore } from "../store/useExecutionStore";
// import { useSubmissionStore } from "../store/useSubmissionStore";
// import Submission from "../components/Submission";
// import SubmissionsList from "../components/SubmissionList";

// const ProblemPage = () => {
//   const { id } = useParams();
//   const { getProblemById, problem, isProblemLoading } = useProblemStore();

//   const {
//     submission: submissions,
//     isLoading: isSubmissionsLoading,
//     getSubmissionForProblem,
//     getSubmissionCountForProblem,
//     submissionCount,
//   } = useSubmissionStore();

//   const [code, setCode] = useState("");
//   const [activeTab, setActiveTab] = useState("description");
//   const [selectedLanguage, setSelectedLanguage] = useState("javascript");
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [testcases, setTestCases] = useState([]);

//   const { executeCode, submission, isExecuting } = useExecutionStore();

//   useEffect(() => {
//     getProblemById(id);
//     getSubmissionCountForProblem(id);
//   }, [id]);

//   useEffect(() => {
//     if (problem) {
//       setCode(
//         problem.codeSnippets?.[selectedLanguage] || submission?.sourceCode || ""
//       );
//       setTestCases(
//         problem.testcases?.map((tc) => ({
//           input: tc.input,
//           output: tc.output,
//         })) || []
//       );
//     }
//   }, [problem, selectedLanguage]);

//   useEffect(() => {
//     if (activeTab === "submissions" && id) {
//       getSubmissionForProblem(id);
//     }
//   }, [activeTab, id]);

//   console.log("submission", submissions);

//   const handleLanguageChange = (e) => {
//     const lang = e.target.value;
//     setSelectedLanguage(lang);
//     setCode(problem.codeSnippets?.[lang] || "");
//   };

//   const handleRunCode = (e) => {
//     e.preventDefault();
//     try {
//       const language_id = getLanguageId(selectedLanguage);
//       const stdin = problem.testcases.map((tc) => tc.input);
//       const expected_outputs = problem.testcases.map((tc) => tc.output);
//       executeCode(code, language_id, stdin, expected_outputs, id);
//     } catch (error) {
//       console.log("Error executing code", error);
//     }
//   };

//   if (isProblemLoading || !problem) {
//     return (
//       <div className="flex items-center justify-center h-screen bg-base-200">
//         <div className="card bg-base-100 p-8 shadow-xl">
//           <span className="loading loading-spinner loading-lg text-primary"></span>
//           <p className="mt-4 text-base-content/70">Loading problem...</p>
//         </div>
//       </div>
//     );
//   }

//   const renderTabContent = () => {
//     switch (activeTab) {
//       case "description":
//         return (
//           <div className="prose max-w-none">
//             <p className="text-lg mb-6">{problem.description}</p>

//             {problem.examples && (
//               <>
//                 <h3 className="text-xl font-bold mb-4">Examples:</h3>
//                 {Object.entries(problem.examples).map(
//                   ([lang, example], idx) => (
//                     <div
//                       key={lang}
//                       className="bg-base-200 p-6 rounded-xl mb-6 font-mono"
//                     >
//                       <div className="mb-4">
//                         <div className="text-indigo-300 mb-2 text-base font-semibold">
//                           Input:
//                         </div>
//                         <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
//                           {example.input}
//                         </span>
//                       </div>
//                       <div className="mb-4">
//                         <div className="text-indigo-300 mb-2 text-base font-semibold">
//                           Output:
//                         </div>
//                         <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
//                           {example.output}
//                         </span>
//                       </div>
//                       {example.explanation && (
//                         <div>
//                           <div className="text-emerald-300 mb-2 text-base font-semibold">
//                             Explanation:
//                           </div>
//                           <p className="text-base-content/70 text-lg font-sem">
//                             {example.explanation}
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   )
//                 )}
//               </>
//             )}

//             {problem.constraints && (
//               <>
//                 <h3 className="text-xl font-bold mb-4">Constraints:</h3>
//                 <div className="bg-base-200 p-6 rounded-xl mb-6">
//                   <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
//                     {problem.constraints}
//                   </span>
//                 </div>
//               </>
//             )}
//           </div>
//         );
//       case "submissions":
//         return (
//           <SubmissionsList
//             submissions={submissions}
//             isLoading={isSubmissionsLoading}
//           />
//         );
//       case "discussion":
//         return (
//           <div className="p-4 text-center text-base-content/70">
//             No discussions yet
//           </div>
//         );
//       case "hints":
//         return (
//           <div className="p-4">
//             {problem?.hints ? (
//               <div className="bg-base-200 p-6 rounded-xl">
//                 <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
//                   {problem.hints}
//                 </span>
//               </div>
//             ) : (
//               <div className="text-center text-base-content/70">
//                 No hints available
//               </div>
//             )}
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200 max-w-7xl w-full">
//       <nav className="navbar bg-base-100 shadow-lg px-4">
//         <div className="flex-1 gap-2">
//           <Link to={"/"} className="flex items-center gap-2 text-primary">
//             <Home className="w-6 h-6" />
//             <ChevronRight className="w-4 h-4" />
//           </Link>
//           <div className="mt-2">
//             <h1 className="text-xl font-bold">{problem.title}</h1>
//             <div className="flex items-center gap-2 text-sm text-base-content/70 mt-5">
//               <Clock className="w-4 h-4" />
//               <span>
//                 Updated{" "}
//                 {new Date(problem.createdAt).toLocaleString("en-US", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                 })}
//               </span>
//               <span className="text-base-content/30">•</span>
//               <Users className="w-4 h-4" />
//               <span>{submissionCount} Submissions</span>
//               <span className="text-base-content/30">•</span>
//               <ThumbsUp className="w-4 h-4" />
//               <span>95% Success Rate</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex-none gap-4">
//           <button
//             className={`btn btn-ghost btn-circle ${
//               isBookmarked ? "text-primary" : ""
//             }`}
//             onClick={() => setIsBookmarked(!isBookmarked)}
//           >
//             <Bookmark className="w-5 h-5" />
//           </button>
//           <button className="btn btn-ghost btn-circle">
//             <Share2 className="w-5 h-5" />
//           </button>
//           <select
//             className="select select-bordered select-primary w-40"
//             value={selectedLanguage}
//             onChange={handleLanguageChange}
//           >
//             {Object.keys(problem.codeSnippets || {}).map((lang) => (
//               <option key={lang} value={lang}>
//                 {lang.charAt(0).toUpperCase() + lang.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>
//       </nav>

//       <div className="container mx-auto p-4">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body p-0">
//               <div className="tabs tabs-bordered">
//                 <button
//                   className={`tab gap-2 ${
//                     activeTab === "description" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("description")}
//                 >
//                   <FileText className="w-4 h-4" />
//                   Description
//                 </button>
//                 <button
//                   className={`tab gap-2 ${
//                     activeTab === "submissions" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("submissions")}
//                 >
//                   <Code2 className="w-4 h-4" />
//                   Submissions
//                 </button>
//                 <button
//                   className={`tab gap-2 ${
//                     activeTab === "discussion" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("discussion")}
//                 >
//                   <MessageSquare className="w-4 h-4" />
//                   Discussion
//                 </button>
//                 <button
//                   className={`tab gap-2 ${
//                     activeTab === "hints" ? "tab-active" : ""
//                   }`}
//                   onClick={() => setActiveTab("hints")}
//                 >
//                   <Lightbulb className="w-4 h-4" />
//                   Hints
//                 </button>
//               </div>

//               <div className="p-6">{renderTabContent()}</div>
//             </div>
//           </div>

//           <div className="card bg-base-100 shadow-xl">
//             <div className="card-body p-0">
//               <div className="tabs tabs-bordered">
//                 <button className="tab tab-active gap-2">
//                   <Terminal className="w-4 h-4" />
//                   Code Editor
//                 </button>
//               </div>

//               <div className="h-[600px] w-full">
//                 <Editor
//                   height="100%"
//                   language={selectedLanguage.toLowerCase()}
//                   theme="vs-dark"
//                   value={code}
//                   onChange={(value) => setCode(value || "")}
//                   options={{
//                     minimap: { enabled: false },
//                     fontSize: 20,
//                     lineNumbers: "on",
//                     roundedSelection: false,
//                     scrollBeyondLastLine: false,
//                     readOnly: false,
//                     automaticLayout: true,
//                   }}
//                 />
//               </div>

//               <div className="p-4 border-t border-base-300 bg-base-200">
//                 <div className="flex justify-between items-center">
//                   <button
//                     className={`btn btn-primary gap-2 ${
//                       isExecuting ? "loading" : ""
//                     }`}
//                     onClick={handleRunCode}
//                     disabled={isExecuting}
//                   >
//                     {!isExecuting && <Play className="w-4 h-4" />}
//                     Run Code
//                   </button>
//                   <button className="btn btn-success gap-2">
//                     Submit Solution
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="card bg-base-100 shadow-xl mt-6">
//           <div className="card-body">
//             {submission ? (
//               <Submission submission={submission} />
//             ) : (
//               <>
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-bold">Test Cases</h3>
//                 </div>
//                 <div className="overflow-x-auto">
//                   <table className="table table-zebra w-full">
//                     <thead>
//                       <tr>
//                         <th>Input</th>
//                         <th>Expected Output</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {testcases.map((testCase, index) => (
//                         <tr key={index}>
//                           <td className="font-mono">{testCase.input}</td>
//                           <td className="font-mono">{testCase.output}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemPage;