function boxCollision(p1, p2, p2Size) {
    return p1.x >= p2.x - p2Size.x
        && p1.x <= p2.x + p2Size.x
        && p1.y >= p2.y - p2Size.y
        && p1.y <= p2.y + p2Size.y;
}

function circlePointCollision(p, c, r) {
    return Math.sqrt((p.x - c.x, 2) * (p.x - c.x, 2) + (p.y - c.y) * (p.y - c.y)) < r;
}