export const Game_Chooose={
    Two_Player : 0,
    With_Conpueter: 1
}
export const SYMBOL_Types={
    O: 0,
    X: 1
}
export const SYMBOLS= ['O','X'];
//type of turns default will be human
export const  TURNS={
    Human : 0,
    Computer: 1
}

const getEmptyCells = (cells) => {
    return cells
      .map((val, idx) => [val, idx])
      .filter(item => item[0] === null);
  }
const checkLeftMove=(cells)=>{
    const emptycells = getEmptyCells(cells);
    return emptycells.length > 0;
}

export const checkGameStatus=(cells)=>{
    const winlines=[
    [0, 1, 2], // h.h0
    [3, 4, 5], // h.h1 
    [6, 7, 8], // h.h2
    [0, 3, 6], // v.v0
    [1, 4, 7], // v.v1
    [2, 5, 8], // v.v2
    [0, 4, 8], // d.d0
    [2, 4, 6]  // d.d1
    ];

    let position ="";
   
    for(let i=0;i<winlines.length;i++){
      const [a,b,c] = winlines[i];

      if(cells[a]!==null && cells[a] === cells[b] && cells[a]===cells[c]){
          if(i >= 0 && i<=2) position=`h h${i}`;
          else if(i>= 3 && i<= 5) position= `v v${i-3}`;
          else position = `d${i - 6}`;

          return{
              position,
              symbolType: cells[a],
              isTie: null
          }
      }
    }

    return{
        position: "",
        symbolType: null,
        isTie: checkLeftMove(cells) ? null : true
    };
}

export const getRandom = (start , end)=>{
    return start + Math.floor(Math.random()* (end - start));
}

export const replace = (cells, index, value) =>{
    return [...cells.slice(0,index) , value, ...cells.slice(index +1, cells.length)];

}
/*RANDOM MOVES*/
export const findRandomMove=(cells)=>{
    const emptycells = getEmptyCells(cells);
    if(emptycells.length > 0){
        const randomNumber = getRandom(0, emptycells.length);
        const index = emptycells[randomNumber][1];

        return index;
    }
    return null;
}

/*finding best movrv based on minimax algorithm*/

const calculate = (cells, computerType) =>{
    const winlines = [
        [0, 1, 2], // h.h0
        [3, 4, 5], // h.h1 
        [6, 7, 8], // h.h2
        [0, 3, 6], // v.v0
        [1, 4, 7], // v.v1
        [2, 5, 8], // v.v2
        [0, 4, 8], // d.d0
        [2, 4, 6]  // d.d1
    ];

    for(let i=0;i<winlines.length;i++){
        const [a,b,c] = winlines[i];

        if(cells[a] !== null && cells[a] === cells[b] && cells[a] === cells[c]){
            if(cells[a] === computerType) return 10;
            return -10;
        }
    }
    return 0;
}
//minimax algorithm
const minimax = (cells, depth , computerType , isMax)=>{
    const point = calculate(cells, computerType);
//checking the score
    if(point === 10) return point - depth;

    if(point === -10) return point + depth;

    if(!checkLeftMove(cells)) return 0;

    const lengthCells = cells.length;
    let best;

    if(isMax){
        best = -1000;

        for(let i=0 ;i<lengthCells; i++){
            const cell = cells[i];

            if(cell === null){
                const nextcells = replace(cells,i,computerType);

                best = Math.max(best, minimax(nextcells ,depth+1, computerType, !isMax));
            }
        }
    }else{
        best = 1000;

        for(let i=0;i<lengthCells ;i++)
        {
            const cell = cells[i];

            if(cell === null){
                const nextcells = replace(cells, i , 1- computerType);

                best = Math.min(best, minimax(nextcells, depth+1, computerType, !isMax));

            }
        }
    }
    return best;
}

export const findBestMove = (cells,computerType)=>{
   let bestValue = -1000;
    let bestMove = null;

    const lengthCells = cells.length;

    for(let i=0;i <lengthCells;i++){
        const cell = cells[i];

        if(cell === null){
            const nextcells = replace(cells,i,computerType);

            const moveValue = minimax(nextcells,0,computerType, false);


            if(moveValue > bestValue){
                bestValue = moveValue;
                bestMove = i;
            }
        }
    }
    return bestMove;
}