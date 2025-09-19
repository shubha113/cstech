import mongoose from "mongoose";

const listSchema = new mongoose.Schema(
  {
    agentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    items: [
      {
        firstName: {
          type: String,
          required: [true, "Please enter first name"],
          trim: true,
        },
        phone: {
          type: String,
          required: [true, "Please enter Phone number"],
        },
        notes: {
          type: String,
          required: [true, "Please enter notes"],
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("List", listSchema);
