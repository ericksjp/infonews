import { noticiasRegularesSection } from "../util/homeTags";

// Set the breakpoint width
const breakpoint = 1020; // Replace with your desired width

// Create a MediaQueryList object
const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

// Function to handle the event
function handleWidthChange(e) {
  // Get the first two child elements
  const elements = Array.from(noticiasRegularesSection.children).slice(0, 2);
  console.log(elements)

  if (e.matches) {
    // Screen width is 768px or less
    elements.forEach(element => {
      element.classList.remove("hidden");
    });
  } else {
    // Screen width is greater than 768px
    elements.forEach(element => {
      element.classList.add("hidden");
    });
  }
}

// Add a listener for changes
mediaQuery.addEventListener("change", handleWidthChange);

// Call the handler immediately to check the current state
handleWidthChange(mediaQuery);

