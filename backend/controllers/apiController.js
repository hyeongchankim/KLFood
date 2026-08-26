const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dummyDataPath = path.resolve(__dirname, '../data/dummyData.json');
const usersFilePath = path.resolve(__dirname, '../data/users.json');
const mealPlansFilePath = path.resolve(__dirname, '../data/mealPlans.json');
const ordersFilePath = path.resolve(__dirname, '../data/orders.json');

// ponytail: hardcoded price map, move to dummyData.json lookup if menu options grow
// day-by-day calendar billing (A/B세트) keyed by the set letter
const PRICE_BY_SET = { A: 9500, B: 11500 };

const fallbackMenus = [
    { main: '매콤 제육볶음', side: '아삭아삭 연근조림', soup: '시원한 바지락 된장찌개' },
    { main: '순살 간장 닭갈비', side: '소고기 장조림', soup: '동원참치 미역국' },
    { main: '고등어 구이', side: '모둠두메산나물', soup: '싱글부대찌개' },
    { main: '한우곱창 볶음', side: '고추장소스진미채', soup: '바지락 된장찌개' },
];

const readMealPlans = () => {
    if (!fs.existsSync(mealPlansFilePath)) {
        fs.writeFileSync(mealPlansFilePath, JSON.stringify({}, null, 2));
    }
    return JSON.parse(fs.readFileSync(mealPlansFilePath, 'utf8'));
};

const writeMealPlans = (plans) => {
    fs.writeFileSync(mealPlansFilePath, JSON.stringify(plans, null, 2));
};

const pad2 = (n) => String(n).padStart(2, '0');

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

const readOrders = () => {
    if (!fs.existsSync(ordersFilePath)) {
        fs.writeFileSync(ordersFilePath, JSON.stringify([], null, 2));
    }
    return JSON.parse(fs.readFileSync(ordersFilePath, 'utf8'));
};

const writeOrders = (orders) => {
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
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
            isAdmin: false,
        };

        users.push(newUser);
        writeUsers(users);

        return res.status(201).json({
            success: true,
            token: `demo-token-${newUser.id}`,
            user: { id: newUser.id, name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin },
        });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: '회원가입 처리 중 오류가 발생했습니다.' });
    }
};

