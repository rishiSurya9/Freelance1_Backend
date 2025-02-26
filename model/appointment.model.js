import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone_no: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    reason_of_visit: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
