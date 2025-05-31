export const BackgroundElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-pink-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  )
}
