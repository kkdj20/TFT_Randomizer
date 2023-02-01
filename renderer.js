// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

var counter = 0;


function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        window.electron.invoke('minimize');
    });

    document.getElementById('max-button').addEventListener("click", event => {
        window.electron.invoke('maximize');
    });

    document.getElementById('close-button').addEventListener("click", event => {
        window.close();
    });
}

document.getElementById("allButton").addEventListener("click", onAllClick);

document.getElementById("llBox").addEventListener("click", onLLToggle);
document.getElementById("arenaBox").addEventListener("click", onArenaToggle);
document.getElementById("boomBox").addEventListener("click", onBoomToggle);
document.getElementById("comboBox").addEventListener("click", onComboToggle);

document.getElementById("llFavoriteBox").addEventListener("click", onLLFavoriteToggle);
document.getElementById("arenaFavoriteBox").addEventListener("click", onArenaFavoriteToggle);
document.getElementById("boomFavoriteBox").addEventListener("click", onBoomFavoriteToggle);
document.getElementById("comboFavoriteBox").addEventListener("click", onComboFavoriteToggle);

document.getElementById("saveLLButton").addEventListener("click", onSaveLLClick);
document.getElementById("saveArenaButton").addEventListener("click", onSaveArenaClick);
document.getElementById("saveBoomButton").addEventListener("click", onSaveBoomClick);
document.getElementById("saveComboButton").addEventListener("click", onSaveComboClick);

document.getElementById("deleteLLButton").addEventListener("click", onDeleteLLClick);
document.getElementById("deleteArenaButton").addEventListener("click", onDeleteArenaClick);
document.getElementById("deleteBoomButton").addEventListener("click", onDeleteBoomClick);
document.getElementById("deleteComboButton").addEventListener("click", onDeleteComboClick);



function onLLClick()
{
    if (window.electron.getLLFavoriteBox())
    {
        const answer = window.electron.getFavoriteLL(); 
    }
    else
    {
        const answer = window.electron.getRandomLL(); 
    }
}

function onArenaClick()
{
    if (window.electron.getArenaFavoriteBox())
    {
        const answer = window.electron.getFavoriteArena(); 
    }
    else
    {
        const answer = window.electron.getRandomArena(); 
    }
}

function onBoomClick()
{
    if (window.electron.getBoomFavoriteBox())
    {
        const answer = window.electron.getFavoriteBoom(); 
    }
    else
    {
        const answer = window.electron.getRandomBoom(); 
    }
}

function onComboCLick()
{
    if (window.electron.getComboFavoriteBox())
    {
        const answer = window.electron.getFavoriteCombo(); 
    }
    else
    {
        const answer = window.electron.getRandomCombo(); 
    }
    
}

function onSaveLLClick()
{
    var answer;
    window.electron.getCurrentLL().then(function(data)
    {
        answer = data; //Answer is our current LL id
        if (!window.electron.saveFavorites("LL", answer.toString()))
        {
            document.getElementById("status").innerText = "Current Little Legend is already in your favorites!";
        }
        else
        {
            document.getElementById("status").innerText = "Current Little Legend successfully added to favorites!";
        }
        document.getElementById("status").style.color = "white";
    }); 
}

function onSaveArenaClick()
{
    var answer;
    window.electron.getCurrentArena().then(function(data)
    {
        answer = data; //Answer is our current LL id
        if (!window.electron.saveFavorites("Arena", answer.toString()))
        {
            document.getElementById("status").innerText = "Current Arena is already in your favorites!";
        }
        else
        {
            document.getElementById("status").innerText = "Current Arena successfully added to favorites!";
        }
        document.getElementById("status").style.color = "white";
    }); 
}

function onSaveBoomClick()
{
    var answer;
    window.electron.getCurrentBoom().then(function(data)
    {
        answer = data; //Answer is our current LL id
        if (!window.electron.saveFavorites("Boom", answer.toString()))
        {
            document.getElementById("status").innerText = "Current Boom is already in your favorites!";
        }
        else
        {
            document.getElementById("status").innerText = "Current Boom successfully added to favorites!";
        }
        document.getElementById("status").style.color = "white";
    }); 
}

function onSaveComboClick()
{
    window.electron.getCurrentCombo().then(function(data)
    {
        answer = data; //Answer is our current Combo
        if (!window.electron.saveFavorites("Combo", answer.toString()))
        {
            document.getElementById("status").innerText = "Current Loadout is already in your favorites!";
        }
        else
        {
            document.getElementById("status").innerText = "Current Loadout successfully added to favorites!";
        }
        document.getElementById("status").style.color = "white";
    }); 
}

function onDeleteLLClick()
{
    window.electron.getCurrentLL().then(function(data)
    {
        answer = data; //Answer is our current LL id
        if (window.electron.deleteFromFavorites("LL", answer))
        {
            document.getElementById("status").innerText = "Current Little Legend was successfully removed from favorites!";
        }
        else
        {
            document.getElementById("status").innerText = "Current Little Legend was not in your favorites!";
        }
        document.getElementById("status").style.color = "white";
    }); 
}

