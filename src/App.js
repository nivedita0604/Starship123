import React, { Component } from 'react';
import AppProvider from './components/provider';
import Header from './components/Header';
import Game from './components/Game';
import Footer from './components/Footer';
import './App.css'
class App extends Component {
  render() {
    return (
      <AppProvider>
        <div className="crew">
          <h1>Bored in Spaceship?? <img src="https://img.icons8.com/cotton/64/000000/space-shuttle.png" alt="spaceship"/></h1>
            <p>Let's Play Game</p>
          </div>
        <div className="app">
          <Header />
          <Game />
          <Footer />
        </div>
      </AppProvider>
    );
  }
}

export default App;