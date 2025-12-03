import { useCryptoStore } from "../store/store"
import { currencies } from "../data"
import { useState, type ChangeEvent, type FormEvent } from "react"
import type { Pair } from "../types"
import ErrorMessage from "./ErrorMessage"

export default function CriptoSearchForm() {

    const cryptoCurrencies = useCryptoStore((state) => state.cryptoCurrencies)
    const fetchData = useCryptoStore((state) => state.fetchData)
    const [pair, setpair] = useState<Pair>({
        currency: '',
        cryptoCurrency: ''
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setpair({
            ...pair,
            [e.target.name]: e.target.value
        })
    }

    const [error, setError] = useState('')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(Object.values(pair).includes('')) {
            setError('Todos los campos son abligatorios')
            return
        } else setError('')
        fetchData(pair)
    }

    return (
        <form 
            className="form"
            onSubmit={handleSubmit}
            >
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="field">
                <label htmlFor="currency">Moneda</label>
                <select 
                    name="currency" 
                    id="currency"
                    onChange={handleChange}
                    value={pair.currency}
                    
                >
                    <option value="">-- Seleccione --</option>
                    {currencies.map( currency => (
                        <option 
                            key={currency.code} 
                            value={currency.code}>{currency.name}</option>
                    ))}
                </select>
            </div>

            <div className="field">
                <label htmlFor="cryptoCurrency">Criptomoneda</label>
                <select 
                    name="cryptoCurrency" 
                    id="cryptoCurrency"
                    onChange={handleChange}
                    
                >
                    <option value="">-- Seleccione --</option>
                    {cryptoCurrencies.map( crypto => (
                        <option 
                            key={crypto.CoinInfo.FullName}
                            value={crypto.CoinInfo.Name}>{crypto.CoinInfo.FullName}</option>
                    ))}
                </select>
            </div>

            <input 
                type="submit"
                value='Cotizar' 
            />
        </form>
    )
}