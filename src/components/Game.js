import React, { Component } from 'react'
import { AppContext } from './provider';
import './Player'
import { Game_Chooose, SYMBOLS, TURNS } from './Player';
import './Game.css';

const SYMBOL_PLACEHOLDER = "I";

const Cell =(props) =>{
    return(
        <AppContext.Consumer>
            {context =>{
                const value = context.cells[props.index];
                const symb = value !== null ? SYMBOLS[value]: SYMBOL_PLACEHOLDER;
                const isDoneClas = symb !== SYMBOL_PLACEHOLDER ? 'done': '';

                return(
                    <button 
                    className={`cell cell-${props.index} ${isDoneClas}`}
                    onClick={()=> context.humanPlay(props.index)}>
                        {symb}
                    </button>
                )
            }
            }
        </AppContext.Consumer>
    )
}

class Board extends Component {
    constructor(props) {
      super(props);
      this.boardRefer = React.createRef();
    }
    componentDidUpdate() {
        if (this.context.gameState.position !== "") {
          setTimeout(() => {
            this.boardRefer.current.classList.add('full');
          }, 50);
        } else {
          this.boardRefer.current.classList.remove('full');
        }
      }
      render() {
        return (
          <div className={`board ${this.context.gameState.position}`} ref={this.boardRefer}>
            <div className="board-row">
              <Cell index={0} />
              <Cell index={1} />
              <Cell index={2} />
            </div>
    
            <div className="board-row">
              <Cell index={3} />
              <Cell index={4} />
              <Cell index={5} />
            </div>
    
            <div className="board-row">
              <Cell index={6} />
              <Cell index={7} />
              <Cell index={8} />
            </div>
          </div>
           )
        }
    }
    Board.contextType = AppContext;

    class Game extends Component{
        render() {
            let TextIn = '';
            const currentsymbolType = this.context.currentSymbol;
            if(this.context.gameState.isTie){
                TextIn='Tie!!';
            }
            else{
                if(this.context.gameType === Game_Chooose.Two_Player){
                    if(this.context.gameState.position === ""){
                        TextIn= `It is player(${SYMBOLS[currentsymbolType]}) turn`;
                        
                    }else{
                        TextIn = `Player(${SYMBOLS[1-currentsymbolType]})`
                    }
                }else{
                    if (this.context.gameState.position === "") {
                        if (this.context.playerTurn === TURNS.Human) TextIn = `It's your turn`;
                        else TextIn = `It's computer turn`;
                }else{
                    if(this.context.playerTurn === TURNS.Human)
                    TextIn = `Computer win!`;
                    else 
                    TextIn = `You win!`;
                }
            }
        }

            return (
                <main className="main">
                    <div className='info'>{TextIn}</div>
                    <Board />
                </main>
            );
        }
    }
Game.contextType = AppContext;
export default Game;