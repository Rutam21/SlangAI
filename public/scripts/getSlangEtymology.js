document.addEventListener("DOMContentLoaded", function () {
  const inputElement = document.getElementById("etymologyInput");
  const submitButton = document.getElementById("findSlangEtymology");

  inputElement.addEventListener("input", function () {
    if (inputElement.value.trim() === "") {
      submitButton.disabled = true;
    } else {
      submitButton.disabled = false;
    }
  });
});
document
  .getElementById("slangEtymologyForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const text = document
      .getElementById("etymologyInput")
      .value.trim()
      .toUpperCase();
    const submitButton = document.getElementById("findSlangEtymology");

    // Regex Validation: Only allow letters and numbers (not just numbers), no special characters
    const regex = /^(?=.*[a-zA-Z])[\w\s]+$/;
    if (!regex.test(text)) {
      alert(
        "Invalid input: Please enter a Single Slang Word. It can be a combination of letters and numbers only, without any special characters or symbols."
      );
      return;
    }

    document.getElementById("etymologyInput").value = "";
    submitButton.disabled = true;

    // Show loading screen
    document.getElementById("overlay").style.display = "grid";

    try {
      // Check cache for existing result
      const cacheKey = `slangEtymologyResult-${text}`;
      const cachedResult = localStorage.getItem(cacheKey);

      if (cachedResult && isCachedDataValid(cachedResult)) {
        const parsedCachedData = JSON.parse(cachedResult);
        displayResult(parsedCachedData.data, text);
        return; // Exit if using cached data
      }

      // Fetch result from server if not cached or invalid
      const response = await fetch("/getSlangEtymology", {
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

      const result = await response.json();
      displayResult(result, text);
      storeDataInCache(cacheKey, result);
    } catch (error) {
      console.error("Error fetching slang result:", error);
      alert(`Error: Unable to process request. ${error.message}`);
    } finally {
      // Hide loading screen
      document.getElementById("overlay").style.display = "none";
    }
  });

// Event listener for close button
document.querySelector(".home-button3").addEventListener("click", () => {
  document.querySelector("#slangEtymologyDiv").style.display = "none";
});

// To display result on the webpage
function displayResult(data, text) {
  document.getElementById("etymologyTitle").innerText = `${text} Etymology`;
  document.getElementById("etyOrigin").innerText = data[0]?.content || "N/A";
  document.getElementById("etyEvolution").innerText = data[1]?.content || "N/A";
  document.getElementById("etyCulImpact").innerText = data[2]?.content || "N/A";
  document.querySelector("#slangEtymologyDiv").style.display = "flex";
}

// To start the Shepherd Etymology Tour with specific content attached to a specific Section such as Origin, Evolution and Cultural Impact
function startTour(title, content, attachToElement) {
  const etymologytour = new Shepherd.Tour({
    defaultStepOptions: {
      cancelIcon: {
        enabled: true,
      },
      modal: true,
      scrollTo: { behavior: "smooth", block: "center" },
    },
    useModalOverlay: true,
  });

  etymologytour.addStep({
    title: title,
    text: content,
    attachTo: {
      element: attachToElement,
      on: "bottom",
    },
    buttons: [
      {
        text: "Done",
        action: etymologytour.complete,
      },
    ],
  });

  etymologytour.start();
}

// Event listeners for Headings
document.querySelector(".home-text49").addEventListener("click", () => {
  const content = document.getElementById("etyOrigin").textContent;
  startTour("Origin", content, ".home-text49");
});

document.querySelector(".home-text50").addEventListener("click", () => {
  const content = document.getElementById("etyEvolution").textContent;
  startTour("Evolution", content, ".home-text50");
});

document.querySelector(".home-text51").addEventListener("click", () => {
  const content = document.getElementById("etyCulImpact").textContent;
  startTour("Cultural Impact", content, ".home-text51");
});
