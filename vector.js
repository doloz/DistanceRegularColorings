//-----------------------------------------
// VECTOR ON N-DIMENSIONAL GRID
//-----------------------------------------

module.exports = Vector;

function Vector () {
	var i = 0;
	while (arguments[i] !== undefined) {
		this[i] = arguments[i];
		i++
	}
}

// 0000000...
Vector.zero = function (dim) {
	var result = new Vector();
	for (var i = 0; i < Vector.dim; i++) {
		result[i] = 0;
	}
	return result
}

// 100000..., 010000...., ....
Vector.unit = function (pos) {
	var result = Vector.zero();
	if (pos < Vector.dim) {
		result[pos] = 1;
		return result;
	} else {
		throw new Error("Wrong position(" + pos + ") for 1 in " + Vector.dim + "-dimensional vector")
	}
}

Vector.fromString = function (string) {
	return JSON.parse(string);
}

Vector.plus = function () {
	var result = Vector.zero(arguments[0].dim);
	for (var i = 0; i < arguments.length; i++) {
		for (var j = 0; j < Vector.dim; j++) {
			result[j] += arguments[i][j];
		}
	}
	return result;
}

Vector.vectorsOfLayer = function (level) {
	
}

// PROTOTYPE

Vector.prototype.copy = function () {
	var result = new Vector()
	for (var i = 0; i < Vector.dim; i++) {
		result[i] = this[i];	
	}
	return result;
}

Vector.prototype.minus = function () {
	var result = this.copy();
	for (var i = 0; i < Vector.dim; i++) {
		result[i] = -this[i];
	}
	return result;
}

// VECTORS WITH DISTANCE 1 FROM GIVEN
Vector.prototype.nearest = function() {
	var result = [];
	for (var i = 0; i < Vector.dim; i++) {
		result.push(Vector.plus(this, Vector.unit(i)));
		result.push(Vector.plus(this, Vector.unit(i).minus()));
	}
	return result;
}

Vector.prototype.toString = function () {
	return JSON.stringify(this);
}


