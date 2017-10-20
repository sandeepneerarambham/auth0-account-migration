function login (username, password, callback){

    // Utilizing the request library we make the REST call to Auth0
    // Visit https://auth0.com/docs/api/authentication?http#resource-owner-password
    request({
        url: 'https://' + configuration.Domain + '/oauth/token',
        method: 'POST',
        form: {
            grant_type: 'password',
            scope: 'openid',
            audience: configuration.Audiance,
            client_id: configuration.Client_ID,
            client_secret: configuration.Client_Secret,
            username: username,
            password: password
        },
        headers: {'content-type' : 'application/json'},
        json: true
    }, function(error, response, body){
        if(error) {
            callback(error);
        } else {
            if(response.statusCode !== 200){
                callback();
            } else {
                var id_token = jwt.decode(body.id_token); // jwt_decode
                callback(null, {
                    user_id : id_token.name,
                    username: id_token.name,
                    email: id_token.email,
                    email_verified: id_token.email_verified,
                    nickname: id_token.nickname
                });
            }
        }
    });
}
