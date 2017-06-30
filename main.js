var coins = 0;
var farms = 0;
var taverns = 0;
var forges = 0;

function earnCoins(number){
	coins += number;
	document.getElementById("coins").innerHTML = coins;
}

function buyBuilding(building){
	switch(building){
		case "farm":
			var buildingCost = Math.floor(10 * Math.pow(1.1, farms));
			if(coins >= buildingCost){
				farms += 1;
				coins -= buildingCost;
				buildingCost = Math.floor(10 * Math.pow(1.1, farms));
				document.getElementById("farms").innerHTML = farms;
				document.getElementById("coins").innerHTML = coins;
				document.getElementById("farmCost").innerHTML = buildingCost;
			}
			break;
		case "tavern":
			var buildingCost = Math.floor(100 * Math.pow(1.1, taverns));
			if(coins >= buildingCost){
				taverns += 1;
				coins -= buildingCost;
				buildingCost = Math.floor(100 * Math.pow(1.1, taverns));
				document.getElementById("taverns").innerHTML = taverns;
				document.getElementById("coins").innerHTML = coins;
				document.getElementById("tavernCost").innerHTML = buildingCost;
			}
			break;
		case "forge":
			var buildingCost = Math.floor(1000 * Math.pow(1.1, forges));
			if(coins >= buildingCost){
				forges += 1;
				coins -= buildingCost;
				buildingCost = Math.floor(1000 * Math.pow(1.1, forges));
				document.getElementById("forges").innerHTML = forges;
				document.getElementById("coins").innerHTML = coins;
				document.getElementById("forgeCost").innerHTML = buildingCost;
			}
			break;
		default:
			break;
	}
}

window.setInterval(function(){
	earnCoins(farms);
	earnCoins(taverns*2);
	earnCoins(forges*3);
}, 1000);