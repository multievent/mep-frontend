import {
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Box,
  styled,
  IconButton,
  Collapse,
  TableSortLabel
} from '@mui/material'
import { useState } from 'react'
import useBreakpoint from '../../hooks/useBreakpoint'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
// import { visuallyHidden } from '@mui/utils'

const Profile = styled('div')(`
  display: flex;
  align-items: center;
`)

export const TableProfileImg = styled('div', {
  shouldForwardProp: () => true
})(({ url }: { url?: string }) => ({
  height: '24px',
  width: '24px',
  borderRadius: '50%',
  objectFit: 'cover',
  marginRight: '8px',
  background: `#000000 ${url ? `url(${url})` : ''}`
}))

export function OwnerCell({ url, name }: { url?: string; name: string }) {
  return (
    <Profile>
      <TableProfileImg url={url} />
      {name}
    </Profile>
  )
}

const StyledTableContainer = styled(TableContainer)({
  display: 'table',
  borderRadius: '40px',
  '& .MuiTableCell-root': {
    borderBottom: 'none',
    fontWeight: 500,
    padding: '14px 20px',
    '&:first-of-type': {
      paddingLeft: 20
    },
    '&:last-child': {
      paddingRight: 20
    }
  },
  '& table': {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 8px'
  }
})

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  borderRadius: 8,
  overflow: 'hidden',
  '& .MuiTableCell-root': {
    fontSize: '12px',
    whiteSpace: 'pre',
    lineHeight: '12px',
    background: 'rgba(255, 255, 255, 0.08)',
    padding: '12px 20px 6px 0',
    color: theme.palette.primary.main,
    opacity: 0.5,
    borderBottom: 'none',
    '& .MuiTableSortLabel-root': {
      // fontWeight: 400,
      // fontSize: '12px!important',
      color: theme.palette.primary.main,
      opacity: 0.5
    },
    '&:first-of-type': {
      paddingLeft: 20,
      borderTopLeftRadius: 8
    },
    '&:last-child': {
      paddingRight: 20,
      borderTopRightRadius: 8
    }
  }
}))

const StyledTableRow = styled(TableRow, { shouldForwardProp: () => true })<{
  variant: 'outlined' | 'grey'
  fontSize?: string
}>(({ variant, theme, fontSize }) => ({
  height: 80,
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
  whiteSpace: 'pre',
  background: variant === 'outlined' ? 'transparent' : theme.palette.common.white,
  '& + tr .MuiCollapse-root': {
    background: variant === 'outlined' ? 'transparent' : theme.palette.common.white
  },
  '& .MuiTableCell-root': {
    fontSize: fontSize ?? 'inherit',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    border: '1px solid',
    borderColor: variant === 'outlined' ? '#00000010' : 'transparent',
    borderRight: 'none',
    borderLeft: 'none',
    // '& .MuiTypography-root': {
    //   fontSize: fontSize ?? '16px'
    // },
    '&:first-of-type': {
      borderLeft: '1px solid',
      borderColor: variant === 'outlined' ? '#00000010' : 'transparent',
      paddingLeft: '20px',
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px'
    },
    '&:last-child': {
      borderRight: '1px solid',
      borderColor: variant === 'outlined' ? '#00000010' : 'transparent',
      paddingRight: '20px',
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px'
    }
  }
  // '&:hover': {
  //   '& + tr .MuiCollapse-root': {
  //     backgroundColor: variant === 'outlined' ? '#E2E7F020' : '#E2E7F0'
  //   },
  //   backgroundColor: variant === 'outlined' ? '#E2E7F020' : '#E2E7F0'
  // }
}))

const Card = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: '8px',
  padding: '16px 24px',
  [theme.breakpoints.down('md')]: {
    padding: '10px'
  }
}))

const sortIcon = ({ className }: { className: string }) => (
  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      className="sort-down"
      d="M1.0875 6.5791L3 8.48743L4.9125 6.5791L5.5 7.1666L3 9.6666L0.5 7.1666L1.0875 6.5791Z"
      fill="#00000099"
    />
    <path
      className="sort-up"
      d="M1.0875 3.421L3 1.51266L4.9125 3.421L5.5 2.8335L3 0.333496L0.5 2.8335L1.0875 3.421Z"
      fill="#00000099"
    />
  </svg>
)

