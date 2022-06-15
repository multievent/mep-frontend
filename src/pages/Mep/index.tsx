import { Box, Link, styled, Tooltip, Typography, useTheme } from '@mui/material'
import Table from 'components/Table'
import Pagination from 'components/Pagination'
import { EVENT_TYPES } from 'pages/EventType/data'
// import ChainLogo from 'components/ChainLogo'
import { shortenAddress } from 'utils'
import { useMemo, useState } from 'react'
import Copy from 'components/essential/Copy'
import { useTxInfo } from 'hooks/useTxInfo'
import { ChainId, ChainListMap } from 'constants/chain'
import { useEventList } from 'hooks/useFetch'
import ReactJson from 'react-json-view'
import Spinner from 'components/Spinner'
import { ReactComponent as ToggleCard } from 'assets/svg/toggle_card.svg'
import { ReactComponent as ToggleList } from 'assets/svg/toggle_list.svg'
import { HideOnMobile } from 'theme'

const StyledBetween = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  '& *': {
    wordBreak: 'break-all',
    whiteSpace: 'initial'
  }
})

const StyledToggle = styled(Box)(({ theme }) => ({
  border: '1px solid #E3E6FB',
  borderRadius: '4px',
  height: 24,
  width: 65,
  backgroundColor: theme.palette.common.white,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignContent: 'center',
  justifyItems: 'center',
  cursor: 'pointer',
  '& .current': {
    '& path, & rect': {
      fill: '#212121'
    }
  }
}))

export const MarketTableHeader = ['Events Type', 'Contract address', 'Sender', 'Signature', 'Time', '']

export interface MEPListProp {
  timeStamp: number
  eventType: EVENT_TYPES
  chainId: number
  contractAddress: string
  hash: string
  sender: string
  eventMsg: string
  signature: string
}

enum Mode {
  TABLE,
  CARD
}

