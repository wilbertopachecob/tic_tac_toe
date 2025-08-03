# 🎮 Tic Tac Toe Game

A modern, responsive Tic Tac Toe game built with React. Features a clean UI, smooth animations, and an intuitive user experience.

![Tic Tac Toe Game](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![License](https://img.shields.io/badge/License-MIT-green)
![Version](https://img.shields.io/badge/Version-1.0.0-orange)

## ✨ Features

- 🎯 **Classic Gameplay**: Traditional 3x3 Tic Tac Toe with X and O players
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- 🔄 **Game State Management**: Tracks current player, game status, and winner
- 🏆 **Win Detection**: Automatically detects winning combinations and ties
- 🔄 **Reset Functionality**: Easy game restart with a single click
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Performance Optimized**: Built with modern React practices and hooks

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to play the game!

## 🎮 How to Play

1. **Start the Game**: The game begins with player O
2. **Take Turns**: Players alternate placing their symbol (X or O) on the board
3. **Win Conditions**: Get three of your symbols in a row (horizontally, vertically, or diagonally)
4. **Game End**: The game ends when someone wins or all squares are filled (tie)
5. **Play Again**: Click "Start Again" to begin a new game

## 🛠️ Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run lint`
Runs ESLint to check for code quality issues.

### `npm run lint:fix`
Automatically fixes ESLint issues where possible.

### `npm run format`
Formats all code files using Prettier.

### `npm run format:check`
Checks if all files are properly formatted.

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Block/           # Individual game square component
│   └── Board/           # Main game board component
├── constants.ts         # Game constants and configurations
├── utilities.ts         # Utility functions
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main application component
├── App.css             # Global styles
└── index.tsx           # Application entry point
```

## 🎨 Technologies Used

- **React 18.3.1** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript development
- **SCSS Modules** - Scoped styling with CSS modules
- **ESLint & Prettier** - Code quality and formatting
- **Create React App** - Development environment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Create React App](https://github.com/facebook/create-react-app)
- Icons and styling inspiration from modern design systems
- Community feedback and suggestions

## 📞 Support

If you have any questions or suggestions, please open an issue on GitHub or contact the maintainers.

---

**Enjoy playing Tic Tac Toe! 🎮**
