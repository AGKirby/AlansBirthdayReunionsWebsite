class Competitor {
    constructor(name, picture, hungerGames, athletic, boardCard, table, video, speedrun, smash) {
        this.name = name;
        this.picture = picture;
        this.hungerGames = hungerGames;
        this.athletic = athletic;
        this.boardCard = boardCard;
        this.table = table;
        this.video = video;
        this.speedrun = speedrun;
        this.smash = smash;
      }
}

competitors = [
    new Competitor('Adam', 'assets/pictures/Adam.jpg', 1258.735084, 1096.269227, 1153.417313, 1305.231801, 1291.25415, 1260.182, 1322.223864),
    new Competitor('Alan', 'assets/pictures/Alan.jpg', 824.7960089, 998.5247102, 950.347982, 962.8287363, 968.2170927, 1083.80953, 984.8088686),
    new Competitor('Brent', 'assets/pictures/Brent.jpg', 1067.593477, 1066.742844, 1024.138179, 1008.11249, 1009.543198, 1144.42024, 912.0540979),
    new Competitor('Chris', 'assets/pictures/Chris.jpg', 1000, 1004.868909, 1000, 1000, 1000, 1000, 1000),
    new Competitor('Cole', 'assets/pictures/Cole.jpg', 1082.696918, 1129.223396, 1043.787268, 1063.825845, 1021.733508, 1042.28823, 966.2254991),
    new Competitor('Dakota', 'assets/pictures/Dakota.jpg', 851.0151682, 958.5711633, 937.109769, 918.6822691, 890.9780786, 968.0849841, 945.063157),
    new Competitor('Eric', 'assets/pictures/Eric.png', 1000, 967.576704, 1000, 1000, 933.3328129, 1000, 970.1967478),
    new Competitor('Gabriel', 'assets/characters/Roy.jpg', 928, 1000, 1000, 1000, 1000, 1000, 1000),
    new Competitor('Harrison', 'assets/pictures/Harrison.jpg', 1109.816264, 1005.053482, 1043.865616, 1048.746459, 1031.940904, 1044.366422, 1053.463381),
    new Competitor('Isaac', 'assets/pictures/Isaac.JPG', 995.2432157, 1000, 1000, 1030.826138, 935.1632403, 920.0849841, 938.8147337),
    new Competitor('Jack', 'assets/pictures/Jack.jpg', 1115.587733, 1063.484775, 1034.278025, 980.5328027, 967.7842765, 936.4387261, 996.1039303),
    new Competitor('Jacob', 'assets/characters/Wolf.jpg', 935.8717041, 1000, 986.7420724, 974.6851841, 1000, 916, 952.3114003),
    new Competitor('Jake', 'assets/characters/Sonic.jpg', 909.1785936, 1000, 1000, 1002.279719, 1015.713837, 1000, 984),
    new Competitor('Jeremy', 'assets/characters/DiddyKong.jpg', 952, 1000, 1000, 1000, 1000, 1000, 1000),
    new Competitor('Kasey', 'assets/characters/Villager.jpg', 1065.753071, 1000, 968.7363068, 967.3537165, 1097.20013, 935.3418501, 1053.008232),
    new Competitor('Korey', 'assets/pictures/Korey.JPEG', 1064.293498, 906.8974093, 969.901992, 959.7188934, 1070.536756, 948.1314009, 1045.808194),
    new Competitor('McLean', 'assets/pictures/McLean.jpg', 1055.855893, 1069.300016, 977.4566122, 999.5660685, 980.0637799, 906.7058389, 1023.566929),
    new Competitor('Nat', 'assets/pictures/Nat.jpg', 998.7076879, 928.1274725, 938.050337, 895.6204423, 901.2443183, 883.4500289, 978.9391618),
    new Competitor('Nelson', 'assets/pictures/Nelson.jpg', 923.1732669, 949.7539065, 983.6111528, 1000, 1081.809334, 1000, 1013.710325),
    new Competitor('Noah', 'assets/pictures/Noah.png', 1000, 996.9214296, 1035.036449, 1000, 957.3393126, 897.3483483, 997.9961189),
    new Competitor('Parker', 'assets/characters/IceClimbers.jpg', 837.3287054, 969.5219423, 984, 875.1091838, 930.2239221, 1000, 984),
    new Competitor('Porter', 'assets/characters/QuestionMark.jpg', 1000, 1000, 1000, 1000, 1000, 1000, 1000),
    new Competitor('Riley', 'assets/pictures/Riley.png', 1000, 1053.698926, 1000, 1000, 946.822641, 976.607677, 967.7013003),
    new Competitor('Zach', 'assets/characters/Shulk.jpg', 938.2016802, 982.6383963, 975.1737187, 1000, 921.8076019, 1000, 971.2551643)
]

