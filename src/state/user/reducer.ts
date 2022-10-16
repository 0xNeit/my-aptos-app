import { createSlice } from '@reduxjs/toolkit'
import { SupportedChainId } from 'constants/chains'
import { APTOS_CoinInfo, APTOS_DEVNET_CoinInfo, APTOS_TESTNET_CoinInfo } from 'constants/coinInfo'
import { Coin } from 'hooks/common/Coin'

import { updateVersion } from '../global/actions'

function pairKey(coinXAddress: string, coinYAddress: string) {
  return `${coinXAddress};${coinYAddress}`
}

export interface UserState {
  chainId: SupportedChainId

  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number

  matchesDarkMode: boolean // whether the dark mode media query matches

  userDarkMode: boolean | null // the user's choice for dark mode or light mode

  // user defined slippage tolerance in bips, used in all txns
  userSlippageTolerance: number

  // deadline set by user in minutes, used in all txns
  userDeadline: number

  coins: {
    [chainId: number]: {
      [address: string]: Coin
    }
  }
  showSwapDropdownDetails: boolean
}

export const initialState: UserState = {
  chainId: SupportedChainId.APTOS_DEVNET,
  matchesDarkMode: false,
  userDarkMode: true,
  coins: {
    [SupportedChainId.APTOS]: APTOS_CoinInfo,
    [SupportedChainId.APTOS_TESTNET]: APTOS_TESTNET_CoinInfo,
    [SupportedChainId.APTOS_DEVNET]: APTOS_DEVNET_CoinInfo,
  },
  userSlippageTolerance: 0,
  userDeadline: 0,
  showSwapDropdownDetails: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateChainId(state, { payload: { chainId } }) {
      state.chainId = chainId
    },
    updateUserDarkMode(state, action) {
      state.userDarkMode = action.payload.userDarkMode
    },
    updateMatchesDarkMode(state, action) {
      state.matchesDarkMode = action.payload.matchesDarkMode
    },
    updateUserSlippageTolerance(state, action) {
      state.userSlippageTolerance = action.payload.userSlippageTolerance
    },
    updateUserDeadline(state, action) {
      state.userDeadline = action.payload.userDeadline
    },
    addCoin(state, { payload: { coin } }) {
      if (!state.coins) {
        state.coins = {}
      }
      state.coins[coin.chainId] = state.coins[coin.chainId] || {}
      state.coins[coin.chainId][coin.address] = coin
    },
    removeCoin(state, { payload: { address, chainId } }) {
      if (!state.coins) {
        state.coins = {}
      }
      state.coins[chainId] = state.coins[chainId] || {}
      delete state.coins[chainId][address]
    },
    setShowSwapDropdownDetails(
      state,
      { payload: { showSwapDropdownDetails } }: { payload: { showSwapDropdownDetails: boolean } }
    ) {
      state.showSwapDropdownDetails = showSwapDropdownDetails
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateVersion, (state) => {
      // init chainId
      if (
        ![SupportedChainId.APTOS, SupportedChainId.APTOS_TESTNET, SupportedChainId.APTOS_DEVNET].includes(state.chainId)
      ) {
        state.chainId = SupportedChainId.APTOS_DEVNET
      }
      // update local coin list
      state.coins = {
        [SupportedChainId.APTOS]: APTOS_CoinInfo,
        [SupportedChainId.APTOS_TESTNET]: APTOS_TESTNET_CoinInfo,
        [SupportedChainId.APTOS_DEVNET]: APTOS_DEVNET_CoinInfo,
      }

      state.lastUpdateVersionTimestamp = new Date().getTime()
    })
  },
})

export const { addCoin, removeCoin, updateChainId, updateMatchesDarkMode, updateUserDarkMode } = userSlice.actions
export default userSlice.reducer
