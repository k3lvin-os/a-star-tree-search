class Adjacencies {

    constructor(begin, size) {
        this.matrix = [];
        this.begin = begin;
        this.size = size;
    }

    getUnclosedDescendents(vertex) {
        let descendents = [];
        for (let i = 0; i < Vertex.prototype.vertexCount; i++) {
            let edge = i > vertex.index ? this.matrix[i][vertex.index] : this.matrix[vertex.index][i];
            if (edge == null)
                continue;
            let descendent = edge.vertex1.label == vertex.label ? edge.vertex2 : edge.vertex1;
            if (!descendent.visited) {
                descendents.push(descendent);
            }
            else
                continue;
        }
        return descendents;
    }

    getEdge(v1, v2) {
        if (v1.label > v2.label)
            return this.matrix[v1.index][v2.index];
        return this.matrix[v2.index][v1.index];
    }

    addVertex(vertex) {
        this.matrix.splice(vertex.index, 0, []);
        this.matrix[vertex.index].splice(vertex.index, 0, null);
        Vertex.prototype.vertexCount++;
        for (let i = 0; i < Vertex.prototype.vertexCount; i++) {
            if (i == vertex.index) continue;
            let currentVertex;
            if (i > vertex.index) {
                currentVertex = this.matrix[i];
                currentVertex.splice(vertex.index, 0, null);
            }
            else {
                currentVertex = this.matrix[vertex.index];
                currentVertex.splice(i, 0, null);
            }
        }
        for (let letter in alphabet._lettersRemoved) {
            let qtdRemoved = alphabet._lettersRemoved[letter];
            if (letter.charCodeAt(0) > vertex.label.charCodeAt(0)) {
                alphabet._lettersRemoved[letter] = alphabet._lettersRemoved[letter] == 0 ? 0 : alphabet._lettersRemoved[letter] - 1;
            }
        }
    }

    removeVertex(vertex) {
        for (let i = Vertex.prototype.vertexCount - 1; i > vertex.index; i--) {
            let currentVertex = this.matrix[i];
            currentVertex.splice(vertex.index, 1);
        }
        this.matrix.splice(vertex.index, 1);
        Vertex.prototype.vertexCount--;
        for (let letter in alphabet._lettersRemoved) {
            let qtdRemoved = alphabet._lettersRemoved[letter];
            if (letter.charCodeAt(0) > vertex.label.charCodeAt(0)) {
                alphabet._lettersRemoved[letter]++;
            }
        }
    }

    add(edge) {
        this.matrix[edge.vertex2.index][edge.vertex1.index] = edge;
    }

    draw() {
        var self = this;
        let drawX = 0;
        this.matrix.forEach(function (vertex) {
            let drawY = 0;
            context.fillStyle = "black";
            context.font = "18px Arial";
            context.fillText(Alphabet.prototype.getLetter(drawX), self.begin.x + drawX * self.size.x + self.size.x * 0.25, self.begin.y - self.size.y);
            context.fillText(Alphabet.prototype.getLetter(drawX), self.begin.x - self.size.x, self.begin.y + (drawX + 1) * self.size.y - self.size.y * 0.05);
            vertex.forEach(function (edge) {
                context.beginPath();
                context.moveTo(self.begin.x + drawX * self.size.x, self.begin.y + drawY * self.size.y);
                context.lineTo(self.begin.x + drawX * self.size.x + self.size.x, self.begin.y + drawY * self.size.y);
                context.lineTo(self.begin.x + drawX * self.size.x + self.size.x, self.begin.y + drawY * self.size.y + self.size.y);
                context.lineTo(self.begin.x + drawX * self.size.x, self.begin.y + drawY * self.size.y + self.size.y);
                context.lineTo(self.begin.x + drawX * self.size.x, self.begin.y + drawY * self.size.y);
                context.stroke();
                context.fillText(self.matrix[drawX][drawY] == null ? "0" : self.matrix[drawX][drawY].weight, self.begin.x + drawX * self.size.x + self.size.x * 0.35, self.begin.y + drawY * self.size.y + self.size.y * 0.75)
                drawY++;
            })
            drawX++;
        })
    }
}


Adjacencies.prototype.getIndexByLetter = function (letter) {
    const zCharCode = 90;
    const greekCharacthers = 919;
    if (letter <= zCharCode) {
        return letter - 65;
    }
    else {
        return letter - greekCharacthers
    }
}