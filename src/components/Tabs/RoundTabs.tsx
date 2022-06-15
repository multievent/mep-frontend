import { useCallback } from 'react'
import { Tabs as MuiTabs, Tab, useTheme } from '@mui/material'

export default function Tabs({
  titles,
  current,
  onChange,
  minHeight
}: {
  titles: string[] | JSX.Element[]
  current: number
  onChange: (val: number) => void
  minHeight?: number
  // onChange?: ((event: SyntheticEvent<Element, Event>, value: any) => void
}) {
  const theme = useTheme()
  const handleOnChange = useCallback(
    (e: React.ChangeEvent<any>, value: any) => {
      onChange(value)
    },
    [onChange]
  )

  return (
    <MuiTabs
      value={current}
      onChange={handleOnChange}
      sx={{
        '& .MuiTabs-flexContainer': {
          gap: 10,
          justifyContent: 'flex-start'
        },
        '& .MuiTabs-indicator': { display: 'none' }
      }}
      centered
    >
      {titles.map((tab, idx) => (
        <Tab
          disableRipple
          key={idx}
          label={tab}
          sx={{
            textTransform: 'none',
            padding: '6px 12px',
            fontSize: 14,
            fontWeight: 500,
            color: theme.textColor.text1,
            background: '#fff',
            minHeight: minHeight || 42,
            border: '1px solid #EEEEEE',
            borderRadius: '8px',
            '& img': {
              opacity: 0.6
            },
            '&.Mui-selected': {
              '& img': {
                opacity: 1
              },
              color: theme.palette.text.primary,
              background: theme.bgColor.bg2,
              border: '1px solid #FFC400'
            }
          }}
        />
      ))}
    </MuiTabs>
  )
}
