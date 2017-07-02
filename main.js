var doubloonsEarned = 0; // all doubloons earned during gameplay
var doubloons = 0; // current amount of doubloons
var doubloonsPs = 0; // doubloons per second (to recalculate with every new purchase)
var rowBoats = {type:"rowBoats", baseCost:10, buildingCost:10, number:0}; // current number of row boats object
var sloops = {type:"sloops", baseCost:100, buildingCost:100, number:0}; // current amount of sloops
var longships = {type:"longships", baseCost:1000, buildingCost:1000, number:0}; // current amount of longships
var caravelles = {type:"caravelles", baseCost:10000, buildingCost:10000, number:0}; // current amount of caravelles
var schooners = {type:"schooners", baseCost:100000, buildingCost:100000, number:0}; // current amount of schooners
var galleys = {type:"galleys", baseCost:1000000, buildingCost:1000000, number:0}; // current amount of galleys
var brigantines = {type:"brigantines", baseCost:10000000, buildingCost:10000000, number:0}; // current amount of bringantines
var barques = {type:"barques", baseCost:100000000, buildingCost:100000000, number:0}; // current amount of barques
var galleons = {type:"galleons", baseCost:1000000000, buildingCost:1000000000, number:0}; // current amount of galleons
var triremes = {type:"triremes", baseCost:10000000000, buildingCost:10000000000, number:0}; // current amount of triremes
var man_of_wars = {type:"man_of_wars", baseCost:100000000000, buildingCost:100000000000, number:0}; // current amount of man of wars
var dreadnoughts = {type:"dreadnoughts", baseCost:1000000000000, buildingCost:1000000000000, number:0}; // current amount of dreadnoughts

function earnDoubloons(number){
	doubloons += number;
	doubloonsEarned += number;
	document.getElementById("doubloons").innerHTML = doubloons;
}

function buyBuilding(building){
	switch(building){
		case "rowBoats":
			if(doubloons >= rowBoats.buildingCost){
				rowBoats.number += 1;
				doubloons -= rowBoats.buildingCost;
				rowBoats.buildingCost = Math.floor(rowBoats.baseCost * Math.pow(1.1, rowBoats.number));
				document.getElementById("rowBoats").innerHTML = rowBoats.number;
				document.getElementById("doubloons").innerHTML = doubloons;
				document.getElementById("rowBoatCost").innerHTML = rowBoats.buildingCost;
			}
			break;
		case "sloops":
			if(doubloons >= sloops.buildingCost){
				sloops.number += 1;
				doubloons -= sloops.buildingCost;
				sloops.buildingCost = Math.floor(sloops.baseCost * Math.pow(1.1, sloops.number));
				document.getElementById("sloops").innerHTML = sloops.number;
				document.getElementById("doubloons").innerHTML = doubloons;
				document.getElementById("rowBoatCost").innerHTML = sloops.buildingCost;
			}
			break;
		case "longships":
			if(doubloons >= longships.buildingCost){
				longships.number += 1;
				doubloons -= longships.buildingCost;
				longships.buildingCost = Math.floor(longships.baseCost * Math.pow(1.1, longships.number));
				document.getElementById("longships").innerHTML = longships.number;
				document.getElementById("doubloons").innerHTML = doubloons;
				document.getElementById("rowBoatCost").innerHTML = longships.buildingCost;
			}
			break;
		default:
			break;
	}
}

window.setInterval(function(){
	doubloonsPs = rowBoats.number + (sloops.number * 2) + (longships.number * 3);
	document.getElementById("doubloonsPs").innerHTML = doubloonsPs;
	earnDoubloons(rowBoats.number);
	earnDoubloons(sloops.number);
	earnDoubloons(longships.number);
}, 1000);
