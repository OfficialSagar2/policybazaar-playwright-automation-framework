const { buildPayload } = require("./payloadBuilder");

async function getApiPremium(request, user) {

  const tokenResp = await request.post("https://uatapigw.tataaig.com/access-gateway/oauth2/token", {
    form: {
      grant_type: "client_credentials",
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
      "x-api-key": "eAVYIHwq772MdEfU7VAtXaZr7mnY0e6H9a4IigSN",
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