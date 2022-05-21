import JSBI from 'jsbi'
import { useEffect, useState } from 'react'
import { ChainId, SUPPORTED_NETWORKS } from '../constants/chain'
import { CurrencyAmount } from '../constants/token'
import { useWeb3InstanceByChainId } from './useWeb3Instance'

export function useTxInfo(chainId?: ChainId, hash?: string) {
  const web3 = useWeb3InstanceByChainId(chainId)
  const [gasUsed, setGasUsed] = useState<number>()
  const [gasPrice, setGasPrice] = useState<string>()

  const [result, setResult] = useState<{
    hash: string
    fee: CurrencyAmount | undefined
    nativeSymbol: string
    height: number | null
    nonce: number
  }>()

  useEffect(() => {
    if (!web3 || !hash || !chainId) {
      setResult(undefined)
      return
    }
    const chain = SUPPORTED_NETWORKS[chainId]
    web3.eth.getTransactionReceipt(hash).then(res => {
      setGasUsed(res.gasUsed)
    })
    web3.eth
      .getTransaction(hash)
      .then(res => {
        setGasPrice(res.gasPrice)
        const data = {
          hash: res.hash,
          fee: undefined,
          nativeSymbol: chain?.nativeCurrency.symbol || '',
          height: res.blockNumber,
          nonce: res.nonce
        }
        setResult(data)
      })
      .catch(err => {
        console.error(err)
        setResult(undefined)
      })
  }, [web3, hash, chainId])

  return {
    ...result,
    fee:
      gasUsed && gasPrice ? CurrencyAmount.ether(JSBI.multiply(JSBI.BigInt(gasUsed), JSBI.BigInt(gasPrice))) : undefined
  }
}
