import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/login", {
                email,
                password,
            });
            alert("Login successful");
            console.log(res.data); // Handle token storage
        } catch (error) {
            console.error(error);
            alert("Login failed");
        }
    };
    return (
        <>
            <div>
                <form className="form" method="POST">
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
        </>
    );
};

export default LoginPage;
