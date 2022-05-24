import { Box, Typography } from '@mui/material'
import LogoText from 'components/LogoText'
import dappMenuIcon from 'assets/images/dapp_icon.svg'
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
    <Box maxWidth="1020px" padding={'30px 20px'} width="100%">
      <Box width="100%" display="flex" justifyContent="space-between" mb={25}>
        <LogoText logo={dappMenuIcon} text="DAPP" size="32px" fontSize={36} fontWeight={700} />
      </Box>
      <Box display={'grid'} mb={25} gap="20px" gridTemplateColumns={{ sm: `repeat(auto-fill, 357px)`, xs: '100%' }}>
        {apps.map(item => (
          <AppCard key={item.name} app={item} />
        ))}
      </Box>
    </Box>
  )
}

function AppCard({ app }: { app: appProp }) {
  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        backgroundImage: `url(${dappBgIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top right',
        borderRadius: '20px',
        minHeight: { sm: 240, xs: 180 },
        transition: 'all 0.5s',
        padding: { sm: '50px 25px', xs: '40px 20px' },
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
      <Image src={app.logo} alt="" height={26} />
      <Typography mt={{ sm: 30, xs: 20 }} fontSize={{ sm: 24, xs: 18 }} lineHeight={1} fontWeight={700}>
        {app.name}
      </Typography>
      <Box mt={15} display="flex" alignItems={'center'} justifyContent="space-between">
        <Typography fontSize={{ sm: 16, xs: 12 }} maxWidth={'50%'} sx={{ opacity: 0.5 }}>
          {app.desc}
        </Typography>
        <Box className="go-btn">
          <Button
            width="150px"
            height="38px"
            style={{
              background:
                'linear-gradient(180deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 56.58%, rgba(255, 255, 255, 0.5) 123.86%), #161616',
              borderRadius: '30px'
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
