function monteCarlo(node, nofSimulations){

    let bestChild = null;
    let bestProbability = -1;
    node.children.forEach(child=> {
        let r = 0;
        for(let i = 0; i < nofSimulations; i++){
            let child2 = child;
            while (!checkWin(child2.board)){
                
                legalMoves(child2);
            }
        }
      
        if(child.isWinning === "Player") r++;
        probability = r/nofSimulations;
        if (probability > bestProbability){
            bestChild = child;
            bestProbability = probability;
        }
    });

    return bestChild;
}

function generateChildren(){
    let children = [];
    let moves = [];
    let possibleMoves = getPossibleMoves(board);
    for(let i = 0; i < possibleMoves.length; i++){
        moves.push(possibleMoves[i]);
        let node = new MonteCarloNode();
        node.board = board;
        node.x = possibleMoves[i].x
        node.y = possibleMoves[i].y
        moves.forEach(move => {
            node.board[move.x][move.y] = 1;
        });
        children.push(node);
        moves = [];
    }
    return children
}

function legalMoves(node){
    
    let moves = [];
    let possibleMoves = getPossibleMoves(node.board);
    moves.push(possibleMoves[Math.random() * possibleMoves.length])
    node.x = moves[moves.length - 1].x;
    node.y = moves[moves.length - 1].y;
    moves.forEach(move => {
        node.board[move.x][move.y] = 1;
        
    });
}


function MonteCarloNode() {
 
    this.board = board;
    this.children = generateChildren();
    this.x = 0;
    this.y = 0;
    this.isWinning = "";

    }