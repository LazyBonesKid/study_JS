'use strict';

const 
    board     = document.querySelector('.books'),
    books     = document.querySelectorAll('.book'),
    ul        = document.querySelectorAll('ul'),
    li        = document.querySelectorAll('li'),
    a         = document.querySelectorAll('a'),
    adv       = document.querySelector('.adv');

console.log(a);
console.log(ul);
console.log(li);
console.log(board);
console.log(books);

board.prepend(books[1]);
board.append(books[2]);
books[3].before(books[4]);

document.querySelector('body').style.backgroundImage = 'url(image/you-dont-know-js.jpg)';

adv.remove();

a[4].textContent = 'Книга 3. this и Прототипы Объектов';

li[3].after(li[6]);
li[6].after(li[8]);
li[50].after(li[48]);
li[49].before(li[55]);
li[53].after(li[51]);

const newLi = document.createElement('li');
newLi.textContent = 'Глава 8: За пределами ES6';
li[25].after(newLi);
