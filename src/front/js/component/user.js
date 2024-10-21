import React, {useEffect} from "react";
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

	return (
		<div className="text-center mt-5">
			<h1>Login exitoso!!</h1>
		</div>
	);
};
