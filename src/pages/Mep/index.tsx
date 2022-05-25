import { Box, Link, Tooltip } from '@mui/material'
import LogoText from 'components/LogoText'
import mepMenuIcon from 'assets/images/mep_icon.svg'
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

// const StyledBetween = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   flexWrap: 'wrap',
//   '& *': {
//     wordBreak: 'break-all',
//     whiteSpace: 'initial'
//   }
// })

export const MarketTableHeader = ['Events Type', 'Contract address', 'Sender', 'Time', '']

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

export default function Index() {
  const { list: dataList, page, firstLoading } = useEventList()
  const [timeIndex, setTimeIndex] = useState(0)

  const rows = useMemo(() => {
    setTimeout(() => setTimeIndex(timeIndex + 1), 1000)
    return dataList.map(item => [
      ChainListMap[item.chainId].symbol + '_' + item.eventType,
      <Box key={1} display="flex" gap={2}>
        {shortenAddress(item.contractAddress)}
        <Copy toCopy={item.contractAddress} />
      </Box>,
      // <ChainLogo key={0} gapSize="6px" chainId={item.chainId} size="14px" fontSize="14" fontWeight={500} />,
      <Box key={1} display="flex" gap={2}>
        <Link target={'_blank'} color="#13B5EC" underline="hover" href={'https://demo.matchprotocol.xyz/'}>
          MatchProtocol
        </Link>
        {/* {shortenAddress(item.sender)}
        <Copy toCopy={item.sender} /> */}
      </Box>,
      <ShowTime key={0} showTime timeIndex={timeIndex} timeStamp={item.timeStamp} />
    ])
  }, [dataList, timeIndex])

  const TxDetailRows = useMemo(
    () =>
      dataList.map(({ hash, signature, chainId, eventMsg }) => (
        <TxDetail signature={signature} eventMsg={eventMsg} chainId={chainId} key={hash} hash={hash} />
      )),
    [dataList]
  )

  return (
    <Box maxWidth="1020px" padding={'30px 20px'} width="100%">
      <Box width="100%" display="flex" justifyContent="space-between" mb={25}>
        <LogoText logo={mepMenuIcon} text="MEP" size="32px" fontSize={36} fontWeight={700} />
      </Box>

      <Box
        sx={{
          background: '#fff',
          borderRadius: '20px',
          padding: '20px'
        }}
      >
        <Table
          fontSize="14px"
          header={MarketTableHeader}
          collapsible
          hiddenParts={TxDetailRows}
          rows={rows}
          variant="outlined"
        />
        {firstLoading && (
          <Box display="flex" pt={20} pb={20} justifyContent="center">
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

function TxDetail({
  hash,
  chainId,
  eventMsg,
  signature
}: {
  signature: string
  hash: string
  chainId: ChainId
  eventMsg: string
}) {
  const info = useTxInfo(chainId, hash)

  const showJson = useMemo(() => {
    return {
      chainId: chainId,
      hash: hash,
      fee: info.fee?.toSignificant(18) || undefined,
      height: info.height || undefined,
      nonce: info.nonce || undefined,
      signature: signature,
      eventMessage: JSON.parse(eventMsg)
    }
  }, [chainId, eventMsg, hash, info, signature])

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
            background: '#F3F3F3',
            padding: '10px',
            borderRadius: '8px',
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
    if (gap < 60) {
      return `${now} secs ago`
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
