const enemy = -1;
const you = 1;

let boardSize = 4;
let board;

board = createBoard();
showBoard(board);
makeMove(you,2,2);
bestMove();
bestMove();
bestMove();
bestMove();
bestMove();
bestMove();
console.log("----------------");
showBoard(board);



function minimax(node, depth, isMaximazing)
{
    if(depth == 0 || checkPlayerWin(node))
    {
        return calculate(node);
    }

    if(isMaximazing)
    {
        let value = -Infinity;
        for(let x = 0; x < boardSize; x++)
        {
            for(let y = 0; y < boardSize; y++)
            {
                if(node[x][y] == 0)
                {
                    let boardTMP = node.map(function(tab)
                {
                    return tab.slice();
                })
                    boardTMP[x][y] = 1;
                    value = Math.max(value, minimax(boardTMP, depth-1, false));
                }
            }
        }
        return value;
    }

    else
    {
        let value = -Infinity;
        for(let x = 0; x < boardSize; x++)
        {
            for(let y = 0; y < boardSize; y++)
            {
                if(node[x][y] == 0)
                {
                    let boardTMP = node.map(function(tab)
                {
                    return tab.slice();
                })
                    boardTMP[x][y] = -1;
                    value = Math.max(value, minimax(boardTMP, depth-1, true));
                }
            }
        }
        return value;
    }
}

function bestMove()
{
    let bestMove = [];
    let bestScore = -Infinity;
    let score = -Infinity;
    let boardTMP;
    for(let x = 0; x < boardSize; x++)
    {
        for(let y = 0; y < boardSize; y++)
        {
            if(board[x][y] == 0)
            {
                boardTMP = board.map(function(tab)
                {
                    return tab.slice();
                })

                boardTMP[x][y] = 1; // do tego momentu działa dobrze
                score = minimax(boardTMP,2,true);

                if(score > bestScore)
                {
                    console.log(score);
                    bestScore = score;
                    bestMove = [x, y];
                }
            }
        }
    }

    makeMove(you, bestMove[0], bestMove[1]);

}


function calculate(node)
{
    
    let cost = 0;
    let inOneColumn = 0;
    let enemyInOneColumn = 0;
    let bestPlayerColumn = 0;
    let worstEnemyColumn = 0;

    for(let x = 0; x < boardSize; x++)
    {
        for(let y = 0; y < boardSize; y++)
        {
            if(node[x][y] == 1) inOneColumn++; 
            if(node[x][y] == -1)  enemyInOneColumn++;
        }  
            
        if(inOneColumn > bestPlayerColumn) bestPlayerColumn = inOneColumn;
        if(enemyInOneColumn > worstEnemyColumn) worstEnemyColumn = enemyInOneColumn;
        inOneColumn = 0;
        enemyInOneColumn = 0;
    }
    //console.log(bestPlayerColumn);
    if(checkPlayerWin(node)) cost += 100;
    cost = bestPlayerColumn;
    cost -= worstEnemyColumn;
    return cost;
}


function showBoard(board)
{
    for(let y = 0; y < boardSize; y++)
    {
        let s = '';
        for(let x = 0; x < boardSize; x++)
        {
            if(board[x][y] >= 0) s+= " ";
            s += board[x][y];   
        }
        console.log(s);
    }
}

function createBoard()
{
   let emptyBoard = new Array(boardSize);

for(let i = 0; i < emptyBoard.length; i++)
{
    emptyBoard[i] = new Array(boardSize);
}

for(let x = 0; x < emptyBoard.length; x++)
{
    for(let y = 0; y < emptyBoard.length; y++)
    {
        emptyBoard[x][y] = 0;
    }
}
    return emptyBoard;
}

function makeMove(player, x, y)
{
    board[x][y] = player;
}



function checkPlayerWin(board)
{   
    for(let x = 0; x < boardSize; x++)
    {
        if(board[x][0] == 1)
        {
            
            let path = new Array(boardSize);
            for(let i = 0; i < path.length; i++)
            {
                 path[i] = new Array(boardSize);
            }

            path[x][0] = 1;
            if (checkAround(x,0,path,board)) return true;;  
        }
    }
    return false;
}

function checkAround(x,y,path,board)
{
    if(y == boardSize-1  && board[x][y] == 1)
    {
        return true;
    } 
    
    else
    {
        if(x-1>=0)
        { 
            //left
            if(board[x-1][y] == 1 && path[x-1][y] != 1) 
            {
                path[x-1][y] = 1;
                return false || checkAround(x-1,y,path,board);  
            }    
    }   
     
    if(x+1 <= boardSize-1)
    {
        //right
        if (board[x+1][y] == 1 && path[x+1][y] != 1)
        {
            path[x+1][y] = 1;
            return false || checkAround(x+1,y,path,board);
        } 
    }

   if(y-1>=0)
    {
        //up
        if (board[x][y-1] == 1 && path[x][y-1] != 1) 
        {   
            path[x][y-1] = 1;
            return false || checkAround(x,y-1,path,board);   
        } 
    }    
     
    if(y+1 <= boardSize-1)
     {
        //down
        if (board[x][y+1] == 1 && path[x][y+1] != 1)
        {   
            path[x][y+1] = 1;
            return false || checkAround(x,y+1, path,board); 
        } 
    }

    if(y-1>=0 && x-1 >= 0)
    {
        //upLeft
        if (board[x-1][y-1] == 1 && path[x-1][y-1] != 1) 
        {
            path[x-1][y-1] = 1;
            return false || checkAround(x-1,y-1, path,board);   
        } 
    }    
    
    if(y+1<=boardSize-1 &&  x+1 <= boardSize-1)
    {
        //downRight
        if (board[x+1][y+1] == 1 && path[x+1][y+1] != 1) 
        {
            path[x+1][y+1] = 1;
            return false || checkAround(x+1,y+1, path,board);    
        }       
    } 
}
}