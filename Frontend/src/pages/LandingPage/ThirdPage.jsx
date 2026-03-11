

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Cpu, Braces, Terminal, Layout, Code2 } from 'lucide-react';

// const ThirdPage = () => {
//   const [step, setStep] = useState(0); 
//   const [displayText, setDisplayText] = useState("");

//   const dsData = [
//     {
//       title: "Binary Tree",
//       subtitle: "Process: Level Order Allocation",
//       code: `void inorder(Node* root) {\n  if (root == NULL) return;\n  inorder(root->left);\n  cout << root->data << " ";\n  inorder(root->right);\n}`,
//       tokens: [
//         { regex: /void|return|if/g, color: "text-[#d85c8a]" },
//         { regex: /inorder|cout/g, color: "text-[#60a5fa]" },
//         { regex: /NULL|Node/g, color: "text-[#fbbf24]" },
//         { regex: /".*?"/g, color: "text-[#4ade80]" }
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
//     }, 20);
//     return () => clearInterval(timer);
//   }, [step]);

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
//         split.forEach((s, j) => {
//           newParts.push({ text: s, color: "text-white/80" });
//           if (matches && matches[j]) {
//             newParts.push({ text: matches[j], color });
//           }
//         });
//       });
//       parts = newParts;
//     });

//     return parts.map((p, k) => <span key={k} className={p.color}>{p.text}</span>);
//   };

//   return (
//     <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-10 overflow-hidden">
//       <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
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

// <div className="relative group">
//            <div className="absolute -inset-0.5 bg-gradient-to-r from-zinc-800 to-orange-500/20 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          
//            <div className="relative bg-[#0A0A0B] border border-zinc-800/50 rounded-3xl overflow-hidden shadow-2xl">
//                  {/* Header: Mac-Style Dots */}
//                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1C1E] border-zinc-700 bg-[#1f2937]">
//                    <div className="flex items-center gap-4">
//                      <div className="flex gap-2">
//                          <div className="w-3 h-3 rounded-full bg-zinc-800" />
//                         <div className="w-3 h-3 rounded-full bg-zinc-800" />
//                          <div className="w-3 h-3 rounded-full bg-zinc-800" />
//                      </div>
//                      <div className="flex items-center gap-2 ml-2">
//                          <Terminal size={14} className="text-orange-500" />
//                          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Logic_Core.cpp</span>
//                      </div>
//                    </div>
//                    <Code2 size={14} className="text-zinc-700" />
//                 </div>

//             <div className="font-mono text-sm md:text-lg leading-relaxed h-[200px] bg-[#0b0e14] p-6 rounded-xl border border-white/5 shadow-inner">
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

// const TreeVisual = () => {
//   const levels = [
//     { id: 'root', x: 200, y: 50, val: 10, delay: 0 },
//     { id: 'l1', x: 120, y: 120, val: 5, parentX: 200, parentY: 50, delay: 0.8 },
//     { id: 'r1', x: 280, y: 120, val: 15, parentX: 200, parentY: 50, delay: 1.4 },
//     { id: 'l1_l', x: 70, y: 190, val: 2, parentX: 120, parentY: 120, delay: 2.0 },
//     { id: 'l1_r', x: 170, y: 190, val: 7, parentX: 120, parentY: 120, delay: 2.4 }
//   ];

//   return (
//     <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
//       {levels.map((node, i) => i > 0 && (
//         <motion.line
//           key={`line-${node.id}`}
//           x1={node.parentX} y1={node.parentY}
//           x2={node.x} y2={node.y}
//           stroke="#3f3f46" // GRAY EDGES
//           strokeWidth="1.2"
//           strokeDasharray="5,5"
//           initial={{ pathLength: 0 }}
//           animate={{ pathLength: 1 }}
//           transition={{ duration: 0.8, delay: node.delay - 0.2 }}
//         />
//       ))}
//       {levels.map((node) => (
//         <g key={node.id}>
//           <motion.circle
//             cx={node.x} cy={node.y} r="15"
//             fill="#0b0e14" stroke="#d85c8a" strokeWidth="2"
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 200, delay: node.delay }}
//           />
//           <motion.text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="10" className="font-mono font-bold">{node.val}</motion.text>
//         </g>
//       ))}
//     </motion.svg>
//   );
// };

// const LinkedListVisual = () => (
//   <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
//     {[ {x: 60, v: 12}, {x: 160, v: 45}, {x: 260, v: 89} ].map((node, i) => (
//       <g key={i}>
//         <motion.rect 
//           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.4 }}
//           x={node.x} y="110" width="50" height="30" rx="6" 
//           fill="#0b0e14" stroke="#d85c8a" strokeWidth="2" 
//         />
//         <text x={node.x + 25} y="130" textAnchor="middle" fill="#60a5fa" fontSize="11" className="font-mono font-bold">{node.v}</text>
//         {i < 2 && (
//           <motion.line 
//             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.4 + 0.2 }}
//             x1={node.x + 50} y1="125" x2={node.x + 100} y2="125" 
//             stroke="#3f3f46" strokeWidth="1.2" strokeDasharray="4"
//           />
//         )}
//       </g>
//     ))}
//   </motion.svg>
// );

