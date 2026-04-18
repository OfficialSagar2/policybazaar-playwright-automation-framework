const { test, expect } = require("@playwright/test");
const QuotePayload  = require("../../Utils//QuotePayload.json");
require('dotenv').config();

test("@api API Testing", async ({ request }) => 
{
  const tokenResp = await request.post("https://uatapigw.tataaig.com/access-gateway/oauth2/token",
    {
      form: 
      {
        grant_type: "client_credentials",
        scope: process.env.SCOPE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET
      }
    }
  );

  const body = await tokenResp.text();
  console.log("Status:", tokenResp.status());
  console.log("Body:", body);

  const toknrsp = await tokenResp.json();
  const token = toknrsp.access_token;
  // console.log(token);
  expect(tokenResp.status()).toBe(200);

    const quoteResp = await request.post("https://uatapigw.tataaig.com/travelapi/v1/quote-compose",
      {
        data: QuotePayload,
        headers: 
        {
          Authorization: `Bearer ${token}`,
          "x-api-key": "eAVYIHwq772MdEfU7VAtXaZr7mnY0e6H9a4IigSN",
          "Content-Type": "application/json",
        }
      })

    expect(quoteResp.status()).toBe(200);
    const quoteData = await quoteResp.json();
    console.log(quoteData);

    const apiPremiums = quoteData.data.map(item => item.total_premium);
    console.log("API premium:", apiPremiums[0]);
    //return quoteData.data[0].total_premium;
});