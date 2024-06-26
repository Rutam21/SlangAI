document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("slangInput");
  const submitButton = document.getElementById("findSlang");

  inputElement.addEventListener("input", function () {
    if (inputElement.value.trim() === "") {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  });
});
document
  .getElementById("slangForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const text = document
      .getElementById("slangInput")
      .value.trim()
      .toUpperCase();
    const submitButton = document.getElementById("findSlang");

    // Regex Validation: Only allow letters and numbers (not just numbers), no special characters
    const regex = /^(?=.*[a-zA-Z])[\w\s]+$/;
    if (!regex.test(text)) {
      alert(
        "Invalid input: Please enter a Single Slang Word. It can be a combination of letters and numbers only, without any special characters or symbols."
      );
      return;
    }

    document.getElementById("slangInput").value = "";
    submitButton.disabled = true;

    // Show loading screen
    document.getElementById("overlay").style.display = "grid";

    try {
      // Check cache for existing result
      const cacheKey = `slangResult-${text}`;
      const cachedResult = localStorage.getItem(cacheKey);

      if (cachedResult && isCachedDataValid(cachedResult)) {
        const parsedCachedData = JSON.parse(cachedResult);
        displaySlangResult(parsedCachedData.data);
        return; // Exit if using cached data
      }

      // Fetch result from server if not cached or invalid
      const response = await fetch("/getSlang", {
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
      displaySlangResult(result);
      storeDataInCache(cacheKey, result);
    } catch (error) {
      console.error("Error fetching slang result:", error);
      alert("Error: Unable to process request. Please try again later.");
    } finally {
      // Hide loading screen
      document.getElementById("overlay").style.display = "none";
    }
  });

// To display result on the webpage
function displaySlangResult(result) {
  document.getElementById("slangResult").innerText = result;
  document.querySelector("#slangDiv").style.display = "flex";
}

// Event listener for close button
document.querySelector(".home-button").addEventListener("click", () => {
  document.querySelector("#slangDiv").style.display = "none";
});
