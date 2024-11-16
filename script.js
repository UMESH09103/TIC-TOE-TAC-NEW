// Select necessary elements
const boxes = document.querySelectorAll(".box");
const reset = document.querySelector("#btn");
const newbtn = document.querySelector("#new-btn");
const colorBtn = document.getElementById("color-btn");
const difficultySelect = document.getElementById("difficulty");
const currentDifficulty = document.getElementById("current-difficulty");
const messagecont = document.querySelector(".message-container");
const message = document.querySelector("#message");
let turn0 = true; // Player's turn (O starts)
let difficulty = "easy"; // Default difficulty
const win_pattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Update difficulty when changed from select dropdown
difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;
    currentDifficulty.innerText = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
});

// Player's turn logic
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.disabled = true;
            turn0 = false;
            checkWinner(); // Check winner after player's move
            if (!turn0) {
                setTimeout(computerMove, 500); // Computer move after player
            }
        }
    });
});

// AI (Computer's turn logic)
const computerMove = () => {
    let availableBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            availableBoxes.push(index);
        }
    });

    if (availableBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * availableBoxes.length); // Simple random selection
        let boxToPlay = availableBoxes[randomIndex];
        boxes[boxToPlay].innerText = "X";
        boxes[boxToPlay].disabled = true;
        turn0 = true; // Switch back to player's turn
        checkWinner(); // Check winner after computer's move
    }
};

// Reset button logic
const resetbtn = () => {
    turn0 = true;
    enableButtons();
    messagecont.classList.add("hide");
};

// Disable all boxes
const disableButtons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and clear them
const enableButtons = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Display winner
const showWinner = (winner) => {
    message.innerText = `Congratulations, Winner is ${winner}`;
    messagecont.classList.remove("hide");
    disableButtons();
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of win_pattern) {
        let v1 = boxes[pattern[0]].innerText;
        let v2 = boxes[pattern[1]].innerText;
        let v3 = boxes[pattern[2]].innerText;
        if (v1 !== "" && v2 !== "" && v3 !== "") {
            if (v1 === v2 && v2 === v3) {
                showWinner(v1);
                return;
            }
        }
    }

    // Check for draw
    if (Array.from(boxes).every(box => box.innerText !== "")) {
        message.innerText = "It's a Draw!";
        messagecont.classList.remove("hide");
        disableButtons();
    }
};

// Add event listeners to buttons
newbtn.addEventListener("click", resetbtn);
reset.addEventListener("click", resetbtn);

// Change theme button functionality
const themes = ["theme-1", "theme-2", "theme-3"];
let currentThemeIndex = 0;

const changeTheme = () => {
    // Remove current theme class
    document.body.classList.remove(themes[currentThemeIndex]);

    // Update to next theme
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    // Apply new theme class
    document.body.classList.add(themes[currentThemeIndex]);
};

// Add event listener to color change button
colorBtn.addEventListener("click", changeTheme);
