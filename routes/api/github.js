//import library
const request = require('superagent');

module.exports = (app) => {
    app.get('/signin/callback'), (req, res, next) => {
        const { query } = req;
        const { code } = query;
    //if code is null return Error
        if (!code) {
            return res.send({
            success: false,
            message: 'Error',
            });
        }
   //if code is sucessful run post request
   request
   .post('https://github.com/login/oauth/access_token')
   .send({ client_id: '251f565da5e0ec055bb1',
    client_secret: '79bf31b0eb296c6379dd2a7f433cae5d786e7d8d',
    code: 'code'
 })
   //.set('X-API-Key', 'foobar')
   .set('Accept', 'application/json')
   .then(function(result) {
       const data = result.body;
       res.send(data);
     
   });
      //grab access token 
     // console.log('code', code);

    });
    app.get ('/user/'), (req, res, next) => {
        const access_token = ' 47969d2d1c2c138cfcc151290a54fa3ff7c581db'
        request
        .get ('https://api.github.com/user')
        .set('Authorization', 'token' + accessToken)
        .then(function(result){
            res.send(result.body)
        });
    });
};



//<Route path="https://project3test89265934265.herokuapp.com" component={Authenticator Response}/>