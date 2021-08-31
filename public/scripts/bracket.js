// const { match } = require('assert');
// const fs = require('fs')

// class Competitor {
//     constructor(name, seed) {
//         this.name = name;
//         this.seed = seed;
//     }
// }

// function readFile(file) {
//     return fs.readFileSync(file, 'utf8' , (err, data) => {
//         if (err) {
//           console.error(err)
//           return
//         }
//         return data;
//     });
// }

function setCompetitors(text){
    let comps = text.split("\n");
    let competitors = [];
    for(let i = 0; i < comps.length; i++){
        // let x = new Competitor(comps[i].trim(),i+1)
        // competitors.push(x);
        competitors.push(comps[i].trim());
    }
    return competitors;
}

function getRandomInt(max) {
    return 1+Math.floor(Math.random() * max);
  }

// function randomizeSeeds(competitors){
//     for(let i = 0; i < competitors.length; i++){ //reset seeds
//         competitors[i].seed = 0
//     }
//     max = competitors.length
//     for(let i = 0; i < competitors.length; i++){ //seed each competitor
//         let seeded = false
//         while(!seeded) {
//             seed = getRandomInt(max) //random seed
//             seeded = true
//             for(let j = 0; j < i; j++){ //check if taken
//                 if(seed == competitors[j].seed){
//                     seeded = false;
//                     //console.log(seed + " already taken.")
//                     break
//                 }
//             }
//             //console.log(competitors[i].name + " was seeded at " + seed)
//             competitors[i].seed = seed
//         }
//     }
//     competitors.sort()
//     return competitors
// }

function shuffle(array) {
    let currentIndex = array.length
    let randomIndex = 0
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex); // pick random element
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [ //swap elements
        array[randomIndex], array[currentIndex]];
    }
    return array;
}

function printComps(competitors){
    for(let i = 0; i < competitors.length; i++){    
        //console.log(i+1 + ". " + competitors[i])
    }
}


class Match {
    constructor(cur, next, round, lose = 0){
        this.player1 = ""
        this.player2 = ""
        this.cur = cur
        this.next = next
        this.lose = lose
        this.round = round
    }
}

function padComps(competitors){
    let compsLength = competitors.length
    if(compsLength < 2){
        return
    }
    let size = 0
    for(let i = 2; i < compsLength; i++){
        size = Math.pow(2,i)
        if(compsLength <= size)
            break
    }
    for(let i = compsLength; i < size; i++){
        competitors.push("")
    }
    return competitors
}

function advance(bracket, cur, win){
    let next = bracket[cur].next - 1 //game the winner advances to
    let winner = bracket[cur].player1 //get the winner
    if(win == 2)
        winner = bracket[cur].player2
    if(cur % 2 == 0) //if top game (odd), then player one
        bracket[next].player1 = winner
    else //else bottom game (even), then player two
        bracket[next].player2 = winner
    //console.log(winner + " advances from game " + parseInt(cur+1) + " to game " + parseInt(next+1))
}



/* ------ Single Elimination  ------- */
function setBracket(competitors){
    padComps(competitors)
    //console.log("Competitors: " + competitors)
    //console.log(competitors)
    let bracket = []
    let length = competitors.length
    //console.log("Length: " + length)
    let rounds = Math.log2(length)
    //console.log("Rounds: " + rounds)
    let cur = 0
    let sum = 0
    let prevRound = 0
    let games = Math.floor(length / 2)
    for(let r = 1; r <= rounds; r++){
        cur = sum
        sum += games
        //console.log("Round " + r + " has " + games + " games.")
        for(let i = 0; i < games; i++){  
            let match  
            if(r == 1) {
                if(i % 2 == 0)
                    cur = i+1
                else 
                    cur = games-i+1
            } else 
                cur++
            let next = Math.round((cur-prevRound)/2) + sum
            if(r == rounds)
                next = -1
            match = new Match(cur, next, r)
            if(r == 1) {
                match.player1 = competitors[i]
                match.player2 = competitors[length-i-1]
            } 
            bracket.push(match)
            //console.log("Match " + cur + ": " + match)
        }
        prevRound += games
        games /=2
    }
    //console.log("-----------")
    for(let m = 0; m < bracket.length; m++){
        if(bracket[m].round > 1)
            break
        if(bracket[m].player1 == "" && bracket.player2 != "")
            advance(bracket, m, 2)
        else if(bracket[m].player2 == "" && bracket.player1 != "")
            advance(bracket, m, 1)
    }
    bracket.sort((a,b) => (a.cur > b.cur) ? 1 : -1)
    return bracket
}

