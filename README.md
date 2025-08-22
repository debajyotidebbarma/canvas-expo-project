# AI-Advisor

## Component-Structure

![component](https://github.com/debajyotidebbarma/canvas-expo-project/raw/main/component-structure.png)


## Component Overview

- **App.js**: Root entry point; wraps `MainApp` in `SafeAreaProvider`.
- **MainApp**: Handles state management, AI integration, automatic scrolling, and message editing.
- **Header**: Displays the app logo and optional title.
- **ChatMessages**: Scrollable container that holds all chat messages.
- **ChatMessage**: Represents a single chat bubble, either user or AI.
- **ChatComposer**: Bottom input section for typing, sending, updating, and stopping AI responses.
.


## State-management-data-flow

![data-flow](https://github.com/debajyotidebbarma/canvas-expo-project/raw/main/state-management-data-flow.png)


## Reducer & Typing Animation

### Reducer (`reducer.js`)
Handles all chat state transitions. State structure includes:

- **messages**: Array of chat messages (child of reducer).  
- **query**: Current content of the input field (child of reducer).  
- **loading**: AI typing state.

The reducer updates these states based on user actions like sending, updating, or editing messages.

### Typing Animation (`typingAnimation.js`)
Simulates real-time AI typing by gradually updating the AI message text as it streams.
.



## Data Flow Summary

1. **User Input**  
   - The user types a message in the **ChatComposer**.

2. **Send / Update**  
   - Clicking the **Send/Update** button triggers `handleSendOrUpdate`.
   - The reducer updates the messages state with the user input.

3. **AI Response**  
   - `AIHandler` calls the API and streams the AI response.
   - `TypingAnimation` updates the AI message incrementally as it streams.

4. **Auto Scroll**  
   - The `ScrollView` automatically scrolls to the latest message.

5. **Edit Message**  
   - The user can edit a message, triggering `handleEdit`.
   - This regenerates the AI response for the updated message.

6. **Stop Action**  
   - Clicking the **Stop** button interrupts the typing animation via `handleStop`.






## File / Folder Roles

| Folder / File                  | Responsibility                                      |
|--------------------------------|----------------------------------------------------|
| `App.js`                        | Root component, initializes `MainApp`.           |
| `components/Header.js`          | Top header with logo.                             |
| `components/ChatMessages.js`    | Scrollable container for all messages.           |
| `components/ChatMessage.js`     | Individual message bubble (user or AI).          |
| `components/ChatComposer.js`    | Input, send/update, and stop buttons.            |
| `components/style/styles.js`    | Centralized styles.                               |
| `components/utils/reducer.js`   | Chat state management logic.                      |
| `components/utils/AIHandler.js` | Handles AI API call and response.                 |
| `components/utils/typingAnimation.js` | Simulates typing animation for AI.        |
| `Data/product_catalog.js`       | Static product catalog for AI to recommend from. |
| `assets/AI-logo.png`            | Logo image.                                       |





## Key Design Decisions

1. **Component-Based Architecture**  
   - The app is modularized into **reusable components**: `Header`, `ChatMessages`, `ChatMessage`, and `ChatComposer`.  
   - This improves maintainability, readability, and allows easy addition of new features.

2. **Centralized State Management via Reducer**  
   - Using `reducer.js` to manage `messages`, `query`, and `loading` ensures **predictable state transitions**.  
   - All chat logic flows through a single source of truth, making debugging easier.

3. **Separation of Concerns**  
   - **UI components** (`Header`, `ChatMessage`, `ChatComposer`) are decoupled from **logic components** (`AIHandler`, `typingAnimation`, `reducer`).  
   - This allows independent testing and easier updates to AI logic or UI styling.

4. **AI Integration & Streaming Responses**  
   - `AIHandler` manages API calls, while `typingAnimation` simulates real-time typing.  
   - This improves user experience by showing incremental AI responses instead of waiting for the full response.

5. **Editable Chat Messages**  
   - Users can edit previous messages, and the system regenerates the AI response.  
   - This decision adds flexibility and improves conversational accuracy.

6. **Stop Button**  
   - Provides the user with the ability to **interrupt the AI response** while it’s streaming.  
   - Connected to `handleStop`, it stops the **typing animation** and leaves the partially generated message visible.  
   - Improves **user control**, **responsiveness**, and supports iterative conversation adjustments.

7. **Safe Area Handling**  
   - Wrapping `MainApp` with `SafeAreaProvider` ensures the app renders correctly across **different devices and notches**, providing a consistent UI.

8. **Automatic Scroll to Latest Message**  
   - The `ScrollView` automatically scrolls to the newest message, improving usability in active conversations.

9. **Clear Separation of Assets and Data**  
   - Images, styles, and static data (`product_catalog.js`) are organized in separate folders for clarity and easier management.

10. **Logo and Branding**  
    - The **AI-logo.png** is prominently displayed in the `Header`.  
    - Visually reinforces app identity and provides a **professional and trustworthy look**.  
    - Helps users quickly recognize the app, improving **user engagement** and **brand recall**.
