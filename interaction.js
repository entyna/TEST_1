// Define the yaoValues array
let yaoValues = [1, 1, 1, 1, 1, 1];

// Create the buttons container
let buttonContainer = document.createElement("div");
buttonContainer.id = "button-container";
document.body.appendChild(buttonContainer);

// Create the buttons
let buttons = [];
for (let i = 0; i < 6; i++) {
  let button = document.createElement("button");
  button.innerHTML = "1";
  button.addEventListener("click", function() {
    // Toggle the yaoValues value for this button
    yaoValues[i] = 1 - yaoValues[i];
    button.innerHTML = yaoValues[i].toString();
    // Call the updatePoints function in sketch.js, passing in the updated yaoValues array
    updatePoints(yaoValues);
  });
  buttons.push(button);
  buttonContainer.appendChild(button);
}