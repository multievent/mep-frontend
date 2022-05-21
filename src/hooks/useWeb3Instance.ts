import { useActiveWeb3React } from './index'
import Web3 from 'web3'
import { useEffect, useState } from 'react'
import { provider } from 'web3-core'
import { ChainId } from 'constants/chain'
import { getOtherNetworkProvider } from 'connectors/MultiNetworkConnector'

export function useWeb3Instance() {
  const { active, library } = useActiveWeb3React()
  const [web3jsInstance, setWeb3jsInstance] = useState<Web3 | null>(null)

  useEffect(() => {
    if (library) {
      const instance = new Web3(Web3.givenProvider || (library.provider as provider))
      setWeb3jsInstance(instance)
    }
  }, [active, library])

  return web3jsInstance
}

export function useWeb3InstanceByChainId(chainId?: ChainId) {
  const [web3jsInstance, setWeb3jsInstance] = useState<Web3 | null>(null)

  useEffect(() => {
    if (chainId) {
      const web3Provider = getOtherNetworkProvider(chainId)
      if (!web3Provider) {
        setWeb3jsInstance(null)
        return
      }
      const instance = new Web3((web3Provider as unknown) as provider)
      setWeb3jsInstance(instance)
    } else {
      setWeb3jsInstance(null)
    }
  }, [chainId])

  return web3jsInstance
}
