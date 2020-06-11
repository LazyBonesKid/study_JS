'use strict';


let isNumber = function(n) {
    return !isNaN(parseInt(n)) && isFinite(n);
}

function randomGame() {
    let randomNumber = Math.floor(Math.random() * (100 - 1)) + 1,
    userNumber = prompt('Угадайте число от 1 до 100');
    
    function game() {

        if (userNumber === null) {
            alert('тут игра должна закончиться');
            return;
        }

        if (!isNumber(userNumber)) {
            alert('Вы ввели не число');
            userNumber = prompt('Введите новый вариант');
            return game();
        }

        if (userNumber > randomNumber) {
            alert('Загаданное число меньше');
            userNumber = prompt('Введите новый вариант');
            return game();
        }
        
        if (userNumber < randomNumber) {
            alert('Загаданное число больше');
            userNumber = prompt('Введите новый вариант');
            return game();
        }

        if (userNumber === randomNumber) {
            console.log('Вы угадали число!!!');
            return;
        }
    }
    game();
}

randomGame();
