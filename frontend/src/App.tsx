import { Routes, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar'
import Landing from './pages/Landing'
import DemoPage from './pages/DemoPage'
import StudentPage from './pages/StudentPage'
import TeacherPage from './pages/TeacherPage'

export default function App() {
  return (
    <div className="min-h-screen bg-morandi-gray-bg/30">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/student" element={<StudentPage />} />
          <Route path="/teacher" element={<TeacherPage />} />
        </Routes>
      </main>
    </div>
  )
}
