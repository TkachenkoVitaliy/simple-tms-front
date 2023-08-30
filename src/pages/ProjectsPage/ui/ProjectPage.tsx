import { Link, useLocation } from 'react-router-dom'

function ProjectPage() {
  const location = useLocation()
  return (
    <div>
      <div>ProjectPage</div>
      <Link to={`${location.pathname}/1/dashboard`}>To Dashboard</Link>
    </div>
  )
}

export default ProjectPage
