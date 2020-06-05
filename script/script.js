let 
money  = 30000,
income = 'Продажа арбузов',
addExpenses = 'Мороженное, гречка, туалетная бумага',
deposite = true,
mission = 100500,
period = 11;

console.log(typeof money, typeof income, typeof deposite);
console.log(addExpenses.length);
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' крышек нюка колы');

console.log(addExpenses = addExpenses.toLocaleLowerCase(), addExpenses.split(', '));

let budgetDay = money / 30 ;
console.log(budgetDay);