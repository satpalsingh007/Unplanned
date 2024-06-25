require("dotenv").config();
import { useState, lazy, Suspense } from "react";
import axios from "axios";
// import MapComponent from "./MapComponent";
const MapComponent = lazy(() => import("./MapComponent"));
const ChatWindow = lazy(() => import("./ChatWindow"));
const PORT = process.env.PORT || 3000;

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${PORT}/login`, {
                email,
                password,
            });
            alert("Login successful");
            setIsLoggedIn(true);
            console.log(res.data);
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };
    return (
        <>
            {!isLoggedIn ? (
                <div>
                    <form className="form" method="POST">
                        <div>Login</div>
                        <div className="formElement">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="xyz@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            ></input>
                        </div>
                        <div className="formElement">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            ></input>
                        </div>
                        <button type="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </form>
                </div>
            ) : (
                <Suspense fallback={<div>loading map...</div>}>
                    <MapComponent />
                    <ChatWindow />
                </Suspense>
            )}
        </>
    );
};

export default LoginPage;
