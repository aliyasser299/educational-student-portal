import Layout from './components/Layout'
import CoursesDashboard from './components/CoursesDashboard'
import SuggestedCourses from './components/SuggestedCourses'
import TopSections from './components/TopSections'
import ScheduleSection from './components/ScheduleSection'
import RecommendedSection from './components/RecommendedSection'
import './App.css'

function App() {
  return (
    <Layout>
      <CoursesDashboard />
      <SuggestedCourses />
      <TopSections />
      <ScheduleSection />
      <RecommendedSection />
    </Layout>
  )
}

export default App
