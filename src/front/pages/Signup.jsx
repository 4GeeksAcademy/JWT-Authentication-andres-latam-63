import { useEffect, useState } from "react"


export const Signup = () => {

    const [info, setInfo] = useState({
        username: "",
        email: "",
        password: ""
    });

    const Submit = (event) => {
        event.preventDefault()
    }

    const HandleChange = (e) => {
        setInfo({
            ...info,
            [e.target.name]: e.target.value,
        });
    };

    const createUser = async () => {
        try {
            const backendUrl = import.meta.env.VITE_BACKEND_URL

            const result = await fetch(backendUrl + "/api/signup", {
                method: "POST",
                body: JSON.stringify(info),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            const data = await result.json();
            if (!result.ok) {
                alert(data.msg);
                return
            }
            alert(data.msg),
                setInfo({ "username": '', "email": '', "password": '' })
            return


        } catch (error) {
            console.error(error)
        }
    }




    return (
        <>
            <div className="container justify-content-center col-12">
                <form onSubmit={Submit}>
                    <div className="mb-3 col-6 mx-auto">
                        <label for="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={info.username} onChange={HandleChange} required />
                    </div>
                    <div className="mb-3 col-6 mx-auto">
                        <label for="Email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="Email" name="email" aria-describedby="emailHelp" onChange={HandleChange} value={info.email} required placeholder="email" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3 col-6 mx-auto">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={info.password} onChange={HandleChange} required />
                    </div>
                    <div className="col-1 mx-auto">
                        <button type="submit" className="btn btn-primary" onClick={createUser}>Submit</button>
                    </div>

                </form>
            </div>
        </>
    )
}