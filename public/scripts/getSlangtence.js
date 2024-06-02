document
  .getElementById("getSlangtence")
  .addEventListener("click", async function () {
    const overlay = document.getElementById("overlay");
    const slangtenceResult = document.getElementById("slangtenceResult");
    const meaningResult = document.getElementById("meaning");

    // Show loading screen overlay
    overlay.style.display = "grid";

    try {
      //GET request to the server
      const response = await fetch("/getSlangtence", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check for a successful response
      if (!response.ok) {
        throw new Error(
          `HTTP error ${response.status}: ${response.statusText}`
        );
      }

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

//Slangtence and Meaning from JSON data
function updateSlangtence(data, slangtenceElem, meaningElem) {
  slangtenceElem.innerText =
    data.slangtence ?? data.Slangtence ?? "No slangtence available";
  meaningElem.innerText =
    data.meaning ?? data.Meaning ?? "No meaning available";
}
