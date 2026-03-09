
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Cpu, Braces } from 'lucide-react';

// const ProblemSolvePage = () => {
//   const [step, setStep] = useState(0); 
//   const [displayText, setDisplayText] = useState("");

//   const dsData = [
//     {
//       title: "Binary Tree",
//       subtitle: "Process: Level Order Allocation",
//       code: `void inorder(Node* root) {\n  if (root == NULL) return;\n  inorder(root->left);\n  cout << root->data << " ";\n  inorder(root->right);\n}`,
//       highlight: ["inorder", "Node", "NULL"]
//     },
//     {
//       title: "Linked List",
//       subtitle: "Structure: Sequential Nodes",
//       code: `void traverse(Node* head) {\n  Node* temp = head;\n  while (temp != NULL) {\n    temp = temp->next;\n  }\n}`,
//       highlight: ["traverse", "Node", "NULL", "next"]
//     },
//     {
//       title: "Array / Two Sum",
//       subtitle: "Logic: Hash Map Optimization",
//       code: `vector<int> twoSum(vector<int>& nums) {\n  for(int i=0; i<nums.size(); i++) {\n    int diff = target - nums[i];\n  }\n  return {};\n}`,
//       highlight: ["twoSum", "vector", "size"]
//     }
//   ];

//   // Auto-switch steps every 8 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStep((prev) => (prev + 1) % dsData.length);
//     }, 8000); 
//     return () => clearInterval(interval);
//   }, []);

//   // Typewriter effect
//   useEffect(() => {
//     let i = 0;
//     setDisplayText("");
//     const currentCode = dsData[step].code;
//     const timer = setInterval(() => {
//       setDisplayText(currentCode.substring(0, i));
//       i++;
//       if (i > currentCode.length) clearInterval(timer);
//     }, 40);
//     return () => clearInterval(timer);
//   }, [step]);

//   const highlightCode = (text) => {
//     const highlights = dsData[step].highlight;
//     const regex = new RegExp(`(\\b${highlights.join('\\b|\\b')}\\b)`, 'g');
//     return text.split(regex).map((part, index) => {
//       if (highlights.includes(part)) {
//         return <span key={index} className="text-orange-500 font-bold">{part}</span>;
//       }
//       return <span key={index} className="text-white/90">{part}</span>;
//     });
//   };

//   return (
//     <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-10 overflow-hidden">
//       <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
//         {/* --- LEFT: ANIMATED VISUALS --- */}
//         <div className="relative h-[400px] flex items-center justify-center">
//           <AnimatePresence mode="wait">
//             {step === 0 && <TreeVisual key="tree" />}
//             {step === 1 && <LinkedListVisual key="list" />}
//             {step === 2 && <ArrayVisual key="array" />}
//           </AnimatePresence>
          
//           <div className="absolute -bottom-10 flex flex-col items-center gap-3">
//              <motion.span 
//                key={step} 
//                initial={{ opacity: 0, y: 5 }} 
//                animate={{ opacity: 1, y: 0 }} 
//                className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]"
//              >
//                 {dsData[step].subtitle}
//              </motion.span>
//              <div className="flex gap-1.5">
//                 {dsData.map((_, i) => (
//                   <div key={i} className={`h-1 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-orange-500' : 'w-2 bg-zinc-800'}`} />
//                 ))}
//              </div>
//           </div>
//         </div>

//         {/* --- RIGHT: CODE EDITOR --- */}
//         <div className="relative">
//           <div className="bg-zinc-900/10 backdrop-blur-md border border-white/5 rounded-[2.5rem] p-10 shadow-2xl">
//             <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
//                <div className="flex items-center gap-3 font-mono text-xs">
//                   <Braces size={16} className="text-orange-500/60" />
//                   <span className="text-zinc-500 tracking-widest uppercase">{dsData[step].title.replace(" ", "_")}.cpp</span>
//                </div>
//                <Cpu size={14} className="text-zinc-800" />
//             </div>

