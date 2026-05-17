import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLeaderboardService } from "../services/contest.services";

import { 
    ContestResultHeader,
    MyResultCard,
    LeaderboardTable,
    QuestionBreakdown,

 } from "../components";

function ContestResultPage() {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboardService(contestId)
      .then(setData)
      .catch(() => navigate("/user/contests"))
      .finally(() => setLoading(false));
  }, [contestId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading result...
      </div>
    );
  }

  if (!data) return null;

  const { contest, type } = data;

  return (
    // Background updated to #050505 and added the global grid pattern
    <div className="min-h-screen bg-[#050505] px-4 md:px-10 py-12 md:py-20 relative font-sans overflow-x-hidden">
      
      {/* Grid Pattern Overlay (Consistency with Lobby/Live pages) */}
      <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#52525b12_1px,transparent_1px),linear-gradient(to_bottom,#52525b12_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <ContestResultHeader contest={contest} />

        {/* User's Individual Performance Card */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MyResultCard
                result={data.myResult}
                type={type}
            />
        </div>

        {/* Global Leaderboard (Only for Group Contests) */}
        {type === "group" && (
            <div className="space-y-6">
               
                <LeaderboardTable leaderboard={data.leaderboard} />
            </div>
        )}

        {/* Detailed Question Breakdown */}
        <div className="space-y-6 pb-10">
            
            <QuestionBreakdown
                questions={data?.contest?.questionIds}
                attempts={data?.myResult?.attempts}
            />
        </div>

      </div>



    </div>
  );
}

export default ContestResultPage;