var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
       var userModelData = new userModel();

       userModelData.firstname = userDetails.firstname;
       userModelData.lastname = userDetails.lastname;
       userModelData.email = userDetails.email;
       userModelData.password = userDetails.password;
       var encrypted = encryptor.encrypt(userDetails.password);
       userModelData.password = encrypted;
      
      userModel.findOne({email:userDetails.email}, function getresult(errorvalue, result){
         if(errorvalue){            
            reject({status: false, msg: "Datos Invalidos"});
         }else if(result == undefined || result == null){
            userModelData.save(function resultHandle(error, result) {
            if(result !=undefined &&  result !=null) {
                  if (error) {
                      resolve(false);
                  } else {
                     console.log(result)
                      resolve(true);
                  }
               }
               else {
                  console.log("hi")
                  resolve(false);
               }
            });
         }else{
            resolve(false)
         }
      });    
   });
}

module.exports.findUser = (userDetails)=>{
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({email:userDetails.email}, function getresult(errorvalue, result){
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               resolve({status: true, msg: result});
            }
            else {
               resolve({status: false, msg: "no me quiero ir señor stark"});
           }
         }
      });
   });
}

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject(false);
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}


module.exports.deleteUsersService = (userid) =>{
   return new Promise(function myFn(resolve, reject) {
      userModel.findByIdAndDelete(userid, function(err, user){
         if(err){
            reject({status: false, msg: "no"})
         }
         else{
            if (user != undefined) {
               resolve(true)
            }else{
               resolve(false)
            }
         }
      })
      });
}