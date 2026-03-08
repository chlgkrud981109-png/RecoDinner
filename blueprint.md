# RecoDinner: A Memo Service for Anxious Thoughts

## Overview

RecoDinner is a simple, client-side web application that allows users to write down their anxious thoughts. The goal is to provide a safe and private space for users to externalize their anxieties, which can be a helpful coping mechanism.

## Features

*   **Create Memos:** Users can enter their thoughts into a text area and save them as memos.
*   **View Memos:** All created memos are displayed in a list.
*   **Persistence:** Memos are saved in the browser's local storage, so they persist even after the user closes the browser.
*   **Delete Memos:** Users can delete memos they no longer need.

## Design

The application will have a clean and simple design, with a focus on usability. The UI will consist of:

*   A text input area for creating new memos.
*   A button to add a new memo.
*   A list of existing memos, with a delete button for each memo.

## Plan

1.  **HTML Structure:** Create the basic HTML structure in `index.html`.
2.  **CSS Styling:** Add styles in `style.css` for a clean and minimal look.
3.  **JavaScript Logic:** Implement the application logic in `main.js` using ES Modules and Web Components.
    *   Create a `<memo-item>` custom element to display each memo.
    *   Use local storage to save and retrieve memos.
    *   Implement the logic for adding and deleting memos.
