import { Avatar, TextField } from '@mui/material'
import MDEditor from '@uiw/react-md-editor'

import { RunTestCaseStep } from '../../model/types/testRun'

import styles from './StepPreview.module.scss'

export interface StepPreviewProps {
  step: RunTestCaseStep
}

export const StepPreview = (props: StepPreviewProps) => {
  const { step } = props

  const titleElement = () => (
    <TextField
      type="text"
      autoComplete="off"
      fullWidth
      label="name"
      disabled
      variant="outlined"
      helperText=" "
      value={step.name}
    />
  )

  return (
    <div className={styles.stepWrapper}>
      {step.name ? titleElement() : null}
      <div className={styles.step}>
        <div className={styles.leftSide}>
          <Avatar
            sx={{
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            {step.orderNumber}
          </Avatar>
        </div>
        <div className={styles.stepSide}>
          <div className={styles.typeTitle}>Action</div>
          <MDEditor
            height="120px"
            visibleDragbar={false}
            hideToolbar
            value={step.action || '\t'}
            preview="preview"
          />
        </div>
        <div className={styles.stepSide}>
          <div className={styles.typeTitle}>Expected</div>
          <MDEditor
            height="120px"
            visibleDragbar={false}
            hideToolbar
            value={step.expected || '\t'}
            preview="preview"
          />
        </div>
      </div>
    </div>
  )
}
