import { useCallback } from 'react'
import { Tabs as MuiTabs, Tab } from '@mui/material'

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
            padding: '0 20px',
            fontSize: 13,
            fontWeight: 500,
            color: '#000000',
            background: '#fff',
            minHeight: minHeight || 48,
            border: '1px solid rgba(22, 22, 22, 0.1)',
            borderRadius: 60,
            '&.Mui-selected': {
              opacity: 1,
              background: '#000',
              color: '#fff',
              borderColor: 'transparent',
              border: '1px solid #E5e5e5'
            }
          }}
        />
      ))}
    </MuiTabs>
  )
}
