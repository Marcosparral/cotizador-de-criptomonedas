import { useMemo } from "react"
import { useCryptoStore } from "../store/store" 
import Spinner from "./Spinner/Spinner"

export default function CryptoPriceDisplay() {

    const result = useCryptoStore((state) => state.result)
    const loading = useCryptoStore((state) => state.loading)
    const hasResult = useMemo(() => !Object.values(result).includes(''), [result])

    return (
        <div className="result-wrapped">
            {loading ? <Spinner /> : hasResult && (
                <>
                 <h2>Cotización</h2>
                    <div className="result">
                        <img 
                            src={`http://cryptocompare.com/${result.IMAGEURL}`}
                            alt="Imagen Criptomoneda"
                        />
                        <div>
                            <p>El precio es de: <span>{result.PRICE}</span></p>
                            <p>El precio mas alto del dia fue: <span>{result.HIGHDAY}</span></p>
                            <p>El precio mas bajo del dia fue: <span>{result.LOWDAY}</span></p>
                            <p>variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}</span></p>
                            <p>Ultima actualización: <span>{result.LASTUPDATE}</span></p>
                            
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}