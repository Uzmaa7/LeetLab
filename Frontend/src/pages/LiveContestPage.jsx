import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "../components";
// import { useSocketContext } from "../contexts/socket.context";
import { useParams, useNavigate } from "react-router-dom";
import { getContestByIdService } from "../services/contest.services.js"
import { enterLiveContestService, submitContestService } from "../services/contestParticipant.service.js";
import toast from "react-hot-toast";
// import { useContestChat } from "../hooks/useContestChat";
// import MessagesArea from '../components/messageComponents/MessagesArea';
// import MessageInput from '../components/messageComponents/MessageInput';
import { useUserContext } from "../contexts/UserContext";
import {
  Menu,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Trophy,
  LayoutList
} from "lucide-react";

function LiveContestPage() {
  const containerRef = useRef(null);
  const enteredRef = useRef(false);
  const joinedRef = useRef(false);
  const hydratedRef = useRef(false);
  const chatWindowRef = useRef(null);

  const { contestId } = useParams();
  const navigate = useNavigate();
  // const { socket } = useSocketContext();
  const { user } = useUserContext();

  const [contest, setContest] = useState();
  const [contestQuestions, setContestQuestions] = useState();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [endsAt, setEndsAt] = useState(null);
  const [startedAt, setStartedAt] = useState(null);

  // UI STATES
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isQuestionNavOpen, setIsQuestionNavOpen] = useState(false);

  // const { messages, send } = useContestChat({ contestId, phase: 'live' });

  // contest state
  const contestStatus = contest?.status;
  const isGroupContest = contest?.visibility === "shared";
  const chatEnabled = isGroupContest && contestStatus === "live";

  // timer 
  const safeTime = timeLeft ?? 0;
  const minutes = Math.floor(safeTime / 60);
  const seconds = safeTime % 60;
  const isDanger = timeLeft < 300;

  const [attempts, setAttempts] = useState({});

  const markAttempt = (status) => {
    const q = contestQuestions[activeQuestion];
    console.log("Marking attempt for question:", q?._id, "with status:", status);
    if (!q) return;

    const timeSpent = Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000);

    setAttempts(prev => ({
      ...prev,
      [q._id]: {
        questionId: q._id,
        status,
        timeSpent: timeSpent,
      }
    }));
  };

  const submitContest = async (e) => {
    if (e) e.preventDefault();

    const payload = {
      attempts: Object.values(attempts)
    };

    try {
      await submitContestService(contestId, payload);
      toast.success("Contest Submitted");
      navigate(`/user/contests/${contestId}/leaderboard`);
      localStorage.removeItem(`contest:${contestId}:attempts`);
    } catch (error) {
      toast.error("Try again");
    }
  };

  const fetchContest = async () => {
    try {
      const contest = await getContestByIdService(contestId);
      console.log("Fetched Contest:", contest);

      if (contest.status === 'ended') {
        toast.error('Contest Already Submitted');
        navigate('/user/dashboard');
      }
      if (contest.status === 'upcoming') {
        const mode = contest.visibility === "shared" ? 'public' : 'private';
        toast.error('contest has not started yet');
        navigate(`/user/contests/${mode}/${contestId}`);
      }
      setContest(contest);
      setContestQuestions(contest.questions);
      console.log("Fetched Contest Questions:", contest.questions);
    } catch (error) {
      toast.error("No Contest Found");
      navigate('/user/contests');
    }
  };

  useEffect(() => {
    fetchContest();
  }, [contestId]);

  useEffect(() => {
    // if (!socket || !contestId) return;
    if (joinedRef.current) return;

    joinedRef.current = true;
    // socket.emit("contest:live:join", { contestId });

    // return () => {
    //   socket.emit("contest:live:leave", { contestId });
    // };
  }, [contestId]);

  useEffect(() => {
    const cached = localStorage.getItem(`contest:${contestId}:attempts`);
    if (cached) {
      setAttempts(JSON.parse(cached));
    }
  }, [contestId]);

  useEffect(() => {
    if (!hydratedRef.current) {
      hydratedRef.current = true;
      return;
    }
    localStorage.setItem(
      `contest:${contestId}:attempts`,
      JSON.stringify(attempts)
    );
  }, [contestId, attempts]);


  useEffect(() => {
    if (!contest) return;
    if (contest.status !== "live") return;
    if (enteredRef.current) return;

    enteredRef.current = true;

    (async () => {
      try {
        const data = await enterLiveContestService(contestId);
        if (data.subsubmissionStatus === 'submitted') {
          toast.error("Contest Already Submitted");
          navigate('/user/dashboard');
        }
        setEndsAt(data.endsAt);
        setStartedAt(data.startedAt);
      } catch (err) {
        toast.error("Failed to start contest");
        navigate('/user/contests');
      }
    })();
  }, [contest?.status]);


  useEffect(() => {
    if (!contest?.startsAt) return;

    const endTime = new Date(endsAt).getTime();

    const update = () => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [endsAt]);

  useEffect(() => {
    if (timeLeft === 0 && contest?.status === "live") {
      submitContestService(contestId, { attempts: Object.values(attempts) })
        .finally(() => {
          localStorage.removeItem(`contest:${contestId}:attempts`);
          toast.success("Contest auto-submitted");
          navigate("/user/dashboard");
        });
    }
  }, [timeLeft]);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  useGSAP(() => {
    if (isChatOpen) {
      gsap.fromTo(chatWindowRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.2)" }
      );
    }
  }, [isChatOpen]);

  //   return (

  //     <div className="fixed inset-0 pt-16 md:pt-20 bg-slate-900 text-white flex flex-col overflow-hidden z-40">

  //       {/* --- TOP BAR --- */}
  //       <header className="relative flex items-center justify-between px-4 md:px-6 h-16 border-b border-slate-700 bg-slate-900/95 backdrop-blur z-30 shrink-0 shadow-sm">

  //         {/* LEFT: Menu (Mobile) & Title */}
  //         <div className="flex items-center gap-3 z-10">
  //           <button 
  //             onClick={() => setIsQuestionNavOpen(!isQuestionNavOpen)}
  //             className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white transition-colors"
  //           >
  //             {isQuestionNavOpen ? <X size={24} /> : <Menu size={24} />}
  //           </button>

  //           <div className="flex flex-col">
  //             <h1 className="font-semibold text-sm md:text-lg truncate max-w-[150px] md:max-w-xs flex items-center gap-2">
  //               {contest?.title}
  //             </h1>
  //             <span className="text-[10px] md:text-xs text-slate-400 flex items-center gap-1">
  //               {isGroupContest ? "Group Battle" : "Solo Sprint"}
  //             </span>
  //           </div>
  //         </div>

  //         {/* CENTER: Timer (Absolute Center) */}
  //         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
  //           <div
  //             className={`flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-mono text-sm md:text-lg font-bold shadow-lg border border-white/5 ${
  //               isDanger 
  //               ? "bg-red-500/10 text-red-500 border-red-500/50 animate-pulse" 
  //               : "bg-slate-800 text-white"
  //             }`}
  //           >
  //             <Clock size={16} className={isDanger ? "animate-spin" : ""} />
  //             {minutes}:{seconds.toString().padStart(2, "0")}
  //           </div>
  //         </div>

  //         {/* RIGHT: Submit Button */}
  //         <div className="z-10">
  //           <Button 
  //             variant="danger" 
  //             onClick={submitContest}
  //             disabled={timeLeft === 0}
  //             className="text-xs md:text-sm px-4 py-2 shadow-lg shadow-red-900/20"
  //           >
  //             Submit
  //           </Button>
  //         </div>
  //       </header>

  //       {/* --- MAIN CONTENT AREA --- */}
  //       <div ref={containerRef} className="flex flex-1 overflow-hidden relative">

  //         {/* QUESTION NAV (Responsive Drawer) */}
  //         {/* Overlay for mobile */}
  //         {isQuestionNavOpen && (
  //           <div 
  //             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden transition-opacity"
  //             onClick={() => setIsQuestionNavOpen(false)}
  //           />
  //         )}


  //         {/* <aside className={`
  //         absolute inset-y-0 left-0 z-30 w-72 bg-slate-900 border-r border-slate-700 
  //           transform transition-transform duration-300 ease-in-out shadow-2xl md:shadow-none
  //           md:relative md:transform-none md:flex flex-col
  //           ${isQuestionNavOpen ? "translate-x-0" : "-translate-x-full"}
  //         `}>
  //           <div className="p-4 border-b border-slate-800 bg-slate-900/50">
  //              <h3 className="font-semibold text-white">Problem List</h3>
  //              <p className="text-xs text-slate-400 mt-1">{contestQuestions?.length} Problems</p>
  //           </div>

  //           <div className="p-3 space-y-2 overflow-y-auto flex-1">
  //             {contestQuestions?.map((q, idx) => (
  //               <button
  //                 key={q._id}
  //                 onClick={() => {
  //                   setActiveQuestion(idx);
  //                   setIsQuestionNavOpen(false); 
  //                 }}
  //                 className={`w-full text-left px-4 py-3 rounded-lg transition-all border
  //                   ${
  //                     idx === activeQuestion
  //                       ? "bg-slate-800 border-slate-600 text-white shadow-md"
  //                       : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
  //                   }
  //                 `}
  //               >
  //                 <div className="flex justify-between items-center">
  //                   <span className="truncate text-sm font-medium pr-2">Q{idx + 1}. {q.title}</span>
  //                   <DifficultyDot status={q.difficulty} />
  //                 </div>
  //               </button>
  //             ))}
  //           </div>
  //         </aside> */}


  //         <aside 
  //   className={`
  //     /* Mobile: Fixed overlay that slides in over everything */
  //     fixed inset-y-0 left-0 z-[60] w-72 bg-slate-900 border-r border-slate-700 
  //     transform transition-transform duration-300 ease-in-out shadow-2xl

  //     /* Desktop: Reset to relative flow so it pushes content */
  //     md:relative md:translate-x-0 md:z-30 md:shadow-none md:flex flex-col md:inset-auto

  //     /* Toggle logic */
  //     ${isQuestionNavOpen ? "translate-x-0" : "-translate-x-full"}
  //   `}
  // >
  //   {/* Header inside Sidebar */}
  //   <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between">
  //     <div>
  //       <h3 className="font-semibold text-white text-sm uppercase tracking-wider italic">Problem List</h3>
  //       <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{contestQuestions?.length} Modules Loaded</p>
  //     </div>
  //     {/* Close button inside sidebar for better mobile UX */}
  //     <button 
  //       onClick={() => setIsQuestionNavOpen(false)} 
  //       className="md:hidden p-1 text-slate-500 hover:text-white transition-colors"
  //     >
  //       <X size={20} />
  //     </button>
  //   </div>

  //   {/* Scrollable Questions List */}
  //   <div className="p-3 space-y-2 overflow-y-auto flex-1 custom-scrollbar">
  //     {contestQuestions?.map((q, idx) => (
  //       <button
  //         key={q._id}
  //         onClick={() => {
  //           setActiveQuestion(idx);
  //           setIsQuestionNavOpen(false); 
  //         }}
  //         className={`w-full text-left px-4 py-3 rounded-xl transition-all border group
  //           ${
  //             idx === activeQuestion
  //               ? "bg-blue-600/10 border-blue-500/50 text-white shadow-[0_0_15px_rgba(37,99,235,0.1)]"
  //               : "border-transparent text-slate-400 hover:bg-slate-800/80 hover:text-slate-200"
  //           }
  //         `}
  //       >
  //         <div className="flex justify-between items-center">
  //           <span className="truncate text-xs font-bold tracking-tight pr-2">
  //             <span className="opacity-40 mr-1.5 font-mono">{idx + 1}.</span> 
  //             {q.title}
  //           </span>
  //           <DifficultyDot status={q.difficulty} />
  //         </div>
  //       </button>
  //     ))}
  //   </div>
  // </aside>

  //         {/* ACTIVE QUESTION AREA */}
  //         <main className="flex-1 flex flex-col relative bg-slate-950/50">

  //           {contestQuestions && (
  //             <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">

  //               {/* Question Header */}
  //               <div className="border-b border-slate-800 pb-6">
  //                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
  //                   <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
  //                     {contestQuestions[activeQuestion]?.title}
  //                   </h2>

  //                   <div className="flex items-center gap-3 shrink-0">
  //                     <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold capitalize border border-slate-700">
  //                         {contestQuestions[activeQuestion]?.platform}
  //                     </span>
  //                     <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border 
  //                         ${contestQuestions[activeQuestion]?.difficulty === 'easy' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
  //                           contestQuestions[activeQuestion]?.difficulty === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`
  //                     }>
  //                         {contestQuestions[activeQuestion]?.difficulty}
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>

  //               {/* Action Box */}
  //               <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
  //                 <div className="text-center sm:text-left space-y-1">
  //                   <p className="text-base font-medium text-white flex items-center justify-center sm:justify-start gap-2">
  //                      <ExternalLink size={18} className="text-blue-500" /> Solve on {contestQuestions[activeQuestion]?.platform}
  //                   </p>
  //                   <p className="text-sm text-slate-400">
  //                     Read the problem statement and submit your code on the external platform.
  //                   </p>
  //                 </div>

  //                 <a
  //                   href={contestQuestions[activeQuestion]?.questionUrlOriginal}
  //                   target="_blank"
  //                   rel="noopener noreferrer"
  //                   className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-blue-900/20 whitespace-nowrap"
  //                 >
  //                   Open Problem
  //                 </a>
  //               </div>

  //               {/* Status Update Buttons */}
  //               <div className="pt-4">
  //                  <p className="text-sm text-slate-400 mb-4 font-medium flex items-center gap-2">
  //                     <AlertCircle size={16} /> Update your progress:
  //                  </p>
  //                  <div className="flex flex-wrap gap-4">
  //                   <Button 
  //                     className="border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-slate-300" 
  //                     onClick={() => markAttempt("unsolved")}
  //                   >
  //                     Attempted
  //                   </Button>
  //                   <Button 
  //                     className="bg-green-600 hover:bg-green-500 border-green-600 shadow-lg shadow-green-900/20" 
  //                     onClick={() => markAttempt("solved")}
  //                   >
  //                     <CheckCircle2 size={18} className="mr-2" /> Mark Solved
  //                   </Button>
  //                 </div>
  //               </div>

  //               {/* Padding for bottom scrolling */}
  //               <div className="h-20 md:h-0"></div>
  //             </div>
  //           )}

  //           {/* Footer Info */}
  //           <div className="h-10 bg-slate-900 border-t border-slate-800 flex items-center justify-center text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">
  //             Auto-saving progress • Good Luck!
  //           </div>
  //         </main>
  //       </div>

  //       {/* --- FLOATING CHAT SYSTEM (Group Contest Only) --- */}
  //       {isGroupContest && (
  //         <>
  //           {/* Chat Window */}
  //           {isChatOpen && (
  //             <div 
  //               ref={chatWindowRef}
  //               className="fixed bottom-24 right-4 w-[90vw] md:w-96 h-[50vh] md:h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-[60] flex flex-col overflow-hidden"
  //             >
  //               <div className="h-12 bg-slate-800/80 backdrop-blur px-4 flex items-center justify-between border-b border-slate-700 shrink-0">
  //                 <span className="font-bold text-white flex items-center gap-2">
  //                   <MessageSquare size={16} className="text-blue-500" /> Live Chat
  //                 </span>
  //                 <button 
  //                   onClick={() => setIsChatOpen(false)}
  //                   className="p-1 rounded-full hover:bg-slate-700 text-slate-400 transition"
  //                 >
  //                   <X size={18} />
  //                 </button>
  //               </div>

  //               {/* <div className="flex-1 bg-slate-950/50 overflow-hidden flex flex-col">
  //                 <MessagesArea messages={messages} currentUserId={user._id} />
  //               </div> */}

  //               {chatEnabled && (
  //                 <div className="p-2 bg-slate-900 border-t border-slate-800 shrink-0">
  //                   {/* <MessageInput onSend={(msg) => send(msg)} /> */}
  //                 </div>
  //               )}
  //             </div>
  //           )}

  //           {/* Floating Toggle Button */}
  //           <button
  //             onClick={() => setIsChatOpen(!isChatOpen)}
  //             className={`
  //               fixed bottom-16 right-3 w-14 h-14 rounded-full shadow-2xl z-50 flex items-center justify-center transition-all duration-300
  //               ${isChatOpen ? "bg-slate-700 rotate-90" : "bg-blue-600 hover:bg-blue-500 hover:scale-105"}
  //             `}
  //           >
  //             {isChatOpen ? (
  //               <X size={24} className="text-white" />
  //             ) : (
  //               <MessageSquare size={24} className="text-white fill-current" />
  //             )}
  //           </button>
  //         </>
  //       )}

  //     </div>
  //   );


  return (
    <div className="fixed inset-0 pt-16 md:pt-20 bg-[#050505] text-zinc-300 flex flex-col overflow-hidden z-40 font-sans">

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#52525b1a_1px,transparent_1px),linear-gradient(to_bottom,#52525b1a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      </div>

      {/* --- TOP BAR --- */}
      <header className="relative flex items-center justify-between px-4 md:px-8 h-16 border-b border-zinc-800/60 bg-[#0d0d0d]/80 backdrop-blur-md z-30 shrink-0">
        <div className="flex items-center gap-4 z-10">
          <button
            onClick={() => setIsQuestionNavOpen(!isQuestionNavOpen)}
            className="md:hidden p-2 -ml-2 text-zinc-500 hover:text-zinc-200 transition-colors"
          >
            {isQuestionNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex flex-col">
            <h1 className="font-bold text-sm md:text-base text-zinc-100 truncate max-w-[150px] md:max-w-xs">
              {contest?.title}
            </h1>
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">
              {isGroupContest ? "Group Battle" : "Solo Sprint"}
            </span>
          </div>
        </div>

        {/* CENTER: Timer */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            className={`flex items-center gap-3 px-4 py-1.5 rounded-md font-mono text-base md:text-xl font-bold border ${isDanger
                ? "bg-rose-500/10 text-rose-500 border-rose-500/30 animate-pulse"
                : "bg-zinc-900/50 text-zinc-100 border-zinc-800"
              }`}
          >
            <Clock size={18} className={isDanger ? "animate-pulse" : "text-zinc-500"} />
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        </div>

        <div className="z-10">
          <Button
            variant="danger"
            onClick={submitContest}
            disabled={timeLeft === 0}
            className="text-[11px] uppercase tracking-widest font-bold px-6 py-2 bg-zinc-600 hover:bg-zinc-500 text-zinc-50 rounded-md border-none  shadow-sm active:scale-[0.98] transition-all"
          >
            Submit
          </Button>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden relative z-10">

        {/* QUESTION NAV */}
        {isQuestionNavOpen && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsQuestionNavOpen(false)}
          />
        )}

        <aside
          className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0d0d] border-r border-zinc-800/60 
            transform transition-transform duration-300 ease-in-out
            md:relative md:translate-x-0 md:z-30 md:flex flex-col
            ${isQuestionNavOpen ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          <div className="p-6 border-b border-zinc-800/60">
            <h3 className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
              <LayoutList size={14} /> Question Stack
            </h3>
          </div>

          <div className="p-3 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
            {contestQuestions?.map((q, idx) => (
              <button
                key={q._id}
                onClick={() => {
                  setActiveQuestion(idx);
                  setIsQuestionNavOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all group border ${idx === activeQuestion
                    ? "bg-zinc-800/50 border-zinc-700 text-white"
                    : "border-transparent text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                  }
                `}
              >
                <div className="flex justify-between items-center">
                  <span className="truncate text-xs font-bold tracking-tight">
                    <span className="opacity-40 mr-2 font-mono">{idx + 1}.</span>
                    {q.title}
                  </span>
                  <DifficultyDot status={q.difficulty} />
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* ACTIVE QUESTION AREA */}
        <main className="flex-1 flex flex-col relative bg-[#050505]/40 backdrop-blur-sm">
          {contestQuestions && (
            <div className="flex-1 overflow-y-auto p-6 md:p-12 max-w-4xl mx-auto w-full space-y-10">


              {/* Question Header */}
              <div className="space-y-4 border-b border-zinc-800/60 pb-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                  {/* Left: Title & Index */}
                  <div className="">

                    <h2 className="text-xl md:text-[28px] font-bold text-white tracking-tight leading-tight">
                      {contestQuestions[activeQuestion]?.title}
                    </h2>
                  </div>

                  {/* Right: Platform & Difficulty Badges */}
                  <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                    <span className="px-3 py-1 rounded-md bg-zinc-900 text-zinc-400 text-[10px] font-bold uppercase tracking-wider border border-zinc-800 capitalize">
                      {contestQuestions[activeQuestion]?.platform}
                    </span>
                    <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${contestQuestions[activeQuestion]?.difficulty === 'easy' ? 'bg-emerald-500/5 text-emerald-500 border-emerald-500/10' :
                        contestQuestions[activeQuestion]?.difficulty === 'medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                          'bg-rose-500/10 text-rose-500 border-rose-500/20'
                      }`}>
                      {contestQuestions[activeQuestion]?.difficulty}
                    </span>
                  </div>

                </div>
              </div>


              {/* Action Box */}
              <div className="bg-[#0d0d0d] rounded-xl border border-zinc-800/60 p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Text Content (Left side) */}
                <div className="space-y-2 flex-1">
                  <p className="text-sm font-semibold text-zinc-100 flex items-center gap-2">
                    <ExternalLink size={16} className="text-indigo-500" /> External Environment
                  </p>
                  <p className="text-sm text-zinc-500 leading-relaxed">
                    Read the problem statement and submit your code on the external platform.
                  </p>
                </div>

                {/* Button (Right side) */}
                <a
                  href={contestQuestions[activeQuestion]?.questionUrlOriginal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 h-12 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-900/40 whitespace-nowrap border border-indigo-500/30"
                >
                  Open Problem
                </a>
              </div>

              {/* Status Update Buttons */}
              <div className=" space-y-6">

                <div className="flex flex-wrap gap-4">
                  <button
                    className="h-11 px-6 rounded-md border border-zinc-800 bg-transparent text-zinc-500 text-xs font-bold uppercase tracking-widest hover:bg-zinc-900 hover:text-zinc-300 transition-all"
                    onClick={() => markAttempt("unsolved")}
                  >
                    Attempted
                  </button>
                  <button
                    className="h-11 px-8 rounded-md bg-zinc-600 hover:bg-zinc-500 text-zinc-50 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20"
                    onClick={() => markAttempt("solved")}
                  >
                    <CheckCircle2 size={16} /> Mark as Solved
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer Info */}
          <div className="h-10 bg-[#0d0d0d] border-t border-zinc-800/60 flex items-center justify-center text-[9px] text-zinc-600 uppercase tracking-[0.4em] font-medium">
            Session Secured • Encrypted Auto-Save Active
          </div>
        </main>
      </div>

      {/* --- CHAT SYSTEM --- */}
      {isGroupContest && (
        <>
          {isChatOpen && (
            <div
              ref={chatWindowRef}
              className="fixed bottom-24 right-4 w-[90vw] md:w-96 h-[50vh] md:h-[500px] bg-[#0d0d0d] border border-zinc-800/60 rounded-xl shadow-2xl z-[60] flex flex-col overflow-hidden"
            >
              <div className="h-12 bg-zinc-900/50 px-4 flex items-center justify-between border-b border-zinc-800/60">
                <span className="text-xs font-black text-zinc-200 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} className="text-indigo-500" /> Live Intel
                </span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-500 transition-all"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 bg-[#050505]/50 flex items-center justify-center italic text-zinc-600 text-xs font-mono tracking-tighter">
                Channel Active...
              </div>
            </div>
          )}

          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`
              fixed bottom-16 right-6 w-14 h-14 rounded-full shadow-2xl z-50 flex items-center justify-center transition-all duration-300
              ${isChatOpen ? "bg-zinc-800 rotate-90" : "bg-indigo-600 border border-indigo-500/30 hover:scale-110 shadow-white/5"}
            `}
          >
            {isChatOpen ? (
              <X size={24} className="text-zinc-100" />
            ) : (
              <MessageSquare size={24} className="text-white fill-current" />
            )}
          </button>
        </>
      )}
    </div>
  );
}

/* ---------- Helpers ---------- */

function DifficultyDot({ status }) {
  const colors = {
    easy: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]",
    medium: "bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]",
    hard: "bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]",
  };

  return (
    <span className={`w-2.5 h-2.5 rounded-full ${colors[status]}`} />
  );
}

export default LiveContestPage;