import { Timer, Users, Lock, Trophy, CalendarCheck } from "lucide-react";

function ContestResultHeader({ contest }) {
    if (!contest) return null;

   
    const isGroup = contest.visibility === "shared";
    const ModeIcon = isGroup ? Users : Lock;
    const modeText = isGroup ? "Group Contest" : "Private Contest";



return (
       
        <div className="relative overflow-hidden bg-[#0d0d0d] border border-zinc-800/60 rounded-xl p-6 md:p-4 shadow-sm">
            
            {/* Background  */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                
                {/* Left Side: Title & Label */}
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-indigo-500 uppercase">
                        <Trophy size={14} className="text-indigo-400" />
                        <span>Contest Result</span>
                    </div>
                    
                    <h1 className="text-4xl md:text-3xl font-bold text-white tracking-tight leading-none">
                        {contest.title}
                    </h1>
                    
                    {/* Contest ID  */}
                    <div className="flex items-center gap-2">
                        <span className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest">Entry Code:</span>
                        <span className="text-zinc-400 text-xs font-mono font-bold">{contest.contestCode}</span>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-wrap gap-3 md:gap-4 mt-2 md:mt-0">
                    
                    {/* Status: Slate/Grayish */}
                    <StatusBadge 
                        icon={CalendarCheck} 
                        label="Status" 
                        value={contest.status} 
                        colorClass="text-zinc-400 bg-zinc-900 border-zinc-800"
                    />

                    {/* Duration: */}
                    <StatusBadge 
                        icon={Timer} 
                        label="Duration" 
                        value={`${contest.durationInMin} Min`} 
                        colorClass="text-blue-400 bg-blue-500/5 border-blue-500/20"
                    />

                    {/* Mode: */}
                    <StatusBadge 
                        icon={ModeIcon} 
                        label="Mode" 
                        value={modeText} 
                        colorClass={isGroup ? "text-purple-400 bg-purple-500/5 border-purple-500/20" : "text-amber-400 bg-amber-500/5 border-amber-500/20"}
                    />

                </div>
            </div>
        </div>
    );
}




function StatusBadge({ icon: Icon, label, value, colorClass }) {
    return (
        <div className={`flex items-center gap-4 px-5 py-3 rounded-lg border ${colorClass} transition-all`}>
            <Icon size={18} className="opacity-70" />
            <div className="flex flex-col">
                <span className="text-[9px] opacity-50 uppercase font-black tracking-widest leading-none mb-1.5">
                    {label}
                </span>
                <span className="text-sm font-bold capitalize leading-none tracking-tight">
                    {value}
                </span>
            </div>
        </div>
    );
}

export default ContestResultHeader;