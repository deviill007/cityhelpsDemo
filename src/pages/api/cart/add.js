import dbConnect from '../../../backend/utils/dbConnect';
import Cart from '../../../backend/models/Cart';
import withAuth from "../../../backend/utils/withAuth";

const handler = async (req, res) => {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  await dbConnect();

  const { itineraryTitle, price, dateFrom, dateTo, noOfTravellers, adults, children } = req.body;

  if (!itineraryTitle || !price || !dateFrom || !dateTo || !noOfTravellers) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const cartItem = await Cart.create({
      user: req.user._id,
      itineraryTitle,
      price,
      dateFrom,
      dateTo,
      noOfTravellers,
      adults,
      children,
    });

    return res.status(201).json({ message: "Added to cart", cartItem });
  } catch (err) {
    console.error("Cart add error:", err);
    return res.status(500).json({ message: "Failed to add to cart" });
  }
};

export default withAuth(handler);
