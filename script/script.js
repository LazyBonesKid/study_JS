'use strict';


let isNumber = function(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

function randomGame() {
    let randomNumber = Math.floor(Math.random() * (100 - 1)) + 1,
    userNumber = prompt('Угадайте число от 1 до 100');
    alert(userNumber);
    function game() {
        alert('1');
        if (userNumber === null) {
            alert('igra zakoncilas');
            return console.log(randomNumber);
        }
        alert('2');
        if (!isNumber(userNumber)) {
            alert('Вы ввели не число');
            userNumber = prompt('Введите новый вариант');
            alert(userNumber);
            game();
        }
        alert('3');
        if (userNumber > randomNumber) {
            alert('Загаданное число меньше');
            userNumber = prompt('Введите новый вариант');
            game();
        }
        alert('4');
        if (userNumber < randomNumber) {
            alert('Загаданное число больше');
            userNumber = prompt('Введите новый вариант');
            game();
        }
    }
    game();
}


randomGame();

