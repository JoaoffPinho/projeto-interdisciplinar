/*
The service provides three important methods with the help of FETCH 
for HTTP requests & reponses:
    login(): POST {username, password} & save JWT to Local Storage
    logout(): remove JWT from Local Storage
    register(): POST {username, email, password} 
*/

import API_URL from './config.js'

export const AuthService = {
    async login(user) { // payload = user (username + password)
        const response = await fetch(`${API_URL}users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: user.username,
                password: user.password
            })
        });
        if (response.ok) {
            const data = await response.json();
            if (data.accessToken)
                localStorage.setItem('user', JSON.stringify(data));
            return data;
        } else {
            throw Error(handleResponses(response.status));
        }
    },

    // async logout() {
    //     localStorage.removeItem('user');
    // },

    // async register(user) {
    //     const response = await fetch(`${API_URL}/users`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body:
    //             JSON.stringify({
    //                 username: user.username,
    //                 email: user.email,
    //                 password: user.password
    //             })
    //     });
    //     if (response.ok) {
    //         const data = await response.json();
    //         return data;
    //     } else {
    //         throw Error(handleResponses(response.status));
    //     }
    // }
}


function handleResponses(code) {
    let message = "";
    switch (code) {
        case 400:
            message = "Username already exists.";
            break;
        case 401:
            message = "Wrong credentials";
            break;
        case 404:
            message = "User not found";
            break;
        case 500:
            message = "Internal server error";
            break;
        default:
            message = "Unkown message";
            break;
    }
    return message;
}

export default AuthService;