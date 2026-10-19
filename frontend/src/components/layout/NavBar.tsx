import { NavLink } from 'react-router-dom'
import { GraduationCap, GitCompare, User, Users } from 'lucide-react'

const links = [
  { to: '/', label: '首页', icon: GraduationCap, end: true },
  { to: '/demo', label: '需求对比演示', icon: GitCompare },
  { to: '/student', label: '学生端', icon: User },
  { to: '/teacher', label: '老师端', icon: Users },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-morandi-gray-bg">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-morandi-ink font-bold">
          <span className="text-2xl">🦉</span>
          <span className="text-lg">AI 作业评阅</span>
        </NavLink>
        <div className="flex items-center gap-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-morandi-blue-bg text-morandi-ink'
                    : 'text-morandi-gray hover:bg-morandi-gray-bg hover:text-morandi-ink'
                }`
              }
            >
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  )
}
