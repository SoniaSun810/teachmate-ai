import DemoCompare from '../components/demo/DemoCompare'

export default function DemoPage() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-morandi-ink">需求工程对比演示</h1>
        <p className="text-sm text-morandi-gray mt-1">
          切换两个 Tab，体验同一功能在不同需求质量下的差异
        </p>
      </div>
      <DemoCompare />
    </div>
  )
}
