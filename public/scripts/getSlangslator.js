document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("slangslatorInput");
  const submitButton = document.getElementById("getSlangslator");

  inputElement.addEventListener("input", function () {
    if (inputElement.value.trim() === "") {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  });
});

document
  .getElementById("slangslatorForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const text = document.getElementById("slangslatorInput").value.trim();
    const submitButton = document.getElementById("getSlangslator");

    // Regex Validation: Allow letters, numbers, symbols, and whitespace characters in a sentence
    const regex = /^(?=.*\S)[a-zA-Z0-9\s.,!?'"()-]+$/;
    if (!regex.test(text)) {
      alert(
        "Invalid input: Please enter a combination of letters, numbers, symbols, and whitespace characters in a sentence."
      );
      return;
    }

    document.getElementById("slangslatorInput").value = "";
    submitButton.disabled = true;

    // Show loading screen
    document.getElementById("overlay").style.display = "grid";

    try {
      // Check cache for existing result
      const cacheKey = `slangslatorResult-${text}`;
      const cachedResult = localStorage.getItem(cacheKey);

      if (cachedResult && isCachedDataValid(cachedResult)) {
        const parsedCachedData = JSON.parse(cachedResult);
        displaySlangslatorResult(parsedCachedData.data);
        return; // Exit if using cached data
      }

      // Fetch result from server if not cached or invalid
      const response = await fetch("/getSlangslator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.text();
      displaySlangslatorResult(result);
      storeDataInCache(cacheKey, result);
    } catch (error) {
      console.error("Error fetching Slangslator result:", error);
      alert(`Error: Unable to process request. ${error.message}`);
    } finally {
      // Hide loading screen
      document.getElementById("overlay").style.display = "none";
    }
  });

// Event listener for close button
document.querySelector(".home-button5").addEventListener("click", () => {
  document.querySelector("#slangslatorDiv").style.display = "none";
});

// To display result on the webpage
function displaySlangslatorResult(result) {
  document.getElementById("slangslatorResult").innerText = result;
  document.querySelector("#slangslatorDiv").style.display = "flex";
}