// // let names = readFile("competitors.txt")
// let ready = false;
// let names = "Adam\nMcLean\nHarrison\nJack\nBrent\nNoah\nRiley\nNat\nAlan"
// let competitors = setCompetitors(names)
// //console.log(competitors)
// // shuffle(competitors)
// printComps(competitors)
// let bracket = setBracket(competitors)
// //console.log(bracket)
// generateBracket()
// ready = true;


function generateBracket() {
    var table = document.getElementById("bracket");
    table.innerHTML = "" //remove all children
    let rounds = bracket[bracket.length-1].round
    let countR1 = 0
    for(let m = 0; m < bracket.length; m++){
        if(bracket[m].round == 1)
            countR1++
        else
            break
    }
    let numRows = 4*countR1
    let height = parseFloat(100/numRows) + "%"
    //console.log(height)
    for(let rw = 0; rw < numRows; rw++){
        let newRow = document.createElement("tr")
        table.appendChild(newRow)
    }
    let rows = table.rows
    let rw = 0
    let prevRound = 1
    for(let m = 0; m < bracket.length; m++){
        if(bracket[m].round != prevRound) {
            //console.log(rw)
            rw = 0
        }
        rw = generateMatch(bracket[m], rows, rw, height)
        prevRound = bracket[m].round
    }
    addWinner(rows,height)
}

/*
    {<td></td>
    ... Count: min(Math.round(Math.pow(2,r-1)) - 1, 0) rows ...
    <td></td>}
    <td class="name">Player1</td>
    {<td class="side"></td>
    ... Count: (Math.round(Math.pow(2,r)) - 1) rows ...
    <td></td>}
    <td class="name side">Player2</td>
    <td></td>
*/
function generateMatch(match, rows, rw, height){
    //console.log(rows)
    let inserted = 0
    let count = Math.max(Math.round(Math.pow(2,match.round-1)) - 1, 0)
    //console.log("")
    //console.log("Top padding: " + count)
    for(let c = 0; c < count; c++){
        let newCell1 = document.createElement("td")
        newCell1.style.height = height
        rows[rw++].appendChild(newCell1)
        inserted++
    }
    let player1 = document.createElement("td")
    if(!(match.round === 1 && (match.player1 === "" || match.player2 === ""))){
        player1.classList.add("name")
        player1.textContent = match.player1
        player1.id = match.cur + "-1"
        player1.setAttribute("onclick", "wins(" + match.cur + ", 1)")
    }
    player1.style.height = height
    rows[rw++].appendChild(player1)
    inserted++
    count = Math.round(Math.pow(2,match.round)) - 1
    for(let c = 0; c < count; c++){
        let newCell2 = document.createElement("td")
        if(!(match.round === 1 && (match.player1 === "" || match.player2 === "")))
            newCell2.classList.add("side")
        newCell2.style.height = height
        rows[rw++].appendChild(newCell2)
        inserted++
    }
    let player2 = document.createElement("td")
    if(!(match.round === 1 && (match.player1 === "" || match.player2 === ""))){
        player2.classList.add("name")
        player2.classList.add("side")
        player2.textContent = match.player2
        player2.id = match.cur + "-2"
        player2.setAttribute("onclick", "wins(" + match.cur + ", 2)")
    }
    player2.style.height = height
    rows[rw++].appendChild(player2)
    inserted++
    let iterations = Math.pow(2,match.round+1) - inserted
    for(let r = 0; r < iterations; r++){
        let newCell3 = document.createElement("td")
        newCell3.style.height = height
        rows[rw++].appendChild(newCell3)
    }
    return rw
}



/* ----- Visuals: ------- */
function addWinner(rows, height){
    for(rw = 0; rw < rows.length; rw++){
        let newCell = document.createElement("td")
        if(rw+1 == rows.length/2){
            newCell.classList.add("name")
            newCell.id = "champion"
        }
        newCell.style.height = height
        rows[rw].appendChild(newCell)
    }
}

