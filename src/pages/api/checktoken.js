export default async function handler(req, res) {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ result: 'Missing required fields' });
    } else {
        return res.status(200).json({ valid: 'yes' })
    }
}