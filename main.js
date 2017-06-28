var crops = 0;
var farmhands = 0;
var tractors = 0;

function harvestClick(number){
	crops += number;
	document.getElementById("crops").innerHTML = crops;
}

function buyFarmhand(number){
	var farmhandCost = Math.floor(10 * Math.pow(1.1, farmhands));		// works out the cost of this farmhandCost
	if(crops >= farmhandCost){											// checks that the player can afford the farmhand
		farmhands += 1;													// increases number of farmhands
		crops -= farmhandCost;											// removes the crops spent
		document.getElementById('farmhands').innerHTML = farmhands;		// updates the number of farmhands for the user
		document.getElementById('crops').innerHTML = crops;				// updates the number of crops for the user
		var nextCost = Math.floor(10 * Math.pow(1.1, farmhands));		// works out the cost of the next farmhand
		document.getElementById('farmhandCost').innerHTML = nextCost;	// updates the cursor cost for the user
	};
}

function buyTractor(number){
	var tractorCost = Math.floor(100 * Math.pow(1.2, tractors));
	if(crops >= tractorCost){
		tractors += 1;
		crops -= tractorCost;
		document.getElementById('tractors').innerHTML = tractors;
		document.getElementById('crops').innerHTML = crops;
		var nextCost = Math.floor(100 * Math.pow(1.2, tractors));
		document.getElementById('tractorCost').innerHTML = nextCost;
	}
}

window.setInterval(function(){
	harvestClick(farmhands);
	harvestClick(tractors * 2);
}, 1000);