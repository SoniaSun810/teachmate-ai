import { CheckCircle2, XCircle } from 'lucide-react'
import type { RequirementItem } from '../../types'

interface RequirementsCardProps {
  title: string
  items: RequirementItem[]
  good: boolean // true = 需求充分版, false = 需求不充分版
}

export default function RequirementsCard({ title, items, good }: RequirementsCardProps) {
  return (
    <div
      className={`rounded-2xl border-2 p-5 ${
        good
          ? 'bg-morandi-green-bg border-morandi-green-light'
          : 'bg-morandi-pink-bg border-morandi-pink-light'
      }`}
    >
      <h3 className="text-sm font-bold text-morandi-ink mb-3 flex items-center gap-2">
        <span className="text-lg">{good ? '✅' : '⚠️'}</span>
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            {good ? (
              <CheckCircle2 size={16} className="text-morandi-green mt-0.5 shrink-0" />
            ) : (
              <XCircle size={16} className="text-morandi-pink mt-0.5 shrink-0" />
            )}
            <span className={good ? 'text-morandi-ink' : 'text-morandi-gray'}>{item.text}</span>
          </li>
        ))}
      </ul>
      <p className={`text-xs mt-3 ${good ? 'text-morandi-green' : 'text-morandi-pink'}`}>
        {good
          ? '→ 需求清晰、可验证、无歧义，产品体验良好'
          : '→ 需求模糊、缺少约束，导致产品体验差且有安全隐患'}
      </p>
    </div>
  )
}
