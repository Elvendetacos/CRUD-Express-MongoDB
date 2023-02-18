const userModel = require('./userModel');
var userService = require('./userServices');

var createUserControllerFunc = async (req, res) =>  {
    try {
    console.log(req.body);
    var status = await userService.createUserDBService(req.body);
    console.log(status);
    
    if (status) {
        res.send({ "status": true, "message": "Usuario creado" });
    } else {
        res.send({ "status": false, "message": "Error creando usuario" });
    }

    }
    catch(err) {
        console.log(err);
    }
}

var loginUserControllerFunc = async (req, res) => {
    var result = null;
    try {
        result = await userService.loginuserDBService(req.body);
        if (result.status) {
            res.send({ "status": true, "message": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": false, "message": error.msg });
    }
}

var findUser = async (req, res) =>{
    var result = null
    var result = await userService.findUser(req.body);
    try {
        console.log(result.status);
        
        if (result.status) {
            res.send({ "status": true, "usuario": result.msg });
        } else {
            res.send({ "status": false, "message": result.msg });
        }
        }
    catch(err) {
        console.log(err);
   }
}

var deleteUser = async(req, res) => {
    try {
        result = await userService.deleteUsersService(req.params.id);

        if(result){
            res.send({"status": true, "message": "usuario eliminado"})
        }else{
            res.send({"status": false, "message": "usuario no eliminado"})
        }
    }
    catch(err){
        console.log(err)
    }
}

module.exports = { createUserControllerFunc, loginUserControllerFunc, findUser, deleteUser};