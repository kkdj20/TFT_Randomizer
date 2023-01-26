// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

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

document.getElementById("llButton").addEventListener("click", onLLClick);
document.getElementById("arenaButton").addEventListener("click", onArenaClick);
document.getElementById("boomButton").addEventListener("click", onBoomClick);
document.getElementById("allButton").addEventListener("click", onAllClick);

function onLLClick()
{
    document.getElementById("llButton").innerText = "Randomize Little Legend Again?";
    const answer = window.electron.getRandomLL();
    document.getElementById("llStatus").innerText = "Little Legend Status: Successfully Randomized!";
    document.getElementById("llStatus").style.color == "green" ? document.getElementById("llStatus").style.color = "Cyan" : document.getElementById("llStatus").style.color = "green";
}

function onArenaClick()
{
    document.getElementById("arenaButton").innerText = "Randomize Arena Again?";
    const answer = window.electron.getRandomArena();
    document.getElementById("arenaStatus").innerText = "Arena Status: Successfully Randomized!";
    document.getElementById("arenaStatus").style.color == "green" ? document.getElementById("arenaStatus").style.color = "Cyan" : document.getElementById("arenaStatus").style.color = "green";
}

function onBoomClick()
{
    document.getElementById("boomButton").innerText = "Randomize Boom Again?";
    const answer = window.electron.getRandomBoom();
    document.getElementById("boomStatus").innerText = "Boom Status: Successfully Randomized!";
    document.getElementById("boomStatus").style.color == "green" ? document.getElementById("boomStatus").style.color = "Cyan" : document.getElementById("boomStatus").style.color = "green";
}

function onAllClick()
{
    onLLClick();
    onArenaClick();
    onBoomClick();
    document.getElementById("allButton").innerText = "Randomize Everything Again?";
}
