import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import transactionModel from "../models/transactionModel.js";
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
          email: user.email
        },
        callback: {
          finish: finish
        }
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
        midtrans_payment_url: midtransResponse.redirect_url
      },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};
