const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let bookings = [];

app.post("/api/bookings", (req, res) => {
  const { date, time, guests, name, contact } = req.body;

  const existingBooking = bookings.find(
    (booking) => booking.date === date && booking.time === time
  );
  if (existingBooking) {
    return res.status(400).json({ success: false, message: "Time slot already booked." });
  }

  bookings.push({ date, time, guests, name, contact });
  res.status(200).json({ success: true, message: "Booking successful!" });
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
