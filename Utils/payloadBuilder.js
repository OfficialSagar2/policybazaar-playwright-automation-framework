
function buildPayload(user) 
{
  return {
    selected_plan: "Silver",
    selected_product: "TATA AIG Travel Insurance - International plus",
    application_date: "04/16/2026",
    departure_date: "04/21/2026",
    return_date_single: "04/30/2026",
    selected_zone: "Worldwide Including USA/Canada",
    policy_type: "Without Sublimit",
    product_id: "M100000000028",
    member_count: 1,
    dob_1: "01/01/2004",
    triptype: "Single Trip",
    tripdays: "",
    selected_Country_lists: [mapCountry(user.countryName)],
    email:user.email,
    mobile_no: user.MobNo,
    office_location: "MUMBAI",
    visa_type: "Non Immigrant",
    purpose_of_trip:"Business"
  };
}

function mapCountry(country) {
  const countryMap = {
    "United States of America": "USA",
    "Canada": "CANADA",
    "Iran": "IRAN"
  };

  return countryMap[country] || country.toUpperCase();
}


module.exports = { buildPayload };