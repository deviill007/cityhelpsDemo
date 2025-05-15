import { Schema, model, models, Types } from "mongoose";

const cartSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: "User", required: true },
    itineraryTitle: { type: String, required: true },
    price: { type: Number, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    noOfTravellers: { type: Number, required: true },
    adults: { type: Number, default: 0 },
    children: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Cart || model("Cart", cartSchema);