export default function Index() {
  const { list: dataList, page, firstLoading } = useEventList()
  const [timeIndex, setTimeIndex] = useState(0)
  const [showMode, setShowMode] = useState<Mode>(Mode.TABLE)

  const rows = useMemo(() => {
    setTimeout(() => setTimeIndex(timeIndex + 1), 1000)
    return dataList.map(item => [
      <Box key={0}>
        <Typography color="#B3BACC">Events Type</Typography>
        <span>{ChainListMap[item.chainId].symbol + '_' + item.eventType}</span>
      </Box>,
      <Box key={0}>
        <Typography color="#B3BACC">Contract address</Typography>
        <Box key={1} display="flex" gap={2} alignItems={'center'}>
          {shortenAddress(item.contractAddress)}
          <Copy margin="0 0 0 5px" toCopy={item.contractAddress} />
        </Box>
      </Box>,
      // <ChainLogo key={0} gapSize="6px" chainId={item.chainId} size="14px" fontSize="14" fontWeight={500} />,
      <Box key={0}>
        <Typography color="#B3BACC">Sender</Typography>
        <Box key={1} display="flex" gap={2}>
          <Link target={'_blank'} color="#9867FF" underline="hover" href={'https://demo.matchprotocol.xyz/'}>
            MatchProtocol
          </Link>
          {/* {shortenAddress(item.sender)}
        <Copy toCopy={item.sender} /> */}
        </Box>
      </Box>,
      <Box key={0}>
        <Typography color="#B3BACC">Signature</Typography>
        <Tooltip key={0} title={item.signature} arrow placement="top">
          <Box key={0} display="flex" alignItems={'center'}>
            {shortenAddress(item.signature)}
            <Copy margin="0 0 0 5px" toCopy={item.signature} />
          </Box>
        </Tooltip>
      </Box>,
      <Box key={0}>
        <Typography color="#B3BACC">Time</Typography>
        <ShowTime key={0} showTime timeIndex={timeIndex} timeStamp={item.timeStamp} />
      </Box>
    ])
  }, [dataList, timeIndex])

  const TxDetailRows = useMemo(
    () =>
      dataList.map(({ hash, chainId, eventMsg }) => (
        <TxDetail eventMsg={eventMsg} chainId={chainId} key={hash} hash={hash} />
      )),
    [dataList]
  )

  return (
    <Box maxWidth="1440px" padding={'10px 20px 20px'} width="100%">
      <Box width="100%" display="flex" justifyContent="space-between" mb={20}>
        <Typography fontSize={24} fontWeight={600}>
          MEP
        </Typography>
      </Box>

      <Box position={'relative'} minHeight="50px">
        <StyledBetween mt={14} mb={14}>
          <Typography fontWeight={500} fontSize={16}>
            Events
          </Typography>
          <HideOnMobile>
            <StyledToggle>
              <ToggleCard
                className={showMode === Mode.CARD ? 'current' : undefined}
                onClick={() => setShowMode(Mode.CARD)}
              />
              <ToggleList
                className={showMode === Mode.TABLE ? 'current' : undefined}
                onClick={() => setShowMode(Mode.TABLE)}
              />
            </StyledToggle>
          </HideOnMobile>
        </StyledBetween>
        <Table
          fontSize="14px"
          showCard={showMode === Mode.CARD}
          noHeader
          header={MarketTableHeader}
          collapsible
          hiddenParts={TxDetailRows}
          rows={rows}
        />
        {firstLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              backgroundColor: 'rgba(255,255,255,0.5)',
              width: '100%',
              height: '100%'
            }}
            display="flex"
            justifyContent="center"
            alignItems={'center'}
          >
            <Spinner size="40px" />
          </Box>
        )}
        {!firstLoading && (
          <Box mt={10}>
            <Pagination
              perPage={page.perPage}
              count={page.totalPages}
              total={page.recordCount}
              page={page.page}
              boundaryCount={0}
              onChange={(_, p) => page.setPage(p)}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

// function TxDetail({ hash, chainId, eventMsg }: { hash: string; chainId: ChainId; eventMsg: string }) {
//   const info = useTxInfo(chainId, hash)

//   return (
//     <Box
//       sx={{
//         fontWeight: 500,
//         fontSize: 14,
//         display: 'grid',
//         gap: '15px',
//         width: '100%'
//       }}
//     >
//       <StyledBetween>
//         <span>Transaction Hash</span>
//         <Box>
//           <ExternalLink target="_blank" underline={'hover'} href={getEtherscanLink(chainId, hash, 'transaction')}>
//             {hash}
//           </ExternalLink>
//           <Copy toCopy={hash} />
//         </Box>
//       </StyledBetween>
//       <StyledBetween>
//         <span>Transaction Fee</span>
//         <Box display={'flex'} gap="5">
//           <span>
//             {info?.fee?.toSignificant(18)} {info?.nativeSymbol}
//           </span>
//         </Box>
//       </StyledBetween>
//       <StyledBetween>
//         <span>Height</span>
//         <span>{info?.height}</span>
//       </StyledBetween>
//       <StyledBetween>
//         <span>Nonce</span>
//         <span>{info?.nonce}</span>
//       </StyledBetween>
//       <Box
//         width={'100%'}
//         sx={{
//           overflow: 'auto'
//         }}
//       >
//         <Box>Event message </Box>
//         <Box
//           sx={{
//             background: '#F3F3F3',
//             padding: '10px',
//             borderRadius: '8px',
//             maxWidth: '100%',
//             overflow: 'auto'
//             // whiteSpace: 'pre-wrap'
//           }}
//         >
//           <ReactJson src={JSON.parse(eventMsg)} />
//         </Box>
//       </Box>
//     </Box>
//   )
// }

function TxDetail({ hash, chainId, eventMsg }: { hash: string; chainId: ChainId; eventMsg: string }) {
  const info = useTxInfo(chainId, hash)
  const theme = useTheme()

  const showJson = useMemo(() => {
    return {
      chainId: chainId,
      hash: hash,
      fee: info.fee?.toSignificant(18) || undefined,
      height: info.height || undefined,
      nonce: info.nonce || undefined,
      eventMessage: JSON.parse(eventMsg)
    }
  }, [chainId, eventMsg, hash, info])

  return (
    <Box
      sx={{
        fontWeight: 500,
        fontSize: 14,
        display: 'grid',
        gap: '15px',
        width: '100%'
      }}
    >
      <Box
        width={'100%'}
        sx={{
          overflow: 'auto'
        }}
      >
        <Box
          sx={{
            background: theme.palette.background.paper,
            padding: '10px',
            maxWidth: '100%',
            overflow: 'auto'
            // whiteSpace: 'pre-wrap'
          }}
        >
          <ReactJson src={showJson} />
        </Box>
      </Box>
    </Box>
  )
}

function ShowTime({ timeStamp, showTime, timeIndex }: { timeStamp: number; showTime?: boolean; timeIndex: number }) {
  const str = useMemo(() => {
    const now = Math.ceil(new Date().getTime() / 1000)
    const gap = now - timeStamp
    if (gap < 0) {
      return '0 secs ago'
    }
    if (gap < 60) {
      return `${gap} secs ago`
    }
    if (gap < 3600) {
      return `${Number(gap / 60).toFixed()} mins ago`
    }
    if (gap < 3600 * 24) {
      return `${Number(gap / 3600).toFixed()} hrs ago`
    }
    return `${Number(gap / 86400).toFixed()} days ago`
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeStamp, timeIndex])

  if (showTime) {
    return (
      <Tooltip title={new Date(timeStamp * 1000).toLocaleString()} arrow placement="top">
        <span>{str}</span>
      </Tooltip>
    )
  }
  return <>{str}</>
}
