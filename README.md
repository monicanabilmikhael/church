# ☦ بيانات شمامسة كنيسة العذراء

مشروع كامل (Full Stack) لإدارة بيانات الشمامسة.  
البيانات محفوظة للأبد — مش بتتمسح لما تعمل refresh أو تقفل المتصفح.

---

## 📁 ملفات المشروع

```
deacons-app/
├── server.js          ← السيرفر (Backend + API)
├── package.json       ← إعدادات المشروع
├── render.yaml        ← إعدادات النشر على Render
├── .gitignore
├── data/
│   └── deacons.json   ← قاعدة البيانات
└── public/
    └── index.html     ← الواجهة (Frontend)
```

---

## 🚀 النشر على Render.com (مجاني + البيانات محفوظة للأبد)

### الخطوة 1: أنشئ حساب GitHub
1. اذهب إلى **https://github.com/signup**
2. أنشئ حساب (أو سجل دخول لو عندك حساب)

### الخطوة 2: ارفع المشروع على GitHub
1. اذهب إلى **https://github.com/new**
2. **Repository name**: اكتب `deacons-database`
3. اختر **Public**
4. اضغط **Create repository**
5. في الصفحة اللي هتظهر، اضغط **"uploading an existing file"**
6. **اسحب كل الملفات** من مجلد deacons-app وأفلتها
   - ⚠️ مهم: ارفع الملفات نفسها مش المجلد! يعني ارفع server.js و package.json و render.yaml و .gitignore ومجلد public ومجلد data
7. اضغط **Commit changes**

### الخطوة 3: انشر على Render
1. اذهب إلى **https://render.com**
2. اضغط **Get Started** وسجل **بحساب GitHub**
3. اضغط **New +** ثم **Web Service**
4. اختر مستودع **deacons-database**
5. الإعدادات:
   - **Name**: `deacons-database`
   - **Region**: Frankfurt (أقرب لمصر)
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. اختر **Free** plan
7. اضغط **Advanced** ثم **Add Disk**:
   - **Name**: `deacons-data`
   - **Mount Path**: `/data`
   - **Size**: `1` GB
8. اضغط **Add Environment Variable**:
   - **Key**: `DATA_DIR`
   - **Value**: `/data`
9. اضغط **Create Web Service**
10. انتظر 2-3 دقايق حتى يظهر ✅ **Live**
11. هتلاقي الرابط في أعلى الصفحة مثل:
    ```
    https://deacons-database.onrender.com
    ```
12. **ابعت الرابط ده لكل شمامسة الكنيسة!** 🎉

---

## 💻 تشغيل محلي (على جهازك)

```bash
# 1. حمّل Node.js من https://nodejs.org

# 2. افتح Terminal وادخل المجلد
cd deacons-app

# 3. ثبّت المكتبات
npm install

# 4. شغّل
npm start

# 5. افتح المتصفح على
# http://localhost:3000
```

---

## ❓ مشاكل شائعة

**"Not Found" لما بفتح اللينك**
→ تأكد إن الملفات اترفعت صح على GitHub (server.js و package.json و مجلد public لازم يكونوا في الـ root مش جوه مجلد تاني)

**البيانات بتتمسح بعد كل deploy**
→ تأكد إنك أضفت Disk في إعدادات Render مع `DATA_DIR=/data`

**السيرفر مش بيشتغل**
→ اذهب لـ Logs في Render وابعتلي صورة من الخطأ
