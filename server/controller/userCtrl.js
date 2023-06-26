import User from '../models/userModel.js';


const createUser =async (req,res)=>{
    const email = req.body.email;
    const mobile = req.body.mobile;
    const findbyEmail = await User.find({email : email})
    const findbyMobile = User.find({mobile : mobile})
    
    if(findbyEmail == "" && findbyMobile == ""){
        //CREATE NEW USER
        const newUser = User.create(req.body);
        res.json(newUser);
    }else{
        //USER ALREADY EXIST
        res.json({
            msg: "USER ALREADY EXIST!",
            success: false,
        })
    }
}

export default createUser;