// Array of Correct Answers for Each Task
const correctAnswers = [
    "HD 3167", // Replace with actual answer for Planet 1
    "HD 3167 c", // Replace with actual answer for Planet 2
    "Gaia DR3 1981076480148452608 ", // Replace with actual answer for Planet 3
    "light brown"  // Replace with actual answer for Planet 4
];

let currentTaskId = -1;
let correctCounter = 0;
let wrongCounter = 0; // NEW: Counter for wrong answers

// Function to Submit Name and Display Main Page
function submitName() {
    const username = document.getElementById("username").value;
    if (username.trim() !== "") {
        document.getElementById("namePopup").style.display = "none";
        document.getElementById("mainPage").classList.remove("hidden");
        document.getElementById("userNameDisplay").innerText = `Welcome back: ${username}`;
    }
}

// Function to Show Task Pop-up for a Given Planet
function showTaskPopup(taskId) {
    // Only show popup for unlocked planets
    if (!document.getElementById(`planet${taskId}`).classList.contains("locked")) {
        currentTaskId = taskId;
        document.getElementById("taskPopup").classList.remove("hidden");
        if(taskId == 1){
        document.getElementById("taskQuestion").innerText = ` What is the name of the star around which this planet revolves?`;}
        if(taskId == 2){
            document.getElementById("taskQuestion").innerText = `What is the name of this planet?`;}
            if(taskId == 3){
                document.getElementById("taskQuestion").innerText = `Find the star through (Dec : 52.00120768 - RA:329.4768348 ) and give me its name`;}
                if(taskId ==4){
                    document.getElementById("taskQuestion").innerText = ` What color is the soil of this planet?`;}
    }
}

// Function to Submit Task Answer
function submitTaskAnswer() {
    const answer = document.getElementById("taskAnswer").value;
    const isCorrect = answer.trim() === correctAnswers[currentTaskId - 1];

    document.getElementById("taskPopup").classList.add("hidden");

    if (isCorrect) {
        correctCounter++;
        updateCorrectCounterDisplay();
        unlockNextPlanet(); // Unlock the next planet
        showResultPopup(true);
    } else {
        wrongCounter++; // NEW: Increment wrong answer counter
        updateWrongCounterDisplay(); // NEW: Update wrong answer counter display
        showResultPopup(false);
    }
}

// NEW: Function to Unlock the Next Planet
function unlockNextPlanet() {
    const nextPlanetId = currentTaskId + 1;
    const nextPlanet = document.getElementById(`planet${nextPlanetId}`);

    if (nextPlanet) {
        nextPlanet.classList.remove("locked");
        const lockIcon = nextPlanet.querySelector(".lock-icon");
        if (lockIcon) {
            lockIcon.style.display = "none"; // Hide lock icon
        }
    }
}

// Function to Show Result Pop-up (Green if Correct, Red if Incorrect)
function showResultPopup(isCorrect) {
    const resultPopup = document.getElementById("resultPopup");
    resultPopup.classList.remove("hidden");
    resultPopup.style.backgroundColor = isCorrect ? "#28a745" : "#dc3545";
    resultPopup.querySelector('.result-text').innerText = isCorrect ? "Correct Answer!" : "Wrong Answer. Try Again.";
}

// Function to Close the Pop-up
function closePopup() {
    document.getElementById("taskPopup").classList.add("hidden");
    document.getElementById("resultPopup").classList.add("hidden");
}

// Function to Update the Correct Counter Display
function updateCorrectCounterDisplay() {
    document.getElementById("correctCounter").innerText = `Correct Answers: ${correctCounter}`;
}

// NEW: Function to Update the Wrong Counter Display
function updateWrongCounterDisplay() {
    document.getElementById("wrongCounter").innerText = `Wrong Answers: ${wrongCounter}`;
}

// Function to Redirect to Unity Project Page
function redirectToUnity() {
    window.location.href = "unity.html";  // Redirect to the Unity page
}

// Variables for Spaceship Movement and Rotation
const spaceship = document.getElementById("spaceship");
let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;
let spaceshipX = targetX; // Initialize spaceship X position
let spaceshipY = targetY; // Initialize spaceship Y position

const speedFactor = 0.05; // Slower speed for smoother following

// Listen for mouse movement and update target position
document.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
});

// Function to Rotate the Spaceship Towards the Mouse Cursor
function rotateSpaceshipTowardsMouse() {
    const deltaX = targetX - spaceshipX;
    const deltaY = targetY - spaceshipY;
    
    // Calculate the angle between the spaceship and the mouse in radians
    const angle = Math.atan2(deltaY, deltaX);
    
    // Convert radians to degrees
    let angleDegrees = angle * (180 / Math.PI);
    
    // Adjust for image's initial orientation (assuming it points to the right)
    angleDegrees -= 90;
    
    return angleDegrees;
}

// Function to Move the Spaceship Towards the Mouse Cursor and Rotate it
function moveSpaceship() {
    const deltaX = targetX - spaceshipX;
    const deltaY = targetY - spaceshipY;

    // Move the spaceship slowly towards the mouse position
    spaceshipX += deltaX * speedFactor;
    spaceshipY += deltaY * speedFactor;

    // Get the rotation angle so that the spaceship always points towards the mouse
    const rotationAngle = rotateSpaceshipTowardsMouse();
    
    // Apply both movement and rotation to the spaceship
    spaceship.style.transform = `translate(${spaceshipX}px, ${spaceshipY}px) rotate(${rotationAngle}deg)`;

    // Continue the movement on each frame
    requestAnimationFrame(moveSpaceship);
}

// Start moving the spaceship when the page loads
window.onload = function() {
    moveSpaceship(); // Start moving the spaceship with smooth rotation towards the mouse
};
