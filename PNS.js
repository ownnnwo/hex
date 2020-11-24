function PNS(root){
   
evaluate(root);
setProofAndDisproofNumbers(root);
let mostProving
let current = root;
while(root.proof != 0 && root.disproof != 0 && resourceAvailable()){
    mostProving = selectMostProvingNode();
    expandNode(mostProving);
    current = updateAncestors(mostProving, root);
}
}


function setProofAndDisproofNumbers(node){
    if(node.expanded){
        if(node.type === "AND"){
            node.proof = 0;
            node.disproof = Infinity;
            node.children.forEach(child => {
                node.proof += child.proof;
                node.disproof = Math.min(node.disproof, child.disproof);
            });
            
        }


        if(node.type === "OR"){
            node.proof = Infinity;
            node.disproof = 0;
            node.children.forEach(child => {
                node.disproof += child.disproof;
                node.proof = Math.min(node.proof, child.proof);
            });
            
        }   
    }
    else {
        switch(node.value){
            case win: node.proof = 0; node.disproof = Infinity;
            case lose: node.proof = Infinity; node.disproof = 0;
            case unknown: node.proof = 1; node.disproof = 1;
        }
        
    }


    
}

function evaluate(root){
    if(checkPlayerWin(root.board)) return "win";
    else if(checkEnemyWin(root.board)) return "lose";
    else return "unknown";
}


    function expandNode(node){
    node.children = generateChildren(node);
    node.children.forEach(child => {
        evaluate(child.board);
        setProofAndDisproofNumbers(child);
        if(node.type === "AND"){
            if(child.disproof === 0) return node;
        }

        else{
            if(child.proof === 0) return node;
        } 
    });
    node.expanded = true;
    return node;
}

function updateAncestors(node, root){
    let oldProof;
    let oldDisproof;

    while(node !== root)
    {
        olfProof = node.proof;
        oldDisproof = node.disproof;
        setProofAndDisproofNumbers(node);
        if(node.proof === oldProof && node.disproof === oldDisproof) return node;
        node = node.parent;
    }
    setProofAndDisproofNumbers(root);
    return root;

}


function generateChildren(node){

    let possibleMoves = getPossibleMoves(board);
    let children = [];
    for(let i = 0; i < possibleMoves.length; i++){
        let child = new root;
        if(node.type === "AND") child.type = "OR";
        else child.type = "AND";
        child.parent = node;
        child.board = possibleMoves[i];
        children.push(child);
    }

}


function SelectMostProvidedNode(node){
    while(node.expanded){
        let value = Infinity;
        let best;
        if(node.type === "AND"){
            node.children.forEach(child => {
                if(value >child.disproof) {
                    best = child;
                    value = child.disproof;
                }
                
            });
        }
        if (node.type === "OR"){
            node.children.forEach(child => {
                if(value >child.proof) {
                    best = child;
                    value = child.proof;
                }
                
            });
    }
    node = best;
    return node;

}
}


let root = {
 
    start: board,    
    proof: 1,
    disproof: 1,
    expanded: false,
    type: "AND",
    value: 0
    
    };
