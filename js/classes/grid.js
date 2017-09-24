class Grid {
    constructor(begin, size, qtdDraw, vertexRadius, showGrad) {
        this.begin = begin;
        this.size = size;
        this.qtdDraw = qtdDraw;
        this.vertexRadius = vertexRadius;
        this.showGrad = showGrad;
        this.quads = [];
        for (let x = 0; x < qtdDraw.x; x++) {
            this.quads[x] = [];
            for (let y = 0; y < qtdDraw.y; y++) {
                this.quads[x][y] = new Quad();
            }
        }
    }

    draw() {
        context.fillStyle = "#000";
        context.beginPath();
        if (this.showGrad) {
            for (let drawX = 0; drawX <= this.qtdDraw.x; drawX++) {
                context.beginPath();
                context.moveTo(this.begin.x + drawX * this.size.x, this.begin.y);
                context.lineTo(this.begin.x + drawX * this.size.x, this.begin.y + this.size.y * this.qtdDraw.y);
                context.stroke();
            }
            for (let drawY = 0; drawY <= this.qtdDraw.y; drawY++) {
                context.beginPath();
                context.moveTo(this.begin.x, this.begin.y + drawY * this.size.y);
                context.lineTo(this.begin.x + this.qtdDraw.x * this.size.x, this.begin.y + drawY * this.size.y);
                context.stroke();
            }
        }
        for (let drawX = 0; drawX < this.qtdDraw.x; drawX++) {
            for (let drawY = 0; drawY < this.qtdDraw.y; drawY++) {
                const centerX = this.begin.x + drawX * this.size.x + this.size.x / 2;
                const centerY = this.begin.y + drawY * this.size.y + this.size.y / 2;
                context.beginPath();
                context.arc(centerX, centerY, this.vertexRadius, 0, 2 * Math.PI, false);
                context.stroke();
                if (!this.quads[drawX][drawY].active) continue;
                context.fillStyle = "black";                
                let index = this.quads[drawX][drawY].vertex.index;
                var vertexAdj = adjacencies.matrix[index];
                if (vertexAdj != null) {
                    for (var edge in vertexAdj) {
                        if (vertexAdj.hasOwnProperty(edge) && vertexAdj[edge] != null) {
                            vertexAdj[edge].draw();
                        }
                    }
                }
                context.beginPath();
                context.arc(centerX, centerY, this.vertexRadius, 0, 2 * Math.PI, false);
                context.font = "30px Arial";
                if (beginVertex != null && beginVertex.label == this.quads[drawX][drawY].vertex.label
                    || endVertex != null && endVertex.label == this.quads[drawX][drawY].vertex.label) {
                    context.fill();
                    context.fillStyle = "white";
                }
                else {
                    context.fillStyle = "black";
                }
                context.fillText(this.quads[drawX][drawY].vertex.label, this.begin.x + drawX * this.size.x + this.size.x * 0.4, this.begin.y + drawY * this.size.y + this.size.y * 0.6);
                if (vertexSelected == null || vertexSelected.label !== this.quads[drawX][drawY].vertex.label) continue;
                let strokeStyle = context.strokeStyle;
                context.strokeStyle = "#FF0000";
                let lineWidth = context.lineWidth;
                context.lineWidth = 2;
                context.beginPath();
                context.arc(centerX, centerY, this.vertexRadius * 1.25, 0, 2 * Math.PI, false);
                context.stroke();
                context.strokeStyle = strokeStyle;
                context.lineWidth = lineWidth;
            }
        }
    }
}