//             <div className="font-mono text-sm md:text-lg leading-relaxed h-[220px]">
//               <pre>
//                 <code>
//                   {highlightCode(displayText)}
//                   <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-[2px] h-5 bg-orange-500 ml-1 translate-y-1 shadow-[0_0_10px_#f97316]" />
//                 </code>
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// /* --- UPGRADED TREE VISUAL (White Links + Root Build) --- */
// const TreeVisual = () => {
//   const levels = [
//     { id: 'root', x: 200, y: 50, val: 10, delay: 0 },
//     { id: 'l1', x: 120, y: 120, val: 5, parentX: 200, parentY: 50, delay: 0.8 },
//     { id: 'r1', x: 280, y: 120, val: 15, parentX: 200, parentY: 50, delay: 1.4 },
//     { id: 'l1_l', x: 70, y: 190, val: 2, parentX: 120, parentY: 120, delay: 2.0 },
//     { id: 'l1_r', x: 170, y: 190, val: 7, parentX: 120, parentY: 120, delay: 2.4 }
//   ];

//   return (
//     <motion.svg 
//       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//       className="w-full h-full" viewBox="0 0 400 250"
//     >
//       {levels.map((node, i) => i > 0 && (
//         <motion.line
//           key={`line-${node.id}`}
//           x1={node.parentX} y1={node.parentY}
//           x2={node.x} y2={node.y}
//           stroke="#ffffff"
//           strokeWidth="1.2"
//           strokeOpacity="0.3"
//           strokeDasharray="5,5"
//           initial={{ pathLength: 0, opacity: 0 }}
//           animate={{ pathLength: 1, opacity: 0.3 }}
//           transition={{ duration: 0.8, delay: node.delay - 0.2 }}
//         />
//       ))}
//       {levels.map((node) => (
//         <g key={node.id}>
//           <motion.circle
//             cx={node.x} cy={node.y} r="15"
//             fill="black" stroke="#f97316" strokeWidth="2"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 200, damping: 15, delay: node.delay }}
//           />
//           <motion.text
//             x={node.x} y={node.y + 4} textAnchor="middle"
//             fill="white" fontSize="10" className="font-mono"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//             transition={{ delay: node.delay + 0.3 }}
//           >
//             {node.val}
//           </motion.text>
//         </g>
//       ))}
//     </motion.svg>
//   );
// };

// /* --- LINKED LIST VISUAL --- */
// const LinkedListVisual = () => (
//   <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
//     {[ {x: 60, v: 12}, {x: 160, v: 45}, {x: 260, v: 89} ].map((node, i) => (
//       <g key={i}>
//         <motion.rect 
//           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.4 }}
//           x={node.x} y="110" width="50" height="30" rx="4" fill="black" stroke="#f97316" strokeWidth="2" 
//         />
//         <text x={node.x + 25} y="130" textAnchor="middle" fill="white" fontSize="11" className="font-mono">{node.v}</text>
//         {i < 2 && (
//           <motion.line 
//             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.4 + 0.2 }}
//             x1={node.x + 50} y1="125" x2={node.x + 100} y2="125" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="4"
//           />
//         )}
//       </g>
//     ))}
//   </motion.svg>
// );

// /* --- ARRAY VISUAL --- */
// const ArrayVisual = () => (
//   <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
//     {[4, 8, 15, 16, 23].map((v, i) => (
//       <motion.div 
//         key={i}
//         initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
//         className={`w-14 h-14 border flex items-center justify-center font-mono ${i < 2 ? 'border-orange-500 bg-orange-500/10 text-orange-500' : 'border-zinc-800 text-zinc-700'}`}
//       >
//         {v}
//       </motion.div>
//     ))}
//   </motion.div>
// );

// export default ProblemSolvePage;







// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Cpu, Braces } from 'lucide-react';

// const ProblemSolvePage = () => {
//   const [step, setStep] = useState(0); 
//   const [displayText, setDisplayText] = useState("");

