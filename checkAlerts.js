// functions/checkAlerts.js - Scheduled function to check for missed check-ins
exports.handler = async (event) => {
  // This will be triggered by a scheduled event (e.g., CRON job)
  const users = {
    'user123': {
      name: 'User Name',
      email: 'example@example.com',
      lastCheckin: process.env.LAST_CHECKIN_user123
    }
  };
  
  const now = new Date();
  const alertsToSend = [];
  
  // Check each user's last check-in
  for (const [userId, user] of Object.entries(users)) {
    if (user.lastCheckin) {
      const lastCheckinTime = new Date(user.lastCheckin).getTime();
      const hoursSinceLastCheckin = (now.getTime() - lastCheckinTime) / (1000 * 60 * 60);
      
      if (hoursSinceLastCheckin >= 24) {
        alertsToSend.push(user);
      }
    }
  }
  
  // Send alerts for users who haven't checked in
  for (const user of alertsToSend) {
    await sendEmailAlert(user);
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      success: true, 
      alertsSent: alertsToSend.length 
    })
  };
};

// Helper function to send email alerts
async function sendEmailAlert(user) {
  // Use SendGrid or Mailgun API to send the email
  const emailData = {
    to: ['alert1@example.com', 'alert2@example.com'],
    from: 'checkin-app@example.com',
    subject: `Alert: ${user.name} hasn't checked in for 24 hours`,
    text: `${user.name} hasn't checked in for over 24 hours. They may need assistance.`,
  };
  
  // In a real implementation, you would call the email API here
  console.log('Sending alert email:', emailData);
  
  // Integration with SendGrid would look like this:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // return sgMail.send(emailData);
}
