const roles={
    user:{
        permission:["get","post","patch","delete"]
    },
    moderator:{
        permission:["delete"]
    }
}


   function checkrole(role) {
    
   
    return function(req,res,next){
        if(req.user && roles[req.user.role] && roles[req.user.role].permission.includes(req.mehod.toLowerCase()))
        {
            return next()
        }
        else{
            return res.send("forbidden")
        }
    }
}

    module.exports={checkrole}
