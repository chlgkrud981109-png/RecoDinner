# Quote of the Day Service

## Overview

This service will display a new, light-hearted quote every day, inspired by a tear-off calendar design. The goal is to provide a moment of daily reflection and a visually engaging experience.

## Features

*   **Daily Quote Display:** Shows one unique quote per day.
*   **Tear-off Calendar UI:** Visual design inspired by a tear-off calendar.
*   **"Tear" Animation:** When a new day's quote is displayed, the previous quote visually "tears off" from the top.
*   **Persistent Quote Display:** The quote for the current day remains visible until the next day.
*   **Quote Storage:** A collection of light-hearted quotes will be embedded in the application.

## Design

The UI will mimic a physical tear-off calendar.
*   **Calendar Card:** A central card element will represent the calendar page.
*   **Quote Display:** The quote will be prominently displayed on the card.
*   **Date Display:** The current date will be shown, possibly at the top of the card.
*   **Tear Effect:** The top edge of the calendar card will have a subtle "torn" paper effect. When the quote updates, an animation will simulate the tearing.

## Plan

1.  **HTML Structure:** Create `index.html` with a container for the calendar and quote display.
2.  **CSS Styling:** Implement the tear-off calendar design in `style.css`, including the torn paper effect and the overall aesthetic.
3.  **JavaScript Logic:** Implement `main.js` to:
    *   Store and manage the collection of quotes.
    *   Determine the current day's quote based on the date.
    *   Update the display daily.
    *   Implement the "tear-off" visual effect/animation.