export default function Table({
  header,
  rows,
  variant = 'grey',
  collapsible,
  hiddenParts,
  fontSize,
  sortHeaders,
  order,
  orderBy,
  createSortfunction,
  noHeader,
  showCard
}: {
  sortHeaders?: string[]
  header: string[]
  rows: (string | number | JSX.Element)[][]
  variant?: 'outlined' | 'grey'
  collapsible?: boolean
  hiddenParts?: JSX.Element[]
  fontSize?: string
  order?: 'asc' | 'desc'
  orderBy?: string
  noHeader?: boolean
  showCard?: boolean
  createSortfunction?: (label: string) => () => void
}) {
  const matches = useBreakpoint('md')

  return (
    <>
      {matches ? (
        <>
          {rows.map((data, index) => (
            <Card key={index} sx={{ mb: 10 }}>
              <CardPanel data={data} collapsible={collapsible && hiddenParts ? hiddenParts[index] : undefined} />
            </Card>
          ))}
        </>
      ) : showCard ? (
        <Box display={'grid'} gridTemplateColumns="1fr 1fr" gap={24}>
          {rows.map((data, index) => (
            <Card key={index} sx={{ mb: 10 }}>
              <CardPanel data={data} collapsible={collapsible && hiddenParts ? hiddenParts[index] : undefined} />
            </Card>
          ))}
        </Box>
      ) : (
        <StyledTableContainer>
          <table>
            {!noHeader && (
              <StyledTableHead>
                <TableRow>
                  {header.map((string, idx) => (
                    <TableCell key={idx}>
                      {sortHeaders && sortHeaders.includes(string) && order && orderBy && createSortfunction ? (
                        <TableSortLabel
                          active={orderBy === string}
                          direction={orderBy === string ? order : 'asc'}
                          onClick={createSortfunction(string)}
                          IconComponent={sortIcon}
                          sx={{
                            '& .MuiTableSortLabel-icon': {
                              transform: 'none',
                              opacity: 1
                            },
                            '& .MuiTableSortLabel-iconDirectionDesc .sort-down': {
                              fill: theme =>
                                orderBy === string
                                  ? order === 'desc'
                                    ? theme.palette.primary.main
                                    : '#00000099'
                                  : '#00000099'
                            },
                            '& .MuiTableSortLabel-iconDirectionAsc .sort-up': {
                              fill: theme =>
                                orderBy === string
                                  ? order === 'asc'
                                    ? theme.palette.primary.main
                                    : '#00000099'
                                  : '#00000099'
                            }
                          }}
                        >
                          {string}

                          {/* <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                        </Box> */}
                        </TableSortLabel>
                      ) : (
                        string
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </StyledTableHead>
            )}
            <TableBody>
              {rows.map((row, idx) => (
                <Row
                  fontSize={fontSize}
                  row={row}
                  collapsible={collapsible}
                  key={row[0].toString() + idx}
                  variant={variant}
                  hiddenPart={hiddenParts && hiddenParts[idx]}
                />
              ))}
            </TableBody>
          </table>
        </StyledTableContainer>
      )}
    </>
  )
}

function Row({
  row,
  variant,
  collapsible,
  hiddenPart,
  fontSize
}: {
  row: (string | number | JSX.Element)[]
  variant: 'outlined' | 'grey'
  collapsible?: boolean
  hiddenPart?: JSX.Element
  fontSize?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <StyledTableRow
        fontSize={fontSize}
        variant={variant}
        sx={
          isOpen
            ? {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                '& .MuiTableCell-root': {
                  '&:first-of-type': { borderBottomLeftRadius: 0 },
                  '&:last-child': { borderBottomRightRadius: 0 }
                }
              }
            : undefined
        }
      >
        {row.map((data, idx) => (
          <TableCell key={idx}>{data}</TableCell>
        ))}
        {collapsible && (
          <TableCell>
            <span style={{ color: '#69718C' }}>Detail</span>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setIsOpen(open => !open)}
              sx={{ flexGrow: 0 }}
            >
              {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
      </StyledTableRow>
      {collapsible && (
        <TableRow>
          <TableCell style={{ padding: 0 }} colSpan={row.length + 5}>
            <Collapse
              in={isOpen}
              timeout="auto"
              unmountOnExit
              sx={{
                borderRadius: '0 0 8px 8px',
                width: '100%',
                marginTop: -8
              }}
            >
              <Box
                sx={{
                  padding: '0 15px 15px',
                  // border: '1px solid rgba(0, 0, 0, 0.1)',
                  borderTop: 'none',
                  borderRadius: '0 0 8px 8px',
                  transition: '.5s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                {hiddenPart}
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  )
}

// function MobileCardCollapsible({ collapsible, hiddenPart }: { collapsible?: boolean; hiddenPart?: JSX.Element }) {
//   const [isOpen, setIsOpen] = useState(false)

//   return collapsible ? (
//     <Box
//       sx={{
//         display: 'grid !important'
//       }}
//     >
//       <Collapse
//         in={isOpen}
//         timeout="auto"
//         unmountOnExit
//         sx={{
//           borderRadius: '8px',
//           width: '100%',
//           overflow: 'auto',
//           marginTop: -8
//         }}
//       >
//         <Box
//           sx={{
//             // padding: 10,
//             borderRadius: '8px',
//             transition: '.5s',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between'
//           }}
//         >
//           {hiddenPart}
//         </Box>
//       </Collapse>

//       <IconButton aria-label="expand row" size="small" onClick={() => setIsOpen(open => !open)} sx={{ flexGrow: 0 }}>
//         {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//       </IconButton>
//     </Box>
//   ) : null
// }

function CardPanel({ data, collapsible }: { data: (string | number | JSX.Element)[]; collapsible?: JSX.Element }) {
  return (
    <Box display="flex" flexDirection="column" gap="10px">
      <Box
        sx={{
          '& p': {
            fontSize: 12
          },
          '& span': {
            fontSize: 14
          },
          display: 'grid',
          gridTemplateColumns: '1fr 1fr'
        }}
        gap="16px"
      >
        {data.map(v => v)}
      </Box>
      <Box>{collapsible}</Box>
    </Box>
  )
}
