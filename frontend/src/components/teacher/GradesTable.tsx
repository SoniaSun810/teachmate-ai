import { mockGrades } from '../../data/mockData'
import type { GradeStatus } from '../../types'

const statusStyle: Record<GradeStatus, string> = {
  已批改: 'bg-morandi-green-bg text-morandi-green border-morandi-green-light',
  批改中: 'bg-morandi-yellow-bg text-morandi-yellow border-morandi-yellow-light',
  待提交: 'bg-morandi-gray-bg text-morandi-gray border-morandi-gray-light',
}

export default function GradesTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-morandi-gray-bg bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-morandi-gray-bg/60 text-morandi-ink">
              <th className="text-left px-5 py-3 font-semibold">学号</th>
              <th className="text-left px-5 py-3 font-semibold">姓名</th>
              <th className="text-left px-5 py-3 font-semibold">作业</th>
              <th className="text-center px-5 py-3 font-semibold">分数</th>
              <th className="text-center px-5 py-3 font-semibold">状态</th>
              <th className="text-left px-5 py-3 font-semibold">提交时间</th>
            </tr>
          </thead>
          <tbody>
            {mockGrades.map((row, i) => (
              <tr
                key={row.studentId}
                className={`border-t border-morandi-gray-bg ${i % 2 === 0 ? 'bg-white' : 'bg-morandi-gray-bg/20'}`}
              >
                <td className="px-5 py-3 text-morandi-ink">{row.studentId}</td>
                <td className="px-5 py-3 text-morandi-ink font-medium">{row.studentName}</td>
                <td className="px-5 py-3 text-morandi-gray max-w-[220px] truncate">{row.assignmentName}</td>
                <td className="px-5 py-3 text-center">
                  {row.score !== null ? (
                    <span
                      className={`font-bold ${
                        row.score >= 90
                          ? 'text-morandi-green'
                          : row.score >= 60
                            ? 'text-morandi-blue'
                            : 'text-morandi-pink'
                      }`}
                    >
                      {row.score}
                    </span>
                  ) : (
                    <span className="text-morandi-gray">—</span>
                  )}
                </td>
                <td className="px-5 py-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-lg text-xs border ${statusStyle[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-morandi-gray">{row.submittedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
