// pages/cart.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface CartItem {
  _id: string;
  planName: string;
  price: number;
  travelFrom: string;
  travelTill: string;
  travellers: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("/api/cart");
        setCartItems(res.data.cartItems);
      } catch (err) {
        console.error("Failed to fetch cart", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) return <p>Loading cart...</p>;

  if (cartItems.length === 0) return <p>No items in cart yet.</p>;

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item._id}>
          <h2>{item.planName}</h2>
          <p>₹{item.price}</p>
          <p>
            {new Date(item.travelFrom).toDateString()} to{" "}
            {new Date(item.travelTill).toDateString()}
          </p>
          <p>Travellers: {item.travellers}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
