import React, { Component } from 'react'
import './Player'
import { Game_Chooose, TURNS, findRandomMove, getRandom, replace, checkGameStatus, findBestMove } from './Player';

const TAKEN_TIME = 500;

export const AppContext = React.createContext();

 export default class AppProvider extends Component{
    initailState = {
        gameType: Game_Chooose.Two_Player,
        currentSymbol: getRandom(0, 2),
        playerTurn: getRandom(0, 2),
        cells: new Array(9).fill(null),
        gameState: {
          position: "",
          SymbolType: null,
          isTie: null,
        },
      }
      state = {
        gameType: this.initailState.gameType,
        currentSymbol: this.initailState.currentSymbol,
        playerTurn: this.initailState.playerTurn,
        cells: this.initailState.cells,
        gameState: this.initailState.gameState,

        changeGameType: (type) =>{
            if(this.state.gameType !== type){
                this.initiateNewGame(type);
            }
        },
        humanPlay:(index) =>{
            this.humanPlay(index)
        },
        newGame:()=>{
            this.initiateNewGame(this.state.gameType);
        }
    }
    initiateGame=()=>{
        if(this.state.gameType === Game_Chooose.With_Conpueter &&
            this.state.playerTurn === TURNS.Computer){
                if(this.timeout){
                    clearTimeout(this.timeout);
                }

                this.timeout = setTimeout(()=>{
                    const randomMove = findRandomMove(this.state.cells);
                    this.computerPlay(randomMove);
                }, TAKEN_TIME);
            }
        }
        initiateNewGame=(type = this.initailState.gameType) =>{
            this.setState(()=>{
                return{
                    gameType: type,
                    currentSymbol: getRandom(0,2),
                    playerTurn: getRandom(0,2),
                    cells: this.initailState.cells,
                    gameState: this.initailState.gameState,
                }
            },()=>{
                this.initiateGame();
            });
        }

        applyingState = (prev , index) =>{
            const cells = prev.cells;
            const nextSymbol = 1 - prev.currentSymbol;
            const nectPlaterTurn = 1- prev.playerTurn;
            const nextcells = replace(cells, index, prev.currentSymbol);
            const gameState = checkGameStatus(nextcells);
            return {
                gameState: gameState,
                currentSymbol: nextSymbol,
                playerTurn: nectPlaterTurn,
                cells: nextcells
            }
        }

        humanPlay = (index) => {
            if (this.state.gameState.position === "" && this.state.cells[index] === null &&
              (this.state.gameType === Game_Chooose.Two_Player || this.state.playerTurn === TURNS.Human)) {
        
              this.setState(prev => {
                return this.applyingState(prev, index);
              }, () => {
                // Make a move for computer if the game is in 'versus computer' mode
                if (this.state.gameState.position === "" &&
                  this.state.gameType === Game_Chooose.With_Conpueter &&
                  this.state.playerTurn === TURNS.Computer) {
        
                  setTimeout(() => {
                    this.AI();
                  }, TAKEN_TIME);
                }
              });
            }
          }
        
          computerPlay = (index) => {
            if (this.state.gameState.position === "" && this.state.cells[index] === null &&
              this.state.gameType === Game_Chooose.With_Conpueter &&
              this.state.playerTurn === TURNS.Computer) {
        
              this.setState(prev => this.applyingState(prev, index));
            }
          }
        

        AI=()=>{
            const bestMove = findBestMove(this.state.cells, this.state.currentSymbol);

            if(bestMove !== null){
              this.computerPlay(bestMove)
            }
        }

        componentDidMount(){
            this.initiateGame();
        }
     render() {
         return (
              <AppContext.Provider value= {this.state}>
                  {this.props.children}
              </AppContext.Provider>
         );
     }
    }