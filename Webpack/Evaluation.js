const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const pieceValues = {
    'p': 1,
    'n': 3.05,
    'b': 3.33,
    'r': 5.63,
    'q': 9.5,
    'k': 0
}

var boardsEvaluated = 0;

exports.evaluateBoard = function evaluate(game) {

    // Evaluation
    return -2
}

var highest = 0
function artificialCost(cost) {
    // Artificial Cost
    var count = 0
    for (let i = 0; i < cost; i++){
        denominator = Math.random()
        count += (denominator - 0.5)
    }
    
    if (1 / count > 100000) {
        console.log("A miracle: " + (1/count))
    }

}

exports.pieceValue = function countPieces(game, nodeColor, action, preEval) {

    var pieceTaken = false;

    if (action != null) {
        stringSan = action.san.split("")
        for (let i = 0; i < stringSan.length; i++){
            if (stringSan[i] === 'x') {
                pieceTaken = true;
            }
        }
    }

    if (!pieceTaken && preEval >= 0 && preEval <= 1) {
        return preEval
    }
    
    console.log(game.fen())

    var myScore = 0
    var oppScore = 0

    // myColor = 'b'
    // if (nodeColor === 'b') {
    //     myColor = 'w'
    // }
    var myColor = nodeColor

    var tilesList = []
    for (let i = 0; i < letters.length; i++){
        for (let j = 1; j < letters.length + 1; j++){
            // artificialCost(1000)
            tile = letters[i] + j
            tilesList.push(tile)
            piece = game.get(tile)
            if (piece != false) {
                if (piece.color === myColor) {
                    myScore += pieceValues[piece.type]
                }
                else {
                    oppScore += pieceValues[piece.type]
                }
            }
        }
    }
    // console.log(nodeColor + ": " + (myScore + Number.EPSILON) / (myScore + oppScore + Number.EPSILON))
    console.log("ME: " + myScore + " them: " + oppScore)
    return (myScore + Number.EPSILON) / (myScore + oppScore + Number.EPSILON)
}

exports.getCount = function () {
    return boardsEvaluated
}

// Used for light nodes
exports.getQValue = function evaluateBoard(game, action, preEval) {

    boardsEvaluated++

    var pieceTaken = false;

    if (action != null) {
        stringSan = action.split("")
        for (let i = 1; i < stringSan.length; i++){
            if (stringSan[i] === 'x') {
                pieceTaken = true;
                break;
            }
        }
    }

    if (!pieceTaken && preEval >= 0 && preEval <= 1) {
        return preEval
    }
    
    var whiteScore = 0
    var blackScore = 0

    var tilesList = []
    for (let i = 0; i < letters.length; i++){
        for (let j = 1; j < letters.length + 1; j++){
            // artificialCost(1000)
            tile = letters[i] + j
            tilesList.push(tile)
            piece = game.get(tile)
            if (piece != false) {
                if (piece.color === 'w') {
                    whiteScore += pieceValues[piece.type]
                }
                else {
                    blackScore += pieceValues[piece.type]
                }
            }
        }
    }
    // console.log(nodeColor + ": " + (myScore + Number.EPSILON) / (myScore + oppScore + Number.EPSILON))
    // console.log("ME: " + whiteScore + " them: " + blackScore)
    return (whiteScore / (whiteScore + blackScore))
    return (whiteScore + Number.EPSILON) / (whiteScore + blackScore + Number.EPSILON)
}