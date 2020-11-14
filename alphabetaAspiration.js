
const WINDOW_SIZE = 5;


function aspiration(node, depth, previous, isMaximazing)
{
    alpha = previous - WINDOW_SIZE; 
    beta = previous + WINDOW_SIZE; 
    
    
    while(true)
    {
        let result = alphabeta(node, depth, alpha, beta, isMaximazing)
        if(result <= alpha)
        {
            alpha = -Infinity;
        } 
        else if(result >= beta)
        {
            beta = Infinity;
        } 
        else return result;
    }


}


function alphabeta(node, depth, alpha = -Infinity, beta = Infinity, isMaximazing)
{
    if(depth == 0 || checkPlayerWin(node))
    {
        return calculate(node);
    }

    if(isMaximazing)
    {
       
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
                    alpha = Math.max(alpha, alphabeta(boardTMP, depth-1, alpha, beta, false));
                    if(alpha >= beta) return beta;
                }
            }
        }
        return alpha;
    }

    else
    {
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
                    beta = Math.min(beta, alphabeta(boardTMP, depth-1, alpha, beta, true));
                    if(alpha >= beta) return alpha;
                }
            }
        }
        return beta;
    }
}
