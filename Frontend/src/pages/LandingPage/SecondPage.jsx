





import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SecondPage = () => {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.error("Autoplay was prevented:", error);
      });
    }
  }, []);
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex items-center">

      {/* --- BACKGROUND VIDEO --- */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video
         
          src="/vid1.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/80"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-20 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-10">

        {/* LEFT SIDE:  */}
        <motion.div
          initial={{ opacity: 0, x: 500 }} // Card ke kaafi peeche se start
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 2.2,
            delay: 0.8,
            ease: [0.19, 1, 0.22, 1]
          }}
          className="z-0 order-2 md:order-1"
        >
          <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none text-white font-sans">
            <span className="bg-gradient-to-r from-white via-white to-orange-500 bg-clip-text text-transparent">
              TalkTown
            </span>
          </h2>

          <p className="text-lg md:text-xl text-zinc-300 max-w-sm mb-8 leading-relaxed font-sans">
            <span className="text-white font-medium">DSA is better with friends.</span> Join lobbies, chat in real-time, and master logic together. <span className="text-orange-500 italic font-bold">Stop solving alone.</span>
          </p>

       
        </motion.div>

        {/* RIGHT SIDE:  */}
        <div className="flex justify-center items-center relative perspective-1000 z-10 order-1 md:order-2">

          <div className="absolute w-[350px] h-[350px] bg-orange-600/20 blur-[100px] rounded-full"></div>

          <motion.div
            // initial={{ opacity: 0, scale: 0.8 }}
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: "easeOut" }} // Card bhi thoda slow aayega
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative w-[300px] h-[440px] md:w-[320px] md:h-[450px] rounded-[3rem] overflow-hidden border-2 border-orange-500 shadow-[0_0_50px_rgba(249,115,22,0.6)] ">
                <video
                  ref={videoRef}
                  src="/vid1.mp4"
                  autoPlay loop muted playsInline
                  className="w-full h-full object-cover opacity-100"
                />
                <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.9)]"></div>
              </div>
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/5 h-5 bg-orange-950/60 blur-xl rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecondPage;




