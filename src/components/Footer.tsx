export const Footer = () => {
  return (
    <div className="relative z-10 text-center py-8 mt-8">
      <div className="text-lg text-cyan-300 animate-pulse">✨ 次回の会議でも頑張って！ ✨</div>
      <div className="mt-4 space-x-4">
        <button
          className="bg-gradient-to-r from-green-400 to-green-600 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          type="button"
        >
          📊 詳細レポート
        </button>
        <button
          className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          type="button"
        >
          🎵 もう一度
        </button>
      </div>
    </div>
  )
}
