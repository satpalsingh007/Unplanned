require("dotenv").config();
import { useState } from "react";
import axios from "axios";
const PORT = process.env.PORT || 3000;
const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // const handleSubmit = async (e) => {
    //     e.preventDefault(); // Prevent default form submission behavior
    //     try {
    //         await axios.get("http://localhost:1234/signup", {
    //             email,
    //             password,
    //         });
    //         alert("Sign up successful");
    //         // console.log(res.data);
    //     } catch (error) {
    //         console.error(error);
    //         alert("Sign up failed");
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await fetch(`${PORT}/signup`, {
                method: "POST", // Assuming this should be a POST request
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("Sign up successful");
                // console.log(data);
            } else {
                throw new Error("Sign up failed");
            }
        } catch (error) {
            console.error(error);
            alert("Sign up failed");
        }
    };

    return (
        <>
            <div>
                <form className="form" onSubmit={handleSubmit} method="POST">
                    <div>Signup</div>

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
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default SignUpPage;