function wins(match, win){
    let thisCell = document.getElementById(match + "-" + win)
    if(ready && thisCell.textContent != "") {
        //console.log("---wins called---")
        //console.log(match + "-" + win)
        //console.log(bracket[match-1])
        let winner = bracket[match-1].player1 //get the winner
        if(win == 2)
            winner = bracket[match-1].player2
        //console.log("Winner: " + winner)
        if(bracket[match-1].next == -1){
            let cell = document.getElementById("champion")
            cell.textContent = winner
            alert(winner + " is the winner!")
        } else {
            advance(bracket, match-1, win)
            num = (match%2==0) + 1
            let cell = document.getElementById(bracket[match-1].next + "-" + num)
            if(cell.textContent != "")
                resetFutureGames(cell.textContent, bracket[match-1].next)
            cell.textContent = winner
        }
    }
}

function resetFutureGames(name, match){
    if(match == -1){
        let cell = document.getElementById("champion")
        if(cell.textContent == name)
            cell.textContent = ""
    } else {
        let cell1 = document.getElementById(match + "-1")
        let cell2 = document.getElementById(match + "-2")
        if(cell1.textContent == name){
            cell1.textContent = ""
            resetFutureGames(name, bracket[match-1].next)
        } else if(cell2.textContent == name){
            cell2.textContent = ""
            resetFutureGames(name, bracket[match-1].next)
        }
    }
}


// let names = readFile("competitors.txt")
let ready = false;
let competitors = []
let bracket = []
// shuffle(competitors)

ready = true;

function generate(){
    let names = document.getElementById("competitors").value
    //console.log(names)
    competitors = setCompetitors(names)
    if(document.getElementById("randomize").checked){
        //console.log("Shuffling names")
        shuffle(competitors)
    }
    let format = "Single"
    let ele = document.getElementsByName("format")
    for(let i = 0; i < ele.length; i++) {
        if(format[i].checked)
            format = i
    }
    if(format == "Single"){
        bracket = setBracket(competitors)
        let table = document.getElementById("bracketTable")
        table.style.display = "table"
        generateBracket()
    }
}



/* ------- Double Elimination: ------- */
function setDEBracket(competitors){
    padComps(competitors)
    let bracket = []
    let length = competitors.length
    if(length < 3 || length > 16){
        
    }  
    if(length == 4) {
        bracket = DEBracket4()
    } else if (length == 8) {
        bracket = DEBracket8()
    } else if (length == 16) {
        bracket = DEBracket16()
    } else {
        alert("Error: You must enter at least 3 competitors and at most 16 competitors for double elimination brackets.")
        return
    }
    fillStart(bracket)
    generateDE()


}

function DEBracket4(){
    return [
        new Match(1, 3, 1, 4),
        new Match(2, 3, 1, 4),

        new Match(3, 6, 2, 5),
        new Match(4, 3, 2),
        new Match(5, 3, 2),
        new Match(6, 7, 3),
        new Match(7, -1, 3)
    ]
}

function DEBracket8(){
    return [
        new Match(1, 7, 1, 5),
        new Match(2, 7, 1, 5),
        new Match(3, 8, 1, 6),
        new Match(4, 8, 1, 6),

        new Match(5, 9, 2),
        new Match(6, 10, 2),
        new Match(7, 8, 2, 10),
        new Match(8, 8, 2, 9),

        new Match(9, 12, 3),
        new Match(10, 12, 3),
        new Match(11, 14, 3, 13),

        new Match(12, 13, 4),
        new Match(13, 14, 5),
        
        new Match(14, 15, 6),
        new Match(15, -1, 6)
    ]
}

