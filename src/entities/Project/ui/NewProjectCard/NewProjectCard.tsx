import { Add } from '@mui/icons-material'
import { Button, Card, CardContent } from '@mui/material'
import { projectStore } from 'entities/Project/model/store/projectStore'
import { useNavigate } from 'react-router-dom'
import styles from './NewProjectCard.module.scss'

export const NewProjectCard = () => {
  const navigate = useNavigate()

  const cardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    projectStore.setActiveProjectId(null)
    navigate('/projects/new')
  }

  return (
    <Card
      variant="elevation"
      raised
      className={styles.card}
    >
      <Button
        fullWidth
        component="div"
        className={styles.btn}
        onClick={cardClick}
      >
        <CardContent
          component="div"
          className={styles.content}
        >
          <Add className={styles.add_svg} />
        </CardContent>
      </Button>
    </Card>
  )
}
