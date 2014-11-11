var Triplet = require('./triplet');

module.exports = ColoringMatrix;

function ColoringMatrix(triplets) {
	this.triplets = triplets;
}

ColoringMatrix.prototype.toString = function () {
	var spaces = "";
	var result = "";
	for (var i = 0; i < this.triplets.length; i++) {
		var nextLine = spaces + this.triplets[i].toString() + "\n";
		result += nextLine;
		spaces += "  ";
	}
	result = "  " + result.substring(2, result.length - 3);

	return result;
}


ColoringMatrix.enumerateMatricesRecursively = function (triplets) {
	// console.log(typeof triplets);
	if (triplets.length == ColoringMatrix.colorCount) {
		ColoringMatrix.matrices.push(new ColoringMatrix(triplets));
		return;
	}

	var tripletsSource = [];
	if (triplets.length == 0) {
		tripletsSource = Triplet.startTriplets();
	} else if (triplets.length == ColoringMatrix.colorCount - 1) {
		tripletsSource = Triplet.endTriplets();
	} else {
		tripletsSource = Triplet.allTriplets();
	}

	// console.log("Triplets source: ",tripletsSource);

	var lastTriplet = triplets.length == 0 ? Triplet.minTriplet() : triplets[triplets.length - 1];
	var filterFunc = triplets.length == 0 || triplets.length == triplets.colorCount - 1 ?
		"lessThanOrEqual" : "lessThan";

	var greater = tripletsSource
		.filter(function (t) {
			return lastTriplet[filterFunc](t);
		});
	// console.log(greater);
	if (greater.length == 0) return;
		
	greater.forEach(function (t) {
		var newTriplets = triplets.slice(0);
		newTriplets.push(t);
		// console.log("New:",newTriplets);
		ColoringMatrix.enumerateMatricesRecursively(newTriplets);
	});	
}

ColoringMatrix.enumerateMatrices = function () {
	ColoringMatrix.matrices = [];
	ColoringMatrix.enumerateMatricesRecursively([]);
	ColoringMatrix.matrices = ColoringMatrix.matrices.filter(function (matr) {
		var result = true;
		matr.triplets.forEach(function (triplet, idx) {
			if (idx == 0 || idx == matr.triplets.length - 1) return;
			var previousTriplet = matr.triplets[idx - 1];
			var nextTriplet = matr.triplets[idx + 1];
			if ((Boolean(triplet.p) != Boolean(previousTriplet.n)) || 
				(Boolean(triplet.n) != Boolean(nextTriplet.p))) result = false;
		});
		return result;
	});
}

