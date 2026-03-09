import { motion } from 'framer-motion';
const SixthPage = () => {
  return (
    <section className="w-full py-32 bg-black border-t border-white/5 flex flex-col items-center justify-center text-center px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="max-w-2xl"
      >
        <h2 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter italic">
          "LOGIC KA <span className="text-orange-600">CHAKKAR</span> BABU BHAIYA!"
        </h2>
        
        <p className="text-zinc-500 font-mono text-sm uppercase tracking-[0.4em] mb-12">
          Stop Mugging Up. Start Building Logic.
        </p>

        <div className="relative group inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-pink-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <button className="relative bg-white text-black font-black px-12 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-orange-600 hover:text-white transition-all">
            Join LeetLab Now — It's Free
          </button>
        </div>

        <div className="mt-20 text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
          Built with ❤️ for those who forget syntax but never the logic.
        </div>
      </motion.div>
    </section>
  );
};

export default SixthPage;