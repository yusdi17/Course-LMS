import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
export const signUpAction =  async (req, res) => {

  try {
    const body = req.body;
    const hashPasword = bcrypt.hashSync(body.password, 12);

    const user = new userModel({
      name: body.name,
      email: body.email,
      photo: 'default.png',
      password: hashPasword,
      role: 'manager'
    })

    //action payment midtrans

    await user.save();
    return res.json({
      message: 'Sign Up Success',
      data:{
        midtrans_payment_url: "https://google.com",
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({error: 'Internal server error', details: error.message});
    
  }
}