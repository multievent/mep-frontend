import { Box, styled, Tooltip } from '@mui/material'
import LogoText from 'components/LogoText'
import mepMenuIcon from 'assets/images/mep_icon.svg'
import Table from 'components/Table'
import Pagination from 'components/Pagination'
import { EVENT_TYPES } from 'pages/EventType/data'
import ChainLogo from 'components/ChainLogo'
import { getEtherscanLink, shortenAddress } from 'utils'
import { useMemo } from 'react'
import Copy from 'components/essential/Copy'
import { useTxInfo } from 'hooks/useTxInfo'
import { ChainId } from 'constants/chain'
import { ExternalLink } from 'theme/components'

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

export const MarketTableHeader = ['Time', 'Events Type', 'Chain', 'Contract address', 'Sender', '']

export interface MEPListProp {
  timeStamp: number
  eventType: EVENT_TYPES
  chainId: number
  contractAddress: string
  hash: string
  sender: string
  eventInfo: string
}

const dataList: MEPListProp[] = [
  {
    timeStamp: 1653126585,
    eventType: EVENT_TYPES.MAKE_ORDER,
    chainId: 4,
    contractAddress: '0x6b80c5c39561be295e0b07313e5b83c55e7f4db8',
    hash: '0xc5ec0c115b0a11c9dc1716df28e7e8baf5bdde3111622983df1ccfd5a79524e1',
    sender: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6',
    eventInfo: `{"event": "transfer"}`
  },
  {
    timeStamp: 1653026585,
    eventType: EVENT_TYPES.MAKE_ORDER,
    chainId: 4,
    contractAddress: '0x6b80c5c39561be295e0b07313e5b83c55e7f4db8',
    hash: '0xc5ec0c115b0a11c9dc1716df28e7e8baf5bdde3111622983df1ccfd5a79524e1',
    sender: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6',
    eventInfo: `{"event": "transfer"}`
  },
  {
    timeStamp: 1651126585,
    eventType: EVENT_TYPES.TAKEN_ORDER,
    chainId: 42,
    contractAddress: '0x085e40def42b27e804c019311c74b1a4675baefa',
    hash: '0xc365cbc85240a1974ca6368240d8f8d7349dad348ae4744033674b6b375f4137',
    sender: '0x18041866663b077bb6bf2baffaea2451a2472ed7',
    eventInfo: `{"event": "transfer"}`
  },
  {
    timeStamp: 1651124585,
    eventType: EVENT_TYPES.WITHDRAW_ALL,
    chainId: 97,
    contractAddress: '0x085e40def42b27e804c019311c74b1a4675baefa',
    hash: '0x3c06dec4b35a3a24d69a299530e6ed111663bd1f857e5adfd69f2b6f8df8f011',
    sender: '0x18041866663b077bb6bf2baffaea2451a2472ed7',
    eventInfo: `{"event": "transfer"}`
  }
]

export default function Index() {
  const rows = useMemo(() => {
    return dataList.map(item => [
      <ShowTime key={0} showTime timeStamp={item.timeStamp} />,
      item.eventType,
      <ChainLogo key={0} gapSize="6px" chainId={item.chainId} size="14px" fontSize="14" fontWeight={500} />,
      <Box key={1} display="flex" gap={2}>
        {shortenAddress(item.contractAddress)}
        <Copy toCopy={item.contractAddress} />
      </Box>,
      <Box key={1} display="flex" gap={2}>
        {shortenAddress(item.sender)}
        <Copy toCopy={item.sender} />
      </Box>
    ])
  }, [])

  const TxDetailRows = useMemo(
    () => dataList.map(({ hash, chainId }) => <TxDetail chainId={chainId} key={hash} hash={hash} />),
    []
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
        <Box mt={10}>
          <Pagination perPage={4} count={1} page={1} boundaryCount={0} onChange={(_, value) => console.log(value)} />
        </Box>
      </Box>
    </Box>
  )
}

function TxDetail({ hash, chainId }: { hash: string; chainId: ChainId }) {
  const info = useTxInfo(chainId, hash)

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
      <StyledBetween>
        <span>Transaction Hash</span>
        <Box>
          <ExternalLink target="_blank" underline={'hover'} href={getEtherscanLink(chainId, hash, 'transaction')}>
            {hash}
          </ExternalLink>
          <Copy toCopy={hash} />
        </Box>
      </StyledBetween>
      <StyledBetween>
        <span>Transaction Fee</span>
        <Box display={'flex'} gap="5">
          <span>
            {info?.fee?.toSignificant(18)} {info?.nativeSymbol}
          </span>
        </Box>
      </StyledBetween>
      <StyledBetween>
        <span>Height</span>
        <span>{info?.height}</span>
      </StyledBetween>
      <StyledBetween>
        <span>Nonce</span>
        <span>{info?.nonce}</span>
      </StyledBetween>
      <Box width={'100%'}>
        <Box>Event message </Box>
        <Box
          sx={{
            background: '#F3F3F3',
            padding: '10px',
            borderRadius: '8px',
            maxWidth: '100%',
            overflow: 'auto',
            whiteSpace: 'pre-wrap'
          }}
        >{`<script type="text/javascript">
	$(document).ready(function(){
	  
		  $(".aaa").click(function(){
		 		 alert("");
		  });
		  //
		  $(".aaa").mouseover(function(){
		 		$(this).css("background-color","#0060ff");
		 `}</Box>
      </Box>
    </Box>
  )
}

function ShowTime({ timeStamp, showTime }: { timeStamp: number; showTime?: boolean }) {
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
  }, [timeStamp])

  if (showTime) {
    return (
      <Tooltip title={new Date(timeStamp * 1000).toUTCString()} arrow placement="top">
        <Box>{str}</Box>
      </Tooltip>
    )
  }
  return <>{str}</>
}
