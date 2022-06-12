// define a service for accessing USER data
//  GET / -> get API welcoming message
//  GET /users -> get all users (ADMIN only)
//  GET /users/{id} -> get 1 user (authenticated user)

import API_URL from './config.js'

function authHeader() {
    // checks Local Storage for user item
    let user = JSON.parse(localStorage.getItem('user'));

    // if there is a logged user with accessToken (JWT)
    if (user && user.accessToken) {
        // return HTTP authorization header for Node.js Express back-end
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + user.accessToken
        };
    } else  //otherwise, return just header for content type
        return { 'Content-Type': 'application/json' };
}

export const UserService = {
    async fetchOneUserByID(id) {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },

    async fetchAllUsers() {
        const response = await fetch(`${API_URL}/users`, {
            method: "GET",
            headers: authHeader()
        });
        if (response.ok) {
            let data = await response.json();
            return data.users;
        }
        else {
            throw Error(handleResponses(response.status));
        }
    },
    // sends request to API root
    async getPublicContent() {
        const response = await fetch(`${API_URL}`, {
            method: "GET" // requires NO authorization header
        });
        if (response.ok) {
            let data = await response.json();
            // console.log("USER SERVICE - fetch WELCOMING MESSAGE")
            // console.log(data) // data = "Welcome to the TUTORIALS api"
            return data;
        }
        else
            throw Error(handleResponses(response.status));
    }
}

export default UserService;


function handleResponses(code) {
    let message = "";
    switch (code) {
        case 401:
            message = "Not allowed to executed this action!";
            break;
        case 403:
            message = "Forbidden access";
            break;
        default:
            message = "Unkown message";
            break;
    }
    return message;
}