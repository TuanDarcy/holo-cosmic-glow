# 📚 MongoDB Setup Instructions

## 1️⃣ Update MongoDB Connection String

Mở file `.env` và cập nhật password:

```env
DATABASE_URL="mongodb+srv://tuandarcy:<YOUR_PASSWORD>@trackstat.mmri1ed.mongodb.net/?appName=Trackstat"
```

**Thay `<YOUR_PASSWORD>` bằng password MongoDB Atlas của bạn**

---

## 2️⃣ Create Collections & Database

Sau khi điền password, chạy:

```bash
npx prisma db push
```

Lệnh này sẽ:
- ✅ Kết nối MongoDB Atlas
- ✅ Tạo database `Trackstat`
- ✅ Tạo các collections: User, Account, Category, Transaction, etc.

---

## 3️⃣ Seed Initial Data (Admin User)

Chạy seed script để tạo admin user:

```bash
npx tsx prisma\seed.ts
```

**Kết quả:**
- ✅ Admin user: `admin` / `1`
- ✅ Member users: `member1`, `member2`
- ✅ CTV user: `ctv1`
- ✅ Sample transactions & orders

---

## 4️⃣ Verify Collections in MongoDB

1. Login: https://cloud.mongodb.com/v2
2. Đi tới cluster **trackstat**
3. Chọn **Collections**
4. Xem các collections đã tạo

---

## 5️⃣ Create API Backend

Setup Express.js API để:
- ✅ Login / Signup
- ✅ Admin Panel
- ✅ Manage Users, Orders, Transactions
- ✅ Real-time Reports

---

## 📋 Collection Schema

| Collection | Purpose |
|-----------|---------|
| **User** | Đăng nhập, vai trò (admin/member/ctv), số dư |
| **Account** | Quản lý tài khoản (admin tạo) |
| **Category** | Phân loại sản phẩm |
| **Transaction** | Lịch sử nạp/rút tiền |
| **BalanceHistory** | Lịch sử thay đổi số dư |
| **Order** | Đơn hàng |
| **OrderItem** | Chi tiết đơn hàng |
| **Report** | Báo cáo doanh thu hàng ngày |
| **PaymentMethod** | Phương thức thanh toán |

---

## ✅ Test Data Created:

```json
{
  "admin": {
    "username": "admin",
    "password": "1",
    "role": "ADMIN",
    "balance": 1000000
  },
  "member1": {
    "username": "member1", 
    "password": "1",
    "role": "MEMBER",
    "balance": 50000
  },
  "member2": {
    "username": "member2",
    "password": "1", 
    "role": "MEMBER",
    "balance": 100000
  }
}
```

---

## 🚀 Next Steps

1. ✅ Setup .env với MongoDB
2. ✅ Chạy `npx prisma db push`
3. ✅ Chạy `npx tsx prisma/seed.ts`
4. 🟡 **Bạn ở đây** - Verify database created
5. ⏳ Tạo Express Backend API
6. ⏳ Tạo Login UI (React)
7. ⏳ Tạo Admin Panel

---

## ❓ Troubleshooting

### Lỗi: "Authentication failed"
- Kiểm tra password đúng không (copy từ MongoDB Atlas)
- Kiểm tra IP whitelist trong MongoDB (bổ sung 0.0.0.0/0)

### Lỗi: "Database not found"
- Chạy `npx prisma db push` để tạo
- Kiểm tra connection string

### Muốn reset database?
```bash
# Delete all data
npx prisma db execute --stdin < ./prisma/reset.sql

# Hoặc create new collection
npx prisma db push --force-reset
```

---

## 📞 Liên hệ

Khi hoàn thành mọi bước, báo cho tôi để bắt đầu tạo API backend!
