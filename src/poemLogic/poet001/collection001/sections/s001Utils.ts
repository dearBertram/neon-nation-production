// POEM-001-001
export function fadeInAnimation(poemUid: string) {
    // Select the poem container and lines inside it
    const poemContainer = document.querySelector(`.${poemUid}.poem-lines-container`) as HTMLElement;

    if (!poemContainer) {
        console.warn(`No poem container found for fade-in animation: ${poemUid}`);
        return;
    }

    const lines = poemContainer.querySelectorAll(`.${poemUid}.poem-line`);

    if (!lines.length) {
        console.warn(`No lines found for poem UID: ${poemUid}`);
        return;
    }

    // Ensure all lines start fully hidden before animation starts
    lines.forEach((line) => {
        (line as HTMLElement).style.opacity = "0";
        (line as HTMLElement).style.transform = "translateY(20px)"; // Start slightly lower
    });

    // Animate each line sequentially
    lines.forEach((line, index) => {
        setTimeout(() => {
            (line as HTMLElement).style.opacity = "1";
            (line as HTMLElement).style.transform = "translateY(0)";

            // Auto-scroll if the text overflows the screen
            const rect = line.getBoundingClientRect();
            if (rect.bottom > window.innerHeight) {
                line.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }, index * 2000); // Delay each line appearing
    });
}

// POEM-001-002
export function cycleThroughLines(poemUid: string) {
    // Select the poem container
    const poemContainer = document.querySelector(`.${poemUid}.poem-lines-container`) as HTMLElement | null;

    if (!poemContainer) {
        console.warn(`Poem container not found: ${poemUid}`);
        return;
    }

    // Select all poem lines within the poem
    const lines = poemContainer.querySelectorAll(`.${poemUid}.poem-line`);

    if (lines.length === 0) {
        console.warn(`No poem lines found: ${poemUid}`);
        return;
    }

    let currentIndex = 0;
    let intervalId: NodeJS.Timeout | null = null;

    // Function to update which line is visible
    const updateVisibleLine = () => {
        lines.forEach((line, index) => {
            (line as HTMLElement).style.opacity = index === currentIndex ? "1" : "0";
            (line as HTMLElement).style.transform = index === currentIndex ? "translateY(5)" : "translateY(20px)";
            (line as HTMLElement).style.position = "absolute";
            (line as HTMLElement).style.paddingLeft = "1rem";
            (line as HTMLElement).style.textAlign = "center";
            (line as HTMLElement).style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
        });
    };
    // Function to cycle through lines
    const startAutoScroll = () => {
        intervalId = setInterval(() => {
            if (currentIndex < lines.length - 1) {
                currentIndex++;
                updateVisibleLine();
            } else {
                clearInterval(intervalId!); // Stop scrolling at the last line
            }
        }, 1500);
    };
    // Show first line
    updateVisibleLine();
    startAutoScroll();

    // Cleanup function to stop interval when navigating away
    return () => {
        if (intervalId) clearInterval(intervalId);
    };
}

// POEM-001-003
const visibleLinesCount: number = 12; // Track how many lines are visible

export function showFirstTwelveLines(poemUid: string) {
    // Select all lines belonging to the given poem UID
    const lines = document.querySelectorAll(`.${poemUid}.poem-line`);

    if (!lines.length) {
        console.warn(`No lines found for poem UID: ${poemUid}`);
        return;
    }

    // Hide all lines initially
    lines.forEach((line) => {
        (line as HTMLElement).style.display = "none";
    });

    // Show only the first 12 lines
    lines.forEach((line, index) => {
        if (index < visibleLinesCount) {
            (line as HTMLElement).style.display = "block";
        }
    });
}

// POEM-001-004

// POEM-001-005
export function showFirstTwentyOneLines(poemUid: string) {
    // Select all lines belonging to the given poem UID
    const lines = document.querySelectorAll(`.${poemUid}.poem-line`);

    if (!lines.length) {
        console.warn(`No lines found for poem UID: ${poemUid}`);
        return;
    }

    // Hide all lines initially
    lines.forEach((line) => {
        (line as HTMLElement).style.display = "none";
    });

    // Show only the first 12 lines
    lines.forEach((line, index) => {
        if (index < 21) {
            (line as HTMLElement).style.display = "block";
        }
    });
}

// POEM-001-006

// POEM-001-007
let currentLineIndex = 0;
export function displayNextLineInArray(poemUid: string) {
    // Select the correct poem container
    const poemContainer = document.querySelector(`.${poemUid}.poem-lines-container`) as HTMLElement | null;

    if (!poemContainer) {
        console.warn(`Poem container not found: ${poemUid}`);
        return;
    }

    // Select all poem lines within this poem
    const lines = poemContainer.querySelectorAll(`.${poemUid}.poem-line`);

    if (lines.length === 0) {
        console.warn(`No poem lines found: ${poemUid}`);
        return;
    }

    // Ensure only one line is visible at a time
    lines.forEach((line, index) => {
        (line as HTMLElement).style.opacity = index === currentLineIndex ? "1" : "0";
        (line as HTMLElement).style.transform = index === currentLineIndex ? "translateY(0)" : "translateY(150px)";
        (line as HTMLElement).style.position = "absolute";
        (line as HTMLElement).style.transition = "opacity 1.5s ease-in-out, transform 1.5s ease-in-out";
    });

    // Move to the next line when clicked
    if (currentLineIndex < lines.length - 1) {
        currentLineIndex++;
    } else {
        // If it's the last line, fade out the ellipses
        const ellipsesContainer = document.querySelector(".ellipsesContainer") as HTMLElement;
        if (ellipsesContainer) {
            ellipsesContainer.classList.add("fade-out");
        }
    }
}

// POEM-001-008
