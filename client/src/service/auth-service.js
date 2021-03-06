import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
class AuthService {
    tokenKey = 'auth_token';
    getToken() {
        return localStorage.getItem(this.tokenKey);
    }
    decode(token){
        return jwt.decode(token);
    }
    isValid(token){
        return moment().isBefore(this.getExpiration(token));
    }
    saveToken(token){
        localStorage.setItem(this.tokenKey, token);
    }
    getExpiration(token){
        const exp = this.decode(token).exp;

        return moment.unix(exp);
    }
    invalidateUser(){
        localStorage.removeItem(this.tokenKey);
    }
    isAuthenticated() {
        const token = this.getToken();

        return (token && this.isValid(token) ? true : false)
    }
}

export default new AuthService();