import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";


export const User = () => {

    const fetchProtectedData = async () => {
        const token = localStorage.getItem('token');
    
        const response = await fetch('https://refactored-meme-q79xjr76v45xh6gx7-3001.app.github.dev//api/private', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('token validado' + 'Protected data:', data);
        } else {
            const errorData = await response.json();
            console.error('Failed to fetch protected data:', errorData);
        }
    };
    
    useEffect(() => {
        fetchProtectedData();
    }, []);

    const logOut = () => {
        localStorage.clear()
    }

	return (
        <div>
        <nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/">
						<button onClick={logOut} className="btn btn-primary me-1">Log out</button>
					</Link>
				</div>
            </div>
		</nav>
		<div className="text-center mt-5">
			<h1>Login exitoso!!</h1>
		</div>
		</div>
	);
};
