// pages/api/cart/index.js
import dbConnect from "../../../backend/utils/dbConnect";
import withAuth from "../../../backend/utils/withAuth";
import Cart from "../../../backend/models/Cart";

const handler = async (req, res) => {
  await dbConnect();

  const { user } = req;

  const cartItems = await Cart.find({ user: user._id }).sort("-createdAt");

  res.status(200).json({ cartItems });
};

export default withAuth(handler);
