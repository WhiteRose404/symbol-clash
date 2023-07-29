// container for the menu
const body = document.getElementById('body');

// options buttons
const options = document.getElementById('options');
const newGameButton = document.getElementById('new-game-button');
const joinGameButton = document.getElementById('join-game-button');
const leaderboardButton = document.getElementById('leaderboard-button');
const profileButton = document.getElementById('profile-button');

// forms
const joinGameForm = document.getElementById('join-game-form');
const newGameForm = document.getElementById('new-game-form');

// containers
const profile = document.getElementById('profile');
const leaderboardTable = document.getElementById('leaderboard-table');

// general info
const message = document.querySelector("#general-info > .info > .message");
const warning = document.querySelector("#general-info > .info > .warning");
const error = document.querySelector("#general-info > .info > .error");
const backButton = document.querySelector("#general-info > .buttons > #back-button");
const logoutButton = document.querySelector("#general-info > .buttons > #logout-button");


// now how would manage all these buttons and forms?
// we could add event listeners to each button and form
// but that would be a lot of code
// instead, we can use event delegation
// we can add one event listener to the parent element
// and then check which element was clicked
// and then run the appropriate code
backButton.addEventListener('click', (event) => {
    body.childNodes.forEach((child) => {
        if(child.id !== 'options' && child.classList){
            child.classList.add('hidden');
        }
    });
    options.classList.remove('hidden');
    backButton.classList.add('hidden');
});

options.addEventListener('click', (event) => {
    // event.target is the element that was clicked
    // we can check if it is the new game button
    if (event.target === newGameButton) {
        // if it is, we can show the new game form
        newGameForm.classList.remove('hidden');
    } else if (event.target === joinGameButton) {
        // if it is, we can show the join game form
        joinGameForm.classList.remove('hidden');
    } else if (event.target === leaderboardButton) {
        // if it is, we can show the leaderboard table
        leaderboardTable.classList.remove('hidden');
    } else if (event.target === profileButton) {
        // if it is, we can show the profile
        profile.classList.remove('hidden');
    }else{
        console.log('something else was clicked');
        return;
    }
    // if we get here, we know that one of the buttons was clicked
    // so we can hide the options
    options.classList.add('hidden');
    backButton.classList.remove('hidden');
});




