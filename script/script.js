'use strict';


let isNumber = function(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

function randomGame() {
    let a = Math.floor(Math.random() * (100 - 1)) + 1,
    userNumber = prompt('Угадай число от 1 до 100');
    alert(a);
    function game(randomNumber) {
        
        if (userNumber === null) { 
            return;
        }

        if (!isNumber(userNumber)) {
            alert('Вы ввели не число!!!!');
            userNumber = prompt('Введите новый вариант');
            game(randomNumber);
        }

        if (userNumber < randomNumber) {
            alert('Загаданное число больше');
            userNumber = prompt('Введите новый вариант');
            game(randomNumber);
        }

        if (userNumber > randomNumber) {
            alert('Загаданное число меньше');
            userNumber = prompt('Введите новый вариант');
            game(randomNumber);
        }
    }
    game(a);
}


randomGame();

