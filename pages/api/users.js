// pages/api/users.js

import { getConnection } from '../../utils/db';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const connection = await getConnection();
            const [rows] = await connection.query('SELECT * FROM users');
            connection.release();
            res.status(200).json(rows);
        } catch (error) {
            console.error('Hata:', error.message);
            res.status(500).json({ error: 'Sunucu hatası' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
