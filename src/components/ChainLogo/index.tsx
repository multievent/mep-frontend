import LogoText from 'components/LogoText'
import Image from 'components/Image'
import { ChainListMap } from 'constants/chain'

export default function index({
  size,
  chainId,
  fontSize,
  gapSize,
  widthEllipsis,
  fontWeight
}: {
  size: string
  chainId: number
  fontSize?: string
  gapSize?: string
  widthEllipsis?: string
  fontWeight?: number
}) {
  return (
    <LogoText
      logo={<Image height="20px" src={ChainListMap[chainId].logo} alt="" />}
      text={ChainListMap[chainId].symbol}
      widthEllipsis={widthEllipsis}
      size={size}
      fontWeight={fontWeight}
      gapSize={gapSize}
      fontSize={fontSize}
    />
  )
}
