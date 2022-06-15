import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { styled } from '@mui/material'
import Header from '../components/Header'
import Polling from '../components/essential/Polling'
import Popups from '../components/essential/Popups'
import Web3ReactManager from '../components/essential/Web3ReactManager'
// import WarningModal from '../components/Modal/WarningModal'
// import ComingSoon from './ComingSoon'
import EventType from './EventType'
import MEP from './Mep'
import DAPP from './Dapp'
import { ModalProvider } from 'context/ModalContext'
// import Footer from 'components/Footer'
import { routes } from 'constants/routes'

const AppWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: '100vh'
  }
}))

const ContentWrapper = styled('div')({
  width: '100%',
  maxHeight: '100vh',
  overflow: 'auto'
  // alignItems: 'center'
})

const BodyWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  // minHeight: `calc(100vh - ${theme.height.header})`,
  minHeight: '100vh',
  // padding: '50px 0 80px',
  // justifyContent: 'center',
  alignItems: 'center',
  // flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  // position: 'relative',
  // [theme.breakpoints.down('md')]: {
  //   minHeight: `calc(100vh - ${theme.height.header} - ${theme.height.mobileHeader})`,
  //   paddingTop: 20
  // },
  background: theme.palette.background.default,
  paddingLeft: theme.width.drawer,
  paddingTop: theme.height.header,
  [theme.breakpoints.down('md')]: {
    paddingLeft: 0,
    paddingTop: theme.height.mobileHeader,
    paddingBottom: theme.height.mobileHeader
  }
}))

export default function App() {
  return (
    <Suspense fallback={null}>
      <ModalProvider>
        <AppWrapper id="app">
          <ContentWrapper>
            <Header />
            <BodyWrapper id="body">
              <Popups />
              <Polling />
              {/* <WarningModal /> */}
              <Web3ReactManager>
                <Switch>
                  <Route exact strict path={routes.eventType} component={EventType} />
                  <Route exact strict path={routes.mep} component={MEP} />
                  <Route exact strict path={routes.dapp} component={DAPP} />
                  <Route path="/">
                    <Redirect to={routes.eventType} />
                  </Route>
                </Switch>
              </Web3ReactManager>
            </BodyWrapper>
            {/* <Footer /> */}
          </ContentWrapper>
        </AppWrapper>
      </ModalProvider>
    </Suspense>
  )
}
