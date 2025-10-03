import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css';

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="p-10 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl text-center border border-white/20">
        <h1 className="text-white text-5xl font-extrabold drop-shadow-lg mb-6 animate-pulse">
          🚀 Tailwind is working!
        </h1>
        <p className="text-white/80 text-lg mb-4">
          Styled with <span className="font-semibold text-yellow-300">Vite + Tailwind</span>
        </p>
        <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-xl shadow-lg hover:scale-105 hover:bg-yellow-300 transition-transform duration-300">
          Click Me ✨
        </button>
      </div>
    </div>
  );
}

export default App;
