import React from 'react'
import { Box } from '@mui/material'
import { ReactComponent as CopyIcon } from 'assets/componentsIcon/copy_icon.svg'
import CheckIcon from '@mui/icons-material/Check'
import useCopyClipboard from 'hooks/useCopyClipboard'

interface Props {
  toCopy: string
  children?: React.ReactNode
  margin?: string
}

export default function Copy(props: Props) {
  const [isCopied, setCopied] = useCopyClipboard()
  const { toCopy, children, margin } = props

  return (
    <Box
      sx={{
        display: 'inline-flex',
        cursor: 'pointer',
        height: 15,
        margin,
        '& svg': {
          width: 14
          // mr: '10px'
        }
      }}
      onClick={() => setCopied(toCopy)}
    >
      {isCopied ? <CheckIcon sx={{ opacity: 0.6, fontSize: 16 }} /> : <CopyIcon />}
      {children}
    </Box>
  )
}