// const ArrayVisual = () => (
//   <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
//     {[4, 8, 15, 16, 23].map((v, i) => (
//       <motion.div 
//         key={i}
//         initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
//         className={`w-14 h-14 border-2 flex items-center justify-center font-mono font-bold rounded-lg
//           ${i < 2 ? 'border-[#d85c8a] bg-[#d85c8a]/10 text-[#d85c8a]' : 'border-white/10 text-zinc-500 bg-white/5'}`}
//       >
//         {v}
//       </motion.div>
//     ))}
//   </motion.div>
// );

// export default ThirdPage;;







import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Code2 } from 'lucide-react';

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
        { regex: /NULL|Node/g, color: "text-[#9ca3af]" },
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
        { regex: /head|temp|next|NULL|Node/g, color: "text-[#9ca3af" }
      ]
    },
    {
      title: "Array / Two Sum",
      subtitle: "Logic: Hash Map Optimization",
      code: `vector<int> twoSum(vector<int>& nums) {\n  for(int i=0; i<nums.size(); i++) {\n    int diff = target - nums[i];\n  }\n  return {};\n}`,
      tokens: [
        { regex: /vector|int|return|for/g, color: "text-[#d85c8a]" },
        { regex: /twoSum|size/g, color: "text-[#60a5fa]" },
        { regex: /nums|target|diff/g, color: "text-[#9ca3af" }
      ]
    }
  ];

  // Global switch speed increased (8s to 5s)
  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % dsData.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, []);

  // Typing speed increased (20ms to 10ms)
  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const currentCode = dsData[step].code;
    const timer = setInterval(() => {
      setDisplayText(currentCode.substring(0, i));
      i++;
      if (i > currentCode.length) clearInterval(timer);
    }, 10);
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
    <section className="relative w-full min-h-screen bg-black flex items-center justify-center px-6 md:px-10 overflow-hidden">
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* LEFT PORTION: Faster Visuals */}
        <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
          <AnimatePresence mode="wait">
             {step === 0 && <TreeVisual key="tree" />}
             {step === 1 && <LinkedListVisual key="list" />}
             {step === 2 && <ArrayVisual key="array" />}
          </AnimatePresence>
          <div className="absolute -bottom-10 flex flex-col items-center gap-3">
             <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em]">{dsData[step].subtitle}</span>
          </div>
        </div>

        {/* RIGHT PORTION: Fixed Editor UI */}
        <div className="relative group w-full max-w-2xl mx-auto lg:mx-0">
           <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/10 to-transparent rounded-[2rem] blur-xl opacity-30" />
          
           <div className="relative bg-[#0F0F10] border border-zinc-700/50 rounded-3xl overflow-hidden shadow-2xl">
                 {/* Header: Fixed Dots Colors */}
                 <div className="flex items-center justify-between px-6 py-4 border-b border-[#1C1C1E] border-zinc-700 bg-[#1f2937]">
                   <div className="flex items-center gap-4">
                     <div className="flex gap-2">
                         {/* Standard Mac-style colors */}
                         <div className="w-3 h-3 rounded-full bg-[#FF5F56] " />
                         <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                         <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                     </div>
                     <div className="h-4 w-[1px] bg-zinc-700/50 mx-1" />
                     <div className="flex items-center gap-2">
                         <Terminal size={14} className="text-orange-500" />
                         <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Logic_Core.cpp</span>
                     </div>
                   </div>
                   <Code2 size={14} className="text-zinc-700" />
                 </div>

                {/* Body: Fixed Height & Scrollable */}
                <div className="p-6 md:p-8 bg-black">
                    <div className="font-mono text-sm md:text-base leading-relaxed min-h-[200px] max-h-[200px] overflow-y-auto">
                      <pre>
                        <code className="whitespace-pre">
                          {highlightCode(displayText)}
                          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-[2px] h-5 bg-orange-500 ml-1 translate-y-1" />
                        </code>
                      </pre>
                    </div>
                </div>
           </div>
        </div>
      </div>
    </section>
  );
};

/* --- FASTER VISUAL COMPONENTS --- */

// const TreeVisual = () => {
//   // Delays reduced for faster rendering
//   const levels = [
//     { id: 'root', x: 200, y: 50, val: 10, delay: 0 },
//     { id: 'l1', x: 120, y: 120, val: 5, parentX: 200, parentY: 50, delay: 0.3 },
//     { id: 'r1', x: 280, y: 120, val: 15, parentX: 200, parentY: 50, delay: 0.5 },
//     { id: 'l1_l', x: 70, y: 190, val: 2, parentX: 120, parentY: 120, delay: 0.7 },
//     { id: 'l1_r', x: 170, y: 190, val: 7, parentX: 120, parentY: 120, delay: 0.9 }
//   ];

