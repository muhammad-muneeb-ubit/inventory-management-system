export const approvalEmailTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; background: #f8f9fa; padding: 30px;">
    <div style="max-width: 600px; background: #ffffff; margin: auto; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
        <h2>🎉 Hydra Foods</h2>
      </div>
      <div style="padding: 30px;">
        <h3>Hi ${name},</h3>
        <p>We’re happy to inform you that your account has been <b style="color: green;">approved</b> by our admin team.</p>
        <p>You can now log in and access your dashboard.</p>
       
        <p style="margin-top: 20px;">If you have any questions, feel free to contact us.</p>
      </div>
      <div style="background-color: #f1f1f1; padding: 10px; text-align: center; color: #555;">
        © 2025 Hydra Foods. All Rights Reserved.
      </div>
    </div>
  </div>
`;

export const rejectionEmailTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; background: #f8f9fa; padding: 30px;">
    <div style="max-width: 600px; background: #ffffff; margin: auto; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #dc3545; color: white; padding: 20px; text-align: center;">
        <h2>⚠️ Hydra Foods</h2>
      </div>
      <div style="padding: 30px;">
        <h3>Dear ${name},</h3>
        <p>We regret to inform you that your account request has been <b style="color: red;">rejected</b>.</p>
        <p>If you believe this was a mistake, please reach out to our support team for assistance.</p>
        <a href="mailto:info@hydrafoods.com"
          style="display: inline-block; padding: 10px 20px; background-color: #dc3545; color: white; text-decoration: none; border-radius: 5px;">
          Contact Support
        </a>
      </div>
      <div style="background-color: #f1f1f1; padding: 10px; text-align: center; color: #555;">
        © 2025 Hydra Foods. All Rights Reserved.
      </div>
    </div>
  </div>
`;

export const newUserSignupTemplate = (user) => `
  <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 30px;">
    <div style="max-width: 600px; background: #ffffff; margin: auto; border-radius: 10px; overflow: hidden;">
      <div style="background-color: #17a2b8; color: white; padding: 20px; text-align: center;">
        <h2>👤 New User Registration Alert</h2>
      </div>
      <div style="padding: 30px;">
        <h3>Dear Admin,</h3>
        <p>A new user has just registered on <b>Hydra Foods Inventory System</b> and is awaiting your approval.</p>
        <p><b>User Details:</b></p>
        <ul style="line-height: 1.6;">
          <li><b>Name:</b> ${user.name}</li>
          <li><b>Email:</b> ${user.email}</li>
          <li><b>Registered On:</b> ${new Date(user.createdAt).toLocaleString()}</li>
          <li><b>Status:</b> Pending Approval</li>
        </ul>
        <p>Please review and take action from your admin dashboard.</p>
      
      </div>
      <div style="background-color: #f1f1f1; padding: 10px; text-align: center; color: #555;">
        © 2025 Hydra Foods. All Rights Reserved.
      </div>
    </div>
  </div>
`;

//  <a href="http://localhost:3000/login"
//           style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
//           Login Now
//         </a>


  // <a href="http://localhost:3000/admin-dashboard"
        //    style="display: inline-block; padding: 10px 20px; background-color: #17a2b8; color: white;
        //           text-decoration: none; border-radius: 5px;">
        //   Review User
        // </a>