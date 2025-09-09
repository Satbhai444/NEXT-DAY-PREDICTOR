// script.js for Next Day Predictor

// List of days in order
const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

// Funny loading statements (except the last one)
const funnyStatements = [
    "Checking your calendar...",
    "Hacking NASA for your data...",
    "Analyzing Chrome search history...",
    "Dhoni announced to play one more IPL...",
    "Asking Brahmaji...",
    "Consulting Google Baba...",
    "Counting stars in the sky...",
    "Calling your best friend for help...",
    "Looking for clues in your WhatsApp chats...",
    "Reading your mind..."
];

// Always the last loading statement
const lastStatement = "Predicting tomorrow...";

// Get DOM elements
const daySelect = document.getElementById('day-select');
const predictBtn = document.getElementById('predict-btn');
const loadingArea = document.getElementById('loading-area');
const resultArea = document.getElementById('result');

// Helper to get the next day
function getNextDay(currentDay) {
    const idx = days.indexOf(currentDay);
    // If not found, default to Monday
    if (idx === -1) return days[0];
    return days[(idx + 1) % days.length];
}

// Helper to get random funny statements (no repeats)
function getRandomStatements(count) {
    const arr = [...funnyStatements];
    const selected = [];
    for (let i = 0; i < count && arr.length > 0; i++) {
        const idx = Math.floor(Math.random() * arr.length);
        selected.push(arr.splice(idx, 1)[0]);
    }
    return selected;
}

// Main function to handle prediction
predictBtn.addEventListener('click', async function() {
    // Clear previous result
    resultArea.textContent = '';
    loadingArea.textContent = '';
    predictBtn.disabled = true;
    daySelect.disabled = true;

    // Number of loading steps before the last one
    const loadingSteps = 3 + Math.floor(Math.random() * 2); // 3 or 4
    const statements = getRandomStatements(loadingSteps).concat([lastStatement]);

    // Show loading statements one by one
    for (let i = 0; i < statements.length; i++) {
        loadingArea.textContent = statements[i];
        // Wait 1.5 seconds before next
        // eslint-disable-next-line no-await-in-loop
        await new Promise(res => setTimeout(res, 1500));
    }

    // Calculate next day
    const currentDay = daySelect.value;
    const nextDay = getNextDay(currentDay);

    // Show result
    loadingArea.textContent = '';
    resultArea.textContent = `Your Next Day Will Be: ${nextDay}`;

    // Re-enable controls
    predictBtn.disabled = false;
    daySelect.disabled = false;
});

// Add comments to explain key parts of the code above
// - The funnyStatements array holds random/fun loading messages
// - getRandomStatements picks a few unique ones for each prediction
// - The button click handler shows each statement with a delay, then displays the result
// - getNextDay finds the next day in the week, looping back to Monday after Sunday
