let speed = 0; // Initial speed value
const speedDisplay = document.getElementById('speed-value');

// Function to update speed display
function updateSpeedDisplay() {
    speedDisplay.textContent = speed; // Update the displayed speed
}

// Increase speed function
function increaseSpeed() {
    speed++; // Increase speed by 1
    updateSpeedDisplay(); // Update the display
}

// Decrease speed function
function decreaseSpeed() {
    if (speed > 0) { // Ensure speed doesn't go below 0
        speed--; // Decrease speed by 1
    }
    updateSpeedDisplay(); // Update the display
}

// Add event listeners to speed buttons
document.getElementById('increase-speed').addEventListener('click', increaseSpeed);
document.getElementById('decrease-speed').addEventListener('click', decreaseSpeed);

// Gear button functionality
document.getElementById('gear-n').addEventListener('click', () => {
    document.querySelector('.gear-value h2').textContent = 'N';
});
document.getElementById('gear-f').addEventListener('click', () => {
    document.querySelector('.gear-value h2').textContent = 'F';
});
document.getElementById('gear-r').addEventListener('click', () => {
    document.querySelector('.gear-value h2').textContent = 'R';
});

// Initial rotation angle for the steering wheel
let rotationAngle = 0;
const steeringWheel = document.getElementById('steering-wheel');
const turnLeftButton = document.getElementById('turn-left');
const turnRightButton = document.getElementById('turn-right');

// Function to rotate the steering wheel to the left
turnLeftButton.addEventListener('click', () => {
    if (rotationAngle > -90) { // Prevent rotation beyond -90 degrees
        rotationAngle -= 15; // Decrease the angle by 15 degrees
        steeringWheel.style.transform = `rotate(${rotationAngle}deg)`;
        updateFeedbackAngle();
    }
});

// Function to rotate the steering wheel to the right
turnRightButton.addEventListener('click', () => {
    if (rotationAngle < 90) { // Prevent rotation beyond 90 degrees
        rotationAngle += 15; // Increase the angle by 15 degrees
        steeringWheel.style.transform = `rotate(${rotationAngle}deg)`;
        updateFeedbackAngle();
    }
});

// Function to update the feedback angle
function updateFeedbackAngle() {
    const feedbackAngleInput = document.getElementById('feedback-angle');
    feedbackAngleInput.value = rotationAngle; // Display the current angle
}

// Apply and Remove Brake functionality
document.getElementById('apply-brake').addEventListener('click', () => {
    console.log('Brake applied');
    // Add further logic for brake application here
});

document.getElementById('remove-brake').addEventListener('click', () => {
    console.log('Brake removed');
    // Add further logic for brake removal here
});

function applyFunction() {
    alert("Brake Applied successfully !");
  }
  
  function removeFunction() {
    alert("Brake removed successfully!");
  }

// Firebase initialization
var firebaseConfig = {
    apiKey: "AIzaSyBPCyckrluV2nf47iHrU6gHww_w9RL4fmY",
    authDomain: "tracking-b6129.firebaseapp.com",
    databaseURL: "https://tracking-b6129-default-rtdb.firebaseio.com",
    projectId: "tracking-b6129",
    storageBucket: "tracking-b6129.appspot.com",
    messagingSenderId: "936480928391",
    appId: "1:936480928391:web:b1294b4c349648bd6afe22",
    measurementId: "G-ZLR8ZD8PKV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create a Leaflet map and marker
var map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=oh7BURc4xb9R9sqICJtg', {
    attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Set the maximum zoom level to 18
map.setMaxZoom(18);

var marker = L.marker([0, 0]).addTo(map);

// Firebase reference to 'location'
var locationRef = firebase.database().ref('location');

// Listen for changes in the 'location' data in Firebase
locationRef.on('value', function(snapshot) {
    var location = snapshot.val();
    console.log("Firebase data:", location); // Log the Firebase data

    if (location && typeof location.latitude === 'number' && typeof location.longitude === 'number') {
        var lat = location.latitude;
        var lng = location.longitude;

        // Update the Leaflet marker position
        marker.setLatLng([lat, lng]); // Corrected method to set marker position
        map.setView([lat, lng], map.getZoom()); // Optional: Center map on marker
    }
});
