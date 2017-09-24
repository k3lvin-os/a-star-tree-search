
function showGradOnClick(checked) {
    grid.showGrad = checked;
}

function canvasOnMouseMove(evt) {
    window.evt = evt;
}

function canvasOnMouseDown(evt) {
    window.evt = evt;
}

function canvasOnKeyDown(key) {
    const deleteCode = 46;
    if (key.keyCode === deleteCode) {
        deleteSeletectedVertex();
        visitedSet = null;
    }
}

function beginBtnOnClick() {
    visitedSet = null;
    beginVertex = vertexSelected;
}

function endBtnOnClick() {
    visitedSet = null;
    endVertex = vertexSelected;
}

function restartBtnOnClick() {
    location.reload();
    promptOk(null, null);
}

function calculateBtnOnClick() {
    visitedSet = [];
    notVisitedSet = [];
    edgePath = [];
    distancesSum = 0;
    // 1.Inicialize Q com o nó de busca S(0);
    notVisitedSet.push(beginVertex);
    //2.Inicialize h´(n) com a distância de S(0);
    beginVertex.h = calculateManhathanDistance(beginVertex, endVertex);
    //3.Inicialize g(n) com 0.
    beginVertex.g = 0;
    while (notVisitedSet.length != 0) {
        //4.Calcule f(n) = h’(n) + g(n).
        let bestCostVertex = notVisitedSet[0];
        for (let i = 0; i < notVisitedSet.length; i++) {
            let vertex = notVisitedSet[i];
            vertex.fN = vertex.h + vertex.g;
            bestCostVertex = vertex.fN < bestCostVertex.fN ? vertex : bestCostVertex;
        }
        //5.Escolha o melhor elemento de f(n) e adicione em H sua distância g(n)
        distancesSum += bestCostVertex.g;
        //6.Guarde em S(n) o estado n.
        let index = visitedSet.push(bestCostVertex);
        if (index > 1)
            edgePath.push(adjacencies.getEdge(visitedSet[index - 2], bestCostVertex));
        //7.Remova todos os elementos de Q(n) e de h’(n).
        notVisitedSet = [];
        //8.Verifique se f(n) = 0:
        if (bestCostVertex == endVertex) {
            break;
        }
        //9.Encontre os descendentes do estado (n) e os adicione em Q(n).
        notVisitedSet = adjacencies.getUnclosedDescendents(bestCostVertex);
        // 10.Crie todas as extensões de n para cada descendente encontrado, 
        //adicione-as em h’(n) e suas distâncias do nó pai em g(n).
        for (let i = 0; i < notVisitedSet.length; i++) {
            let descendent = notVisitedSet[i];
            descendent.g = parseFloat(eval(adjacencies.getEdge(descendent, bestCostVertex)._weight));
            descendent.h = calculateManhathanDistance(descendent, endVertex)
        }
        //11.Retorne ao passo 4.
    }
}

function promptOk(val, ev) {
    n = val;
    console.log(n);
    if (isNaN(n) || n < 2 || n > 6) {
        alertify
            .okBtn("Ok")
            .cancelBtn("Cancelar")
            .prompt("Entre com n (n: | 2 <= n <= 6).", promptOk, function () { });
    }
    else {
        let begin = new Point(0, 0);
        let size = new Point(100, 100);
        var adjacenciesBegin = new Point(650, 450);
        var adjacenciesSize = new Point(32, 32);
        adjacencies = new Adjacencies(adjacenciesBegin, adjacenciesSize);
        let qtdDraw = new Point(n, n);
        let radius = 25;
        let alphabetSize = qtdDraw.x * qtdDraw.y;
        alphabet = new Alphabet(alphabetSize);
        grid = new Grid(begin, size, qtdDraw, radius, showGrad);

        setInterval(run, fps);
    }
}

function instructionsBtnOnClick() {
    let alerts =
        [
            "Clique em cima de um vértice e solte em cima de outro para criar uma aresta.",
            "Clique em Marcar Começo para definir o vértice inicial da busca.",
            "Clique em um quadrado vazio para criar um vértice.",
            "Clique em Marcar fim para definir o vértice desejado da busca.",
            "Pressione a tecla Delete ou clique no botão Excluir para apagar um vértice indesejado.",
            "Clique em Calcular caminho para realizar a busca no grafo.",
            "Clique em Reinicar para gerar um novo mundo de grade."

        ];
    for (let i = alerts.length - 1; i > 0; i--) {
        let alert = alerts[i];
        alertify.alert(alert);
    }
}


function excludeBtnOnClick() {
    visitedSet = null;
    deleteSeletectedVertex();
}

function canvasOnMouseUp(evt) {
    window.evt = evt;
    if (Edge.prototype.isScratching) {
        onMousePositionAtVertex(function (x, y) {
            let vertex1 = grid.quads[Math.floor(Edge.prototype.begin.x / grid.size.x)][Math.floor(Edge.prototype.begin.y / grid.size.y)].vertex;
            let vertex2 = grid.quads[x][y].vertex;
            if (vertex2 == null || vertex1.label === vertex2.label) return;
            let edge = new Edge(vertex1, vertex2);
            if (edge.weight != 1 && edge.weight != "√2") {
                alertify.alert("Ops! O grafo em mundo de grade não permite a existência da aresta (" + edge.vertex1.label + "," + edge.vertex2.label + ").");
                return;
            }
            adjacencies.add(edge);
            visitedSet = null;
        });
        Edge.prototype.stopScratch();
    }

}

function canvasOnMouseDown(evt) {
    window.evt = evt;
    onMousePositionAtVertex(function (x, y, circleCenter) {
        if (!grid.quads[x][y].active) {
            grid.quads[x][y].active = true;
            grid.quads[x][y].vertex = Vertex.prototype.createNew(x, y);
            visitedSet = null;
        } else {
            vertexSelected = grid.quads[x][y].vertex;
            Edge.prototype.scratch(circleCenter);
        }
    });
}

