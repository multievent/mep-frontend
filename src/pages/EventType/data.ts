export enum EVENT_TYPES {
  MAKE_ORDER = 'Make Order',
  TAKEN_ORDER = 'Take Order',
  WITHDRAW_ALL = 'Withdraw all'
}

export interface EventProp {
  type: EVENT_TYPES
  chainId: number
  address: string
}

export const eventList: {
  [key in number]: EventProp[]
} = {
  4: [
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 4, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 4, address: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6' },
    { type: EVENT_TYPES.TAKEN_ORDER, chainId: 4, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 4, address: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6' },
    { type: EVENT_TYPES.TAKEN_ORDER, chainId: 4, address: '0x5718D9C95D15a766E9DdE6579D7B93Eaa88a26b8' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 4, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' }
  ],
  42: [
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 42, address: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 42, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' },
    { type: EVENT_TYPES.TAKEN_ORDER, chainId: 42, address: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 42, address: '0x5718D9C95D15a766E9DdE6579D7B93Eaa88a26b8' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 42, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' },
    { type: EVENT_TYPES.TAKEN_ORDER, chainId: 42, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' }
  ],
  97: [
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 97, address: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 97, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' },
    { type: EVENT_TYPES.TAKEN_ORDER, chainId: 97, address: '0xBa1aAe6ef4E2483E542dF954020173b1BCd072d6' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 97, address: '0x5718D9C95D15a766E9DdE6579D7B93Eaa88a26b8' },
    { type: EVENT_TYPES.MAKE_ORDER, chainId: 97, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' },
    { type: EVENT_TYPES.TAKEN_ORDER, chainId: 97, address: '0x18041866663b077bB6BF2bAFFAeA2451a2472ed7' }
  ]
}
