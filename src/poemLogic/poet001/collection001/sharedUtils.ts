type AnimationConfig = {
    [uid: string]: (poemUid: string) => void;
};

export function handlePoemAnimation(poemUid: string, config: AnimationConfig) {
    document.querySelectorAll(".poem-line").forEach((line) => {
        (line as HTMLElement).style.opacity = "1";
        (line as HTMLElement).style.transform = "none";
    });

    const animationFunction = config[poemUid];
    if (animationFunction) {
        try {
            animationFunction(poemUid); // Pass the poem UID to the function
        } catch (error) {
            console.error(`Error executing animation for ${poemUid}:`, error);
        }
    } else {
        return
    }
}

export function hidePoemLinesOnLoad(poemUid: string) {
    const poemContainer = document.querySelector(`.${poemUid}.poem-lines-container`) as HTMLElement;
    const lines = Array.from(poemContainer.querySelectorAll(`.${poemUid}.poem-line`)) as HTMLElement[];

    // Ensure all lines are hidden on page load
    lines.forEach((line) => {
        line.style.opacity = "0";
        line.style.display = "none";
    });

    poemContainer.setAttribute("data-line-index", "0");
}

export function loadLinesFlashEffect(poemUid: string) {
    const poemContainer = document.querySelector(`.${poemUid}.poem-lines-container`) as HTMLElement;
    const lines = Array.from(poemContainer.querySelectorAll(`.${poemUid}.poem-line`)) as HTMLElement[];

    let currentStartIndex = parseInt(poemContainer.getAttribute("data-line-index") || "0", 10);
    let currentEndIndex = currentStartIndex + 4; // Show 4 lines per click

    if (currentStartIndex >= lines.length) {
        poemContainer.setAttribute("data-line-index", "0");
        currentStartIndex = 0;
        currentEndIndex = 4;
    }

    // **Apply Flash Effect to Entire Viewport**
    const getFlashColor = (poemUid: string) => {
        switch (poemUid) {
            case "poem-002-004":
                return "#ffffff";
            case "poem-003-001":
                return "#fb5607";
            default:
                return "#20e72e";
        }
    };

    const fullViewport = document.body;
    fullViewport.style.transition = "background-color 0.2s ease-in-out";
    fullViewport.style.backgroundColor = getFlashColor(poemUid);

    setTimeout(() => {
        fullViewport.style.backgroundColor = ""; // Reset after flash
    }, 200);

    // **Step 1: Hide all previous lines**
    lines.forEach((line) => {
        line.style.opacity = "1";
        line.style.display = "none";
    });

    // **Step 2: Reveal Next 4 Lines**
    setTimeout(() => {
        for (let i = currentStartIndex; i < currentEndIndex; i++) {
            if (lines[i]) {
                lines[i].style.display = "block"; // Ensure it's visible
                lines[i].style.opacity = "0"; // Start hidden for animation effect
                lines[i].style.transition = "opacity 1s ease-in";

                setTimeout(() => {
                    lines[i].style.opacity = "1"; // Fade in smoothly
                }, 20);
            }
        }

        // **Update index for next click**
        poemContainer.setAttribute("data-line-index", currentEndIndex.toString());
    }, 200); // Matches the flash duration
}
