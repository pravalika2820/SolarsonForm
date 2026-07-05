import express from 'express';
import cors from 'cors';
import pool from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Solarson Backend Running');
});
pool.query('SELECT NOW()')
  .then(res => console.log('DB Connected Successfully'))
  .catch(err => console.error('DB Connection Error:', err));
app.post('/api/enquiry', async (req, res) => {
  console.log("POST HIT");
  console.log(req.body);

  try {
    const {
      customerName,
      phoneNumber,
      powerBill,
      propertyType,
      street,
      district,
      callSlot,
    } = req.body;

    const query = `
      INSERT INTO userdetails (
        customer_name,
        phone_number,
        power_bill,
        property_type,
        street,
        district,
        call_slot
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      customerName,
      phoneNumber,
      powerBill,
      propertyType,
      street,
      district,
      callSlot,
    ];

    const result = await pool.query(query, values);

    res.status(201).json({
      success: true,
      message: 'Enquiry saved successfully',
      data: result.rows[0],
    });

  } catch (error) {
    console.error('Insert Error:', error);
    console.error('Error Message:', error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

const PORT =5000;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});