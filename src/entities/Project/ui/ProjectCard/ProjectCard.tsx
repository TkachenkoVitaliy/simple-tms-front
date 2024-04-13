import { useMemo } from 'react'

import { observer } from 'mobx-react-lite'

import { Button, Card, CardContent, CardHeader } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import { classNames } from 'shared/lib/utils'
import { ActionBtn, ActionPanel } from 'shared/ui/ActionPanel'
import { TMSSkeleton } from 'shared/ui/TMSSkeleton'

import { projectStore } from '../../model/store/projectStore'
import { Project } from '../../model/types/project'

import styles from './ProjectCard.module.scss'

export interface ProjectCardProps {
  project: Project
}

export const ProjectCard = observer((props: ProjectCardProps) => {
  const { project } = props
  const navigate = useNavigate()

  const selectCard = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    projectStore.setActiveProjectId(project.id)
  }

  const editCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    navigate(`../projects/${project.id}`)
  }

  const deleteCard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (project.id !== null) {
      await projectStore.deleteProject(project.id)
    }
  }

  const actions: ActionBtn[] = [
    {
      onClick: editCard,
      text: 'EDIT',
      color: 'primary',
    },
    {
      onClick: deleteCard,
      text: 'DELETE',
      color: 'error',
    },
  ]

  const isActive = useMemo(() => {
    return project.id === projectStore.activeProjectId
  }, [project, projectStore.activeProjectId])

  return (
    <TMSSkeleton
      isLoading={projectStore.isLoading}
      width="100%"
    >
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
            title={project.name}
            className={styles.header}
          />
          <CardContent
            component="div"
            className={styles.content}
          >
            <div className={styles.description}>{project.description}</div>
          </CardContent>
        </Button>
        <ActionPanel
          className={styles.actionPanel}
          actionBtns={actions}
        />
      </Card>
    </TMSSkeleton>
  )
})
