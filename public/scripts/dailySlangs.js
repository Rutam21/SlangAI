// Function to fetch slang data from the server
async function fetchSlangData() {
  try {
    const response = await fetch("/slangData");

    // Successful response check
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const slangData = await response.json();
    return slangData;
  } catch (error) {
    console.error("Error fetching slang data:", error);
    throw new Error("Unable to fetch slang data. Please try again later.");
  }
}

// Function to update the content of the placeholders on the webpage
async function updateSlangPlaceholders() {
  try {
    const slangData = await fetchSlangData();

    const slangIds = ["slang1", "slang2", "slang3", "slang4"];
    const sentenceIds = ["sentence1", "sentence2", "sentence3", "sentence4"];
    const meaningIds = ["meaning1", "meaning2", "meaning3", "meaning4"];

    // Clear existing content
    slangIds.forEach(id => document.getElementById(id).innerText = "");
    sentenceIds.forEach(id => document.getElementById(id).innerText = "");
    meaningIds.forEach(id => document.getElementById(id).innerText = "");

    for (let i = 0; i < slangData.length && i < 4; i++) {
      updateDailySlangs(slangData[i], slangIds[i], sentenceIds[i], meaningIds[i]);
    }
  } catch (error) {
    console.error("Error updating slang placeholders:", error);
    slangIds.forEach(id => document.getElementById(id).innerText = "Error: Unable to load slang data.");
    sentenceIds.forEach(id => document.getElementById(id).innerText = "");
    meaningIds.forEach(id => document.getElementById(id).innerText = "");
  }
}

// Function to update individual placeholder sets
function updateDailySlangs(data, slangId, sentenceId, meaningId) {
  const slang = data.Slang || "N/A";
  const example = data.Example || "N/A";
  const meaning = data.Meaning || "N/A";

  document.getElementById(slangId).innerText = slang;
  document.getElementById(sentenceId).innerText = example;
  document.getElementById(meaningId).innerText = meaning;
}

// Initial update
updateSlangPlaceholders();
