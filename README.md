# React Memory Game

A memory game built with React where players must remember and repeat an increasing sequence of numbers.

## Features

-  Progressive difficulty: sequences get longer and display time gets shorter as you advance
-  Visual feedback with animations using Framer Motion
-  Sound effects for interactions (success, failure, button clicks)
-  Responsive design optimized for tablet (1200x800 pixels)
-  Accessibility features with proper ARIA labels

## Game Rules

1. The game displays a sequence of random numbers one at a time
2. After the sequence is shown, you must enter the numbers in the correct order
3. If you get it right, you advance to the next level with a longer sequence
4. If you make a mistake, the game resets to level 1
5. You have 10 minutes to achieve the highest possible score
6. Your score increases based on the length of sequences you correctly remember

## Tech Stack

-  React 18+ with TypeScript
-  Styled Components for styling
-  Framer Motion for animations
-  Custom React hooks for game logic

## Getting Started

1. Clone the repository
   ```
   git clone https://github.com/raphaelbabilonia/react-memory-game.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Sound Files

The game uses sound effects for various interactions. For a production application, you would need to add actual sound files in the `public/sounds` directory:

-  `success.mp3`: Sound played when the player correctly remembers a sequence
-  `error.mp3`: Sound played when the player makes a mistake
-  `button.mp3`: Sound played when a button is pressed
-  `sequence.mp3`: Sound played when a number is displayed in the sequence

The application is designed to handle missing sound files gracefully.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.
