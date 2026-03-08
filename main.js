const quotes = [
  "Life is short. Smile while you still have teeth.",
  "Never put off till tomorrow what you can do the day after tomorrow.",
  "I'm not lazy, I'm on energy-saving mode.",
  "My bed and I have a special relationship. We're perfect for each other.",
  "I like hashtags because they look like waffles.",
  "Stressed spelled backwards is desserts. Coincidence? I think not!",
  "I'm not superstitious, but I am a little stitious.",
  "I'm on a seafood diet. I see food and I eat it.",
  "If at first you don't succeed, then skydiving definitely isn't for you.",
  "Always remember that you are absolutely unique. Just like everyone else.",
  "I'm writing a book. I've got the page numbers done.",
  "The only thing I throw back on Thursdays is a good coffee.",
  "You don't have to be crazy to hang out with me. I can train you.",
  "The early bird gets the worm, but the second mouse gets the cheese.",
  "I'm not saying I'm Superman, but no one has ever seen me and Superman in the same room together.",
];

const dateDisplay = document.getElementById('date-display');
const quoteDisplay = document.getElementById('quote-display');
const nextQuoteButton = document.getElementById('next-quote-button');
const currentPage = document.querySelector('.calendar-page.current-page');
const themeToggleButton = document.getElementById('theme-toggle'); // Get existing button

// Theme Toggle
const currentTheme = localStorage.getItem('theme') || 'light';
document.body.classList.toggle('dark-mode', currentTheme === 'dark');
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});

let quoteIndex = 0; // Tracks the current quote from the array for daily display
let manualQuoteIndex = 0; // For dev button to cycle through

function getQuoteForDisplay(isManual = false) {
  if (isManual) {
    return quotes[manualQuoteIndex];
  } else {
    // Calculate daily quote index
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    quoteIndex = dayOfYear % quotes.length;
    return quotes[quoteIndex];
  }
}

function updateCalendarDisplay(animateTear = false, isManual = false) {
  const today = new Date();
  dateDisplay.textContent = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const newQuote = getQuoteForDisplay(isManual);

  if (quoteDisplay.textContent === newQuote && !animateTear) {
    // Quote is already displayed and no animation needed, unless manual update requires animation
    return;
  }

  if (animateTear) {
    // Simple visual tear effect: move current page slightly and then update content
    currentPage.classList.add('tear-off-active');
    setTimeout(() => {
      quoteDisplay.textContent = newQuote;
      currentPage.classList.remove('tear-off-active');
    }, 400); // Half of transition duration
  } else {
    quoteDisplay.textContent = newQuote;
  }
}

// Initial load
updateCalendarDisplay(false);

// Dev button functionality
nextQuoteButton.addEventListener('click', () => {
  manualQuoteIndex = (manualQuoteIndex + 1) % quotes.length;
  updateCalendarDisplay(true, true); // Animate tear and use manual quote
});

// Optional: Daily check and update (if the user keeps the tab open)
// This is a simplified check. A more robust solution would involve server-side logic
// or more precise client-side scheduling.
setInterval(() => {
  const currentDisplayedQuote = getQuoteForDisplay(false);
  if (quoteDisplay.textContent !== currentDisplayedQuote) {
    updateCalendarDisplay(true);
  }
}, 1000 * 60 * 60); // Check every hour