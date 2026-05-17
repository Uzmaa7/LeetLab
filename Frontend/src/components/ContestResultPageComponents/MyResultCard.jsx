import { Trophy, Clock, Target, Zap, Hash, BarChart3 } from "lucide-react";

function MyResultCard({ result, type }) {
  if (!result) return null;

  // 1. Safe Data Extraction
  const {
    rank,
    score = 0,
    solvedCount = 0,
    totalTimeSpent = 0, // Assuming this is in seconds based on data
    attempts = [],
  } = result;

  const totalAttempts = attempts.length;

  // 2. Derived Metrics
  // Calculate Accuracy: (Solved / Total Attempts) * 100
  const accuracy = totalAttempts > 0 ? Math.round((solvedCount / totalAttempts) * 100) : 0;

  // Format Time: 150 -> "2m 30s"
  const formatTime = (seconds) => {
    if (!seconds) return "0s";
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  // 3. Dynamic Styles based on Rank (for Group contests)
  const isWinner = type === "group" && rank === 1;
  const cardBorder = isWinner ? "border-yellow-500/50" : "border-slate-700";
 const bgGradient = isWinner
    ? "bg-gradient-to-br from-[#0d0d0d] via-[#121212] to-yellow-900/10"
    : "bg-[#0d0d0d]";

  return (
    <div className={`relative overflow-hidden rounded-2xl border ${cardBorder} ${bgGradient} p-6 shadow-xl`}>
      
      {/* Optional Glow for Winner */}
      {isWinner && (
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-yellow-500/20 blur-3xl rounded-full pointer-events-none"></div>
      )}

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 relative z-10">
        
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={result.user?.avatar?.url}
              alt="avatar"
              className={`w-14 h-14 rounded-full object-cover border-2 ${isWinner ? 'border-yellow-500' : 'border-slate-600'}`}
            />
            {type === "group" && (
              <div className="absolute -bottom-2 -right-2 bg-slate-900 text-xs font-bold px-2 py-0.5 rounded-full border text-white text-center border-slate-700 shadow-sm">
                #{rank}
              </div>
            )}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white leading-tight">
              {result.user?.fullName}
            </h2>
            <p className="text-sm text-slate-400">@{result.user?.username}</p>
          </div>
        </div>

        {/* Rank Badge (Only for Group) */}
        {type === "group" && (
          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border backdrop-blur-md
            ${isWinner ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400" : "bg-slate-700/30 border-slate-600 text-slate-300"}
          `}>
            <Trophy size={18} className={isWinner ? "animate-pulse" : ""} />
            <span className="font-bold uppercase tracking-wider text-sm">
              {rank === 1 ? "Winner" : `Rank ${rank}`}
            </span>
          </div>
        )}
      </div>

      {/* --- STATS GRID --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
        
        {/* 1. Score */}
        <StatBox 
          icon={Zap} 
          label="Total Score" 
          value={score.toFixed(1)} 
          color="text-yellow-400" 
          bg="bg-yellow-400/10"
        />

        {/* 2. Questions Solved */}
        <StatBox 
          icon={Hash} 
          label="Solved" 
          value={`${solvedCount}/${totalAttempts}`} 
          subValue="Questions"
          color="text-green-400" 
          bg="bg-green-400/10"
        />

        {/* 3. Time Taken */}
        <StatBox 
          icon={Clock} 
          label="Time Taken" 
          value={formatTime(totalTimeSpent)} 
          color="text-blue-400" 
          bg="bg-blue-400/10"
        />

        {/* 4. Accuracy */}
        <StatBox 
          icon={Target} 
          label="Accuracy" 
          value={`${accuracy}%`} 
          color={accuracy > 80 ? "text-emerald-400" : accuracy > 50 ? "text-orange-400" : "text-red-400"} 
          bg="bg-slate-700/30"
        />

      </div>
    </div>
  );
}

// --- Sub-component for individual stats ---
function StatBox({ icon: Icon, label, value, subValue, color, bg }) {
  return (
    <div className={`flex flex-col p-4 rounded-xl border border-slate-700/50 ${bg} transition-all hover:scale-[1.02]`}>
      <div className="flex items-center gap-2 mb-2 opacity-80">
        <Icon size={16} className={color} />
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
          {label}
        </span>
      </div>
      <div className="mt-auto">
        <div className={`text-xl md:text-2xl font-bold ${color} tracking-tight`}>
          {value}
        </div>
        {subValue && (
            <div className="text-[10px] text-slate-500 font-medium">
                {subValue}
            </div>
        )}
      </div>
    </div>
  );
}

export default MyResultCard;