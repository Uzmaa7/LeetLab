import { FileBarChart2 } from "lucide-react";
import QuestionRow from "./QuestionRow";

function QuestionBreakdown({ attempts, questions }) {
    if (!attempts || attempts.length === 0) return null;

   return (
    
        <div className="bg-[#0d0d0d] border border-zinc-800/60 rounded-xl p-6 md:p-10 shadow-sm relative overflow-hidden">
            
            {/* Background Decorative Glow (Subtle Indigo) */}
            <div className="absolute top-0 left-0 -mt-12 -ml-12 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                        <FileBarChart2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white tracking-tight">
                            Question Breakdown
                        </h3>
                    
                    </div>
                </div>

            <div className="flex flex-col gap-4">
                    {attempts.map((attempt, i) => {
                        // Find the matching question detail using ID
                        const questionDetail = questions?.find(
                            (q) => q._id === attempt.questionId
                        );

                        return (
                            <QuestionRow 
                                key={attempt.questionId} 
                                index={i} 
                                attempt={attempt} 
                                question={questionDetail} 
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
    
}

export default QuestionBreakdown;