//   const dsData = [
//     {
//       title: "Binary Tree",
//       subtitle: "Process: Level Order Allocation",
//       code: `void inorder(Node* root) {\n  if (root == NULL) return;\n  inorder(root->left);\n  cout << root->data << " ";\n  inorder(root->right);\n}`,
//       // Coloring Map based on Image
//       tokens: [
//         { regex: /void|return|if/g, color: "text-[#d85c8a]" }, // Pinkish
//         { regex: /inorder|cout/g, color: "text-[#60a5fa]" },   // Blue
//         { regex: /NULL|Node/g, color: "text-[#fbbf24]" },     // Yellowish
//         { regex: /".*?"/g, color: "text-[#4ade80]" }          // Green (Strings)
//       ]
//     },
//     {
//       title: "Linked List",
//       subtitle: "Structure: Sequential Nodes",
//       code: `void traverse(Node* head) {\n  Node* temp = head;\n  while (temp != NULL) {\n    temp = temp->next;\n  }\n}`,
//       tokens: [
//         { regex: /void|while/g, color: "text-[#d85c8a]" },
//         { regex: /traverse/g, color: "text-[#60a5fa]" },
//         { regex: /head|temp|next|NULL|Node/g, color: "text-[#fbbf24]" }
//       ]
//     },
//     {
//       title: "Array / Two Sum",
//       subtitle: "Logic: Hash Map Optimization",
//       code: `vector<int> twoSum(vector<int>& nums) {\n  for(int i=0; i<nums.size(); i++) {\n    int diff = target - nums[i];\n  }\n  return {};\n}`,
//       tokens: [
//         { regex: /vector|int|return|for/g, color: "text-[#d85c8a]" },
//         { regex: /twoSum|size/g, color: "text-[#60a5fa]" },
//         { regex: /nums|target|diff/g, color: "text-[#fbbf24]" }
//       ]
//     }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStep((prev) => (prev + 1) % dsData.length);
//     }, 8000); 
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     let i = 0;
//     setDisplayText("");
//     const currentCode = dsData[step].code;
//     const timer = setInterval(() => {
//       setDisplayText(currentCode.substring(0, i));
//       i++;
//       if (i > currentCode.length) clearInterval(timer);
//     }, 20); // Fast typing
//     return () => clearInterval(timer);
//   }, [step]);

//   // Enhanced Highlighter based on Image Colors
//   const highlightCode = (text) => {
//     const currentTokens = dsData[step].tokens;
//     let parts = [{ text, color: "text-white/80" }];

//     currentTokens.forEach(({ regex, color }) => {
//       let newParts = [];
//       parts.forEach(part => {
//         if (part.color !== "text-white/80") {
//           newParts.push(part);
//           return;
//         }
//         const split = part.text.split(regex);
//         const matches = part.text.match(regex);
//         split.forEach((s, i) => {
//           newParts.push({ text: s, color: "text-white/80" });
//           if (matches && matches[i]) {
//             newParts.push({ text: matches[i], color });
//           }
//         });
//       });
//       parts = newParts;
//     });

//     return parts.map((p, i) => <span key={i} className={p.color}>{p.text}</span>);
//   };

//   return (
//     <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-10 overflow-hidden">
//       <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
//         {/* LEFT: VISUALS (No changes here) */}
//         <div className="relative h-[400px] flex items-center justify-center">
//           <AnimatePresence mode="wait">
//              {step === 0 && <TreeVisual key="tree" />}
//              {step === 1 && <LinkedListVisual key="list" />}
//              {step === 2 && <ArrayVisual key="array" />}
//           </AnimatePresence>
//           <div className="absolute -bottom-10 flex flex-col items-center gap-3">
//              <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">{dsData[step].subtitle}</span>
//           </div>
//         </div>

//         {/* RIGHT: CODE EDITOR (Exact Image Theme) */}
//         <div className="relative">
//           {/* Grayish Shade Background from Image */}
//           <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            
//             {/* Live Contest Badge like Image */}
//             <div className="mb-6">
//               <span className="bg-[#312229] text-[#d85c8a] px-3 py-1 rounded text-[10px] font-bold tracking-wider uppercase border border-[#d85c8a]/20">
//                 Live Contest
//               </span>
//             </div>

//             <div className="font-mono text-sm md:text-lg leading-relaxed h-[200px] bg-[#0b0e14] p-6 rounded-xl border border-white/5">
//               <pre>
//                 <code>
//                   {highlightCode(displayText)}
//                   <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-[2px] h-5 bg-[#fbbf24] ml-1 translate-y-1" />
//                 </code>
//               </pre>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // ... TreeVisual, LinkedListVisual, ArrayVisual components same as before ...

