// ----------------------------
// TRIPLET OF NUMBERS IN COLORING MATRIX
// ----------------------------

module.exports = Triplet;

function Triplet(p, s, n) {
	this.p = p;
	this.s = s;
	this.n = n;
}

// PARTIAL ORDERING ON SET OF ALL TRIPLETS
Triplet.prototype.lessThan = function (other) {
	return this.lessThanOrEqual(other) && !this.equal(other)
}

Triplet.prototype.equal = function (other) {
	return this.p == other.p && this.n == other.n
}

Triplet.prototype.lessThanOrEqual = function (other) {
	return this.p <= other.p && this.n >= other.n
}

// "S" MUST BE EVEN AND NOT EQUAL TO DEGREE
Triplet.prototype.isValid = function () {
	return 
		this.p + this.s + this.n == Triplet.degree &&
		this.p >= 0 &&
		this.s >= 0 &&
		this.n >= 0 &&
		this.s % 2 == 0 &&
		this.s < Triplet.degree;
}

// ENUMERATES ALL VALID TRIPLETS
Triplet.enumerateTriplets = function (callback) {
	for (var halfS = 0; halfS < Triplet.degree / 2; halfS++) {
		var s = 2 * halfS;
		for (var p = 0; p <= Triplet.degree - s; p++) {
			var triplet = new Triplet(p, s, Triplet.degree - s - p);
			callback(triplet);
		}		
	}
}

Triplet.allTriplets = function () {
	var result = [];
	Triplet.enumerateTriplets(function (t) {
		result.push(t);
	});
	return result;
}

Triplet.startTriplets = function () {
	return Triplet
		.allTriplets()
		.filter(function (t) { return t.p == 0; });
};

Triplet.endTriplets = function () {
	return Triplet
		.allTriplets()
		.filter(function (t) { return t.n == 0; });
}

Triplet.minTriplet = function () {
	return new Triplet(0, 0, Triplet.degree);
}

Triplet.prototype.toString = function () {
	return this.p + " " + this.s + " " + this.n;
}

// FIND ALL ORDERED CHAINS OF TRIPLETS t1 < t2 < t3 < t4 ... 
Triplet.findTripletChains = function () {

}

