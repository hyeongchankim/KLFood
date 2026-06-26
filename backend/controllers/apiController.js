const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dummyDataPath = path.resolve(__dirname, '../data/dummyData.json');
const usersFilePath = path.resolve(__dirname, '../data/users.json');

const ensureUsersFile = () => {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
    }
};

const readUsers = () => {
    ensureUsersFile();
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
};

const writeUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

exports.handleB2BInquiry = (req, res) => {
    const { name, facilityType, phone, details } = req.body;
    console.log('Received B2B Inquiry:', { name, facilityType, phone, details });

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

exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: '이름, 이메일, 비밀번호를 모두 입력해 주세요.' });
    }

    try {
        const users = readUsers();
        const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return res.status(409).json({ message: '이미 사용 중인 이메일입니다.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: Date.now().toString(),
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        };

        users.push(newUser);
        writeUsers(users);

        return res.status(201).json({
            success: true,
            token: `demo-token-${newUser.id}`,
            user: { id: newUser.id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: '회원가입 처리 중 오류가 발생했습니다.' });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: '이메일과 비밀번호를 입력해 주세요.' });
    }

    try {
        const users = readUsers();
        const user = users.find((candidate) => candidate.email.toLowerCase() === email.toLowerCase());

        if (!user) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: '이메일 또는 비밀번호가 올바르지 않습니다.' });
        }

        return res.status(200).json({
            success: true,
            token: `demo-token-${user.id}`,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.' });
    }
};
