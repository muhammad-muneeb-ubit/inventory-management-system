const apiEndPoints = {
  login: "/auth/login",
  signup: "/auth/signup",
  createProduct: "/product",
  createUser: "/auth/signup",
  allProducts: "/product",
  allUsers: "/user",
  deleteProduct: (id) => `/product/${id}`,
  deleteUser: (id) => `/user/${id}`,
  pendingUsers: "/user/pending",
  changeRole: (id) => `/user/change-role/${id}`,
  approveUser: (id) => `/user/approve/${id}`,
  rejectUser: (id) => `/user/reject/${id}`,
  updateUser: (id) => `/user/${id}`, 
  updateProduct: (id) => `/product/${id}`,
  stockReport: "/report/stock",
  lowstockReport: "/report/stock?filter=10",


  
  // updateUser: (id) => `/user/${id}`,
  // approveUser: (id) => `/auth/approve-user/${id}`,
  // userProfile: "/auth/profile",
  // updateProfile: "/auth/update-profile",
  // rejectUser: (id) => `/auth/reject-user/${id}`,
};

export default apiEndPoints;
