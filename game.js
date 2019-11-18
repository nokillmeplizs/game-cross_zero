let game = document.getElementById('game');
for (let i = 0; i < 9; i++) {
    game.innerHTML += `<div class="ceil" id ="${i}"></div>`
}

var step = 0;
var haveWinner = false;
const ceils = document.getElementsByClassName('ceil');

const restart = () => document.location.reload(true);
const start = document.getElementById('start');
start.addEventListener("click", restart);

game.addEventListener("click", nextStep);
function nextStep(e) {
    if (e.target.className == 'ceil') {
        if (step % 2 == 0) {
            e.target.classList.add("cross");
        }
        step++;
        checkWinner();
        if (haveWinner) {
            return;
        }
        if (step == 9 && haveWinner == false) {
            alert('Ничья');
            restart();
            return;
        }
        ai();
    }
};

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function ai() {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (let i = 0; i < ceils.length; i++) {
        if (ceils[i].classList.contains("cross") || ceils[i].classList.contains("zero")) {
            let find = +ceils[i].id;
            let findId = arr.indexOf(find);
            arr.splice(findId, 1);

        }

    }
    let rand = getRandomInt(arr.length);
    document.getElementById(arr[rand]).classList.add("zero");
    step++;
    checkWinner();
}

function checkWinner() {
    const arr = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < arr.length; i++) {
        if (ceils[arr[i][0]].classList.contains("cross") && ceils[arr[i][1]].classList.contains("cross") && ceils[arr[i][2]].classList.contains("cross")) {
            alert('Победили крестики');
            haveWinner = true;
            restart();
            return;
        } else if (ceils[arr[i][0]].classList.contains("zero") && ceils[arr[i][1]].classList.contains("zero") && ceils[arr[i][2]].classList.contains("zero")) {
            alert('Победили нолики');
            haveWinner = true;
            restart();
            return;
        }
    }
}