// /* --- TREE VISUAL (Image Theme: Pink & White) --- */
// const TreeVisual = () => {
//   const levels = [
//     { id: 'root', x: 200, y: 50, val: 10, delay: 0 },
//     { id: 'l1', x: 120, y: 120, val: 5, parentX: 200, parentY: 50, delay: 0.8 },
//     { id: 'r1', x: 280, y: 120, val: 15, parentX: 200, parentY: 50, delay: 1.4 },
//     { id: 'l1_l', x: 70, y: 190, val: 2, parentX: 120, parentY: 120, delay: 2.0 },
//     { id: 'l1_r', x: 170, y: 190, val: 7, parentX: 120, parentY: 120, delay: 2.4 }
//   ];

//   return (
//     <motion.svg 
//       initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//       className="w-full h-full" viewBox="0 0 400 250"
//     >
//       {levels.map((node, i) => i > 0 && (
//         <motion.line
//           key={`line-${node.id}`}
//           x1={node.parentX} y1={node.parentY}
//           x2={node.x} y2={node.y}
//           stroke="#ffffff" // White Links jaisa aapne pehle kaha tha
//           strokeWidth="1.2"
//           strokeOpacity="0.2"
//           strokeDasharray="5,5"
//           initial={{ pathLength: 0, opacity: 0 }}
//           animate={{ pathLength: 1, opacity: 0.2 }}
//           transition={{ duration: 0.8, delay: node.delay - 0.2 }}
//         />
//       ))}
//       {levels.map((node) => (
//         <g key={node.id}>
//           {/* Node Border Pink like the 'Live' badge */}
//           <motion.circle
//             cx={node.x} cy={node.y} r="15"
//             fill="#0b0e14" // Deep Dark BG from Image
//             stroke="#d85c8a" // Pink Neon from Image
//             strokeWidth="2"
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ type: "spring", stiffness: 200, damping: 15, delay: node.delay }}
//           />
//           <motion.text
//             x={node.x} y={node.y + 4} textAnchor="middle"
//             fill="white" fontSize="10" className="font-mono font-bold"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//             transition={{ delay: node.delay + 0.3 }}
//           >
//             {node.val}
//           </motion.text>
//         </g>
//       ))}
//     </motion.svg>
//   );
// };

// /* --- LINKED LIST VISUAL (Pink & Blue Theme) --- */
// const LinkedListVisual = () => (
//   <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
//     {[ {x: 60, v: 12}, {x: 160, v: 45}, {x: 260, v: 89} ].map((node, i) => (
//       <g key={i}>
//         <motion.rect 
//           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.4 }}
//           x={node.x} y="110" width="50" height="30" rx="6" 
//           fill="#0b0e14" stroke="#d85c8a" strokeWidth="2" 
//         />
//         <text x={node.x + 25} y="130" textAnchor="middle" fill="#60a5fa" fontSize="11" className="font-mono font-bold">
//           {node.v}
//         </text>
//         {i < 2 && (
//           <motion.line 
//             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.4 + 0.2 }}
//             x1={node.x + 50} y1="125" x2={node.x + 100} y2="125" 
//             stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.3" strokeDasharray="4"
//           />
//         )}
//       </g>
//     ))}
//   </motion.svg>
// );

// /* --- ARRAY VISUAL (Contest Themed) --- */
// const ArrayVisual = () => (
//   <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
//     {[4, 8, 15, 16, 23].map((v, i) => (
//       <motion.div 
//         key={i}
//         initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
//         className={`w-14 h-14 border-2 flex items-center justify-center font-mono font-bold rounded-lg
//           ${i < 2 
//             ? 'border-[#d85c8a] bg-[#d85c8a]/10 text-[#d85c8a] shadow-[0_0_15px_rgba(216,92,138,0.2)]' 
//             : 'border-white/10 text-zinc-500 bg-white/5'}`}
//       >
//         {v}
//       </motion.div>
//     ))}
//   </motion.div>
// );
// export default ProblemSolvePage;













import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Braces, Terminal, Layout } from 'lucide-react';

