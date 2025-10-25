import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      'https://homelyhub-lhx9.onrender.com/api/v1/rent/listing',
      {
        params: req.query,
      }
    );
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
