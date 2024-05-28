document.getElementById("slangForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const text = document.getElementById("slangInput").value.trim().toUpperCase();

  // Regex Validation: Only allow letters and numbers (not just numbers), no special characters
  const regex = /^(?=.*[a-zA-Z])[\w\s]+$/;
  if (!regex.test(text)) {
    alert("Invalid input: Please enter a combination of letters and numbers only, without any special characters or symbols.");
    return;
  }

  document.getElementById("slangInput").value = "";

  const slangCloseButton = document.querySelector(".home-button");
  const slangDiv = document.querySelector("#slangDiv");

  // Show loading screen
  document.getElementById("overlay").style.display = "grid";

  try {
    // Check cache for existing result
    const cacheKey = `slangResult-${text}`;
    let cachedResult = localStorage.getItem(cacheKey);

    if (cachedResult && isCachedDataValid(cachedResult)) {
      const parsedCachedData = JSON.parse(cachedResult);
      displayResult(parsedCachedData.data);
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
      throw new Error(`HTTP error ${response.status}`);
    }

    const result = await response.text();
    console.log(result);
    displayResult(result);
    storeDataInCache(cacheKey, result);
  } catch (error) {
    console.error("Error fetching slang result:", error);
    alert("Error: Unable to process request.");
  } finally {
    // Hide loading screen
    document.getElementById("overlay").style.display = "none";
  }

  // Event listener for close button
  slangCloseButton.addEventListener("click", () => {
    slangDiv.style.display = "none";
  });
});

// Function to check if cached data is valid
function isCachedDataValid(cachedData) {
  const expiryTime = 24 * 60 * 60 * 1000; // 24 hours Cache Validity
  const cachedAt = JSON.parse(cachedData).cachedAt;
  return Date.now() - cachedAt < expiryTime;
}

// Function to store data in cache with a timestamp
function storeDataInCache(key, data) {
  localStorage.setItem(key, JSON.stringify({ data, cachedAt: Date.now() }));
}

// Function to display result on the webpage
function displayResult(result) {
  document.getElementById("slangResult").innerText = result;
  document.querySelector("#slangDiv").style.display = "flex";
}