const ThirdPage = () => {
  const [step, setStep] = useState(0); 
  const [displayText, setDisplayText] = useState("");

  const dsData = [
    {
      title: "Binary Tree",
      subtitle: "Process: Level Order Allocation",
      code: `void inorder(Node* root) {\n  if (root == NULL) return;\n  inorder(root->left);\n  cout << root->data << " ";\n  inorder(root->right);\n}`,
      tokens: [
        { regex: /void|return|if/g, color: "text-[#d85c8a]" },
        { regex: /inorder|cout/g, color: "text-[#60a5fa]" },
        { regex: /NULL|Node/g, color: "text-[#fbbf24]" },
        { regex: /".*?"/g, color: "text-[#4ade80]" }
      ]
    },
    {
      title: "Linked List",
      subtitle: "Structure: Sequential Nodes",
      code: `void traverse(Node* head) {\n  Node* temp = head;\n  while (temp != NULL) {\n    temp = temp->next;\n  }\n}`,
      tokens: [
        { regex: /void|while/g, color: "text-[#d85c8a]" },
        { regex: /traverse/g, color: "text-[#60a5fa]" },
        { regex: /head|temp|next|NULL|Node/g, color: "text-[#fbbf24]" }
      ]
    },
    {
      title: "Array / Two Sum",
      subtitle: "Logic: Hash Map Optimization",
      code: `vector<int> twoSum(vector<int>& nums) {\n  for(int i=0; i<nums.size(); i++) {\n    int diff = target - nums[i];\n  }\n  return {};\n}`,
      tokens: [
        { regex: /vector|int|return|for/g, color: "text-[#d85c8a]" },
        { regex: /twoSum|size/g, color: "text-[#60a5fa]" },
        { regex: /nums|target|diff/g, color: "text-[#fbbf24]" }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % dsData.length);
    }, 8000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const currentCode = dsData[step].code;
    const timer = setInterval(() => {
      setDisplayText(currentCode.substring(0, i));
      i++;
      if (i > currentCode.length) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, [step]);

  const highlightCode = (text) => {
    const currentTokens = dsData[step].tokens;
    let parts = [{ text, color: "text-white/80" }];

    currentTokens.forEach(({ regex, color }) => {
      let newParts = [];
      parts.forEach(part => {
        if (part.color !== "text-white/80") {
          newParts.push(part);
          return;
        }
        const split = part.text.split(regex);
        const matches = part.text.match(regex);
        split.forEach((s, j) => {
          newParts.push({ text: s, color: "text-white/80" });
          if (matches && matches[j]) {
            newParts.push({ text: matches[j], color });
          }
        });
      });
      parts = newParts;
    });

    return parts.map((p, k) => <span key={k} className={p.color}>{p.text}</span>);
  };

  return (
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-10 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div className="relative h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
             {step === 0 && <TreeVisual key="tree" />}
             {step === 1 && <LinkedListVisual key="list" />}
             {step === 2 && <ArrayVisual key="array" />}
          </AnimatePresence>
          <div className="absolute -bottom-10 flex flex-col items-center gap-3">
             <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">{dsData[step].subtitle}</span>
          </div>
        </div>

        <div className="relative">
          <div className="bg-[#111827] border border-white/5 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            
            {/* --- LEETCODE STYLE HEADER --- */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1f2937] rounded-md border border-white/5">
                <Terminal size={14} className="text-[#4ade80]" />
                <span className="text-[11px] font-mono text-zinc-300 font-medium">Console</span>
              </div>
              <Layout size={16} className="text-zinc-500 hover:text-zinc-300 cursor-pointer transition-colors" />
            </div>

            <div className="font-mono text-sm md:text-lg leading-relaxed h-[200px] bg-[#0b0e14] p-6 rounded-xl border border-white/5 shadow-inner">
              <pre>
                <code>
                  {highlightCode(displayText)}
                  <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-[2px] h-5 bg-[#fbbf24] ml-1 translate-y-1" />
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TreeVisual = () => {
  const levels = [
    { id: 'root', x: 200, y: 50, val: 10, delay: 0 },
    { id: 'l1', x: 120, y: 120, val: 5, parentX: 200, parentY: 50, delay: 0.8 },
    { id: 'r1', x: 280, y: 120, val: 15, parentX: 200, parentY: 50, delay: 1.4 },
    { id: 'l1_l', x: 70, y: 190, val: 2, parentX: 120, parentY: 120, delay: 2.0 },
    { id: 'l1_r', x: 170, y: 190, val: 7, parentX: 120, parentY: 120, delay: 2.4 }
  ];

  return (
    <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
      {levels.map((node, i) => i > 0 && (
        <motion.line
          key={`line-${node.id}`}
          x1={node.parentX} y1={node.parentY}
          x2={node.x} y2={node.y}
          stroke="#3f3f46" // GRAY EDGES
          strokeWidth="1.2"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: node.delay - 0.2 }}
        />
      ))}
      {levels.map((node) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x} cy={node.y} r="15"
            fill="#0b0e14" stroke="#d85c8a" strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: node.delay }}
          />
          <motion.text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="10" className="font-mono font-bold">{node.val}</motion.text>
        </g>
      ))}
    </motion.svg>
  );
};

