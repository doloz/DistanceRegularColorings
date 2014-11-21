var Triplet = require('./triplet');
var ColoringMatrix = require('./coloring_matrix');
var Grid = require('./grid');
var Vector = require('./vector');


Vector.dim = 3;
Triplet.degree = 6;
ColoringMatrix.colorCount = 5;

ColoringMatrix.enumerateMatrices();

ColoringMatrix.matrices.forEach(function (matr) {
	console.log(matr);
	console.log("-----");
})


console.log("Count = ", ColoringMatrix.matrices.length);

var grid = new Grid();
grid.setColor(Vector.zero(), 4);
grid.setColor(Vector.unit(1), 4);
console.log(grid.getColor(Vector.zero()));
console.log(grid.toString());