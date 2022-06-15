import { Box, Typography, useTheme } from '@mui/material'
import dappBgIcon from 'assets/images/dapp_bg.svg'
import matchLogo from 'assets/svg/match_logo.svg'
import Image from 'components/Image'
import Button from 'components/Button/Button'

interface appProp {
  name: string
  logo: string
  desc: string
  link: string
}

const apps: appProp[] = [
  {
    name: 'MatchProtocol',
    logo: matchLogo,
    desc: 'Free cross-chain',
    link: 'https://demo.matchprotocol.xyz/#/market'
  }
]

export default function Index() {
  return (
    <Box maxWidth="1440px" padding={'10px 20px 20px'} width="100%">
      <Box width="100%" display="flex" justifyContent="space-between" mb={20}>
        <Typography fontSize={24} fontWeight={600}>
          DAPP
        </Typography>
      </Box>
      <Box display={'grid'} mb={20} gap="16px" gridTemplateColumns={{ sm: `repeat(auto-fill, 357px)`, xs: '100%' }}>
        {apps.map(item => (
          <AppCard key={item.name} app={item} />
        ))}
      </Box>
    </Box>
  )
}

function AppCard({ app }: { app: appProp }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `url(${dappBgIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top right',
        borderRadius: '20px',
        minHeight: { sm: 220, xs: 160 },
        transition: 'all 0.5s',
        padding: { sm: '76px 24px 24px ', xs: '16px' },
        '& .go-btn': {
          opacity: { sm: 0, xs: 1 },
          transition: 'all 0.3s'
        },
        '&:hover': {
          boxShadow: '10px 10px 10px rgb(0 0 0 / 10%)',
          '& .go-btn': {
            opacity: 1
          }
        }
      }}
    >
      <Image src={app.logo} alt="" height={21} />
      <Typography mt={{ sm: 17, xs: 12 }} fontSize={{ sm: 24, xs: 18 }} lineHeight={1} fontWeight={500}>
        {app.name}
      </Typography>
      <Box mt={15} display="flex" alignItems={'center'} justifyContent="space-between">
        <Typography fontSize={{ sm: 12, xs: 10 }} maxWidth={'50%'} sx={{ opacity: 0.5 }}>
          {app.desc}
        </Typography>
        <Box className="go-btn">
          <Button
            width="100px"
            height="28px"
            fontSize={'14px'}
            style={{
              background: theme.bgColor.bg3,
              borderRadius: '4px',
              fontWeight: 600
            }}
            onClick={() => window.open(app.link)}
          >
            Launch App
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
