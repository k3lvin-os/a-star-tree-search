function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function deleteSeletectedVertex() {
    deleteVertex = vertexSelected != null;
}

function onMousePositionAtVertex(success) {
    let click = getMousePos(evt);
    if (!boxCollision(click, grid.begin, new Point(grid.size.x * grid.qtdDraw.x, grid.size.y * grid.qtdDraw.y))) return;
    let x = Math.floor(click.x / grid.size.x);
    let y = Math.floor(click.y / grid.size.y);
    var circleCenter = new Point(x * grid.size.x + grid.size.x / 2, y * grid.size.y + grid.size.y / 2);
    if (!circlePointCollision(click, circleCenter, grid.vertexRadius)) return;
    success(x, y, circleCenter);
}

function calculateManhathanDistance(v1, v2) {
    return Math.abs(v1.x - v2.x) + Math.abs(v1.y - v2.y);
}

