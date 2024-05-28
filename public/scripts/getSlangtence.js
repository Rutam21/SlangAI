document.getElementById("getSlangtence").addEventListener("click", async function () {
  const overlay = document.getElementById("overlay");
  const slangtenceResult = document.getElementById("slangtenceResult");
  const meaningResult = document.getElementById("meaning");

  //Loading Screen Overlay
  overlay.style.display = "grid";

  try {
    // Send a GET request to the server
    const response = await fetch("/getSlangtence", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Successful Response Check
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    // Display Result on the webpage
    const result = await response.json();
    updateSlangtence(result, slangtenceResult, meaningResult);
  } catch (error) {
    console.error("Error fetching slangtence:", error);
    slangtenceResult.innerText = "Error: Unable to process request.";
    meaningResult.innerText = "";
  } finally {
    // Hide loading screen overlay
    overlay.style.display = "none";
    slangtenceResult.style.display = "flex";
    meaningResult.style.display = "flex";
  }
});

// Function to update the Slangtence from JSON
function updateSlangtence(data, slangtenceElem, meaningElem) {
  const slangtence = data.slangtence || data.Slangtence || "No slangtence available";
  const meaning = data.meaning || data.Meaning || "No meaning available";

  slangtenceElem.innerText = slangtence;
  meaningElem.innerText = meaning;
}
