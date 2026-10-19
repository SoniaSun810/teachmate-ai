import { useRef, useState } from 'react'
import { Upload, FileText, X, AlertTriangle } from 'lucide-react'
import type { FileMeta } from '../../types'

interface FileUploaderProps {
  strict: boolean
  files: FileMeta[]
  onFilesChange: (files: FileMeta[]) => void
  maxFiles?: number
  maxSizeMB?: number
  allowedTypes?: string[]
}

const DEFAULT_MAX_FILES = 5
const DEFAULT_MAX_SIZE_MB = 10
const DEFAULT_ALLOWED_TYPES = ['.pdf', '.docx', '.txt']

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function getExtension(name: string): string {
  const idx = name.lastIndexOf('.')
  return idx >= 0 ? name.slice(idx).toLowerCase() : ''
}

export default function FileUploader({
  strict,
  files,
  onFilesChange,
  maxFiles = DEFAULT_MAX_FILES,
  maxSizeMB = DEFAULT_MAX_SIZE_MB,
  allowedTypes = DEFAULT_ALLOWED_TYPES,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string>('')
  const [dragOver, setDragOver] = useState(false)

  const validate = (newFiles: FileMeta[]): { ok: boolean; reason?: string } => {
    if (!strict) return { ok: true }
    if (newFiles.length === 0) return { ok: true }
    if (newFiles.length > maxFiles) {
      return { ok: false, reason: `最多只能上传 ${maxFiles} 个文件，当前选择了 ${newFiles.length} 个` }
    }
    for (const f of newFiles) {
      const ext = getExtension(f.name)
      if (!allowedTypes.includes(ext)) {
        return {
          ok: false,
          reason: `文件「${f.name}」格式不支持，仅允许 ${allowedTypes.join(' / ')}`,
        }
      }
      if (f.size > maxSizeMB * 1024 * 1024) {
        return {
          ok: false,
          reason: `文件「${f.name}」大小 ${formatSize(f.size)} 超过限制 ${maxSizeMB}MB`,
        }
      }
    }
    return { ok: true }
  }

  const handleFiles = (fileList: FileList | null) => {
    if (!fileList) return
    const incoming = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      type: f.type,
    }))

    if (strict) {
      const result = validate(incoming)
      if (!result.ok) {
        setError(result.reason || '文件校验失败')
        return
      }
    }
    setError('')
    const merged = strict ? incoming : [...files, ...incoming]
    onFilesChange(merged)
  }

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  const clearAll = () => {
    onFilesChange([])
    setError('')
  }

  return (
    <div className="w-full">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          if (strict) setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          if (strict) handleFiles(e.dataTransfer.files)
        }}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-morandi-blue bg-morandi-blue-bg'
            : strict
              ? 'border-morandi-blue-light hover:border-morandi-blue bg-morandi-blue-bg/50'
              : 'border-morandi-gray-light bg-morandi-gray-bg/50 hover:bg-morandi-gray-bg'
        }`}
      >
        <Upload className={`mx-auto mb-2 ${strict ? 'text-morandi-blue' : 'text-morandi-gray'}`} size={36} />
        <p className={`text-sm font-medium ${strict ? 'text-morandi-ink' : 'text-morandi-gray'}`}>
          {strict ? '点击或拖拽文件到此处上传' : '上传文件（随便传）'}
        </p>
        {strict && (
          <p className="text-xs text-morandi-gray mt-1">
            支持 {allowedTypes.join(' / ')}，单个文件 ≤ {maxSizeMB}MB，最多 {maxFiles} 个
          </p>
        )}
        {!strict && (
          <p className="text-xs text-morandi-gray mt-1">
            没有任何限制，想传什么传什么、想传多少传多少 🤷
          </p>
        )}
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* 错误提示（仅严格模式） */}
      {strict && error && (
        <div className="mt-3 flex items-start gap-2 px-4 py-2.5 rounded-xl bg-morandi-pink-bg border border-morandi-pink-light text-morandi-pink text-sm">
          <AlertTriangle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 已选文件列表 */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-morandi-gray">
              已选择 {files.length} 个文件
              {strict && ` / ${maxFiles}`}
            </span>
            <button
              onClick={clearAll}
              className="text-xs text-morandi-gray hover:text-morandi-pink transition-colors"
            >
              全部清除
            </button>
          </div>
          <div className="space-y-1.5">
            {files.map((f, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
                  strict ? 'bg-white border-morandi-blue-light' : 'bg-morandi-gray-bg border-morandi-gray-light'
                }`}
              >
                <FileText size={16} className={strict ? 'text-morandi-blue' : 'text-morandi-gray'} />
                <span className="flex-1 text-sm truncate">{f.name}</span>
                <span className="text-xs text-morandi-gray">{formatSize(f.size)}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-morandi-gray hover:text-morandi-pink transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
