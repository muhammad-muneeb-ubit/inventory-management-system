# 📋 **API RESPONSE DOCUMENTATION**

## 🗂️ **Controllers Overview:**

- **auth.js** - Authentication operations
- **product.js** - Product management
- **user.js** - User management
- **report.js** - PDF report generation

---

## 📤 **COMPLETE API RESPONSE PATTERNS**

### 🔐 **AUTH CONTROLLER** (`/api/auth`)

#### **1. SIGNUP**

**Endpoint:** `POST /api/auth/signup`

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Success Response (201):**

```json
{
  "status": true,
  "message": "Signup successful. Waiting for admin approval.",
  "user": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "password": "hashed_password", // ⚠️ SECURITY ISSUE
    "role": "user",
    "status": "pending",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Validation Error (200):** ⚠️ _Should be 400_

```json
{
  "status": false,
  "message": "All fields are required, and email must be valid and password should be of minimum 6 characters",
  "user": null
}
```

**User Already Exists (200):** ⚠️ _Should be 409_

```json
{
  "status": false,
  "message": "User already exists with this email",
  "user": null
}
```

**Server Error (500):**

```json
{
  "message": "Error details...",
  "status": false
}
```

---

#### **2. LOGIN**

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Success Response (200):**

```json
{
  "message": "USER SUCCESSFULLY LOGIN",
  "data": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "password": "hashed_password", // ⚠️ SECURITY ISSUE
    "role": "user|admin",
    "status": "pending|approved|rejected",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "status": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Invalid Credentials (200):** ⚠️ _Should be 401_

```json
{
  "message": "INVALID EMAIL OR PASSWORD",
  "status": false
}
```

**Server Error (200):** ⚠️ _Should be 500_

```json
{
  "message": "INVALID EMAIL OR PASSWORD!",
  "status": false
}
```

---

### 📦 **PRODUCT CONTROLLER** (`/api/product`)

#### **1. ADD PRODUCT**

**Endpoint:** `POST /api/product`
**Authentication:** Required
**Authorization:** Approved users only

**Request Body:**

```json
{
  "name": "string",
  "price": "number",
  "quantity": "number",
  "itemId": "string"
}
```

**Success Response (201):**

```json
{
  "status": true,
  "message": "Product added successfully",
  "product": {
    "_id": "ObjectId",
    "name": "string",
    "price": 0,
    "quantity": 0,
    "itemId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Server Error (500):**

```json
{
  "status": false,
  "message": "Failed to add product",
  "error": "Detailed error message"
}
```

---

#### **2. GET ALL PRODUCTS**

**Endpoint:** `GET /api/product`
**Authentication:** Required
**Authorization:** Approved users only

**Success Response (200):**

```json
{
  "status": true,
  "message": "Products fetched successfully",
  "products": [
    {
      "_id": "ObjectId",
      "name": "string",
      "price": 0,
      "quantity": 0,
      "itemId": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

**Server Error (500):**

```json
{
  "status": false,
  "message": "Failed to retrieve products",
  "error": "Detailed error message"
}
```

---

#### **3. GET SINGLE PRODUCT**

**Endpoint:** `GET /api/product/:id`
**Authentication:** Required
**Authorization:** Approved users only

**Success Response (200):**

```json
{
  "status": true,
  "message": "Product fetched successfully",
  "product": {
    "_id": "ObjectId",
    "name": "string",
    "price": 0,
    "quantity": 0,
    "itemId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Not Found (404):**

```json
{
  "status": false,
  "message": "Product not found"
}
```

**Server Error (500):**

```json
{
  "status": false,
  "message": "Failed to retrieve product",
  "error": "Detailed error message"
}
```

---

#### **4. UPDATE PRODUCT**

**Endpoint:** `PUT /api/product/:id`
**Authentication:** Required
**Authorization:** Approved users only

**Request Body:**

```json
{
  "name": "string (optional)",
  "price": "number (optional)",
  "quantity": "number (optional)",
  "itemId": "string (optional)"
}
```

**Success Response (200):**

```json
{
  "status": true,
  "message": "Product updated successfully",
  "product": {
    "_id": "ObjectId",
    "name": "string",
    "price": 0,
    "quantity": 0,
    "itemId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Not Found (404):**

```json
{
  "status": false,
  "message": "Product not found"
}
```

**Server Error (500):**

```json
{
  "status": false,
  "message": "Failed to update product",
  "error": "Detailed error message"
}
```

---

#### **5. DELETE PRODUCT**

**Endpoint:** `DELETE /api/product/:id`
**Authentication:** Required
**Authorization:** Approved users only

**Success Response (200):**

```json
{
  "status": true,
  "message": "Product deleted successfully",
  "product": {
    "_id": "ObjectId",
    "name": "string",
    "price": 0,
    "quantity": 0,
    "itemId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Not Found (404):**

```json
{
  "status": false,
  "message": "Product not found"
}
```

**Server Error (500):**

```json
{
  "status": false,
  "message": "Failed to delete product",
  "error": "Detailed error message"
}
```

---

### 👥 **USER CONTROLLER** (`/api/user`)

#### **1. GET ALL USERS**

**Endpoint:** `GET /api/user`
**Authentication:** Required (Admin only)

**Success Response (200):**

```json
{
  "message": "Users fetched successfully",
  "status": true,
  "users": [
    {
      "_id": "ObjectId",
      "name": "string",
      "email": "string",
      "password": "hashed_password", // ⚠️ SECURITY ISSUE
      "role": "user|admin",
      "status": "pending|approved|rejected",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

**No Users Found (404):**

```json
{
  "message": "No users found",
  "status": false
}
```

**Server Error (500):**

```json
{
  "message": "Error details...",
  "status": false
}
```

---

#### **2. GET SINGLE USER**

**Endpoint:** `GET /api/user/single/:id`
**Authentication:** Required

**Success Response (200):**

```json
{
  "message": "User fetched successfully",
  "status": true,
  "user": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "password": "hashed_password", // ⚠️ SECURITY ISSUE
    "role": "user|admin",
    "status": "pending|approved|rejected",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Not Found (404):**

```json
{
  "message": "User not found",
  "status": false
}
```

**Server Error (500):**

```json
{
  "message": "Error details...",
  "status": false
}
```

---

#### **3. APPROVE USER**

**Endpoint:** `PATCH /api/user/approve/:id`
**Authentication:** Required (Admin only)

**Success Response (200):**

```json
{
  "message": "User approved successfully, email sent",
  "status": true,
  "user": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "role": "user|admin",
    "status": "approved",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Already Approved (400):**

```json
{
  "message": "User is already approved",
  "status": false
}
```

**Not Found (404):**

```json
{
  "message": "User not found",
  "status": false
}
```

**Server Error (500):**

```json
{
  "message": "Error details...",
  "status": false
}
```

---

#### **4. REJECT USER**

**Endpoint:** `PATCH /api/user/reject/:id`
**Authentication:** Required (Admin only)

**Success Response (200):**

```json
{
  "message": "User rejected successfully, email sent",
  "status": true,
  "user": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "role": "user|admin",
    "status": "rejected",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Not Found (404):**

```json
{
  "message": "User not found",
  "status": false
}
```

**Server Error (500):**

```json
{
  "message": "Error details...",
  "status": false
}
```

---

#### **5. UPDATE USER PROFILE**

**Endpoint:** `PUT /api/user/:id`
**Authentication:** Required

**Request Body:**

```json
{
  "name": "string (optional)",
  "email": "string (optional)",
  "role": "user|admin (optional)"
}
```

**Success Response (200):**

```json
{
  "status": true,
  "message": "User profile updated successfully",
  "user": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "role": "user|admin",
    "status": "pending|approved|rejected",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Not Found (404):**

```json
{
  "status": false,
  "message": "User not found"
}
```

**Server Error (500):**

```json
{
  "status": false,
  "message": "Error details..."
}
```

---

#### **6. DELETE USER**

**Endpoint:** `DELETE /api/user/:id`
**Authentication:** Required (Admin only)

**Success Response (200):**

```json
{
  "message": "User deleted successfully",
  "status": true,
  "user": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "role": "user|admin",
    "status": "pending|approved|rejected",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Not Found (404):**

```json
{
  "message": "User not found",
  "status": false
}
```

**Server Error (500):**

```json
{
  "message": "Error details...",
  "status": false
}
```

---

#### **7. GET PENDING USERS**

**Endpoint:** `GET /api/user/pending`
**Authentication:** Required (Admin only)

**Success Response (200):**

```json
{
  "status": true,
  "users": [
    {
      "_id": "ObjectId",
      "name": "string",
      "email": "string",
      "role": "user|admin",
      "status": "pending",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

**No Pending Users (404):**

```json
{
  "status": false,
  "message": "No pending users found"
}
```

**Server Error (500):**

```json
{
  "status": false,
  "message": "Error details..."
}
```

---

#### **8. CHANGE USER ROLE**

**Endpoint:** `PATCH /api/user/role/:id`
**Authentication:** Required (Admin only)

**Success Response (200):**

```json
{
  "status": true,
  "message": "User role updated successfully",
  "user": {
    "_id": "ObjectId",
    "name": "string",
    "email": "string",
    "role": "user|admin", // Role toggled
    "status": "pending|approved|rejected",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Not Found (404):**

```json
{
  "status": false,
  "message": "User not found"
}
```

**Server Error (500):**

```json
{
  "status": false,
  "message": "Error details..."
}
```

---

### 📊 **REPORT CONTROLLER** (`/api`)

#### **1. GENERATE STOCK REPORT**

**Endpoint:** `GET /api/stock-report`
**Query Parameters:** `?filter=true` (optional - for low stock items only)
**Authentication:** Required

**Success Response (200):**

- **Content-Type:** `application/pdf`
- **Content-Disposition:** `attachment; filename=HydraFoods_Stock_Report.pdf`
- **Response Body:** PDF file stream

**No Products Found (404):**

```json
{
  "message": "No products found",
  "status": false
}
```

**Server Error (500):**

```json
{
  "message": "Error details...",
  "status": false
}
```

---

