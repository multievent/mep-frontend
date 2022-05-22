import { EVENT_TYPES } from 'pages/EventType/data'
import { MEPListProp } from 'pages/Mep'
import { useEffect, useState } from 'react'
import { getEvents } from 'utils/fetch/mep'

export function calcPageTotal(total: number, pageSize: number) {
  return Math.ceil(total / pageSize)
}

export function useEventList() {
  const [list, setList] = useState<MEPListProp[]>([])
  const [timeIndex, setTimeIndex] = useState(0)
  const pageSize = 10
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [firstLoading, setFirstLoading] = useState<boolean>(true)
  const [page, setPage] = useState<number>(1)
  const [recordCount, setRecordCount] = useState<number>(0)
  const [totalPages, setTotalPages] = useState<number>(0)

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    setFirstLoading(true)
  }, [page])

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)
        // firstLoading && setList([])
        const res: any = await getEvents(page, pageSize)
        const data = res.data
        const _ret: MEPListProp[] = data.events.map((item: any) => ({
          timeStamp: item.TimeStamp,
          eventType:
            item.EventType === 0
              ? EVENT_TYPES.MAKE_ORDER
              : item.EventType === 1
              ? EVENT_TYPES.TAKEN_ORDER
              : EVENT_TYPES.WITHDRAW_ALL,
          chainId: item.ChainId,
          contractAddress: item.ContractAddr,
          hash: item.TxHash,
          sender: item.Sender,
          eventMsg: item.Details
        }))
        setList(_ret)
        setRecordCount(data.total)
        setTotalPages(calcPageTotal(data.total, pageSize))
        firstLoading && setFirstLoading(false)
        setTimeout(() => setTimeIndex(timeIndex + 1), 10000)
      } catch (error) {
        setList([])
        console.error('fetch useEventList', error)
        setTimeout(() => setTimeIndex(timeIndex + 1), 10000)
      }
      setIsLoading(false)
    })()
  }, [page, timeIndex, firstLoading])

  return {
    page: {
      page,
      recordCount,
      perPage: pageSize,
      setPage,
      totalPages
    },
    loading: isLoading,
    firstLoading,
    list
  }
}
