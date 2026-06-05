const fs = require('fs');
const path = require('path');

const dummyDataPath = path.join(__dirname, '../data/dummyData.json');

exports.handleB2BInquiry = (req, res) => {
    const { name, facilityType, phone, details } = req.body;
    console.log('Received B2B Inquiry:', { name, facilityType, phone, details });

    // In a real app, this would be saved to a database or sent via email.
    res.status(200).json({ success: true, message: 'Inquiry received successfully!' });
};

exports.getChamProducts = (req, res) => {
    fs.readFile(dummyDataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data));
    });
};
