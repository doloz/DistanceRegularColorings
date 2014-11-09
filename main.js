var Triplet = require('./triplet');

Triplet.degree = 6;
Triplet.enumerateTriplets(function (triplet) {
	console.log(triplet.toString());
});