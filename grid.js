//----------------------------------------
// GRID WITH ARBITRARY NUMBER OF DIMENSIONS

var Triplet = require('./triplet');

module.exports = Grid;

function Grid() {
	this.storage = {};
}

Grid.prototype.setColor = function (vector, color) {
	this.storage[vector.toString()] = color;
}

Grid.prototype.getColor = function (vector) {
	if (this.storage[vector.toString()] !== undefined) 
		return this.storage[vector.toString()];
	else
		return null;
}

Grid.prototype.copy = function () {
	var newGrid = new Grid()
	for (var key in Object.keys(this.storage)) {
		newGrid[key] = this.storage[key];
	}
	return newGrid;
}

Grid.prototype.toString = function () {
	var str = ""
	for (var key in this.storage) {
		str += key + " " + this.storage[key] + "\n";
	}
	return str;
}

// ENUMERATES NEAREST EMPTY POINTS NEAR VECTOR
Grid.prototype.enumerateEmptyNearVector = function (vector, callback) {
	var nearest = vector.nearest()
	for (var i = 0; i < nearest.length; i++) {
		if (this.getColor(nearest[i])) {
			callback(nearest[i])
		}
	}
}

Grid.prototype.enumerateAllNearVector = function (vector, callback) {
	var nearest = vector.nearest()
	for (var i = 0; i < nearest.length; i++) {
		callback(nearest[i])
	}
}

Grid.prototype.isDistanceRegularNearVector = function (vector) {
	var grid = this;
	var colors = [];
	var result = true;
	this.enumerateAllNearVector(vector, function (nearestVector) {
		var color = grid.getColor(nearestVector);
		if (color !== null && 
			Math.abs(color - grid.getColor(vector)) > 1) result = false;
	});
	return result;
}

// IF GRID ON "VECTOR" POSITION HAS COLORS 
Grid.prototype.conformsTripletNearVector = function (vector, triplet) {
	var p, s, n;
	var grid = this;
	var result = true;
	var color = grid.getColor(vector);
	this.enumerateAllNearVector(function (nearestVector) {
		var nearestColor = grid.getColor(nearestVector);
		if (nearestColor != null) {
			switch (nearestColor - color) {
				case +1: 
					n++;
					break;	
				case  0: 
					s++;
					break;
				case -1: 
					p++;
					break;
				default:
					throw new Error("Wrong color " + nearestColor + " near color " + color);
			}
		}
	});
	if (p > triplet.p || s > triplet.s || n > triplet.n) 
		result = false;
	return result;
}


Grid.enumerateLayers = function (level, possibleColors) {

}

Grid.colorizeWithMatrix = function (matrix, depth) {
	var grid = new Grid();
	grid.setColor(Vector.zero(), 0);
	grid.setColor(Vector.unit(0), 1);
	var colorings = [];
	function recursiveColoring(gr, depth) {
		
	}

}