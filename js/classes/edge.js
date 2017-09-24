class Edge {
    constructor(n1, n2) {
        if (n1.label < n2.label) {
            this.vertex1 = n1;
            this.vertex2 = n2;
        } else {
            this.vertex2 = n1;
            this.vertex1 = n2;
        }
        this._weight = Edge.prototype.calculateWeight(this.vertex1, this.vertex2);
    }

    get weight(){
        let weightToShow;
        if (isNaN(this._weight)) {
            const number = this._weight.substring(10, 11);
            if (number === "4") {
                weightToShow = 2;
            } else if (number === "9") {
                weightToShow = 3;
            } else {
                weightToShow = `√${number}`;
            }
        } else {
            weightToShow = this._weight;
        }
        return weightToShow;
    }

    draw() {
        if (this.weight === 0) return;
        let x, y, weightToShow;
        context.beginPath();
        x = this.vertex1.x * grid.size.x + grid.size.x / 2;
        y = this.vertex1.y * grid.size.y + grid.size.y / 2;
        context.moveTo(x, y);
        x = this.vertex2.x * grid.size.x + grid.size.x / 2;
        y = this.vertex2.y * grid.size.y + grid.size.y / 2;
        if(edgePath != null && edgePath.indexOf(this) != -1){
            context.strokeStyle = "#FF0000";
            context.lineWidth = 3;                                
        }
        else{
            context.strokeStyle = "#000000";
            context.lineWidth = 1;                                                                         
        }
        context.lineTo(x, y);
        context.stroke();
        context.font = "20px Arial";
        x = (this.vertex1.x + this.vertex2.x) * grid.size.x / 2 + grid.size.x * 0.5;
        y = (this.vertex1.y + this.vertex2.y) * grid.size.y / 2 + grid.size.y * 0.5;
        context.lineWidth = 1;                                                                                 
        context.strokeStyle = "#000000";                            
        context.fillText(this.weight, x, y);
    }
}

Edge.prototype.scratch = function (begin) {
    Edge.prototype.begin = begin;
    Edge.prototype.isScratching = true;
}

Edge.prototype.stopScratch = function () {
    Edge.prototype.begin = null;
    Edge.prototype.isScratching = false;
}

Edge.prototype.scratchDraw = function () {
    context.beginPath();
    context.moveTo(Edge.prototype.begin.x, Edge.prototype.begin.y);
    const cursor = getMousePos(evt);
    context.lineTo(cursor.x, cursor.y);
    context.stroke();
}

Edge.prototype.calculateWeight = function (v1, v2) {
    const diffX = Math.abs(v2.x - v1.x);
    const diffY = Math.abs(v1.y - v2.y);
    if (diffX === 0) {
        return diffY;
    } else if (diffY === 0) {
        return diffX;
    } else {
        const diff = diffX + diffY;
        return `Math.sqrt(${diff}).toFixed(2)`;
    }
}

