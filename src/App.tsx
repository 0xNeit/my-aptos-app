import Footer from 'components/Footer'
import TopLevelModals from 'components/TopLevelModals'
import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { useAnalyticsReporter } from './analytics'
import AppBody from './components/AppBody'
import Header from './components/Header'
// import Popups from '../components/Popups'
import DarkModeQueryParamReader from './theme/DarkModeQueryParamReader'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 120px 16px 0px 16px;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 4rem 8px 16px 8px;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

const FooterWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: center;
  position: fixed;
  bottom: 80px;
`

const BottomRightLogo = styled.div`
  background: url('images/33_open.43a09438.png');
  width: 216px;
  height: 212px;
  position: fixed;
  right: 0px;
  bottom: 0px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    scale: 0.8;
    right: -22px;
    bottom: -22px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    scale: 0.5;
    right: -56px;
    bottom: -54px;
  `};
`

const BottomLeftLogo = styled.div`
  background: url('images/22_open.72c00877.png');
  width: 232px;
  height: 210px;
  position: fixed;
  left: 0px;
  bottom: 0px;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    scale: 0.8;
    left: -22px;
    bottom: -22px;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    scale: 0.5;
    left: -56px;
    bottom: -54px;
  `};
`

export default function App() {
  const { pathname } = useLocation()

  useAnalyticsReporter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <AppBody>
      <DarkModeQueryParamReader />
      <AppWrapper>
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        {/* <BodyWrapper>
          <TopLevelModals />
          <Marginer />
</BodyWrapper> */}
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
        <BottomRightLogo />
        <BottomLeftLogo />
      </AppWrapper>
    </AppBody>
  )
}
