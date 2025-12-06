# 🔐 Test Credentials - Development Mode

## 🎯 Auto-Accept OTP System

**In development mode, ANY 6-digit OTP will be accepted.**

You can use any phone number and any 6-digit code like:
- `123456`
- `000000`
- `999999`

The system will:
1. ✅ Accept any valid Indian phone number format (+91XXXXXXXXXX)
2. ✅ Auto-create a user account if it doesn't exist
3. ✅ Accept any 6-digit OTP code
4. ✅ Log you in automatically

---

## 📱 Test Phone Numbers (Pre-seeded)

### 👤 PATIENTS

Use these for patient login (`/patient/login`):

| Phone | Name | Condition |
|-------|------|-----------|
| `+919876543210` | Admin User | N/A |
| **Any other +91 number** | Auto-created | General Wellness |

**Example Patient Numbers:**
- `9876543211` (type without +91)
- `9876543212`
- `9876543213`
- `8888888888`
- `7777777777`

### 👨‍⚕️ PROVIDERS (Pre-seeded)

The seed script created 5 providers. To login as provider, use:

**Provider Phone Pattern:** Numbers containing `9123` are auto-detected as providers

| Phone | Name | Service Area | Badge |
|-------|------|--------------|-------|
| `+919123456789` | Provider 1 | Faridabad | LEVEL_3 |
| `+919123456790` | Provider 2 | Delhi | LEVEL_2 |
| `+919123456791` | Provider 3 | Gurgaon | VERIFIED |

**Or use any number with `9123` pattern:**
- `9123111111`
- `9123222222`
- `9123333333`

### 🔐 ADMIN

For admin dashboard (`/admin/login`):

**Email:** `admin@accucentral.com`  
**Password:** `admin123`  
**Phone:** `+919876543210`

---

## 🚀 Quick Test Scenarios

### Scenario 1: Patient Books Service
1. Go to `http://localhost:3000/patient/book`
2. Click "Book Now" on any service
3. Login with: `9876543211`
4. OTP: `123456` (or any 6 digits)
5. Complete booking flow

### Scenario 2: Provider Views Dashboard
1. Go to `http://localhost:3000/provider/login`
2. Phone: `9123456789` (or any with `9123`)
3. OTP: `000000` (or any 6 digits)
4. View today's bookings

### Scenario 3: Admin Manages System
1. Go to `http://localhost:3000/admin/login`
2. Email: `admin@accucentral.com`
3. Password: `admin123`
4. View dashboard and manage bookings

---

## 🎨 UI Testing Tips

### Phone Number Format
The UI accepts 10-digit numbers (without +91):
- Type: `9876543210` ✅
- NOT: `+919876543210` (added automatically)

### OTP Entry
Any 6-digit code works:
- `123456` ✅
- `000000` ✅
- `999999` ✅
- `abcdef` ❌ (must be numbers)

### Auto-Create Feature
If you use a new phone number:
- **Pattern with `9123`** → Creates PROVIDER account
- **Any other pattern** → Creates PATIENT account

Example:
- `9123999999` → New provider "Test Provider 9999"
- `8888888888` → New patient "Test Patient 8888"

---

## 🔧 How It Works (Dev Mode)

### 1. Send OTP (`/api/auth/send-otp`)
```json
{
  "phone": "+919876543210"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent successfully (DEV MODE: Use any 6-digit code)",
  "otp": "123456"
}
```

### 2. Verify OTP (`/api/auth/verify-otp`)
```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful (DEV MODE)",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "userId": "...",
    "phone": "+919876543210",
    "role": "PATIENT",
    "patient": { ... }
  }
}
```

### 3. Auto-Create Logic
- ✅ New phone detected
- ✅ Checks pattern (9123 = provider, else patient)
- ✅ Creates User + Profile
- ✅ Returns JWT token
- ✅ Logs in automatically

---

## 📊 Database Status

After running `npx tsx prisma/seed.ts`:

✅ **1 Admin User**  
✅ **5 Providers** (Faridabad, Delhi, Gurgaon, Noida)  
✅ **3 Services** (Tech-Neck ₹299, Migraine ₹499, Senior ₹449)  
✅ **2 Patients** with packages  
✅ **10 Bookings** (9 completed, 1 pending)  
✅ **9 Pain Score entries**  

---

## 🎯 Production vs Development

| Feature | Development | Production |
|---------|-------------|------------|
| OTP Validation | Any 6 digits ✅ | Real OTP required |
| Auto-Create Users | Yes ✅ | No - must register |
| OTP in Response | Yes (visible) | No (sent via SMS) |
| Phone Check | Skipped | Database lookup |
| SMS Sending | Console log | Real SMS gateway |

---

## 🚨 Important Notes

1. **Development Only**: This auto-accept behavior only works when `NODE_ENV=development`
2. **Real Fields**: All forms still require proper 10-digit Indian phone numbers
3. **Realistic UX**: Users see the same flow as production (just OTP auto-accepts)
4. **Auto-Seed**: Database has realistic test data from seed script
5. **Safe Testing**: No production data affected, all local database

---

## 🎉 Ready to Test!

All UIs are now accessible with any phone number and any 6-digit OTP.

**Quick Access URLs:**
- Patient Booking: `http://localhost:3000/patient/book`
- Provider Login: `http://localhost:3000/provider/login`
- Admin Dashboard: `http://localhost:3000/admin/login`
- Main Site: `http://localhost:3000`

**Just use:**
- Any 10-digit phone number
- Any 6-digit OTP
- Login and explore! 🚀