exports.getMealPlan = (req, res) => {
    const year = parseInt(req.query.year, 10);
    const month = parseInt(req.query.month, 10);

    if (!year || !month || month < 1 || month > 12) {
        return res.status(400).json({ message: '유효한 year, month 쿼리 파라미터가 필요합니다.' });
    }

    try {
        const plans = readMealPlans();
        const daysInMonth = new Date(year, month, 0).getDate();
        const days = {};

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${pad2(month)}-${pad2(day)}`;
            days[day] = plans[dateKey] || fallbackMenus[(day - 1) % fallbackMenus.length];
        }

        res.status(200).json({ year, month, days });
    } catch (error) {
        console.error('Get meal plan error:', error);
        res.status(500).json({ message: '식단표를 불러오는 중 오류가 발생했습니다.' });
    }
};

exports.upsertMealPlanDay = (req, res) => {
    const { date, main, side, soup } = req.body;

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({ message: 'date는 YYYY-MM-DD 형식이어야 합니다.' });
    }
    if (!main || !side || !soup) {
        return res.status(400).json({ message: 'main, side, soup을 모두 입력해 주세요.' });
    }

    try {
        const plans = readMealPlans();
        plans[date] = { main, side, soup };
        writeMealPlans(plans);
        res.status(200).json({ success: true, date, menu: plans[date] });
    } catch (error) {
        console.error('Upsert meal plan error:', error);
        res.status(500).json({ message: '식단표 저장 중 오류가 발생했습니다.' });
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
            user: { id: user.id, name: user.name, email: user.email, isAdmin: !!user.isAdmin },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: '로그인 처리 중 오류가 발생했습니다.' });
    }
};

// ponytail: token is just `demo-token-<userId>`, no expiry/signature — matches the rest of this app's auth, swap for real JWT if this ships beyond internal use
const getRequestingUser = (req) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace(/^Bearer\s+/i, '');
    const userId = token.startsWith('demo-token-') ? token.slice('demo-token-'.length) : null;
    if (!userId) return null;
    return readUsers().find((u) => u.id === userId) || null;
};

const requireAdmin = (req, res) => {
    const requester = getRequestingUser(req);
    if (!requester || !requester.isAdmin) {
        res.status(403).json({ message: '관리자만 이용할 수 있습니다.' });
        return null;
    }
    return requester;
};

exports.getUsers = (req, res) => {
    if (!requireAdmin(req, res)) return;
    const users = readUsers().map(({ password, ...safe }) => safe);
    res.status(200).json({ users });
};

exports.promoteUser = (req, res) => {
    if (!requireAdmin(req, res)) return;

    const users = readUsers();
    const target = users.find((u) => u.id === req.params.id);
    if (!target) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    target.isAdmin = true;
    writeUsers(users);

    const { password, ...safe } = target;
    res.status(200).json({ success: true, user: safe });
};

exports.createOrder = (req, res) => {
    const { name, phone, address, menuChoice, deliveryDays, entryAllowed, doorPassword } = req.body;

    if (!name || !phone || !address || !menuChoice) {
        return res.status(400).json({ message: '이름, 연락처, 주소, 선택 메뉴를 모두 입력해 주세요.' });
    }

    try {
        const orders = readOrders();
        const newOrder = {
            id: Date.now().toString(),
            name,
            phone,
            address,
            menuChoice,
            deliveryDays: deliveryDays || [],
            entryAllowed: entryAllowed || '',
            doorPassword: doorPassword || '',
            createdAt: new Date().toISOString(),
            calendar: {},
            payments: {},
        };
        orders.push(newOrder);
        writeOrders(orders);
        res.status(201).json({ success: true, order: newOrder });
    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({ message: '주문 저장 중 오류가 발생했습니다.' });
    }
};

exports.getOrders = (req, res) => {
    try {
        const orders = readOrders();
        res.status(200).json({ orders, prices: PRICE_BY_SET });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ message: '주문 목록을 불러오는 중 오류가 발생했습니다.' });
    }
};

// toggles a single calendar day between A / B / empty for one customer's month, mirroring the old excel sheet
exports.setDeliveryDay = (req, res) => {
    const { id } = req.params;
    const { month, day, value } = req.body;

    if (!/^\d{4}-\d{2}$/.test(month || '') || !day || !['A', 'B', null].includes(value)) {
        return res.status(400).json({ message: 'month(YYYY-MM), day, value(A/B/null)가 필요합니다.' });
    }

    try {
        const orders = readOrders();
        const order = orders.find((o) => o.id === id);
        if (!order) {
            return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        }

        order.calendar = order.calendar || {};
        order.calendar[month] = order.calendar[month] || {};
        if (value === null) {
            delete order.calendar[month][day];
        } else {
            order.calendar[month][day] = value;
        }
        writeOrders(orders);

        res.status(200).json({ success: true, calendar: order.calendar[month] });
    } catch (error) {
        console.error('Set delivery day error:', error);
        res.status(500).json({ message: '배달 캘린더 업데이트 중 오류가 발생했습니다.' });
    }
};

// clicking the same paid date again un-checks it, matching the requested "체크" (check on/off) UX
exports.setPaymentDate = (req, res) => {
    const { id } = req.params;
    const { month, date } = req.body;

    if (!/^\d{4}-\d{2}$/.test(month || '') || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
        return res.status(400).json({ message: 'month(YYYY-MM), date(YYYY-MM-DD)가 필요합니다.' });
    }

    try {
        const orders = readOrders();
        const order = orders.find((o) => o.id === id);
        if (!order) {
            return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        }

        order.payments = order.payments || {};
        const current = order.payments[month] || {};
        const alreadyPaidThisDate = current.paidAt === date;
        order.payments[month] = { ...current, paidAt: alreadyPaidThisDate ? undefined : date };
        writeOrders(orders);

        res.status(200).json({ success: true, payment: order.payments[month] });
    } catch (error) {
        console.error('Set payment date error:', error);
        res.status(500).json({ message: '입금일 업데이트 중 오류가 발생했습니다.' });
    }
};

exports.setPayerName = (req, res) => {
    const { id } = req.params;
    const { month, payerName } = req.body;

    if (!/^\d{4}-\d{2}$/.test(month || '')) {
        return res.status(400).json({ message: 'month(YYYY-MM)가 필요합니다.' });
    }

    try {
        const orders = readOrders();
        const order = orders.find((o) => o.id === id);
        if (!order) {
            return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        }

        order.payments = order.payments || {};
        order.payments[month] = { ...(order.payments[month] || {}), payerName: payerName || '' };
        writeOrders(orders);

        res.status(200).json({ success: true, payment: order.payments[month] });
    } catch (error) {
        console.error('Set payer name error:', error);
        res.status(500).json({ message: '입금인 업데이트 중 오류가 발생했습니다.' });
    }
};

// ponytail: mock send — no real email/SMS integration. Just marks as sent.
exports.sendInvoice = (req, res) => {
    const { id } = req.params;
    const { month } = req.body;

    if (!/^\d{4}-\d{2}$/.test(month || '')) {
        return res.status(400).json({ message: 'month(YYYY-MM)가 필요합니다.' });
    }

    try {
        const orders = readOrders();
        const order = orders.find((o) => o.id === id);
        if (!order) {
            return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
        }

        order.payments = order.payments || {};
        order.payments[month] = {
            ...(order.payments[month] || {}),
            invoiceSent: true,
            invoiceSentAt: new Date().toISOString(),
        };
        writeOrders(orders);

        res.status(200).json({ success: true, payment: order.payments[month] });
    } catch (error) {
        console.error('Send invoice error:', error);
        res.status(500).json({ message: '청구서 발송 중 오류가 발생했습니다.' });
    }
};