const LinkedListVisual = () => (
  <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
    {[ {x: 60, v: 12}, {x: 160, v: 45}, {x: 260, v: 89} ].map((node, i) => (
      <g key={i}>
        <motion.rect 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.4 }}
          x={node.x} y="110" width="50" height="30" rx="6" 
          fill="#0b0e14" stroke="#d85c8a" strokeWidth="2" 
        />
        <text x={node.x + 25} y="130" textAnchor="middle" fill="#60a5fa" fontSize="11" className="font-mono font-bold">{node.v}</text>
        {i < 2 && (
          <motion.line 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.4 + 0.2 }}
            x1={node.x + 50} y1="125" x2={node.x + 100} y2="125" 
            stroke="#3f3f46" strokeWidth="1.2" strokeDasharray="4"
          />
        )}
      </g>
    ))}
  </motion.svg>
);

const ArrayVisual = () => (
  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
    {[4, 8, 15, 16, 23].map((v, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
        className={`w-14 h-14 border-2 flex items-center justify-center font-mono font-bold rounded-lg
          ${i < 2 ? 'border-[#d85c8a] bg-[#d85c8a]/10 text-[#d85c8a]' : 'border-white/10 text-zinc-500 bg-white/5'}`}
      >
        {v}
      </motion.div>
    ))}
  </motion.div>
);

export default ThirdPage;;








// import React from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, Users, Clock, Zap } from 'lucide-react';

// const ContestSection = () => {
//   const contests = [
//     { title: "Binary Blitz", time: "Starts in 2h 40m", prize: "$500", participants: "1.2k", difficulty: "Hard" },
//     { title: "Logic League", time: "Tonight 9:00 PM", prize: "Elite Badge", participants: "800", difficulty: "Medium" }
//   ];

//   return (
//     <section className="py-24 bg-black px-6 md:px-20">
//       <div className="max-w-7xl mx-auto">
        
//         {/* Section Header */}
//         <div className="mb-16">
//           <motion.h4 
//             initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
//             className="text-orange-500 font-mono text-xs tracking-[0.5em] uppercase mb-4"
//           >
//             // Competitive_Arena
//           </motion.h4>
//           <h2 className="text-5xl md:text-7xl font-black text-white italic italic uppercase">
//             Active <span className="text-orange-500">Battles</span>
//           </h2>
//         </div>

//         {/* Contest Cards Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {contests.map((item, i) => (
//             <motion.div 
//               key={i}
//               whileHover={{ y: -10 }}
//               className="group relative bg-zinc-900/50 border border-white/10 p-8 rounded-[2.5rem] overflow-hidden"
//             >
//               {/* Background Glow on Hover */}
//               <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
//               <div className="relative z-10 flex flex-col h-full">
//                 <div className="flex justify-between items-start mb-10">
//                   <div className="p-4 bg-orange-500/20 rounded-2xl border border-orange-500/30">
//                     <Trophy className="text-orange-500" size={24} />
//                   </div>
//                   <span className="text-[10px] font-mono text-zinc-500 border border-white/10 px-3 py-1 rounded-full uppercase">
//                     {item.difficulty}
//                   </span>
//                 </div>

//                 <h3 className="text-3xl font-black text-white mb-2">{item.title}</h3>
//                 <div className="flex items-center gap-2 text-orange-500 text-sm font-mono mb-8">
//                   <Clock size={14} /> {item.time}
//                 </div>

//                 <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
//                   <div className="flex items-center gap-4">
//                     <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
//                       <Users size={14} /> {item.participants}
//                     </div>
//                     <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
//                       <Zap size={14} className="text-yellow-500" /> {item.prize}
//                     </div>
//                   </div>
//                   <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-orange-500 transition-colors">
//                     Join Now
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// };

// export default ContestSection;