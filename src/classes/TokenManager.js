export default class TokenManager {
    static createToken (type, token=null) {
        if(token) return `${type}:${token}`;

        return type;
    }

    static getType (token) {
        if(token.split(':')[0]) {
            return token.split(':')[0];
        } else return token;
    }


    static getToken (token) {
        if(token.split(':')[1]) {
            return token.split(':')[1];
        } else return token;
    }    
}