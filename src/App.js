import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);
    const [currency, setCurrency] = useState("usd"); 
    useEffect(() => {
        fetchData(currency);
    }, [currency]);

    const fetchData = (currency) => {
        Axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
        ).then((res) => {
            setCrypto(res.data);
        }).catch(error => {
            console.error(error);
        });
    };

    return (
        <div className="App">
            <h1>All Cryptocurrencies</h1>
            <button onClick={() => setCurrency(currency === "usd" ? "eur" : "usd")} id="currencybtn">
                Switch to {currency === "usd" ? "EUR" : "USD"}
            </button>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <table>
                <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Symbol</td>
                        <td>Market Cap</td>
                        <td>Price</td>
                        <td>Available Supply</td>
                        <td>Volume(24hrs)</td>
                    </tr>
                </thead>
                <tbody>
                    {crypto
                        .filter((val) => {
                            return val.name.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((val, id) => {
                            return (
                                <tr key={id}>
                                    <td className="rank">{id + 1}</td>
                                    <td className="logo">
                                        <a href={`https://www.coingecko.com/en/coins/${val.id}`}>
                                            <img src={val.image} alt="logo" width="30px" />
                                        </a>
                                        <p>{val.name}</p>
                                    </td>
                                    <td className="symbol">{val.symbol.toUpperCase()}</td>
                                    <td>{currency === "usd" ? "$" : "€"}{val.market_cap.toLocaleString()}</td>
                                    <td>{currency === "usd" ? "$" : "€"}{val.current_price.toFixed(2)}</td>
                                    <td>{val.total_supply ? val.total_supply.toLocaleString() : 'N/A'}</td>
                                    <td>{currency === "usd" ? "$" : "€"}{val.total_volume.toLocaleString()}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
