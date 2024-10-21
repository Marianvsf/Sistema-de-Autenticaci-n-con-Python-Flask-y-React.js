import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const response = await fetch('https://refactored-meme-q79xjr76v45xh6gx7-3001.app.github.dev/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            
            const token = data.token;
            localStorage.setItem('token', token);
            navigate('/user');
        } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            alert('Usuario o Contraseña incorrecta');
        
        }
    };


return (
    <div>
        <nav className="navbar navbar-light bg-light pt-2">
                <div className="container">
                    <Link to="/">
                        <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                    </Link>
                </div>
            </nav>
        <h1 className="text-center">Login</h1>
        <form className="container mt-5" style={{ maxWidth:"500px"}}
        onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label"><strong>Email address</strong></label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} 
                placeholder="Email Address" onChange={(e) => setEmail(e.target.value)}
                required
                />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label className="form-label"><strong>Password</strong></label>
                <input type="password" className="form-control" id="exampleInputPassword1" value={password} 
                placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
    </form>
</div>
  
    )
}
export default Login