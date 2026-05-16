import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContestRow } from "../index.jsx"; 
import { getAllContestsService } from "../../services/contest.services.js";
import { History, ArrowLeft, Loader2, Filter } from "lucide-react";
import toast from "react-hot-toast";

function AllHistoryPage() {
    const navigate = useNavigate();
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await getAllContestsService();
                // Backend returns { contests: [], meta: {} } inside ApiResponse data
                setContests(response.data?.contests || []);
            } catch (error) {
                console.error(error);
                toast.error("Failed to load contest history");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const navigateToContest = (contest) => {
        if (contest.status === "upcoming") {
            const path = contest.visibility === "private" ? "private" : "public";
            navigate(`/user/contests/${path}/${contest._id}`);
        } else if (contest.status === "live") {
            navigate(`/contests/${contest._id}/live`);
        } else {
            navigate(`/contests/${contest._id}/leaderboard`);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] px-4 pt-24 pb-20 relative font-sans">
            {/* Grid Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#52525b26_1px,transparent_1px),linear-gradient(to_bottom,#52525b26_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto space-y-10">
                <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <button 
                            onClick={() => navigate("/user/contests")}
                            className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm mb-4 group"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Arena
                        </button>
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <History className="text-indigo-400" size={28} />
                            Activity History
                        </h1>
                        <p className="text-zinc-500 text-sm">A complete timeline of your created and joined contests.</p>
                    </div>
                </header>

                <section className="bg-[#0d0d0d] border border-zinc-800/60 rounded-xl overflow-hidden shadow-2xl shadow-black">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-32 text-zinc-600 space-y-4">
                            <Loader2 size={32} className="animate-spin text-indigo-400" />
                            <p className="text-xs font-medium uppercase tracking-widest">Loading your history...</p>
                        </div>
                    ) : contests.length > 0 ? (
                        <div className="divide-y divide-zinc-800/40">
                            {contests.map((c) => (
                                <ContestRow key={c._id} contest={c} onNavigate={navigateToContest} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-zinc-600 space-y-4">
                            <History size={48} strokeWidth={1} className="opacity-10" />
                            <div className="text-center">
                                <p className="text-sm font-semibold text-zinc-400">No activity yet</p>
                                <p className="text-xs mt-1">Contests you host or join will appear here.</p>
                            </div>
                        </div>
                    )}
                </section>

                <p className="text-center text-zinc-700 text-[10px] uppercase tracking-[0.3em]">
                    LeetLab Assessment History
                </p>
            </div>
        </div>
    );
}

export default AllHistoryPage;