import { observer } from 'mobx-react-lite'

export interface ProjectFormProps {
  projectId: number | null
}

export const ProjectForm = observer((props: ProjectFormProps) => {
  const { projectId } = props
  return (
    <div>
      <p>ProjectForm - {projectId || 'null'}</p>
    </div>
  )
})
