class Vertex {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this._label = alphabet.getFirstLetter();
    }

    get label() {
        return String.fromCharCode(this._label);
    }

    get index() {
        var index = Adjacencies.prototype.getIndexByLetter(this._label);
        index -= alphabet._lettersRemoved[this.label];
        return index;
    }

    get visited(){
        return visitedSet != null && visitedSet.indexOf(this) != -1;
    }
}

Vertex.prototype.createNew = function (x, y) {
    let newVertex = new Vertex(x, y);
    adjacencies.addVertex(newVertex);
    return newVertex;
}

Vertex.prototype.vertexCount = 0;