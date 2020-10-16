import Vue from 'vue';
import axios from 'axios';
import {apiURL} from '../assets/variables.js';

export default class AuthMiddleware {
    
    async isAuthenticated(next) {
        if(await this.checkAuthentication()) next();
        else next({path:'/login'});
    }

    async isNotAuthenticated(next) {
        if(!await this.checkAuthentication()) next();
        else next({path:'/account'});
    }

    async logout(){
        let succ = false;
        await axios({
            method: "DELETE",
            url: apiURL + "/api/auth/logout",
            headers: {
                'Authorization': Vue.$cookies.get('access-token')
            },
            data: {
                'token': Vue.$cookies.get('refresh-token')
            }
        }).then(() => {
            Vue.$cookies.remove('access-token');
            Vue.$cookies.remove('refresh-token');
            succ = true;
        }).catch(err => {
            console.log(err);
            succ = false;
        });
        return succ;
    }

    async checkAuthentication(){
        let accessToken = Vue.$cookies.get('access-token');
        let refreshToken = Vue.$cookies.get('refresh-token');
        //IF theres no access token, the user is not authenticated
        if(accessToken === null) return false;
        //IF access token is valid, user is authenticated
        if(await this.checkAccessToken(accessToken)) return true;
        console.log("Access Failed");
        console.log("Refreshing...");
        //IF theres no refresh token, fail
        if(refreshToken === null) return false;
        //IF the refresh token generates a new access token, succeed
        if(await this.tryRefreshToken(refreshToken)){
            console.log("Refresh Worked");
            return true;
        }
        console.log("Refresh Failed.");
        return false;
    }

    async tryRefreshToken(refresh_token){
        let regenerated = false;
        await axios({
            method: "POST",
            url: apiURL + "/api/auth/token",
            data: {
                'token': refresh_token
            }
        }).then((res) => {
            regenerated = true;
            Vue.$cookies.remove('access-token');
            Vue.$cookies.set('access-token', res.data.access_token, '1d');
        })
        .catch(() => regenerated = false);
        return regenerated;
    }

    async checkAccessToken(access_token){
        let authenticated = false;
        await axios({
            method: "POST",
            url: apiURL + "/api/auth/check",
            headers: {
                'Authorization': access_token
            }
        }).then(() => authenticated = true)
        .catch(() => authenticated = false);
        return authenticated;
    }
}