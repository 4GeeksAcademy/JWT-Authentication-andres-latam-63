import { useState } from "react";

export const LoginPage = () => {


    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    const Submit = (event) => {
        event.preventDefault()
    }

    const HandleChange = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    };

    const Login = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL
            if (
                loginInfo.email.trim() !== "" && loginInfo.password.trim() !== ""
            ) {
                const result = await fetch(backendUrl + "/api/login", {
                    method: "POST",
                    body: JSON.stringify(loginInfo),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                const data = await result.json();
                if (!result.ok) {
                    alert(data.msg);
                    return
                }
                if (result.ok) {
                    alert(`${data.msg}`)
                    localStorage.setItem("jwt-token", data.token)
                    setLoginInfo({
                        email: "", password: ""
                    })
                    return
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="flex-container col-12  pt-5 pb-5 bg-dark">
                <div className="bg-secondary col-6 mx-auto pb-4 pt-4">
                    <form onSubmit={Submit}>
                        <div className="mb-3 col-8 mx-auto">
                            <label for="Email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="Email" name="email" aria-describedby="emailHelp" required placeholder="email@example.com" onChange={HandleChange} value={loginInfo.email} />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3 col-8 mx-auto">
                            <label for="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={HandleChange} value={loginInfo.password} required />
                        </div>
                        <div className="col-1 mx-auto">
                            <button type="submit" className="btn btn-primary" onClick={Login}>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
};