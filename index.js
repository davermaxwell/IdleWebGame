//The timer to run code every second (1000ms)
var Timer = window.setInterval(function(){tick()}, 1000);

var boats = []; //The array to hold all of the boats and relevant info
var crew = []; //The array to hold all of the crew members and relevant info

//Variables to enable different purchase amounts
var boatAmount = 1; //Default number of boats to buy
var boatMax = false; //Bool to track if player is buying max amount available or specific number
var crewAmount = 1; //Default number of crew to buy
var crewMax = false; //Bool to track if player is buying max amount available or specific number

//Array that holds the unique HTML element IDs for updating the # of boats the player has on screen
var testBoats = ["rowBoats", "sloops", "longships", "caravelles", "schooners", "galleys", 
    "brigantines", "barques", "galleons", "triremes", "manofwars", "dreadnoughts"];

//Array that holds the unique HTML element IDs for updating the # of crew members the player has
var testCrew = ["scavengers"];

/*************Boat related declarations and functions below******************************/    
//Object declaration for boats
function Boat(){
    this.name = "Boat Name";
    this.woodCost = "10";
    this.goldCostBase = "10";
    this.goldCostNext = "10";
    this.goldCostGrowth = 1;
    this.persec = 1;
}

//Function to initialize the boats
function initBoats(){
    //loadBoat(name, woodCost, goldCostBase, persec, goldCostGrowth)
    loadBoat("Row Boat", 10, 10, 1, 1.1);
    loadBoat("Sloop", 100, 150, 5, 1.15);
    loadBoat("Longship", 1000, 1800, 25, 1.14);
    loadBoat("Caravelle", 10000, 21600, 150, 1.13);
    loadBoat("Schooner", 100000, 259200, 750, 1.12);
    loadBoat("Galley", 1000000, 3110400, 3750, 1.11);
    loadBoat("Brigantine", 10000000, 37324800, 18750, 1.10);
    loadBoat("Barque", 100000000, 447897600, 93750, 1.09);
    loadBoat("Galleon", 1000000000, 5374771200, 468750, 1.08);
    loadBoat("Trireme", 10000000000, 64497254400, 2343750, 1.07);
    loadBoat("Man-of-War", 100000000000, 773967052800, 11718750, 1.06);
    loadBoat("Dreadnought", 100000000000, 9287604633600, 58593750, 1.05);
}

//Function to automatically load a boat into the boat array
function loadBoat(name, woodCost, goldCostBase, persec, goldCostGrowth){
    var i = boats.length;
    
    boats[i] = new Boat();
    boats[i].name = name;
    boats[i].woodCost = woodCost;
    boats[i].goldCostBase = goldCostBase;
    boats[i].goldCostNext = goldCostBase;
    boats[i].goldCostGrowth = goldCostGrowth;
    boats[i].persec = persec;
}

//Function to buy a new boat
function buyBoat(id){
    console.log(2);
    
    //Check if player has enough wood and gold to buy the boat
    if(game.wood >= boats[id].woodCost && game.gold >= boats[id].goldCostNext){
        game.wood -= boats[id].woodCost; //Subtract wood cost from player total
        game.gold -= boats[id].goldCostNext; //Subtract gold cost from player total
        game.boats[id] = game.boats[id] + 1; //Add one to the purchased boat total
        
        boats[id].goldCostNext = boats[id].goldCostBase * (boats[id].goldCostGrowth ^ game.boats[id]); //Calculate the increased cost of the next boat
        
        refreshNumbers(); //Refresh all numbers on the screen after currencies and costs are updated
    }
}
/*************End of boat related declarations and functions*****************************/

/*************Crew related declarations and functions below******************************/
//Object declaration for crew members
function Crew(){
    this.name = "Scavenger";
    this.goldCostBase = 10;
    this.goldCostNext = 10;
    this.goldCostGrowth = 1;
    this.persec = 1;
}

//Function to initialize crew members
function initCrew(){
    //loadCrew(name, goldCostBase, persec, goldCostGrowth)
    loadCrew("Scavenger", 10, 1, 1.01);
}

//Function to automatically load crew into the crew array
function loadCrew(name, goldCostBase, persec, goldCostGrowth){
    var i = crew.length;
    
    crew[i] = new Crew();
    crew[i].name = name;
    crew[i].goldCostBase = goldCostBase;
    crew[i].persec = persec;
    crew[i].goldCostGrowth = goldCostGrowth;
}

