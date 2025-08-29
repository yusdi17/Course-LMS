import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
import jwt from "jsonwebtoken";

export const signUpAction = async (req, res) => {
  const midtrans_url = process.env.MIDTRANS_URL;
  const midtrans_auth_string = process.env.MIDTRANS_AUTH_STRING;
  const finish = process.env.FINISH_CALLBACK_URL;

  try {
    const body = req.body;
    const hashPasword = bcrypt.hashSync(body.password, 12);

    const user = new userModel({
      name: body.name,
      email: body.email,
      photo: "default.png",
      password: hashPasword,
      role: "manager",
    });

    //action payment midtrans
    const transaction = new transactionModel({
      user: user._id,
      price: 280000,
      status: "pending",
    });

    const midtrans = await fetch(midtrans_url, {
      method: "POST",
      body: JSON.stringify({
        transaction_details: {
          order_id: transaction._id.toString(),
          gross_amount: transaction.price,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
        callbacks: {
          finish: finish,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${midtrans_auth_string}`,
      },
    });

    const midtransResponse = await midtrans.json();

    await user.save();
    await transaction.save();
    return res.json({
      message: "Sign Up Success",
      data: {
        midtrans_payment_url: midtransResponse.redirect_url,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

export const signInAction = async (req, res) => {
  try {
    const body = req.body;

    const existingUser = await userModel
      .findOne()
      .where('email')
      .equals(body.email);

    if (!existingUser) {
      return res.status(400).json({ error: "Email not registered" });
    }

    const comparePassword = bcrypt.compareSync(
      body.password,
      existingUser.password
    );

    if (!comparePassword) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const isvalidUser = await transactionModel.findOne({
      user: existingUser._id,
      status: "success",
    });

    if (existingUser.role !== "student" && !isvalidUser) {
      return res.status(400).json({ message: "User not verified" });
    }

    const token = jwt.sign(
      {
        data: {
          _id: existingUser._id.toString(),
        },
      },
      process.env.SECRET_KEY_JWT,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Sign In Success",
      data: {
        name: existingUser.name,
        email: existingUser.email,
        token,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
