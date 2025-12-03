import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { CryptoCurrency, CryptoPrice, Pair } from '../types'
import { getCryptos, fetchCurrentCryptoPrice } from '../services/CryptoServices'

type CryptoStore = {
    cryptoCurrencies: CryptoCurrency[],
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>


}

export const useCryptoStore = create<CryptoStore>()(devtools((set) => ({
    cryptoCurrencies: [],
    result: {} as CryptoPrice,
    loading: false,
    fetchCryptos: async() => {
        const cryptoCurrencies = await getCryptos()
        set(() => ({
            cryptoCurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result,
            loading: false
        }))
    }
})))