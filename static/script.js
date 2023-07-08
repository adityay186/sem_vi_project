var selectedSymptoms = []; // List to store selected symptoms

document.getElementById("add-symptom").addEventListener("click", function(event) {
  event.preventDefault(); // Prevent default button behavior

  // Get the selected symptoms
  var selectSymptoms = document.getElementById("symptoms");
  var selectedOptions = Array.from(selectSymptoms.selectedOptions);

  // Check if the selected symptoms are already added
  selectedOptions.forEach(function(option) {
    var symptom = option.value;
    if (!selectedSymptoms.includes(symptom)) {
      selectedSymptoms.push(symptom); // Add symptom to the list
      addSymptomToArea(symptom); // Add symptom to the separate area
    }
  });
});

document.getElementById("symptoms-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  if (selectedSymptoms.length === 0) {
    // Handle the case when no symptoms are selected
    alert("Please select at least one symptom.");
    return;
  }

  // Send the selected symptoms to the server
  fetch("/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(selectedSymptoms)
  })
    .then(response => response.json())
    .then(result => {
      // Display the predicted result on the webpage
      document.getElementById("result").textContent = "Predicted Disease: " + result[0];
    })
    .catch(error => {
      console.error("Error:", error);
    });
});

document.getElementById("clear-symptoms").addEventListener("click", function() {
  selectedSymptoms = []; // Clear the selected symptoms list
  clearSelectedSymptomsArea(); // Clear the selected symptoms area
});

function addSymptomToArea(symptom) {
  var selectedSymptomsDiv = document.getElementById("selected-symptoms");
  var symptomElement = document.createElement("div");
  symptomElement.classList.add("symptom");
  symptomElement.textContent = symptom;
  selectedSymptomsDiv.appendChild(symptomElement);
}

function clearSelectedSymptomsArea() {
  var selectedSymptomsDiv = document.getElementById("selected-symptoms");
  selectedSymptomsDiv.innerHTML = ""; // Remove all symptom elements
}