//   return (
//     <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
//       {levels.map((node, i) => i > 0 && (
//         <motion.line
//           key={`line-${node.id}`}
//           x1={node.parentX} y1={node.parentY} x2={node.x} y2={node.y}
//           stroke="#3f3f46" strokeWidth="1.5"
//           initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
//           transition={{ duration: 0.4, delay: node.delay - 0.1 }}
//         />
//       ))}
//       {levels.map((node) => (
//         <g key={node.id}>
//           <motion.circle
//             cx={node.x} cy={node.y} r="15"
//             fill="#0b0e14" stroke="#d85c8a" strokeWidth="2"
//             initial={{ scale: 0 }} animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 300, delay: node.delay }}
//           />
//           <text x={node.x} y={node.y + 4} textAnchor="middle" fill="white" fontSize="10" className="font-mono font-bold">{node.val}</text>
//         </g>
//       ))}
//     </motion.svg>
//   );
// };

// const LinkedListVisual = () => (
//   <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
//     {[ {x: 60, v: 12}, {x: 160, v: 45}, {x: 260, v: 89} ].map((node, i) => (
//       <g key={i}>
//         <motion.rect 
//           initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.2 }}
//           x={node.x} y="110" width="50" height="30" rx="6" 
//           fill="#0b0e14" stroke="#d85c8a" strokeWidth="2" 
//         />
//         <text x={node.x + 25} y="130" textAnchor="middle" fill="#60a5fa" fontSize="11" className="font-mono font-bold">{node.v}</text>
//         {i < 2 && (
//           <motion.line 
//             initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.2 + 0.1 }}
//             x1={node.x + 50} y1="125" x2={node.x + 100} y2="125" 
//             stroke="#3f3f46" strokeWidth="1.5"
//           />
//         )}
//       </g>
//     ))}
//   </motion.svg>
// );

// const ArrayVisual = () => (
//   <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex gap-2">
//     {[4, 8, 15, 16, 23].map((v, i) => (
//       <motion.div 
//         key={i}
//         initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
//         className={`w-12 h-12 md:w-14 md:h-14 border-2 flex items-center justify-center font-mono font-bold rounded-lg
//           ${i < 2 ? 'border-[#d85c8a] bg-[#d85c8a]/10 text-[#d85c8a]' : 'border-white/10 text-zinc-500 bg-white/5'}`}
//       >
//         {v}
//       </motion.div>
//     ))}
//   </motion.div>
// );







const TreeVisual = () => {
  const levels = [
    { id: 'root', x: 200, y: 50, val: 10, delay: 0 },
    { id: 'l1', x: 120, y: 120, val: 5, parentX: 200, parentY: 50, delay: 0.2 },
    { id: 'r1', x: 280, y: 120, val: 15, parentX: 200, parentY: 50, delay: 0.4 },
    { id: 'l1_l', x: 70, y: 190, val: 2, parentX: 120, parentY: 120, delay: 0.6 },
    { id: 'l1_r', x: 170, y: 190, val: 7, parentX: 120, parentY: 120, delay: 0.8 }
  ];

  return (
    <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full" viewBox="0 0 400 250">
      {levels.map((node, i) => i > 0 && (
        <motion.line
          key={`line-${node.id}`}
          x1={node.parentX} y1={node.parentY} x2={node.x} y2={node.y}
          stroke="#27272a" // Subtle zinc line
          strokeWidth="1.5"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: node.delay }}
        />
      ))}
      {levels.map((node) => (
        <g key={node.id}>
          <motion.circle
            cx={node.x} cy={node.y} r="15"
            fill="#09090b" // Dark background
            stroke="#ffffff" // Clean White Outer Circle
            strokeWidth="1.5"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: node.delay }}
          />
          <text x={node.x} y={node.y + 4} textAnchor="middle" fill="#94a3b8" fontSize="10" className="font-mono font-bold">{node.val}</text>
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
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }}
          x={node.x} y="110" width="55" height="32" rx="8" 
          fill="#09090b" stroke="#ffffff" strokeWidth="1.5" // White Outer Rectangle
        />
        <text x={node.x + 27} y="131" textAnchor="middle" fill="#94a3b8" fontSize="11" className="font-mono font-bold">{node.v}</text>
        {i < 2 && (
          <motion.line 
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: i * 0.2 }}
            x1={node.x + 55} y1="126" x2={node.x + 105} y2="126" 
            stroke="#27272a" strokeWidth="2"
          />
        )}
      </g>
    ))}
  </motion.svg>
);

const ArrayVisual = () => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex gap-3">
    {[4, 8, 15, 16, 23].map((v, i) => (
      <motion.div 
        key={i}
        initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
        className={`w-14 h-14 border flex items-center justify-center font-mono font-bold rounded-xl
          ${i < 2 ? 'border-white bg-white/5 text-[#94a3b8]' 
                   : 'border-zinc-800 text-zinc-600 bg-zinc-900/30'}`}
      >
        {v}
      </motion.div>
    ))}
  </motion.div>
);

export default ThirdPage;





















