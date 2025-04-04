// POEM-002-001
const visibleLinesCount: number = 6; // Track how many lines are visible
export function animatePoemWithSlider(poemUid: string) {
    const slider = document.querySelector(".slider") as HTMLInputElement;
    if (!slider) return; // If the slider doesn't exist, don't proceed

    const sliderValue = parseInt(slider.value, 6); // Get slider value
    const lines = document.querySelectorAll(`.${poemUid}.poem-line`);

    if (!lines.length) {
        console.warn(`No lines found for poem UID: ${poemUid}`);
        return;
    }

    const startIndex = sliderValue * visibleLinesCount;
    const endIndex = startIndex + visibleLinesCount;

    lines.forEach((line, index) => {
        (line as HTMLElement).style.transition = "opacity 0.5s ease-in-out"; // Smooth transition
        (line as HTMLElement).style.opacity = index >= startIndex && index < endIndex ? "1" : "0";
    });
}

// POEM-002-003
export function animateGreenDivOnClick(poemUid: string) {
    if (poemUid !== "poem-002-003") return; // Only execute for poem-002-003

    // Check if the div already exists
    let greenDiv = document.querySelector(".moving-green-div") as HTMLElement;

    if (!greenDiv) {
        // Create the div
        greenDiv = document.createElement("div");
        greenDiv.classList.add("moving-green-div");
        greenDiv.style.position = "fixed";
        greenDiv.style.zIndex = "100";
        greenDiv.style.top = "0";
        greenDiv.style.left = "0";
        greenDiv.style.display = "flex";
        greenDiv.style.alignItems = "center";
        greenDiv.style.justifyContent = "center";
        greenDiv.style.textAlign = "center";
        greenDiv.style.width = "100vw";
        greenDiv.style.height = "100vh";
        greenDiv.style.backgroundColor = "#20e72e";
        greenDiv.style.cursor = "none";
        greenDiv.style.transition = "top 0.05s linear, height 0.05s linear";

        const textElement = document.createElement("p");
        textElement.textContent = "Wafer thin 🍪";
        textElement.style.fontSize = "4rem";
        textElement.style.fontFamily = "Barrio, sans-serif";
        textElement.style.fontWeight = "bold";
        textElement.style.color = "#ffffff";
        textElement.style.margin = "0";
        textElement.style.transition = "opacity 0.2s linear";

        // Append text inside green div
        greenDiv.appendChild(textElement);
        document.body.appendChild(greenDiv);

        // Add event listener for click
        greenDiv.addEventListener("click", () => {
            let currentHeight = window.innerHeight; // Start at full viewport height
            let currentTop = 0; // Start from the top

            const interval = setInterval(() => {
                if (currentHeight > 0) {
                    currentHeight -= 5; // Reduce height by 10px
                    currentTop += 5; // Move the top position down by 10px
                    greenDiv.style.height = `${currentHeight}px`;
                    greenDiv.style.top = `${currentTop}px`; // Move the div down
                    textElement.style.opacity = `${currentHeight / window.innerHeight}`;
                } else {
                    clearInterval(interval);
                    greenDiv.remove(); // Remove from DOM once fully disappeared
                }
            }, 50); // Adjust speed if needed
        });
    }

    // Cleanup function to remove the div when navigating away
    return () => {
        const existingDiv = document.querySelector(".moving-green-div") as HTMLElement;
        if (existingDiv) existingDiv.remove();
    };
}

// POEM-002-004

// POEM-002-006
export function handleDotClick(poemUid: string, dotIndex: number) {
    // Select all poem lines for the given poem UID
    const lines = document.querySelectorAll(`.${poemUid}.poem-line`) as NodeListOf<HTMLElement>;
    const dots = document.querySelectorAll(".dot") as NodeListOf<HTMLElement>;

    if (!lines.length || !dots.length) {
        console.warn(`No lines or dots found for poem UID: ${poemUid}`);
        return;
    }

    // Ensure all lines are hidden on load (only once)
    if (!document.body.hasAttribute("data-init")) {
        lines.forEach((line) => {
            line.style.display = "none";
            line.style.opacity = "0"; // Start invisible for fade-in effect
            line.style.transition = "opacity 0.5s ease-in-out";
        });

        dots.forEach((dot) => {
            dot.style.opacity = "1"; // Ensure dots start fully visible
            dot.style.transition = "opacity 3s ease-in-out";
        });

        document.body.setAttribute("data-init", "true");
    }

    // Find any currently visible line
    const currentlyVisibleLine = Array.from(lines).find(line => line.style.display === "block");

    if (currentlyVisibleLine) {
        currentlyVisibleLine.style.opacity = "0"; // Fade out old line
        setTimeout(() => {
            currentlyVisibleLine.style.display = "none"; // Hide after fade-out
        }, 500); // Wait for fade animation to complete
    }

    // Check if the clicked dot corresponds to a valid line
    if (dotIndex < lines.length) {
        setTimeout(() => {
            lines[dotIndex].style.display = "block"; // Show new line
            lines[dotIndex].style.opacity = "1"; // Fade in new line
        }, 500); // Delay ensures previous line is fully hidden first
    }

    // Step 1: Fade out clicked dot gradually over 3 seconds
    dots[dotIndex].style.opacity = "0";

    // Step 2: Check if all dots are faded out
    setTimeout(() => {
        const allDotsHidden = Array.from(dots).every(dot => dot.style.opacity === "0");

        if (allDotsHidden) {
            // Step 3: Fade out the last visible line before resetting dots
            setTimeout(() => {
                const lastVisibleLine = Array.from(lines).find(line => line.style.display === "block");

                if (lastVisibleLine) {
                    lastVisibleLine.style.opacity = "0"; // Fade out last line
                    setTimeout(() => {
                        lastVisibleLine.style.display = "none"; // Hide after fade-out
                    }, 500);
                }

                // Step 4: Once last line is faded out, fade dots back in
                setTimeout(() => {
                    dots.forEach((dot) => {
                        dot.style.opacity = "1"; // Fade back in all dots
                    });
                }, 500); // Slight delay before resetting dots

            }, 500); // Ensure last line fades out before resetting dots
        }
    }, 3000); // Wait 3 seconds before checking if all dots are faded
}

// POEM-002-008
export function handleReadMode(poemUid: string) {
    // Select elements to hide
    const elementsToHide = [
        document.querySelector(".audioIcon"),
        document.querySelector(".instruction"),
        document.querySelector(".displayText"),
    ];

    // Loop through each element & hide it if it exists
    elementsToHide.forEach((element) => {
        if (element) {
            (element as HTMLElement).style.display = "none";
        }
    });

    // Select and reveal poem lines
    const poemContainer = document.querySelector(`.${poemUid}.poem-lines-container`) as HTMLElement;
    if (!poemContainer) return;

    const lines = poemContainer.querySelectorAll(`.${poemUid}.poem-line`);
    lines.forEach((line) => {
        (line as HTMLElement).style.display = "block"; // Show poem lines
        (line as HTMLElement).style.opacity = "1"; // Ensure visibility
    });
}