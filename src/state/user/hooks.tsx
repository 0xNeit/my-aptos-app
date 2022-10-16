import { getChainInfoOrDefault } from 'constants/chainInfo'
import { SupportedChainId } from 'constants/chains'
import { Coin } from 'hooks/common/Coin'
import { useCallback, useMemo } from 'react'
import { shallowEqual } from 'react-redux'
import { useAppDispatch, useAppSelector } from 'state/hooks'

import { updateUserDarkMode } from './reducer'

export function useChainId(): SupportedChainId {
  return useAppSelector((state) => state.user.chainId)
}

export function useNativeCoin(): Coin {
  const chainId = useChainId()
  const { nativeCoin } = getChainInfoOrDefault(chainId)
  return nativeCoin
}

export function useIsDarkMode(): boolean {
  const { userDarkMode, matchesDarkMode } = useAppSelector(
    ({ user: { matchesDarkMode, userDarkMode } }) => ({
      userDarkMode,
      matchesDarkMode,
    }),
    shallowEqual
  )
  return userDarkMode === null ? matchesDarkMode : userDarkMode
}

export function useDarkModeManager(): [boolean, () => void] {
  const dispatch = useAppDispatch()
  const darkMode = useIsDarkMode()

  const toggleSetDarkMode = useCallback(() => {
    dispatch(updateUserDarkMode({ userDarkMode: !darkMode }))
  }, [darkMode, dispatch])

  return [darkMode, toggleSetDarkMode]
}

export function useShowSwapDropdownDetails(): boolean {
  return useAppSelector((state) => state.user.showSwapDropdownDetails)
}
