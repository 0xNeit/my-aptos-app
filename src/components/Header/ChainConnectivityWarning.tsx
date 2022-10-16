import { getChainInfoOrDefault } from 'constants/chainInfo'
import { SupportedChainId } from 'constants/chains'
import { AlertOctagon } from 'react-feather'
import { useChainId } from 'state/user/hooks'
import styled from 'styled-components/macro'
import { ExternalLink, MEDIA_WIDTHS } from 'theme'

const BodyRow = styled.div`
  color: ${({ theme }) => theme.deprecated_black};
  font-size: 12px;
`
const CautionIcon = styled(AlertOctagon)`
  color: ${({ theme }) => theme.deprecated_black};
`
const Link = styled(ExternalLink)`
  color: ${({ theme }) => theme.deprecated_black};
  text-decoration: underline;
`
const TitleRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 8px;
`
const TitleText = styled.div`
  color: black;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  margin: 0px 12px;
`
const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.deprecated_yellow3};
  border-radius: 12px;
  bottom: 60px;
  display: none;
  max-width: 348px;
  padding: 16px 20px;
  position: absolute;
  right: 16px;
  @media screen and (min-width: ${MEDIA_WIDTHS.upToMedium}px) {
    display: block;
  }
`

export function ChainConnectivityWarning() {
  const chainId = useChainId()
  const info = getChainInfoOrDefault(chainId)
  const label = info?.label

  return (
    <Wrapper>
      <TitleRow>
        <CautionIcon />
        <TitleText>Network Warning</TitleText>
      </TitleRow>
      <BodyRow>
        {chainId === SupportedChainId.APTOS ? (
          <>You may have lost your network connection.</>
        ) : (
          <>You may have lost your network connection, or {label} might be down right now.</>
        )}{' '}
      </BodyRow>
    </Wrapper>
  )
}
