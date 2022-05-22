import { Axios } from '../axios'

export function getEvents(page: number, pageSize = 10) {
  return Axios.get(`https://test.matchprotocol.xyz/api/v1/events?page=${page}&page_size=${pageSize}`)
}
