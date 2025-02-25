// functions/checkin.js - Records user check-ins
exports.handler = async (event) => {
  // Parse the request body
  const data = JSON.parse(event.body);
  const timestamp = data.timestamp;
  const userId = data.userId;
  
  // Store in Netlify environment variable or database
  // This is a simplified example - in practice, use a database
  process.env[`LAST_CHECKIN_${userId}`] = timestamp;
  
  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: "Check-in recorded" })
  };
};
