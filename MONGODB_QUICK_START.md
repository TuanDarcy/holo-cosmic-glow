# ✅ MongoDB Setup - Hướng Dẫn Nhanh

## 📋 Bước 1: Điền Password MongoDB

Mở file `.env` tìm dòng:
```env
DATABASE_URL="mongodb+srv://tuandarcy:<DB_PASSWORD>@trackstat.mmri1ed.mongodb.net/?appName=Trackstat"
```

**Thay `<DB_PASSWORD>` bằng password từ MongoDB Atlas**

**Cách lấy password:**
1. Login: https://cloud.mongodb.com
2. Chọn cluster **trackstat**
3. Click **Connect** → **Drivers**
4. Copy connection string
5. Lấy mật khẩu từ đó

---

## 🚀 Bước 2: Chạy Setup

### Cách 1: Dùng script tự động (Khuyến nghị)
```bash
npm run setup-mongodb
```

### Cách 2: Chạy từng bước
```bash
# Tạo collections
npm run db:push

# Seed dữ liệu
npm run db:seed
```

---

## ✅ Kết Quả

Sau khi setup xong:

✅ **Database tạo thành công** ở MongoDB Atlas (trackstat)

✅ **Collections tạo:**
- User (Đăng nhập)
- Account (Quản lý tài khoản)
- Category (Danh mục)
- Transaction (Giao dịch)
- Order (Đơn hàng)
- Report (Báo cáo)
- Và 3 collections khác

✅ **Dữ liệu mẫu:**
- Admin: `admin` / `1`
- Member1: `member1` / `1`
- Member2: `member2` / `1`
- CTV: `ctv1` / `1`

---

## 📊 Kiểm Tra Database

```bash
# Xem dữ liệu trong Prisma Studio
npx prisma studio
```

Hoặc login https://cloud.mongodb.com để xem.

---

## 🔧 Các Lệnh Hữu Ích

```bash
# Tạo collections từ schema
npm run db:push

# Seed dữ liệu
npm run db:seed

# Xem database GUI
npx prisma studio

# Reset database (xóa tất cả)
npm run db:reset
```

---

## ⚠️ Nếu có lỗi

### Lỗi: "invalid username"
→ Copy lại connection string chính xác từ MongoDB

### Lỗi: "IP not whitelisted"
→ Đi MongoDB Atlas → Network Access → Add 0.0.0.0/0

### Lỗi: "wrong password"
→ Kiểm tra password đúng không, có ký tự đặc biệt không

---

## 🎉 Hoàn thành!

Khi database setup xong, báo cho tôi để:
- ✅ Build Express API (Login, Admin Panel, Orders)
- ✅ Build React Frontend (Login, Shopping, Admin Dashboard)
- ✅ Deploy lên production
