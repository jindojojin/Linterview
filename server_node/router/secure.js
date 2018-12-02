var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const jwtsecure = require('./key').jsecure;

var secure = {
    createSalt : function(){
        return crypto.randomBytes(10).toString('hex');
    },
    encrypt : function(str, salt){
        return crypto.createHash('md5').update(str+salt).digest('hex');
    },
    compare : function(str,hash,salt){      
        return ( hash == this.encrypt(str,salt));
    },
    createUserToken: function(user){
        return jwt.sign(user,jwtsecure,{expiresIn : 86400});
    },
    verifyUserToken: function(token){
        try {
            return  jwt.verify(token,jwtsecure)
        } catch (error) {
            return null;
        }        
    },    
}
module.exports = secure;
// var u = {
//     username: "adsfasdfasdf",
//     password: "adfafa",
// }
// console.log(u);
// var a=secure.createUserToken(u);
// var b=secure.verifyUserToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkc2Zhc2RmYXNkZiIsInBhc3N3b3JkIjoiYWRmYWZhIiwiaWF0IjoxNTI0MDM4NzQ2LCJleHAiOjE1MjQwNDg3NDZ9.iRX1hY_vtSwRKp-SyUJLqe4r307ftdkvViccD6QbMRU");
// // console.log(a);
// console.log(b);
var IdToken="eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ2M2ZlNDgwYzNjNTgzOWJiYjE1ODYxZTA4YzMyZDE4N2ZhZjlhNTYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTM0MDA1OTc5NDAyLTk5OW00MmI1Z2Y1dmVrOW9nNTUxZzlocXB2YmFydHU4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTM0MDA1OTc5NDAyLTk5OW00MmI1Z2Y1dmVrOW9nNTUxZzlocXB2YmFydHU4LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2MjIyMzYzOTM3NTQ0OTc4MTk2IiwiZW1haWwiOiJ0cmFucXVhbmdsaW5oLnVldC52bnVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJTdnRURXlmYTV4UTlqbVktSmh5NThBIiwibmFtZSI6IlF1YW5nIExpbmggVHLhuqduIiwicGljdHVyZSI6Imh0dHBzOi8vbGg1Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tdXRqOEhUbV9ENjQvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUdEZ3ctaXFKZ2lvNDVqdC1hRkk3VnNqak9aNkV1aDV6dy9zOTYtYy9waG90by5qcGciLCJnaXZlbl9uYW1lIjoiUXVhbmcgTGluaCIsImZhbWlseV9uYW1lIjoiVHLhuqduIiwibG9jYWxlIjoidmkiLCJpYXQiOjE1NDM3NjgyNjQsImV4cCI6MTU0Mzc3MTg2NCwianRpIjoiZmMxYWY5MDZkNjVjZTI5MWRkYzcwNzgyZjlmOWUxNjNiYTIxMmYwYSJ9.LTqfO76r2PYBuY85gy062Q8pAVKffwJNgU0gUaUPeanowJT5I6zgdBkiKI3ncMYJveBgjC88kZPnwAJJqNeCy0rE80nLtF6loQMz6cFtKhHN2PSHWcYNGy_1kjPO-1cvV_wyovVHAW_OWMVP7n3rIR7eSSHeOzTD_y0U6MqwXD0UHH-HBxOZ-4bM_01allEPLR2Ntn71DPRN_RTOohJ3eCK2VPX4w5P1amqUagbkbQj5mc6NWR4CG5zEfSsPiSpFjCcGlGu51qfVzr6mRACzvS51SXx6-dDgDERpPUm4M3GkXMPvop1o8pXEo_Cvx7j8YdcznAlOIp0S3BpSNP7cKA"





