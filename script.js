const destinations = {
  Goa: { hotel: 2000, food: 1000, transport: 1500, attractions: ["Baga Beach", "Fort Aguada", "Dudhsagar Falls"] },
  Manali: { hotel: 1800, food: 900, transport: 2000, attractions: ["Solang Valley", "Rohtang Pass", "Hadimba Temple"] },
  Ladakh: { hotel: 1500, food: 800, transport: 1200, attractions: ["Shanti Stupa", "Nubra Valley", "Magnetic Hill"] },
  Khasi: { hotel: 1700, food: 700, transport: 3000, attractions: ["Elephant Falls", "Shillong View Point", "Umiam Lake"] },
  Araku: { hotel: 2000, food: 1000, transport: 1900, attractions: ["Borra Caves", "Katiki Waterfalls", "Wooden Bridge"] },
  Pondicherry: { hotel: 2500, food: 1500, transport: 1800, attractions: ["Rock Beach", "French Colony", "Mangrove Boating"] },
};

document.getElementById("tripForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const destination = document.getElementById("destination").value;
  const days = parseInt(document.getElementById("days").value);
  const people = parseInt(document.getElementById("people").value);
  const budget = parseInt(document.getElementById("budget").value);

  if (!destination || days <= 0 || people <= 0 || budget < 0) {
    alert("Please enter valid details.");
    return;
  }

  const data = destinations[destination];

  const estimatedCost =
    (days * data.hotel * people) +
    (days * data.food * people) +
    data.transport;

  let budgetStatus = "";
  let difference = budget - estimatedCost;

  if (budget >= estimatedCost) {
    budgetStatus = `✅ Budget is sufficient! You will save ₹${difference}`;
  } else {
    budgetStatus = `❌ Budget is not enough. You need ₹${Math.abs(difference)} more.`;
  }

  let itinerary = "";
  for (let i = 0; i < days; i++) {
    const place = data.attractions[i % data.attractions.length];
    itinerary += `<li>Day ${i + 1}: Visit ${place}</li>`;
  }

  const resultHTML = `
    <p><strong>Destination:</strong> ${destination}</p>
    <p><strong>Estimated Cost:</strong> ₹${estimatedCost}</p>
    <p>${budgetStatus}</p>
    <h4>Suggested Itinerary:</h4>
    <ul>${itinerary}</ul>
  `;

  // Save to localStorage
  localStorage.setItem("tripData", JSON.stringify(resultHTML));

  // Redirect to result page
  window.location.href = "result.html";
});