function DEBracket16(){
    return [
        new Match(1, 13, 1, 9),
        new Match(2, 13, 1, 9),
        new Match(3, 14, 1, 10),
        new Match(4, 14, 1, 10),
        new Match(5, 15, 1, 11),
        new Match(6, 15, 1, 11),
        new Match(7, 16, 1, 12),
        new Match(8, 16, 1, 12),

        new Match(9, 17, 2),
        new Match(10, 18, 2),
        new Match(11, 19, 2),
        new Match(12, 20, 2),
        new Match(13, 21, 2, 20),
        new Match(14, 21, 2, 19),
        new Match(15, 22, 2, 18),
        new Match(16, 22, 2, 17),
        
        new Match(17, 23, 3),
        new Match(18, 23, 3),
        new Match(19, 24, 3),
        new Match(20, 24, 3),
        new Match(21, 27, 3, 26),
        new Match(22, 27, 3, 25),

        new Match(23, 25, 3),
        new Match(24, 26, 3),

        new Match(25, 28, 4),
        new Match(26, 28, 4),
        new Match(27, 30, 4, 29),
        
        new Match(28, 29, 5),
        new Match(29, 30, 7),
        new Match(30, 31, 8),
        new Match(31, -1, 8)
    ]
}

function fillStart(bracket, competitors){
    countR1 = 0
    for(let i = 0; i < bracket.length; i++){  
        if(bracket[i].round == 1)
            countR1++
        else
            break
    }
    let cur = 0
    for(let i = 0; i < countR1; i++){   
        if(i % 2 == 0)
            cur = i+1
        else 
            cur = games-i+1
        bracket[cur].player1 = competitors[i]
        bracket[cur].player2 = competitors[length-i-1]
    }
    for(let m = 0; m < countR1; m++){
        if(bracket[m].player1 == "" && bracket.player2 != "")
            advance(bracket, m, 2)
        else if(bracket[m].player2 == "" && bracket.player1 != "")
            advance(bracket, m, 1)
    }
}


function generateMatchDE(match, rows, start, count, height, double = false){
    if(match.round > 1 || !(match.round === 1 && (match.player1 === "" || match.player2 === ""))){
        addPlayer(rows, start, match, 1, height)
        addBlankSpace(rows, start+1, count-3, height, !double)
        addPlayer(rows, count-2, match, 2, height)
        addBlankSpace(rows, count-1, 1, height, false)
        if(double){
            let player1 = document.createElement("td")
            player1.classList.add("name_")
            rows[start+1].appendChild(player1)
            addBlankSpace(rows, start+1, count-3, height, true)
            let player2 = document.createElement("td")
            player2.classList.add("name_")
            rows[count-2].appendChild(player2)
            addBlankSpace(rows, count-1, 1, height, false)
        }
    } else {
        addBlankSpace(rows, start, count, height)
    }
    return count
}

function addBlankSpace(rows, start, count, height, isSide){
    for(let i = 0; i < count; i++){
        let newCell = document.createElement("td")
        if(isSide){
            newCell.classList.add("side")
        }
        newCell.style.height = height
        rows[start+i].appendChild(newCell)
    }
    return count
}

function addPlayer(rows, rw, match, playerNum, height){
    let player = document.createElement("td")
    player.classList.add("name")
    let name = match.player1
    if(playerNum == 2){
        name = match.player2
    }
    player.textContent = name
    player.id = match.cur + "-" + playerNum
    player.setAttribute("onclick", "DEwin(" + match.cur + ", " + playerNum + ")")
    player.style.height = height
    rows[rw].appendChild(player)
}

// function generateMatchDE(match, rows, start, count, height, double = false)
function generateDE4(bracket){
    var table = document.getElementById("bracket");
    table.innerHTML = "" //remove all children
    let rounds = bracket[bracket.length-1].round
    let countR1 = 0
    let numRows = 13
    let height = parseFloat(100/numRows) + "%"
    for(let rw = 0; rw < numRows; rw++){
        let newRow = document.createElement("tr")
        table.appendChild(newRow)
    }
    let rows = table.rows
    let rw = 0
    rw += generateMatchDE(bracket[0], rows, rw, 4, height)
    rw += generateMatchDE(bracket[1], rows, rw, 4, height)
    rw += addBlankSpace(rows, rw, 1, height, false)
    rw += generateMatchDE(bracket[2], rows, rw, 4, height)
    rw = 0
    rw += addBlankSpace(rows, rw, 1, height, false)
    rw += generateMatchDE(bracket[3], rows, rw, 6, height)
    rw += addBlankSpace(rows, rw, 1, height, false)
    rw += generateMatchDE(bracket[4], rows, rw, 4, height)
    rw += addBlankSpace(rows, rw, 1, height, false)
}

