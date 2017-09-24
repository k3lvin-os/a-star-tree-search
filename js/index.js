// global variables.
const fps = 1000 / 30;
var canvas;
var context;
var grid;
var alphabet;
var body;
var restartBtn;
var adjacencies;
var excludeBtn;
var beginBtn;
var endBtn;
var calculateBtn;
var instructionsBtn;
var beginVertex;
var endVertex;
var vertexSelected;
var deleteVertex;
var beginEndVertexManhathanDistance;
var notVisitedSet;
var visitedSet;
var distancesSum;
var n;
var edgePath;

function start() {
    body = document.getElementById("body");
    restartBtn = document.getElementById("restartBtn");
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    beginBtn = document.getElementById("beginBtn");
    endBtn = document.getElementById("endBtn");
    calculateBtn = document.getElementById("calculateBtn");
    excludeBtn = document.getElementById("excludeBtn");
    instructionsBtn = document.getElementById("instructionsBtn");
    let showGrad = document.getElementById("showGrad");
    canvas.width = 1800;
    canvas.height = 2800;
    restartBtn.addEventListener("click", restartBtnOnClick, false);
    canvas.addEventListener("mousedown", canvasOnMouseDown, false);
    canvas.addEventListener("mouseup", canvasOnMouseUp, false);
    canvas.addEventListener("mousemove", canvasOnMouseMove, false);
    body.addEventListener("keydown", canvasOnKeyDown, false);
    excludeBtn.addEventListener("click", excludeBtnOnClick, false);
    beginBtn.addEventListener("click", beginBtnOnClick, false);
    endBtn.addEventListener("click", endBtnOnClick, false);
    calculateBtn.addEventListener("click", calculateBtnOnClick, false);
    instructionsBtn.addEventListener("click", instructionsBtnOnClick, false);
    alertify
    .okBtn("Ok")
    .cancelBtn("Cancelar")
    .prompt("Entre com n (n: | 2 <= n <= 6).", promptOk, function(){});
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    grid.draw();
    if (Edge.prototype.isScratching) {
        Edge.prototype.scratchDraw();
    }
    adjacencies.draw();
    context.fillStyle = "black";
    context.font = "28px Arial";
    context.fillText("Simulador de busca no grafo", 630, 50);
    context.font = "14px Arial";    
    context.fillText("*Testado no Google Chrome, no Opera e em versões do Firefox > 45.", 700, 100);
    context.font = "28px Arial";    
    if (beginVertex != null) {
        context.fillText(" - Começando em " + beginVertex.label + ".", 700, 150);
    }
    if (endVertex != null) {
        context.fillText(" - Terminando em " + endVertex.label + ".", 700, 250);
    }
    context.fillText("Matriz de adjacências", 630, 400);
    context.fillStyle = "black";
    context.font = "26px Arial";
    if(beginVertex != null && endVertex != null){
        beginEndVertexManhathanDistance = calculateManhathanDistance(beginVertex, endVertex);       
    }
    if(visitedSet != null){
        context.fillText("Busca no grafo com o algorítmo A*.", 80, 640);   
        context.fillText("Distância Manhathan entre o começo e o fim: " +
         (beginEndVertexManhathanDistance === null 
             || beginEndVertexManhathanDistance === undefined ? "" : beginEndVertexManhathanDistance)
            + "."  , 25, 670);   
        context.fillText("Caminho percorrido (começando em " + visitedSet[0].label + "):", 25, 730);  
        let i = 0;      
        for(; i < visitedSet.length - 1; i++){
            let vertex = visitedSet[i];
            let nextVertex = visitedSet[i + 1];
            context.fillText((i + 1) + " - " + "De " + vertex.label + ", vá para " + nextVertex.label + " (custo: " + edgePath[i].weight + ");", 25,  775 + i * 50);
        }
        if(endVertex === visitedSet[visitedSet.length - 1]){
            context.fillText("Chegou em " + visitedSet[visitedSet.length - 1].label + ".", 25, 775 + i * 50);                           
        }
        else{
            context.fillText("Busca encerrada em " + visitedSet[visitedSet.length - 1].label + ".", 25, 775 + i * 50);                                       
        }
        context.fillText("Distância percorrida: " + (distancesSum.toString().indexOf(".") != -1  ? "aproximadamente " + distancesSum.toFixed(2).toString().replace(".", ",") : distancesSum) + ".", 25, 775 + (i + 1) * 50);                                       
    }

    
    
}

function update() {
    excludeBtn.disabled = vertexSelected == null;
    beginBtn.disabled = vertexSelected == null;
    endBtn.disabled = vertexSelected == null;
    calculateBtn.disabled = beginVertex == null || endVertex == null;
    if (deleteVertex) {
        alphabet.returnLetter(this.vertexSelected.label);
        adjacencies.removeVertex(vertexSelected);
        grid.quads[vertexSelected.x][vertexSelected.y] = { active: false };
        beginVertex = beginVertex == null || beginVertex.label == vertexSelected.label ? null : beginVertex;
        endVertex = endVertex == null || endVertex.label == vertexSelected.label ? null : endVertex;
        vertexSelected = null;
        deleteVertex = false;
    }
}

function run() {
    draw();
    update();
}

function main() {
    start();
}

main();


