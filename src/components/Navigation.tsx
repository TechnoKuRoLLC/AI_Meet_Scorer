interface NavigationProps {
  showOverall: boolean
  setShowOverall: (show: boolean) => void
}

export const Navigation = ({ showOverall, setShowOverall }: NavigationProps) => {
  return (
    <div className="relative z-10 flex justify-center mb-8">
      <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 border-2 border-cyan-400">
        <button
          className={`px-6 py-3 rounded-full transition-all ${showOverall ? "text-cyan-300 hover:bg-white/10" : "bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold"}`}
          onClick={() => setShowOverall(false)}
          type="button"
        >
          個人スコア
        </button>
        <button
          className={`px-6 py-3 rounded-full transition-all ${showOverall ? "bg-gradient-to-r from-cyan-400 to-purple-400 text-black font-bold" : "text-cyan-300 hover:bg-white/10"}`}
          onClick={() => setShowOverall(true)}
          type="button"
        >
          チーム総合
        </button>
      </div>
    </div>
  )
}
