
const users = require("../models/usersSchema");
const register = require("../models/registerSchema");
 const moment = require("moment");


//register
exports.registerpost = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Validations
    if (!name) {
      return res.status(400).send({ message: "Name is required" });
    }
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!mobile) {
      return res.status(400).send({ message: "Mobile number is required" });
    }
    if (!password) {
      return res.status(400).send({ message: "Password is required" });
    }

    // Check if user already exists
    const existingUser = await register.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, please login",
      });
    }

    // Create and save the new user
    const user = await register.create({
      name,
      email,
      mobile,
      password,
    });

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};


//login
exports.loginpost= async (req, res) => {
    try {
      const {email,password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      
      //check user
      const usermail = await register.findOne({email:req.body.email},{password:req.body.password});
      if (usermail) {
        res.status(200).json({
          code: 200,
          message: "user Login successfully",
          data: {
            _id: usermail._id,
            name: usermail.name,
            email: usermail.email,
            contact: usermail.contact,
          },
          error: false,
          status: true,
        });
        console.log(usermail._id);
      } else {
        res.status(404).json({
          code: 404,
          message: "Invalid User details, Try Again.  ",
          data: [],
          error: false,
          status: false,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };

//user post
exports.userpost = async (req, res) => {
    const file = req.file.filename;
    const { fname, lname, email, mobile,  location } = req.body;
    
    if (!fname || !lname || !email || !mobile  || !location  || !file) {
        res.status(401).json("All Inputs is required")
    }

    try {
        const preuser = await users.findOne({ email: email });

        if (preuser) {
            res.status(401).json("This user already exist in our databse")
        } else {

            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const userData = new users({
                fname, lname, email, mobile, location,  profile: file, datecreated
            });
            await userData.save();
            res.status(200).json(userData);
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error")
    }
};

//usersget

exports.userget = async(req,res)=>{
    try{
        const usersdata = await users.find();
        res.status(200).json(usersdata)

    }catch(error){
        res.status(401).json(error)
    }
}

//single user get

exports.singleuserget = async (req, res) => {
    const { id } = req.params;
    try {
        const userdata = await users.findOne({ _id: id });
        res.status(200).json(userdata)
    } catch (error) {
        res.status(401).json(error)
    }
}

//user Edit

exports.useredit = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, mobile, gender, location, status, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updateuser = await users.findByIdAndUpdate({ _id: id }, {
            fname, lname, email, mobile, gender, location, status, profile: file, dateUpdated
        });

        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        res.status(401).json(error)
    }
}

// delete user
exports.userdelete = async (req, res) => {
    const { id } = req.params;
    try {
        const deletuser = await users.findByIdAndDelete({ _id: id });
        res.status(200).json(deletuser);
    } catch (error) {
        res.status(401).json(error)
    }
}