triathlon_distances = [
    new Competitor('The Super Sprint Distance Triathlon', 'assets/pictures/triathlon.png', undefined, 950, undefined, undefined, undefined, undefined, undefined),
    new Competitor('The Sprint Distance Triathlon', 'assets/pictures/triathlon.png', undefined, 1050, undefined, undefined, undefined, undefined, undefined),
    new Competitor('The Olympic Triathlon', 'assets/pictures/triathlon.png', undefined, 1200, undefined, undefined, undefined, undefined, undefined),
    new Competitor('The Half Ironman', 'assets/pictures/triathlon.png', undefined, 1300, undefined, undefined, undefined, undefined, undefined),
    new Competitor('The Full Ironman', 'assets/pictures/triathlon.png', undefined, 1400, undefined, undefined, undefined, undefined, undefined),
]


// percent chance that person 1 wins
function winChance(score1, score2) {
    return 1/(1+Math.pow(10,((score2-score1)/400.0)))
}

function odds(score1, score2) {
    return 1 / winChance(score1, score2);
}

function modifiedOdds(score1, score2) {
    a = 1000 + (score1-1000)/2
    b = 1000 + (score2-1000)/2
    return 1 / winChance(a, b);
}

function fillDropdown(document, dropDown, options){
    var select = document.getElementById(dropDown); 
    for(var i = 0; i < options.length; i++){
        var opt = options[i]["name"];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

try {
    fillDropdown(document, "player1", competitors);
    fillDropdown(document, "player2", competitors);
} catch {
    console.log("Pool Betting")
}
let competitor1 = null
let competitor2 = null
let category = ""

function hth_calculate(){
    let update = document.getElementById("update");
    update.style.display = "none";
    let name1 = document.getElementById("player1").value
    let name2 = document.getElementById("player2").value
    category = document.getElementById("category").value
    document.getElementById("winnings").textContent = ""
    // console.log(name1)
    // console.log(name2)
    competitor1 = null
    competitor2 = null
    if(name1 == "" || name2 == ""){
        document.getElementById("error").textContent = "Please select two competitors."
        return
    }
    if(category == ""){
        document.getElementById("error").textContent = "Please select a category."
        return
    }
    if(name1 === name2){
        document.getElementById("error").textContent = "Please select two different competitors."
        return
    }
    document.getElementById("error").textContent = ""
    for(i = 0; i < competitors.length; i++){
        if(competitors[i]["name"] == name1){
            competitor1 = competitors[i]
        }
        else if(competitors[i]["name"] == name2){
            competitor2 = competitors[i]
        }
        if(competitor1 != null && competitor2 != null)
            break
    }
    elo1 = competitor1[category]
    elo2 = competitor2[category]
    document.getElementById("player1-name").textContent = competitor1.name
    document.getElementById("player2-name").textContent = competitor2.name
    document.getElementById("player1-img").src = competitor1.picture
    document.getElementById("player2-img").src = competitor2.picture
    document.getElementById("player1-elo").textContent = elo1.toFixed(2).toString()
    document.getElementById("player2-elo").textContent = elo2.toFixed(2).toString()
    document.getElementById("player1-chance").textContent = (100 * winChance(elo1, elo2)).toFixed(2) + "%"
    document.getElementById("player2-chance").textContent = (100 * winChance(elo2, elo1)).toFixed(2) + "%"
    document.getElementById("player1-odds").textContent = modifiedOdds(elo1, elo2).toFixed(4)
    document.getElementById("player2-odds").textContent = modifiedOdds(elo2, elo1).toFixed(4)
}


function hth_winnings(win){
    let winner = null
    let winnerodds = 0
    if(win == 1){
        winner = competitor1;
        winnerodds = modifiedOdds(elo1, elo2)
    } else if(win == 2){
        winner = competitor2;
        winnerodds = modifiedOdds(elo2, elo1)
    } 
    let bet = document.getElementById("betAmount").value
    if(bet == ""){
        document.getElementById("winnings").textContent = "Please enter the number of Alan Credits you wish to bet (at least 1)."
    } else {
        let winnings = parseInt(bet * winnerodds)
        document.getElementById("winnings").textContent = "A successful bet of " + bet + " Alan Credits on " + winner.name + " nets you " + winnings + " Alan Credits."
    }
    let update = document.getElementById("update");
    update.style.display = "block";
    update.value = winner.name
}

function updateScores(){
    let update = document.getElementById("update");
    let winnerName = update.value
    let winner = null
    let loser = null
    if(winnerName === competitor1.name) {
        winner = competitor1
        loser = competitor2
    } else {
        winner = competitor2
        loser = competitor1
    }
    winnerOldScore = winner[category]
    loserOldScore = loser[category]
    chance = winChance(winnerOldScore, loserOldScore)
    winner[category] = newScore(winnerOldScore, chance, 1)
    loser[category] = newScore(loserOldScore, 1-chance, 0)
    hth_calculate()
}

function newScore(oldScore, chance, difference){
    return oldScore+32*(difference-chance)
}



function fillMultiselect(document, dropDown, options){
    var select = document.getElementById(dropDown); 
    // console.log(select)
    for(var i = 0; i < options.length; i++){
        var opt = options[i]["name"];
        var el = document.createElement("li");
        el.setAttribute("name", "competitors")
        var child = document.createElement("input");
        child.type = "checkbox";
        child.setAttribute("name", "select-comps")
        child.value = opt;
        el.appendChild(child);
        var name = document.createElement("span")
        name.textContent = opt
        el.appendChild(name)
        // console.log(el)
        select.appendChild(el);
    }
    // console.log(select)
    var items = document.getElementsByName("competitors")
    for(let i = 0; i < items.length; i++){
        items[i].style.display = "none"
    }
    var checkList = document.getElementById('list1');
    checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
        var items = document.getElementsByName("competitors")
        // console.log("Check list onclick")
        // console.log(items[0].style.display)
        if (items[0].style.display == "none") {
            for(let i = 0; i < items.length; i++){
                items[i].style.display = "block"
            }
        }else{
            for(let i = 0; i < items.length; i++){
                items[i].style.display = "none"
            }
        }
    }
}


try {
    fillMultiselect(document, "players", competitors);
} catch {
    console.log("Head to Head Betting")
}
let avgOdds = []
let poolComps = []

function pool_calculate(){
    let names = []
    var items = document.getElementsByName("select-comps")
    for(let i = 0; i < items.length; i++){
        if(items[i].checked)
            names.push(items[i].value)
    }
    // console.log(names);
    let category = document.getElementById("category").value
    let triathlon = -1
    if(category == "triathlon"){
        let ele = document.getElementsByName("distance")
        // console.log(ele)
        for(let i = 0; i < ele.length; i++) {
            // console.log(ele[i])
            if(ele[i].checked)
                triathlon = i
        }
        // console.log("Distance: " + triathlon)
    }
    document.getElementById("winnings").textContent = ""
    if(names.length <= 1 && category != "triathlon"){
        document.getElementById("error").textContent = "Please select at least two competitors."
        return
    }
    if(category == ""){
        document.getElementById("error").textContent = "Please select a category."
        return
    }
    if(category == "triathlon"){
        category = "athletic"
        if(names.length < 1){
            document.getElementById("error").textContent = "Please select at least one competitor."
            return
        }
        if(triathlon == -1){
            document.getElementById("error").textContent = "Please select a triathlon distance."
            return
        }
    }
    document.getElementById("error").textContent = ""
    let compsTable = document.getElementById("competitors")
    removeTableRows(compsTable)  //reset
    poolComps = [] //reset
    for(i = 0; i < competitors.length; i++){
        for(j = 0; j < names.length; j++){
            if(competitors[i]["name"] == names[j]){
                poolComps.push(competitors[i])
                break
            }
        }
    }
    if(triathlon >= 0)
        poolComps.push(triathlon_distances[triathlon])
    // console.log(poolComps)
    avgOdds = [] //reset
    chances = calcAvgOdds(poolComps, category)
    // console.log(chances)
    // console.log(chances[0])
    avgOdds = chances[1]
    // console.log(avgOdds)
    for(let i = 0; i < poolComps.length; i++){
        let color = getColor(parseFloat(poolComps[i][category]))
        let row = compsTable.insertRow(i+1)
        row.style.color = color;
        row.insertCell(0).innerText = poolComps[i]["name"]
        let sencondCell = row.insertCell(1)
        let span1 = document.createElement("span")
        span1.innerHTML = "<img style='width: 75%; vertical-align: middle;' src="+poolComps[i]["picture"]+"></img>"
        sencondCell.appendChild(span1)
        row.insertCell(2).innerText = poolComps[i][category]
        // console.log("Win%: " + chances[0][i])
        row.insertCell(3).innerText = (100 * chances[0][i]).toFixed(2).toString() + "%"
        row.insertCell(4).innerText = avgOdds[i]
        let lastCell = row.insertCell(5)
        let span2 = document.createElement("span")
        span2.innerHTML = "<button onclick='pool_winnings("+i+")'>Winner</button>"
        lastCell.appendChild(span2)
    }
}

function calcAvgOdds(comps, category){
    let winPercent = new Array()
    let avgOdds = new Array()
    let numComps = comps.length
    for(let i = 0; i < numComps; i++){
        // console.log(typeof winPercent)
        winPercent.push(0) //initialize to zero
        avgOdds.push(0) //initialize to zero
        for(let j = 0; j < numComps; j++){
            if(comps[i] != comps[j]){
                winPercent[i] += winChance(comps[i][category], comps[j][category]) //sum win chance
                avgOdds[i] += modifiedOdds(comps[i][category], comps[j][category]) //sum odds
            }
        }
        winPercent[i] /= (numComps-1) //average win chance
        // console.log(winPercent[i])
        avgOdds[i] /= (numComps-1) //average odds
        avgOdds[i] = avgOdds[i].toFixed(4)
    }
    return [winPercent, avgOdds]
}


function removeTableRows(table) {
    while (table.rows.length > 1) {
        table.deleteRow(table.rows.length-1);
    }
}

function pool_winnings(win){
    let winner = poolComps[win]
    let winnerodds = avgOdds[win]
    let bet = document.getElementById("betAmount").value
    if(bet == ""){
        document.getElementById("winnings").textContent = "Please enter the number of Alan Credits you wish to bet (at least 1)."
    } else {
        let winnings = parseInt(bet * winnerodds)
        document.getElementById("winnings").textContent = "A successful bet of " + bet + " Alan Credits on " + winner.name + " nets you " + winnings + " Alan Credits."

    }
}

function getColor(score){
    if(score < 900){
        return "red"
    } else if(score < 950){
        return "orange"
    } else if(score < 950){
        return "orange"
    } else if(score < 1050){
        return "black"
    } else if(score < 1100){
        return "lime"
    } else if(score > 1100){
        return "green"
    }
}


function toggleDistance() {
    let category = document.getElementById("category").value
    var triathlon = document.getElementById("triathlon");
    if (triathlon.style.display === "none" && category === "triathlon") {
        triathlon.style.display = "block";
    } else if(triathlon.style.display === "block") {
        triathlon.style.display = "none";
    }
}

let ascending = true
let prev = 0;
function sortTable(col) {
    if(col == prev){
        ascending = !ascending;
    }
    prev = col
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("compTable");
    switching = true;
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
        // Start by saying: no switching is done:
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the
        first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x_ = rows[i].getElementsByTagName("TD")[col];
        x = x_.innerHTML.toLowerCase()
        if(col == 2)
            x = parseFloat(x)
        y_ = rows[i + 1].getElementsByTagName("TD")[col];
        y = y_.innerHTML.toLowerCase()
        if(col == 2)
            y = parseFloat(y)
        // Check if the two rows should switch place:
        if ((ascending && x > y) || (!ascending && x < y)) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
        }
        }
        if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        }
    }
}