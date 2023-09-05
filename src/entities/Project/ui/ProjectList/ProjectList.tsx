import { Grid } from '@mui/material'
import { memo } from 'react'
import { appStore } from 'app/store/AppStore'
import { observer } from 'mobx-react-lite'
import { ProjectItem } from '../ProjectItem/ProjectItem'
import { NewProjectItem } from '../NewProjectItem/NewProjectItem'

export const ProjectList = memo(
  observer(() => {
    return (
      <Grid
        container
        spacing={2}
      >
        <Grid
          key={0}
          item
          xs={4}
        >
          <NewProjectItem />
        </Grid>
        {appStore.projects
          .filter((project) => project.id !== 0)
          .map((project) => (
            <Grid
              key={project.id}
              item
              xs={4}
            >
              <ProjectItem project={project} />
            </Grid>
          ))}
      </Grid>
    )
  }),
)
