var Triplet = require('./triplet');
var ColoringMatrix = require('./coloring_matrix');

Triplet.degree = 6;
ColoringMatrix.colorCount = 5;

ColoringMatrix.enumerateMatrices();

ColoringMatrix.matrices.forEach(function (matr) {
	console.log(matr.toString());
	console.log("-----");
})

console.log("Count = ", ColoringMatrix.matrices.length);