function onDeleteArenaClick()
{
    window.electron.getCurrentArena().then(function(data)
    {
        answer = data; //Answer is our current id
        if (window.electron.deleteFromFavorites("Arena", answer))
        {
            document.getElementById("status").innerText = "Current Arena was successfully removed from favorites!";
        }
        else
        {
            document.getElementById("status").innerText = "Current Arena was not in your favorites!";
        }
        document.getElementById("status").style.color = "white";
    }); 
}

function onDeleteBoomClick()
{
    window.electron.getCurrentBoom().then(function(data)
    {
        answer = data; //Answer is our current id
        if (window.electron.deleteFromFavorites("Boom", answer))
        {
            document.getElementById("status").innerText = "Current Boom was successfully removed from favorites!";
        }
        else
        {
            document.getElementById("status").innerText = "Current Boom was not in your favorites!";
        }
        document.getElementById("status").style.color = "white";
    }); 
}

function onDeleteComboClick()
{
    window.electron.getCurrentCombo().then(function(data)
    {
        answer = data; //Answer is our current id
        if (window.electron.deleteFromFavorites("Combo", answer))
        {
            document.getElementById("status").innerText = "Current Combo was successfully removed from favorites!";
        }
        else
        {
            document.getElementById("status").innerText = "Current Combo was not in your favorites!";
        }
        document.getElementById("status").style.color = "white";
    }); 
}

function onAllClick()
{
    counter++;
    if (counter>100)
    {
        document.getElementById("status").style.color = "red";
    }
    var counterString = "\n  You've pressed the randomize button " + counter + " times."
    var str = "Successfully randomized ";
    var isComboChecked = window.electron.getComboBox();
    if (isComboChecked)
    {
        if (window.electron.getLLBox() || window.electron.getArenaBox() || window.electron.getBoomBox())
        {
            counter--;
            document.getElementById("status").innerText = "You've selected to randomize both a Full Loadout and one or more individual cosmetics, pick one";
        }
        else{
            onComboCLick();
            document.getElementById("status").innerText = "Please Wait...";
            setTimeout(function () 
            {
                str += "your full cosmetic Loadout"
                document.getElementById("status").innerText = str + counterString;
                document.getElementById("allButton").innerText = "Randomize Selection Again?";
            }, 2000);
            
        }
    }
    else
    {
        var isLLChecked = window.electron.getLLBox();
        if (isLLChecked)
        {
            onLLClick();
            str += "Little Legend"
        }
        var isArenaChecked = window.electron.getArenaBox();
        if (isArenaChecked)
        {
            onArenaClick();
            str += isLLChecked ? ", Arena" : "Arena";
        }
        var isBoomChecked = window.electron.getBoomBox();
        if (isBoomChecked)
        {
            onBoomClick();
            str += isLLChecked || isArenaChecked ? ", Boom." : "Boom."
        }
        if (isLLChecked || isArenaChecked || isBoomChecked)
        {
            if (isLLChecked && !isArenaChecked && !isBoomChecked || (isArenaChecked && isLLChecked || isArenaChecked && !isLLChecked) && !isBoomChecked)
            {
                str+=".";
            }
            document.getElementById("status").innerText = "Please Wait...";
            setTimeout(function () 
            {
                document.getElementById("status").innerText = str + counterString;
                document.getElementById("allButton").innerText = "Randomize Selection Again?"
            },2000)
            
        }
        else
        {
            document.getElementById("status").innerText = "No categories chosen, please click one or more cosmetic checkboxes and try again!";
            document.getElementById("allButton").innerText = "Randomize Selection";
            document.getElementById("status").style.color = "white"
        }
    }
}

function onLLToggle()
{
    var isChecked = document.getElementById("llBox").checked;
    window.electron.toggleLLBox();
}

function onArenaToggle()
{
    var isChecked = document.getElementById("arenaBox").checked;
    window.electron.toggleArenaBox();
}

function onBoomToggle()
{
    var isChecked = document.getElementById("boomBox").checked;
    window.electron.toggleBoomBox();
}

function onComboToggle()
{
    var isChecked = document.getElementById("comboBox").checked;
    window.electron.toggleComboBox();
}

function onLLFavoriteToggle()
{
    var isChecked = document.getElementById("llFavoriteBox").checked;
    window.electron.toggleLLFavoriteBox();
}

function onArenaFavoriteToggle()
{
    var isChecked = document.getElementById("arenaFavoriteBox").checked;
    window.electron.toggleArenaFavoriteBox();
}

function onBoomFavoriteToggle()
{
    var isChecked = document.getElementById("boomFavoriteBox").checked;
    window.electron.toggleBoomFavoriteBox();
}

function onComboFavoriteToggle()
{
    var isChecked = document.getElementById("comboFavoriteBox").checked;
    window.electron.toggleComboFavoriteBox();
}
