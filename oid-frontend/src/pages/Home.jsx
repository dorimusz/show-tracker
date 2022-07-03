import React from "react";
import { useState, useEffect } from "react";
import { oidApi } from "../api/oidApi";
import { useSearchParams } from "react-router-dom";

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams({});
    const [error, setError] = useState(null)
    const api = oidApi();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [client, setClient] = useState(null);

    const login = async () => {
        const response = await api.post('/user/login', {
            username, password, client
        })
        if (!response) return alert("Network error");
        if (response.status !== 200) return alert("Error!");
        const code = response.data.code

    };

    const signup = async () => {
        const response = await api.post('/user/signup', {
            username, password
        })
        if (!response) return alert("Network error");
        if (response.status !== 200) return alert("Error!");
        alert("Success!");
        setPassword("");
        setUsername("");
    };

    useEffect(() => {
        const _client = (searchParams.get('client_id'))
        if (!_client) {
            return setError("Missing params")
        }
        setClient(_client)

    }, [])

    return (
        <div>
            <h1 style={{ marginTop: "55px" }}>Home</h1>
            {
                error && <div>{error}</div>
            }
            {
                !error && (<div>
                    <input placeholder="Username" type="text" onChange={(e) => setUsername(e.target.value)} value={username} />
                    <input placeholder="Password" type="text" onChange={(e) => setPassword(e.target.value)} value={password} />

                    <button onClick={login}>Login</button>
                    <button onClick={signup}>Signup</button>
                </div>)
            }

        </div>
    )
}

export default Home