//Function to hire a new crew member
function hireCrew(id, numberToHire){    
    if(crewMax){
        //Calculate max amount available to buy based on current gold
        crewAmount = Math.floor(Math.log(((game.gold * (crew[id].goldCostGrowth - 1)) 
                                            / crew[id].goldCostBase * (crew[id].goldCostGrowth ^ game.crew[id])) + 1) 
                                            / Math.log(crew[id].goldCostGrowth));
                                            
        //Testing
        console.log(crewAmount);
                                            
        //Calculate gold cost for the max crew to buy
        var maxGold = (crew[id].goldCostBase * (((crew[id].goldCostGrowth ^ game.crew[id]) * ((crew[id].goldCostGrowth ^ crewAmount) - 1))
                                                    / (crew[id].goldCostGrowth - 1)));
        
        //Testing
        console.log(maxGold);
        
        //Update game numbers
        game.crew[id] += crewAmount;
        game.gold -= maxGold;
        
        //Refresh numbers on screen
        refreshNumbers();
    } else{
        // TO DO
    }    
    
    /*
    //Check if player has enough gold to hire the crew member
    if(game.gold >= crew[id].goldCostNext){
        game.gold -= crew[id].goldCostNext; //Subtract the gold cost
        game.crew[id] = game.crew[id] + 1; //Add one to the crew member total
        
        crew[id].goldCostNext = crew[id].goldCostBase * (crew[id].goldCostGrowth ^ game.crew[id]); //Calculate the next crew member cost
        
        refreshNumbers(); //Refresh all numbers on screen for the player after currency and crew changes
    }*/
}

//Function to sell a crew member
function sellCrew(id, numberToSell){
    /* TO DO */
}

function crewAmountFunction(){
    if(crewMax){
        crewMax = false;
        crewAmount = 1;
        document.getElementById("crewAmountId").innerHTML = "1"; //Update amount button
    } else{
        switch(crewAmount){
            case 1:
                crewAmount = 10;
                document.getElementById("crewAmountId").innerHTML = "10"; //Update amount button
                break;
            case 10:
                crewAmount = 100;
                document.getElementById("crewAmountId").innerHTML = "100"; //Update amount button
                break;
            case 100:
                crewAmount = 1000;
                document.getElementById("crewAmountId").innerHTML = "1000"; //Update amount button
                break;
            case 1000:
                crewMax = true;
                document.getElementById("crewAmountId").innerHTML = "MAX"; //Update amount button
                break;
            default:
                crewAmount = 1;
                document.getElementById("crewAmountId").innerHTML = "1"; //Update amount button
                break;
        }
    }
}
/*************End of crew related declarations and functions******************************/

/*************General game declarations and functions below******************************/
//Function for when a user clicks on the clickable area
function activeClick(){
    console.log(1);
    
    game.wood++;
    game.gold++;
    
    refreshNumbers();
}

//Function to refresh the numbers displayed to the user
function refreshNumbers(){
    document.getElementById("currentWood").innerHTML = "Wood: " + game.wood; //Update wood value on screen
    document.getElementById("currentGold").innerHTML = "Gold: " + game.gold; //Update gold value on screen
    document.getElementById("currentSouls").innerHTML = "Souls: " + game.souls; //Update souls value on screen
    
    //Update the number of boats the player has
    for(var i = 0; i < boats.length; i++){
        document.getElementById(testBoats[i]).innerHTML = game.boats[i];
    }
    
    //Update the number of crew members the player has
    for(var i = 0; i < crew.length; i++){
        document.getElementById(testCrew[i]).innerHTML = game.crew[i];
    }
}

//Function that runs everytime the timer ticks. Used to keep current player gold/wood/etc up to date
function tick(){
    //Increase player gold amount based on number of boats
    for(var i = 0; i < boats.length; i++){
        game.gold += game.boats[i] * boats[i].persec;
    }
    
    game.wood += game.crew[0] * crew[0].persec; //Increase wood amount based on scavengers
    
    refreshNumbers(); //Refresh all numbers on screen
}

//Game save function to store variables
function gameSave(){
    this.wood = 10;
    this.gold = 10;
    this.souls = 0;
    this.boats = [];
    for(var i = 0; i < boats.length; i++){ //Initialize boats at 0 for start of game
        this.boats[i] = 0;
    }
    this.crew = [];
    for(var i = 0; i < crew.length; i++){ //Initialize crew members at 0 for start of game
        this.crew[i] = 0;
    }
}

//Function to startup specific items after the page loads
window.onload = function(){
    initBoats();
    initCrew();
    window.game = new gameSave();
}