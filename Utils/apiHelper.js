const { buildPayload } = require("./payloadBuilder");
require('dotenv').config();

async function getApiPremium(request, user) {

  const tokenResp = await request.post("https://uatapigw.tataaig.com/access-gateway/oauth2/token", {
    form: {
      grant_type: process.env.GRANT_TYPE,
      scope: process.env.SCOPE,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    }
  });

  const tokenJson = await tokenResp.json();
  const token = tokenJson.access_token;
  
  const payload = buildPayload(user);

  const quoteResp = await request.post("https://uatapigw.tataaig.com/travelapi/v1/quote-compose", {
    data: payload,
    headers: {
      Authorization: `Bearer ${token}`,
      "x-api-key": process.env.X_API_KEY,
      "Content-Type": "application/json",
    }
  });

  const quoteData = await quoteResp.json();

  console.log("API RESPONSE:", JSON.stringify(quoteData, null, 2));

  if (!quoteData || !quoteData.data) {
    throw new Error("Invalid API response");
  }

  let premium;

  // ✅ Handle both cases safely
  if (Array.isArray(quoteData.data)) {
    if (quoteData.data.length === 0) {
      throw new Error("No data returned from API");
    }
    premium = quoteData.data[0].total_premium;
  } else {
    premium = quoteData.data.total_premium;
  }

  // ❌ Final validation
  if (!premium) {
    throw new Error("Premium not found");
  }

  return Number(premium);
}

module.exports = { getApiPremium };