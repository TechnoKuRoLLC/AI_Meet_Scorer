import { type ChangeEvent, type DragEvent, useRef, useState } from "react"

interface UploadScreenProps {
  onFileUpload: (text: string) => void
  isLoading: boolean
}

export const UploadScreen = ({ onFileUpload, isLoading }: UploadScreenProps) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileRead = async (file: File) => {
    try {
      const text = await file.text()
      setSelectedFile(file)
      onFileUpload(text)
    } catch (error) {
      console.error("Error reading file:", error)
      alert("ファイルの読み込みに失敗しました")
    }
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    const textFile = files.find((file) => file.type === "text/plain" || file.name.endsWith(".txt"))

    if (textFile) {
      handleFileRead(textFile)
    } else {
      alert("テキストファイル(.txt)をアップロードしてください")
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileRead(file)
    }
  }

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse mb-4">
            🎤 AI会議採点システム 🎤
          </h1>
          <p className="text-2xl text-cyan-300">会議の議事録をアップロードして分析開始！</p>
        </div>

        {/* Upload Area */}
        <div
          className={`
            relative border-4 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer
            ${
              isDragOver
                ? "border-cyan-400 bg-cyan-400/10 scale-105"
                : "border-cyan-600 bg-black/20 hover:border-cyan-400 hover:bg-cyan-400/5"
            }
            ${isLoading ? "pointer-events-none opacity-50" : ""}
          `}
          onClick={() => !isLoading && fileInputRef.current?.click()}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onKeyDown={(e) => e.key === "Enter" && !isLoading && fileInputRef.current?.click()}
        >
          {isLoading ? (
            <div className="flex flex-col items-center space-y-6">
              <div className="animate-spin w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full" />
              <div className="text-2xl font-bold text-cyan-300">🤖 AI分析中...</div>
              <div className="text-lg text-gray-300">
                {selectedFile ? `"${selectedFile.name}" を分析しています` : "議事録を分析しています"}
              </div>
            </div>
          ) : (
            <>
              <div className="text-8xl mb-6">📄</div>
              <h2 className="text-3xl font-bold text-cyan-300 mb-4">
                {selectedFile ? "別のファイルを選択" : "議事録ファイルをアップロード"}
              </h2>
              <p className="text-xl text-gray-300 mb-6">ドラッグ&ドロップ または クリックして選択</p>
              <div className="bg-cyan-400/20 rounded-xl p-4 mb-6">
                <p className="text-cyan-200">📋 対応形式: テキストファイル (.txt)</p>
              </div>
              {selectedFile && (
                <div className="bg-green-400/20 rounded-xl p-4">
                  <p className="text-green-200">✅ 選択済み: {selectedFile.name}</p>
                </div>
              )}
            </>
          )}

          <input
            accept=".txt,text/plain"
            className="hidden"
            disabled={isLoading}
            onChange={handleFileChange}
            ref={fileInputRef}
            type="file"
          />
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-bold text-cyan-300 mb-6">📝 使い方</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black/30 rounded-xl p-6">
              <div className="text-4xl mb-3">1️⃣</div>
              <h4 className="text-lg font-bold mb-2">議事録準備</h4>
              <p className="text-gray-300">会議の議事録をテキストファイルで用意</p>
            </div>
            <div className="bg-black/30 rounded-xl p-6">
              <div className="text-4xl mb-3">2️⃣</div>
              <h4 className="text-lg font-bold mb-2">ファイル選択</h4>
              <p className="text-gray-300">上記エリアにファイルをドロップ</p>
            </div>
            <div className="bg-black/30 rounded-xl p-6">
              <div className="text-4xl mb-3">3️⃣</div>
              <h4 className="text-lg font-bold mb-2">結果確認</h4>
              <p className="text-gray-300">AI分析結果を確認してスコア改善</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
