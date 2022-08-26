'use strict';

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');
const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');
const intruder = document.querySelector('.intruder');
const bankIntro = document.querySelector('.bank-intro');

const account1 = {
    owner: 'Ogunneye Oyinkansola',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111,

    movementsDates: [
        '2021-11-18T21:31:17.178Z',
        '2021-12-23T07:42:02.383Z',
        '2021-01-28T09:15:04.904Z',
        '2022-04-01T10:17:24.185Z',
        '2022-07-08T14:11:59.604Z',
        '2022-07-27T17:01:17.194Z',
        '2022-08-19T23:36:17.929Z',
        '2022-08-20T10:51:36.790Z',
    ],
};

const account2 = {
    owner: 'Ogunneye Muneeroh',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    
      movementsDates: [
        '2021-11-18T21:31:17.178Z',
        '2021-12-23T07:42:02.383Z',
        '2021-01-28T09:15:04.904Z',
        '2022-04-01T10:17:24.185Z',
        '2022-07-08T14:11:59.604Z',
        '2022-07-27T17:01:17.194Z',
        '2022-08-19T23:36:17.929Z',
        '2022-08-20T10:51:36.790Z',
    ],
};

const account3 = {
    owner: Adebambo Adenike'',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    
      movementsDates: [
        '2021-11-18T21:31:17.178Z',
        '2021-12-23T07:42:02.383Z',
        '2021-01-28T09:15:04.904Z',
        '2022-04-01T10:17:24.185Z',
        '2022-07-08T14:11:59.604Z',
        '2022-07-27T17:01:17.194Z',
        '2022-08-19T23:36:17.929Z',
        '2022-08-20T10:51:36.790Z',
    ],
};

const account4 = {
    owner: 'Oyegunle Aisha',
    movements: [100, -100, 340, 300, -20, 150, 200, -460],
    interestRate: 0.7,
    pin: 4444,
    
      movementsDates: [
        '2021-11-18T21:31:17.178Z',
        '2021-12-23T07:42:02.383Z',
        '2021-01-28T09:15:04.904Z',
        '2022-04-01T10:17:24.185Z',
        '2022-07-08T14:11:59.604Z',
        '2022-07-27T17:01:17.194Z',
        '2022-08-19T23:36:17.929Z',
        '2022-08-20T10:51:36.790Z',
    ],
};

const account5 = {
    owner: 'Ogunneye Sofia',
    movements: [1000, -200, 240, -300, -20, 50, 200, -460],
    interestRate: 0.7,
    pin: 5555,
    
      movementsDates: [
        '2021-11-18T21:31:17.178Z',
        '2021-12-23T07:42:02.383Z',
        '2021-01-28T09:15:04.904Z',
        '2022-04-01T10:17:24.185Z',
        '2022-07-08T14:11:59.604Z',
        '2022-07-27T17:01:17.194Z',
        '2022-08-19T23:36:17.929Z',
        '2022-08-20T10:51:36.790Z',
    ],
};

const accounts = [account1, account2, account3, account4, account5];

