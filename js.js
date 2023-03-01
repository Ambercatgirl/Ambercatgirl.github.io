var upgBought = 0;
class createOre {
    constructor(obj) {
        this.amt = obj.amt;
        this.timeMulti = obj.timeMulti
        this.time = (setup.length * this.timeMulti) * 1000;
    }
    multiply(num) { // Used to multiply ore value in the setup.
        this.amt *= num;
    }
    getValue() { // Returns the value of the ore.
        return this.amt;
    }
    setValue() { // Resets the value of the ore.
        this.amt = 1;
    }
    getSetupTime() { // Returns the time between ores selling.
        return this.time;
    }
    changeTime() { // Updates the time between ores selling.
        this.time = (setup.length * this.timeMulti) * 1000;
        addMoney();
    }
    changeTimeMulti() {
        if (this.timeMulti > 0.25) {
            this.timeMulti -= 0.05;
            upgBought++;
            this.changeTime();
        }
    }
    getTimeMulti() {
        return this.timeMulti;
    }
}
class createItem {
    constructor(obj) {
        this.itemName = obj.itemName;
        this.itemAmt = obj.itemAmt;
        this.itemMulti = obj.itemMulti;
        this.itemType = obj.itemType;
        this.effectGiven = obj.effectGiven;
        this.givesBuff = obj.givesBuff;
        this.itemRarity = obj.itemRarity;
        this.itemId = obj.itemId;
        this.amountPlaced = obj.amountPlaced;
    }
    getName() { // Gets the item name.
        return this.itemName;
    }
    getAmt() { // Returns the amount of this item owned.
        return this.itemAmt;
    }
    getMulti() { // Returns the multiplier of the item.
        return this.itemMulti;
    }
    getType() { // Returns the type of item (processor, upgrader, dropper).
        return this.itemType;
    }
    getEffect() { // Returns the effect the item gives, returns "none" if the item gives no effect.
        return this.effectGiven;
    }
    hasEffect() { // Returns the effect that gets buffed by this upgrader.
        return this.givesBuff;
    }
    getRarity() { // Returns the item rarity.
        return this.itemRarity;
    }
    getId() {
        return this.itemId;
    }
    getAmountPlaced() {
        return this.amountPlaced;
    }
    addAmt() { // Adds 1 item to inventory.
        this.itemAmt++;
        document.getElementById(("item_" + this.itemId)).innerHTML = this.itemAmt + " Owned.";
    }
    removeAmt() { // Removes 1 item from the inventory
        if (this.itemAmt > 0) {
            this.itemAmt--;
        }
        document.getElementById(("item_" + this.itemId)).innerHTML = this.itemAmt + " Owned.";
    }
    setAmt(num) {
        this.itemAmt = num;
        document.getElementById(("item_" + this.itemId)).innerHTML = this.itemAmt + " Owned.";
    }
    setPlaced(num) {
        this.amountPlaced = num;
        document.getElementById(("placed_") + this.itemId).innerHTML = this.amountPlaced + " Placed.";
    }
    changePlaced(num) {
        this.amountPlaced += num;
        document.getElementById(("placed_") + this.itemId).innerHTML = this.amountPlaced + " Placed."
    }
    toString() {
        return "Owned: " + this.getAmt() + "\nIs a " + this.getType() + "\n" + this.getMulti() + "x\nGives " + this.getEffect() + "\nBuffs " + this.hasEffect() + "\nRarity " + this.getRarity();
    }
}
var items = [];
var setup = [];
var hasDropper = false;
var hasProcessor = false;
function initialize() {
    var updated1 = localStorage.getItem("hasUpdated1");
    if (!updated1) {
        localStorage.clear();
        localStorage.setItem(("hasUpdated1"), JSON.stringify(true));
    }
    document.getElementById("start").style.display = "none";
    var playedBefore = localStorage.getItem("hasInitialized");
    // Start Deletion Here
    items.push(new createItem({ itemName: 'Basic Dropper', itemAmt: 1, amountPlaced: 0, itemMulti: 1, itemType: 'dropper', effectGiven: 'none', givesBuff: 'none', itemRarity: 7, itemId: 0 }));
    items.push(new createItem({ itemName: 'Basic Upgrader', itemAmt: 1, amountPlaced: 0, itemMulti: 1.15, itemType: 'upgrader', effectGiven: 'none', givesBuff: 'none', itemRarity: 7, itemId: 1 }));
    items.push(new createItem({ itemName: 'Basic Processor', itemAmt: 1, amountPlaced: 0, itemMulti: 1.5, itemType: 'processor', effectGiven: 'none', givesBuff: 'none', itemRarity: 7, itemId: 2 }));
    items.push(new createItem({ itemName: 'Antibody Synthesizer', itemAmt: 0, amountPlaced: 0, itemMulti: 1.2, itemType: 'upgrader', effectGiven: 'none', givesBuff: 'poison', itemRarity: 6, itemId: 3 }));
    items.push(new createItem({ itemName: 'Uninteresting Refinery', itemAmt: 0, amountPlaced: 0, itemMulti: 1.35, itemType: 'upgrader', effectGiven: 'none', givesBuff: 'none', itemRarity: 5, itemId: 4 }));
    items.push(new createItem({ itemName: 'Candy Materializer', itemAmt: 0, amountPlaced: 0, itemMulti: 2, itemType: 'dropper', effectGiven: 'none', givesBuff: 'none', itemRarity: 4, itemId: 5 }));
    items.push(new createItem({ itemName: 'Poison Dart Frog Injector', itemAmt: 0, amountPlaced: 0, itemMulti: 1.2, itemType: 'upgrader', effectGiven: 'poison', givesBuff: 'none', itemRarity: 3, itemId: 6 }));
    items.push(new createItem({ itemName: 'Un-Frozen Pond', itemAmt: 0, amountPlaced: 0, itemMulti: 1.3, itemType: 'upgrader', effectGiven: 'frozen', givesBuff: 'none', itemRarity: 2, itemId: 7 }));
    items.push(new createItem({ itemName: 'Elsa', itemAmt: 0, amountPlaced: 0, itemMulti: 1.75, itemType: 'upgrader', effectGiven: 'none', givesBuff: 'frozen', itemRarity: 1, itemId: 8 }));
    items.push(new createItem({ itemName: 'Homemade Popsicle', itemAmt: 0, amountPlaced: 0, itemMulti: 2.5, itemType: 'upgrader', effectGiven: 'none', givesBuff: 'fire', itemRarity: 0.5, itemId: 9 }));
    items.push(new createItem({ itemName: 'Wasp Stingifier', itemAmt: 0, amountPlaced: 0, itemMulti: 4, itemType: 'upgrader', effectGiven: 'none', givesBuff: 'none', itemRarity: 0.25, itemId: 10 }));
    items.push(new createItem({ itemName: 'Thriving Forest', itemAmt: 0, amountPlaced: 0, itemMulti: 7.5, itemType: 'upgrader', effectGiven: 'fire', givesBuff: 'none', itemRarity: 0.1, itemId: 11 }));
    items.push(new createItem({ itemName: 'Laser-Powered Garbage Can', itemAmt: 0, amountPlaced: 0, itemMulti: 10, itemType: 'processor', effectGiven: 'none', givesBuff: 'none', itemRarity: 0.05, itemId: 12 }));
    items.push(new createItem({ itemName: 'Super-Duper-Long-Range-Freeze-Blaster', itemAmt: 0, amountPlaced: 0, itemMulti: 15, itemType: 'upgrader', effectGiven: 'frozen', givesBuff: 'none', itemRarity: 0.01, itemId: 13 }));
    items.push(new createItem({ itemName: 'Antimatter Drill', itemAmt: 0, amountPlaced: 0, itemMulti: 15, itemType: 'dropper', effectGiven: 'none', givesBuff: 'none', itemRarity: 100, itemId: 14 }));
    items.push(new createItem({ itemName: 'Fusion Reactor', itemAmt: 0, amountPlaced: 0, itemMulti: 5, itemType: 'upgrader', effectGiven: 'none', givesBuff: 'none', itemRarity: 100, itemId: 15 }));
    items.push(new createItem({ itemName: 'Godlike Annihalator', itemAmt: 0, amountPlaced: 0, itemMulti: 50, itemType: 'upgrader', effectGiven: 'none', givesBuff: 'none', itemRarity: 1000, itemId: 16 }));
    items.push(new createItem({ itemName: 'The Power of The Sun', itemAmt: 0, amountPlaced: 0, itemMulti: 45, itemType: 'upgrader', effectGiven: 'fire', givesBuff: 'none', itemRarity: 1000, itemId: 17 }));
    // End Deletion Here
    if (playedBefore) {
        var amts = JSON.parse(localStorage.getItem("allItemAmounts"));
        var allPlaced = JSON.parse(localStorage.getItem("allItemsPlaced"));
        for (var i = 0; i < amts.length; i++) {
            items[i].setAmt(amts[i]);
            items[i].setPlaced(allPlaced[i]);
        }
        remakeSetup = JSON.parse(localStorage.getItem("setup"));
        remakeSetupLength = JSON.parse(localStorage.getItem("setupLength"));
        for (var j = 0; j < remakeSetupLength; j++) {
            if (items[remakeSetup[j]].getType() == "dropper") {
                hasDropper = true;
            }
            if (items[remakeSetup[j]].getType() == "processor") {
                hasProcessor = true;
            }
            setup.push(items[remakeSetup[j]]);
        }
        money = JSON.parse(localStorage.getItem("saveMoney"));
        timeMulti = JSON.parse(localStorage.getItem("saveUpgrades"));
        lives = JSON.parse(localStorage.getItem("saveLives"));
        basicOre = new createOre(JSON.parse(localStorage.getItem("saveUpgrades")));
        upg1Cost = JSON.parse(localStorage.getItem("saveUpgCost"));
        ascendCost = JSON.parse(localStorage.getItem("saveAscendCost"));
        presReq = JSON.parse(localStorage.getItem("savePrestigeReq"));
        rebirthPresReq = JSON.parse(localStorage.getItem("saveRebirthReq"));
        rebirths = JSON.parse(localStorage.getItem("saveRebirths"));
        prestiges = JSON.parse(localStorage.getItem("savePrestiges"));
    } else {
        basicOre = new createOre({ amt: 1, timeMulti: 0.75 });
        addToSetup(0);
        addToSetup(2);
    }
    addMoney();
    for (var i = 0; i < items.length; i++) {
        document.getElementById(("name_") + i).innerHTML = items[i].getName();
        document.getElementById(("item_") + i).innerHTML = items[i].getAmt() + " Owned.";
        document.getElementById(("placed_") + i).innerHTML = items[i].getAmountPlaced() + " Placed.";
        document.getElementById(("effectGiven_") + i).innerHTML = "Gives " + items[i].getEffect();
        document.getElementById(("effectBuffs_") + i).innerHTML = "Buffs " + items[i].hasEffect();
        document.getElementById(("multiAndRarityDisplay_") + i).innerHTML = items[i].getMulti() + "x | R" + items[i].getRarity();
    }
    document.getElementById("moneyDisplay").innerHTML = "$" + setSuffix(money);
    document.getElementById("livesDisplay").innerHTML = "Life " + lives;
    document.getElementById("ascendDisplay").innerHTML = "Ascend for $" + setSuffix(ascendCost);
    document.getElementById("prestigeDisplay").innerHTML = "Prestige: " + presReq + " Lives";
    document.getElementById("prestigesDisplay").innerHTML = "Prestige " + prestiges
    document.getElementById("rebirthDisplay").innerHTML = "Rebirth: " + rebirthPresReq + " Prestiges";
    document.getElementById("upgradeDisplay").innerHTML = "Increase Setup Speed: $" + upg1Cost;
    window.localStorage.setItem("hasInitialized", "true");
    saveData();
    autoSave();
}
var currentDropperId = 0;
function addToSetup(index) {
    // Makes sure the first item in the setup is a dropper
    if (items[index].getType() == "dropper" && items[index].getAmt() > 0) {
        if (hasDropper) {
            setup[0].addAmt((setup[0].getId()));
            setup[0].changePlaced(-1);
            document.getElementById(("placed_" + setup[0].getId())).innerHTML = setup[0].getAmountPlaced() + " Placed.";
            setup[0] = items[index];
            setup[0].removeAmt(index);
            setup[0].changePlaced(1);
            document.getElementById(("placed_" + setup[0].getId())).innerHTML = setup[0].getAmountPlaced() + " Placed.";
        } else {
            setup[0] = items[index];
            hasDropper = true;
            items[index].removeAmt(index);
            items[index].changePlaced(1);
            document.getElementById(("placed_" + index)).innerHTML = items[index].getAmountPlaced() + " Placed.";
        }

    }
    // Makes sure the processor is always placed at the end
    if (hasDropper == true && items[index].getType() == "processor" && items[index].getAmt() > 0) {
        if (hasProcessor) {
            setup[setup.length - 1].addAmt(setup[setup.length - 1].getId());
            setup[setup.length - 1].changePlaced(-1);
            document.getElementById(("placed_" + setup[setup.length - 1].getId())).innerHTML = setup[setup.length - 1].getAmountPlaced() + " Placed.";
            setup[setup.length - 1] = items[index];
            items[index].removeAmt(index);
            items[index].changePlaced(1);
            document.getElementById(("placed_" + items[index].getId())).innerHTML = items[index].getAmountPlaced() + " Placed."
        } else {
            setup.push(items[index]);
            items[index].removeAmt(index);
            items[index].changePlaced(1);
            document.getElementById(("placed_" + index)).innerHTML = items[index].getAmountPlaced() + " Placed.";
            hasProcessor = true;
        }
    }
    // Adds upgraders to the middle, making sure to be in between a dropper and processor
    if (items[index].getType() == "upgrader" && hasDropper && items[index].getAmt() > 0) {
        if (hasProcessor) {
            var temp = setup[setup.length - 1];
            setup[setup.length - 1] = items[index];
            items[index].removeAmt();
            setup.push(temp);
            items[index].changePlaced(1);
            document.getElementById(("placed_" + index)).innerHTML = items[index].getAmountPlaced() + " Placed.";
        } else {
            setup.push(items[index]);
            items[index].removeAmt();
            items[index].changePlaced(1);
            document.getElementById(("placed_" + index)).innerHTML = items[index].getAmountPlaced() + " Placed.";
        }
    }
    basicOre.changeTime();
    if (hasDropper == true && hasProcessor == true) {
        addMoney();
    }
}
function removeFromSetup(index) {
    if (items[index].getType() == "upgrader") {
        for (var i = 0; i < setup.length; i++) {
            if (setup[i] == items[index]) {
                setup.splice(i, 1);
                items[index].addAmt();
                items[index].changePlaced(-1);
                document.getElementById(("placed_" + index)).innerHTML = items[index].getAmountPlaced() + " Placed.";
                break;
            }
        }
    }
    basicOre.changeTime();
}
function withdrawAll() {
    for (var i = setup.length - 2; i > 0; i--) {
        items[setup[i].getId()].addAmt(setup[i].getId());
        setup[i].changePlaced(-1);
        document.getElementById(("placed_" + setup[i].getId())).innerHTML = items[setup[i].getId()].getAmountPlaced() + " Placed.";
        setup.splice(i, 1);
    }
}
let myTimer = null;
function addMoney() {
    clearInterval(myTimer);
    if (hasProcessor && hasDropper) {
        myTimer = setInterval(goThroughSetup, basicOre.getSetupTime())
    }
}
var money = 0;
var synBuff = 1;
// Loops through the setup array for multipliers
function goThroughSetup() {
    var tags = [];
    if (hasDropper && hasProcessor) {
        basicOre.multiply(setup[0].getMulti());
        for (var i = 1; i < setup.length; i++) {
            // Adds buffed effect to a list            
            if (setup[i].hasEffect() != "none" && tags.indexOf(setup[i].hasEffect()) == -1) {
                tags.push(setup[i].hasEffect());
            }
            // Checks if the item gives a buff, and loops through the buffed effects list to see if the effect  given is buffed. 
            if (setup[i].getEffect() != "none" && tags.indexOf(setup[i].getEffect()) != -1) {
                synBuff *= 1.5;
            }
            basicOre.multiply(setup[i].getMulti());
            basicOre.multiply(synBuff);
            synBuff = 1;
        }
        money += basicOre.getValue();
        document.getElementById("moneyDisplay").innerHTML = "$" + setSuffix(money);
        basicOre.setValue();
        tags.splice(0, tags.length);
    }
}
var ascendCost = 10;
var lives = 0;
function ascend() { // Ascension Function
    if (money >= ascendCost) {
        if (money >= (ascendCost * 1000000)) {
            giveItem(3);
            ascendCost += Math.round(ascendCost / 2);
            money = 0;
            lives += 3;
        } else if (money >= (ascendCost * 1000)) {
            giveItem(2);
            ascendCost += Math.round(ascendCost / 4);
            money = 0;
            lives += 2;
        } else if (money >= ascendCost) {
            giveItem(1);
            ascendCost += Math.round(ascendCost / 8);
            money = 0;
            lives++;
        }
        document.getElementById("livesDisplay").innerHTML = "Life " + lives;
        document.getElementById("moneyDisplay").innerHTML = "$" + setSuffix(money);
        document.getElementById("ascendDisplay").innerHTML = "Ascend for $" + setSuffix(ascendCost);
        saveData();
    }
}
var presReq = 100;
prestiges = 0;
function prestige() { // Prestige Function
    if (lives >= presReq) {
        for (var i = setup.length - 1; i >= 0; i--) {
            if (setup[i].getRarity() <= 1 || setup[i].getRarity() > 20) {
                setup[i].addAmt();
                setup[i].changePlaced(-1);
                setup.splice(i, 1);
            } else {
                setup.splice(i, 1);
            }
        }
        for (var k = 0; k < items.length; k++) {
            if (items[k].getRarity() > 1 && items[k].getRarity() < 20) {
                items[k].setAmt(0);
                items[k].setPlaced(0);
            }
        }
        hasDropper = false;
        hasProcessor = false;
        prestiges++;
        items[0].setAmt(1);
        items[2].setAmt(1);
        money = 0;
        lives = 0;
        presReq += 25;
        ascendCost = 10;
        document.getElementById("prestigesDisplay").innerHTML = "Prestige " + prestiges;
        document.getElementById("prestigeDisplay").innerHTML = "Prestige for " + presReq + " lives.";
        document.getElementById("livesDisplay").innerHTML = "Life " + 0;
        document.getElementById("moneyDisplay").innerHTML = "$" + 0;
        document.getElementById("ascendDisplay").innerHTML = "Ascend for $" + ascendCost;
        var num = givePresItem()
        num.addAmt();
        saveData();
        basicOre.changeTime();
        addMoney();
    }
}
function givePresItem() { // Gives a prestige item
    var itemsGiven = 0;
    var num = Math.floor(Math.random() * 11)
    var rarityToGive = 0;
    var itemsToGive = [];
    while (itemsGiven < 1) {
        if (num == 7) {
            rarityToGive = 100;
            itemsGiven++;
        } else {
            num = Math.floor(Math.random() * 11)
        }
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i].getRarity() == rarityToGive) {
            itemsToGive.push(items[i]);
        }
    }
    return itemsToGive[Math.floor(Math.random() * itemsToGive.length)];

}
function giveRebirthItem() {
    var itemsGiven = 0;
    var num = Math.floor(Math.random() * 6)
    var rarityToGive = 0;
    var itemsToGive = [];
    while (itemsGiven < 1) {
        if (num == 3) {
            rarityToGive = 1000;
            itemsGiven++;
        } else {
            num = Math.floor(Math.random() * 6)
        }
    }
    for (var i = 0; i < items.length; i++) {
        if (items[i].getRarity() == rarityToGive) {
            itemsToGive.push(items[i]);
        }
    }
    return itemsToGive[Math.floor(Math.random() * itemsToGive.length)];
}
var rebirthPresReq = 25;
var rebirths = 0;
function rebirth() { // Rebirth Function
    if (prestiges >= rebirthPresReq) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].getRarity() > 1 && items[i].getRarity() < 500) {
                items[i].setAmt(0);
            }
        }
        for (var k = setup.length - 1; k >= 0; k--) {
            if (setup[k].getRarity() > 1 && items[k].getRarity() < 500) {
                setup.splice(k, 1);
            } else {
                items[setup[k]].removeFromSetup(setup[k].getId());
            }
        }
        rebirths++;
        items[0].setAmt(1);
        items[2].setAmt(1);
        if (setup.length > 1) {
            if (!(setup[0].getType == "dropper")) {
                hasDropper = false;
            } else {
                hasDropper = true;
            }
            if (!(setup[setup.length - 1] == "processor")) {
                hasProcessor = false;
            } else {
                hasProcessor = true;
            }
        }
        lives = 0;
        rebirthPresReq += 5;
        prestiges = 0;
        presReq = 100;
        ascendCost = 10;
        document.getElementById("prestigesDisplay").innerHTML = "Prestige " + prestiges;
        document.getElementById("rebirthDisplay").innerHTML = "Prestige for " + presReq + " lives.";
        document.getElementById("livesDisplay").innerHTML = "Life " + 0;
        document.getElementById("moneyDisplay").innerHTML = "$" + 0;
        document.getElementById("ascendDisplay").innerHTML = "Ascend for $" + setSuffix(ascendCost);
        var num = giveRebirthItem();
        num.addAmt();
        addMoney();
        saveData();
    }
}
var upg1Cost = 25;
function upgradeSpeed() { // Increases Setup Speed
    if (basicOre.getTimeMulti() > 0.25 && money >= upg1Cost) {
        basicOre.changeTimeMulti();
        money -= upg1Cost;
        upg1Cost *= 2;
        document.getElementById("moneyDisplay").innerHTML = "$" + setSuffix(money);
        document.getElementById("upgradeDisplay").innerHTML = "Increase Setup Speed: $" + upg1Cost;
    }
    saveData();
}
function giveItem(amt) {
    const rarityToGive = [];
    var itemsGiven = 0;
    var temp = 0;
    while (itemsGiven < amt) {
        if (itemsGiven < amt && Math.floor(Math.random() * 15) == 7) {
            rarityToGive.push(7)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 16) == 8) {
            rarityToGive.push(6)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 21) == 10) {
            rarityToGive.push(5)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 26) == 12) {
            rarityToGive.push(4)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 34) == 16) {
            rarityToGive.push(3)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 51) == 25) {
            rarityToGive.push(2)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 101) == 50) {
            rarityToGive.push(1)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 201) == 100) {
            rarityToGive.push(0.5)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 251) == 125) {
            rarityToGive.push(0.25)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 1001) == 500) {
            rarityToGive.push(0.1)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 5001) == 2500) {
            rarityToGive.push(0.05)
            itemsGiven++;
        }
        if (itemsGiven < amt && Math.floor(Math.random() * 10001) == 5000) {
            rarityToGive.push(0.01)
            itemsGiven++;
        }
    }
    const canGive = [];
    const indexToGive = [];
    for (var j = 0; j < rarityToGive.length; j++) {
        for (var i = 0; i < items.length; i++) {
            if (items[i].getRarity() == rarityToGive[j]) {
                canGive.push(items[i]);
                indexToGive.push();
            }
        }
        temp = Math.floor(Math.random() * canGive.length);
        console.log(canGive[temp].getRarity() + ", " + canGive[temp].getMulti());
        canGive[temp].addAmt();
        canGive.splice(0, canGive.length);
        indexToGive.splice(0, indexToGive.length);
    }

}
const suffixes = ["k", "M", "B", "T", "qd", "Qn", "Sx", "Sp", "O", "N", "de", "Ud", "DD"];
function setSuffix(value) {
    var multi = 1000;
    var temp = 0;
    if (value > Math.pow(10, 303)) {
        temp = "Inf";
        return temp;
    } else if (value < 1000) {
        temp = Math.round(value * 100) / 100;
        return temp;
    } else if ((value >= multi)) {
        for (var i = 0; i < suffixes.length; i++) {
            if (value / multi < 1000) {
                if (Math.round(value / multi) == 1000) {
                    temp = 1 + suffixes[i + 1];
                    return temp;
                    break;
                } else {
                    temp = Math.round(((value / multi) * 100)) / 100 + suffixes[i];
                    return temp;
                    break;
                }
            } else if (value / multi >= 1000) {
                multi = multi * 1000;
            }
        }
    }
}
let loopTimer = null;
function loopMoney(state) {
    if (state) {
        clearInterval(loopTimer);
        loopTimer = setInterval(addLoopMoney, 10)
    } else {
        clearInterval(loopTimer);
    }

}
function addLoopMoney() {
    money = 1e+303;
    document.getElementById("moneyDisplay").innerHTML = "$" + setSuffix(money);
}
function callInside() {
    console.log("true");
}
var saveTimer = null;
function autoSave() {
    saveTimer = setInterval(saveData, 30000);
}
function saveData() {

    /*for (var i = 0; i < items.length; i++) {
        localStorage.setItem(('playerItems' + i), JSON.stringify(items[i]));
    }
    */
    var amts = [];
    var allPlaced = [];
    for (var i = 0; i < items.length; i++) {
        amts.push(items[i].getAmt());
        allPlaced.push(items[i].getAmountPlaced());
    }
    localStorage.setItem(('allItemAmounts'), JSON.stringify(amts));
    localStorage.setItem(('allItemsPlaced'), JSON.stringify(allPlaced));
    var setupIds = [];
    for (var j = 0; j < setup.length; j++) {
        setupIds.push(setup[j].getId());
    }
    localStorage.setItem(('setup'), JSON.stringify(setupIds));
    localStorage.setItem(('setupLength'), JSON.stringify(setup.length));
    localStorage.setItem(('saveLives'), JSON.stringify(lives));
    localStorage.setItem(('saveMoney'), JSON.stringify(money));
    localStorage.setItem(('saveUpgrades'), JSON.stringify(basicOre));
    localStorage.setItem(('saveUpgCost'), JSON.stringify(upg1Cost));
    localStorage.setItem(('saveAscendCost'), JSON.stringify(ascendCost));
    localStorage.setItem(('savePrestiges'), JSON.stringify(prestiges));
    localStorage.setItem(('saveRebirths'), JSON.stringify(rebirths));
    localStorage.setItem(('savePrestigeReq'), JSON.stringify(presReq));
    localStorage.setItem(('saveRebirthReq'), JSON.stringify(rebirthPresReq));
}
function clearData() {
    localStorage.clear();
}
