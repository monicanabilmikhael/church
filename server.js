const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Database file path
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'deacons.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize DB file if not exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ deacons: [], nextId: 1 }, null, 2), 'utf8');
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ============ DATABASE HELPERS ============
function readDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading DB:', e);
    return { deacons: [], nextId: 1 };
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (e) {
    console.error('Error writing DB:', e);
    return false;
  }
}

// ============ API ROUTES ============

// GET all deacons
app.get('/api/deacons', (req, res) => {
  const db = readDB();
  res.json({ success: true, data: db.deacons });
});

// GET single deacon
app.get('/api/deacons/:id', (req, res) => {
  const db = readDB();
  const deacon = db.deacons.find(d => d.id === parseInt(req.params.id));
  if (!deacon) {
    return res.status(404).json({ success: false, error: 'الشماس غير موجود' });
  }
  res.json({ success: true, data: deacon });
});

// POST create deacon
app.post('/api/deacons', (req, res) => {
  const { fullName, birthDate, rank, ordinationDate, ordinationName, confessionFather, profession, mobile, residence } = req.body;

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ success: false, error: 'الاسم ثلاثي مطلوب' });
  }

  const db = readDB();
  const newDeacon = {
    id: db.nextId,
    fullName: fullName.trim(),
    birthDate: birthDate || '',
    rank: rank || '',
    ordinationDate: ordinationDate || '',
    ordinationName: ordinationName || '',
    confessionFather: confessionFather || '',
    profession: profession || '',
    mobile: mobile || '',
    residence: residence || '',
    createdAt: new Date().toISOString()
  };

  db.deacons.push(newDeacon);
  db.nextId++;

  if (writeDB(db)) {
    res.status(201).json({ success: true, data: newDeacon });
  } else {
    res.status(500).json({ success: false, error: 'خطأ في حفظ البيانات' });
  }
});

// PUT update deacon
app.put('/api/deacons/:id', (req, res) => {
  const { fullName, birthDate, rank, ordinationDate, ordinationName, confessionFather, profession, mobile, residence } = req.body;

  if (!fullName || !fullName.trim()) {
    return res.status(400).json({ success: false, error: 'الاسم ثلاثي مطلوب' });
  }

  const db = readDB();
  const index = db.deacons.findIndex(d => d.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'الشماس غير موجود' });
  }

  db.deacons[index] = {
    ...db.deacons[index],
    fullName: fullName.trim(),
    birthDate: birthDate || '',
    rank: rank || '',
    ordinationDate: ordinationDate || '',
    ordinationName: ordinationName || '',
    confessionFather: confessionFather || '',
    profession: profession || '',
    mobile: mobile || '',
    residence: residence || '',
    updatedAt: new Date().toISOString()
  };

  if (writeDB(db)) {
    res.json({ success: true, data: db.deacons[index] });
  } else {
    res.status(500).json({ success: false, error: 'خطأ في تحديث البيانات' });
  }
});

// DELETE deacon
app.delete('/api/deacons/:id', (req, res) => {
  const db = readDB();
  const index = db.deacons.findIndex(d => d.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ success: false, error: 'الشماس غير موجود' });
  }

  db.deacons.splice(index, 1);

  if (writeDB(db)) {
    res.json({ success: true, message: 'تم حذف الشماس بنجاح' });
  } else {
    res.status(500).json({ success: false, error: 'خطأ في حذف البيانات' });
  }
});

// Serve frontend for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ============ START ============
app.listen(PORT, '0.0.0.0', () => {
  console.log('');
  console.log('☦  بيانات شمامسة كنيسة العذراء');
  console.log('🌐 Server: http://localhost:' + PORT);
  console.log('📁 Database: ' + DB_FILE);
  console.log('');
});