const formatMovementDate = function(date) {
    const calcDaysPassed = (date1, date2) =>
        Math.round(Math.abs(date2 - date1) / (1000 * 60 *
            60 * 24));
    const daysPassed = calcDaysPassed(new Date(), date);
    console.log(daysPassed);

    if (daysPassed === 0) return 'Today';
    if (daysPassed === 1) return 'Yesterday';
    if (daysPassed <= 7) return `${daysPassed} days ago`;
    else {
        const day = `${date.getDate()}`.padStart(2, 0);
        const month = `${date.getDate() + 1}`.padStart(2, 0);
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
};


const displayMovements = function(acc, sort = false) {

    containerMovements.innerHTML = '';

    const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

    movs.forEach(function(mov, i) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        const date = new Date(acc.movementsDates[i]);
        const displayDate = formatMovementDate(date);

        const html = `
        <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
        </div>`;

        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

const calcDisplayBalance = function(acc) {
    acc.balance = acc.movements.reduce(function(accumulator, cur, i, arr) {
        return accumulator + cur
    }, 0);
    labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function(acc) {
    // calculate all deposit
    const incomes = acc.movements.filter(function(mov) {
        return mov > 0;
    }).reduce(function(accumulator, cur, i, arr) {
        return accumulator + cur;
    }, 0);
    //return income;
    labelSumIn.textContent = `${incomes.toFixed(2)}€`;

    // calculate all withdraws
    const out = acc.movements.filter(function(mov) {
        return mov < 0;
    }).reduce(function(accumulator, cur, i, arr) {
        return accumulator + cur;
    });
    labelSumOut.textContent = `${Math.abs(out)}€`;

    // calculate all interest
    //NOTE the map to create and calculate an array for intrest,filter to remove intrest
    // lower than 1 and add all by reduce 
    const interest = acc.movements.filter(function(mov) {
        return mov > 0;
    }).map(function(deposit) {
        return deposit * acc.interestRate / 100;
    }).filter(function(cur, i, arr) {
        return cur >= 1;
    }).reduce(function(accumulator, cur) {
        return accumulator + cur;
    })
    labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};


const createUsernames = function(customer) {
    customer.forEach(function(name) {
        name.username = name.owner.toLocaleLowerCase().split(' ').map(function(person) {
            return person[0];
        }).join('');
    });
};
createUsernames(accounts);

const updateUI = function(acc) {
    //Display Movement
    displayMovements(acc);

    // Display Balance
    calcDisplayBalance(acc);

    // Display summary
    calcDisplaySummary(acc);
};

const startLogOutTimer = function() {
    const tick = function() {
        const min = String(Math.trunc(time / 60)).padStart(2, 0);
        const sec = String(time % 60).padStart(2, 0);

        // In each call, print the remaining time to UI
        labelTimer.textContent = `${min}:${sec}`;

        // When 0 seconds, stop timer and log out user
        if (time === 0) {
            clearInterval(timer);
            labelWelcome.textContent = "Log in to get started";
            containerApp.style.opacity = 0;
        }

        // Decrease 1s
        time--;
    };

    // Set time to 5 minutes
    let time = 120;

    // Call the timer every second
    tick();
    const timer = setInterval(tick, 1000);

    return timer;
};

//Event handler
let currentAccount, timer;

btnLogin.addEventListener('click', function(e) {
    //prevent the form button from submitting and causing a reload
    //default behaviour of html with submit button
    e.preventDefault();

    currentAccount = accounts.find(function(acc) {
        return acc.username === inputLoginUsername.value;
    });

    if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
        // Display UI and message
        labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
        containerApp.style.opacity = 100;

        //current date
        const now = new Date();
        const day = `${now.getDate()}`.padStart(2, 0);
        const month = `${now.getDate() + 1}`.padStart(2, 0);
        const year = now.getFullYear();
        const hour = `${now.getHours()}`.padStart(2, 0);
        const min = `${now.getMinutes()}`.padStart(2, 0);
        labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
        //clear the input field
        inputLoginUsername.value = inputLoginPin.value = '';
        inputLoginPin.blur();
        inputLoginUsername.blur();

        //The log out timemer
        if (timer) clearInterval(timer);
        timer = startLogOutTimer();

        //Updating the UI Design
        updateUI(currentAccount);

        //Welcome page
        bankIntro.style.display = 'none';

        //ntruder page
        intruder.style.display = 'none';
        containerApp.style.visibility = 'visible';
    } else {
        // Intruder page
        console.log('shit');
        intruder.style.display = 'block';
        bankIntro.style.display = 'none';
        containerApp.style.visibility = 'hidden';
        inputLoginUsername.value = inputLoginPin.value = '';
    }
    console.log(currentAccount);
});
