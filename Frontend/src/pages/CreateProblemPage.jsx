import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Send, Code, Beaker, AlignLeft } from 'lucide-react';
import { createProblemService } from '../services/problem.services';
import toast from 'react-hot-toast';

const CreateProblemPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        difficulty: 'Medium',
        tags: '',
        constraints: '',
        hints: '',
        exampleInput: '',
        exampleOutput: '',
        exampleExpl: '',
        testcases: [{ input: '', output: '' }],
        // Inko dhyan se dekhiye:
        jsReferenceSolution: '', 
        jsCodeSnippet: ''
    });

    const addTestcase = () => {
        setFormData({ ...formData, testcases: [...formData.testcases, { input: '', output: '' }] });
    };

    const handleTestcaseChange = (index, field, value) => {
        const updated = [...formData.testcases];
        updated[index][field] = value;
        setFormData({ ...formData, testcases: updated });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Default submit behaviour rokna
        setLoading(true);

        try {
            // Backend ko bhejne wala final object
            const finalData = {
                title: formData.title,
                description: formData.description,
                difficulty: formData.difficulty,
                tags: formData.tags.split(',').map(t => t.trim()).filter(t => t !== ""),
                constraints: formData.constraints,
                hints: formData.hints,
                examples: {
                    "JAVASCRIPT": {
                        input: formData.exampleInput.trim(),
                        output: formData.exampleOutput.trim(),
                        explanation: formData.exampleExpl
                    }
                },
                testcases: formData.testcases.map(tc => ({
                    input: tc.input.trim(),
                    output: tc.output.trim()
                })),
                codeSnippets: {
                    "JAVASCRIPT": formData.jsCodeSnippet
                },
                referenceSolution: {
                    "JAVASCRIPT": formData.jsReferenceSolution
                }
            };

            const response = await createProblemService(finalData);
            toast.success("Problem Verified & Published!");
            navigate('/dashboard');
        } catch (error) {
            console.error("Submission Error:", error.response?.data);
            toast.error(error.response?.data?.message || "Verification Failed! Check Logic.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] pt-24 pb-20 px-6 text-white font-sans">
            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-3xl font-black italic uppercase text-orange-500">Create Challenge</h1>
                    </div>
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="bg-orange-600 px-10 py-3 rounded-xl font-bold hover:bg-orange-500 transition-all flex items-center gap-2"
                    >
                        <Send size={18}/> {loading ? "Verifying..." : "Publish Problem"}
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* LEFT: Problem details */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl space-y-4">
                            <input 
                                placeholder="Problem Title" 
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl font-bold outline-none"
                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                required 
                            />
                            <textarea 
                                placeholder="Description" 
                                className="w-full bg-white/5 border border-white/10 p-4 rounded-xl h-48 outline-none"
                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                required
                            />
                        </section>

                        {/* Code Editors */}
                        <section className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl space-y-4">
                            <h2 className="font-bold text-zinc-400 flex items-center gap-2"><Code size={18}/> JavaScript Logic</h2>
                            
                            <div>
                                <label className="text-xs text-zinc-500 mb-1 block">Student Code Snippet (User View)</label>
                                <textarea 
                                    className="w-full bg-black border border-white/10 p-4 rounded-xl h-32 font-mono text-xs outline-none"
                                    onChange={(e) => setFormData({...formData, jsCodeSnippet: e.target.value})}
                                    placeholder="const fs = require('fs'); ..."
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-xs text-zinc-500 mb-1 block">Full Reference Solution (For Backend Testing)</label>
                                <textarea 
                                    className="w-full bg-black border border-white/10 p-4 rounded-xl h-32 font-mono text-xs outline-none border-orange-500/20"
                                    onChange={(e) => setFormData({...formData, jsReferenceSolution: e.target.value})}
                                    placeholder="Full working logic..."
                                    required
                                />
                            </div>
                        </section>
                    </div>

                    {/* RIGHT: Config */}
                    <div className="space-y-6">
                        <section className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl space-y-4">
                            <h2 className="font-bold text-zinc-400 flex items-center gap-2"><Beaker size={18}/> Settings</h2>
                            <select 
                                className="w-full bg-white/5 border border-white/10 p-3 rounded-xl"
                                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                            <input placeholder="Tags (comma separated)" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl" onChange={(e)=>setFormData({...formData, tags: e.target.value})} />
                            <textarea placeholder="Constraints" className="w-full bg-white/5 border border-white/10 p-3 rounded-xl h-20" onChange={(e)=>setFormData({...formData, constraints: e.target.value})} required />
                        </section>

                        {/* Testcases */}
                        <section className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-sm font-bold">Test Cases</h2>
                                <button type="button" onClick={addTestcase} className="text-orange-500 text-xs font-bold">+ ADD</button>
                            </div>
                            {formData.testcases.map((tc, i) => (
                                <div key={i} className="space-y-2 mb-3">
                                    <input placeholder="In" className="w-full bg-white/5 p-2 rounded-lg text-xs" onChange={(e)=>handleTestcaseChange(i, 'input', e.target.value)} required/>
                                    <input placeholder="Out" className="w-full bg-white/5 p-2 rounded-lg text-xs" onChange={(e)=>handleTestcaseChange(i, 'output', e.target.value)} required/>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateProblemPage;