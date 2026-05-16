

function MetaCard({ label, value, copy }) {
  const copyToClipboard = () => {
    if (!copy) return;
    navigator.clipboard.writeText(value);
  };

  return (
    <div
      onClick={copyToClipboard}
      className={`bg-slate-900/60 border border-slate-700/50 rounded-xl p-4 text-center cursor-pointer transition ${
        copy ? "hover:border-red-500" : ""
      }`}
    >
      <p className="text-xs text-slate-400">{label}</p>
      <p className="text-lg font-bold text-white mt-1">{value}</p>
      {copy && <p className="text-xs text-red-400 mt-1">Click to copy</p>}
    </div>
  );
}
export default MetaCard