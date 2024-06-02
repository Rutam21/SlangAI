// To fetch slang data from the server
async function fetchSlangData() {
  try {
    const response = await fetch("/slangData");

    // Check for successful response
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${response.statusText}`);
    }

    const slangData = await response.json();
    return slangData;
  } catch (error) {
    console.error("Error fetching slang data:", error);
    throw new Error("Unable to fetch slang data. Please try again later.");
  }
}

// To update the content of the placeholders on the webpage
async function updateSlangPlaceholders() {
  try {
    const slangData = await fetchSlangData();

    const slangIds = ["slang1", "slang2", "slang3", "slang4"];
    const sentenceIds = ["sentence1", "sentence2", "sentence3", "sentence4"];
    const meaningIds = ["meaning1", "meaning2", "meaning3", "meaning4"];

    // Check all elements exist before attempting to update
    const allElementsExist = [...slangIds, ...sentenceIds, ...meaningIds].every(
      (id) => document.getElementById(id)
    );
    if (!allElementsExist) {
      throw new Error("One or more elements are missing in the DOM.");
    }

    // Clear existing content
    slangIds.forEach((id) => (document.getElementById(id).innerText = ""));
    sentenceIds.forEach((id) => (document.getElementById(id).innerText = ""));
    meaningIds.forEach((id) => (document.getElementById(id).innerText = ""));

    // Update content with fetched slang data
    for (let i = 0; i < slangData.length && i < 4; i++) {
      updateDailySlangs(
        slangData[i],
        slangIds[i],
        sentenceIds[i],
        meaningIds[i]
      );
    }
  } catch (error) {
    console.error("Error updating slang placeholders:", error);
    showErrorMessages();
  }
}

// To update individual placeholder sets
function updateDailySlangs(data, slangId, sentenceId, meaningId) {
  const slang = data.Slang || "N/A";
  const example = data.Example || "N/A";
  const meaning = data.Meaning || "N/A";

  document.getElementById(slangId).innerText = slang;
  document.getElementById(sentenceId).innerText = example;
  document.getElementById(meaningId).innerText = meaning;
}

// To show error messages on the placeholders
function showErrorMessages() {
  const slangIds = ["slang1", "slang2", "slang3", "slang4"];
  const sentenceIds = ["sentence1", "sentence2", "sentence3", "sentence4"];
  const meaningIds = ["meaning1", "meaning2", "meaning3", "meaning4"];

  slangIds.forEach(
    (id) =>
      (document.getElementById(id).innerText =
        "Error: Unable to load slang data.")
  );
  sentenceIds.forEach(
    (id) => (document.getElementById(id).innerText = "Please, Try Again!")
  );
  meaningIds.forEach((id) => (document.getElementById(id).innerText = ""));
}

// Initial update
updateSlangPlaceholders();
