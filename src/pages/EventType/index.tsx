import { Box, Typography, useTheme } from '@mui/material'
import LogoText from 'components/LogoText'
import makeIcon from 'assets/svg/make_order.svg'
import takeIcon from 'assets/svg/take_order.svg'
import withdrawIcon from 'assets/svg/withdraw_all.svg'
import { useMemo, useState } from 'react'
import { ChainList, ChainListMap } from 'constants/chain'
import ChainLogo from 'components/ChainLogo'
import RoundTabs from 'components/Tabs/RoundTabs'
import { eventList, EventProp, EVENT_TYPES } from './data'
import useBreakpoint from 'hooks/useBreakpoint'

export default function Index() {
  const theme = useTheme()
  const [chainTab, setChainTab] = useState(0)
  const walletInfoTabs = useMemo(() => {
    return ChainList.map(item => <ChainLogo key={item.id} gapSize="8px" chainId={item.id} size="14px" />)
  }, [])

  const currentData = useMemo(() => {
    const id = Number(ChainList[chainTab].id)
    return eventList?.[id] ?? []
  }, [chainTab])

  return (
    <Box maxWidth="1440px" padding={'10px 20px 20px'} width="100%">
      <Box width="100%" display="flex" justifyContent="space-between" mb={20}>
        <Typography fontSize={24} fontWeight={600}>
          Events Type
        </Typography>
      </Box>
      <Box display={'flex'} flexWrap="wrap" justifyContent="space-between" alignItems={'center'} mb={16}>
        <RoundTabs titles={walletInfoTabs} current={chainTab} onChange={setChainTab} />

        <Typography fontWeight={400} fontSize={13} color={theme.textColor.text2} textAlign="right">
          Supported blockchain
        </Typography>
      </Box>
      <Box display={'grid'} gridTemplateColumns={{ sm: '1fr 1fr', xs: '1fr' }} gap={'12px'}>
        {currentData.map((item, index) => (
          <EventCard key={index} item={item} />
        ))}
      </Box>
    </Box>
  )
}

function EventCard({ item }: { item: EventProp }) {
  const theme = useTheme()
  const isXs = useBreakpoint('sm')

  return (
    <Box
      padding={{ sm: '20px 24px 24px', xs: '16px' }}
      sx={{
        background: '#fff',
        borderRadius: '12px',
        maxWidth: '100%'
      }}
    >
      <Box display={'flex'} justifyContent="space-between" alignItems={'center'}>
        <Box>
          <LogoText
            logo={
              item.type === EVENT_TYPES.MAKE_ORDER
                ? makeIcon
                : item.type === EVENT_TYPES.TAKEN_ORDER
                ? takeIcon
                : withdrawIcon
            }
            text={ChainListMap[item.chainId].symbol + '_' + item.type}
            size={isXs ? '14px' : '18px'}
            fontSize={isXs ? 14 : 18}
            fontWeight={700}
          />
        </Box>
        <Box>
          <ChainLogo
            gapSize="6px"
            chainId={item.chainId}
            size={isXs ? '12px' : '14px'}
            fontSize={isXs ? '12px' : '14px'}
            fontWeight={500}
          />
        </Box>
      </Box>
      <Box
        mt={{ sm: 20, xs: 10 }}
        display="grid"
        sx={{
          background: theme.palette.background.paper,
          borderRadius: '8px',
          padding: '16px'
        }}
      >
        {/* <Typography mb={6} fontSize={14} fontWeight={500}>
          event detail:
        </Typography> */}
        <Box
          sx={{
            fontSize: 14,
            color: theme.textColor.text2,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr'
            // '&>span:nth-child(even)': {
            //   textAlign: 'right'
            // }
          }}
        >
          <>
            <span>chainId: </span>
            <span>int</span>
          </>
          <>
            <span>hash: </span>
            <span>string</span>
          </>
          <>
            <span>fee: </span>
            <span>string</span>
          </>
          <>
            <span>height: </span>
            <span>int</span>
          </>
          <>
            <span>nonce: </span>
            <span>int</span>
          </>
          <>
            <span>signature: </span>
            <span>string</span>
          </>
          <>
            <span>eventMessage: </span>
            <span>json</span>
          </>
        </Box>
      </Box>
    </Box>
  )
}
