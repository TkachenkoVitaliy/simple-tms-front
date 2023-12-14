import { Button, Card, CardContent, CardHeader, useTheme } from '@mui/material'
import { projectStore } from 'entities/Project/model/store/projectStore'
import { Project } from 'entities/Project/model/types/project'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { classNames } from 'shared/lib/utils'
import styles from './ProjectCard.module.scss'

export interface ProjectCardProps {
  project: Project
}

export const ProjectCard = observer((props: ProjectCardProps) => {
  const { project } = props

  const { name, description } = project
  const theme = useTheme()
  const navigate = useNavigate()
  const borderColor = theme.palette.info.main

  const selectCard = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    projectStore.setActiveProjectId(project.id)
  }

  const editCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    projectStore.setActiveProjectId(project.id)
    navigate(`../projects/${project.id}`)
  }

  const deleteCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (project.id !== null) {
      // await projectStore.deleteProject(project.id)
      // await projectStore.initProjects()
    }
  }

  const isActive = useMemo(() => {
    return project.id === projectStore.activeProjectId
  }, [project, projectStore.activeProjectId])

  return (
    <Card
      variant="elevation"
      raised
      className={classNames(styles.container, { [styles.active]: isActive })}
    >
      <Button
        fullWidth
        component="div"
        className={styles.cardBtn}
        onClick={selectCard}
      >
        <CardHeader
          title={name}
          className={styles.header}
        />
        <CardContent
          component="div"
          className={styles.content}
        >
          <div className={styles.description}>{description}</div>
        </CardContent>
      </Button>
      {/* Стоить вынести отдельно как ActionPanel или Actions */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginTop: '8px',
        }}
      >
        <Button
          color="primary"
          variant="outlined"
          onClick={editCard}
        >
          EDIT
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={deleteCard}
        >
          DELETE
        </Button>
      </div>
    </Card>
  )
})
