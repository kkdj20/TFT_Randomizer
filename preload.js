const { contextBridge, ipcRenderer } = require("electron")
var fs = require ('fs');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var realAuth;
var realPort;
var partAuth;

var llAnswer;
var arenaAnswer;
var boomAnswer;

var favoriteLL;
var favoriteArena;
var favoriteBoom;

var currentLL;
var currentArena;
var currentBoom;

var llBox = false;
var arenaBox = false;
var boomBox = false;
var comboBox = false;

var llFavoriteBox = false;
var arenaFavoriteBox = false;
var boomFavoriteBox = false;
var comboFavoriteBox = false;

var llArr = [];
var arenaArr = [];
var boomArr = [];
var comboArr = [];

var favoriteLLs = [];
var favoriteArenas = [];
var favoriteBooms = [];
var favoriteCombos = [];

var currentVersion = "1.1";

getStuff()
try 
{
    var result = fs.readFileSync('favoriteLLs.txt', 'utf-8');
} 
catch(e) 
{ 
    fs.writeFileSync("favoriteLLs.txt", "");
    fs.writeFileSync("favoriteArenas.txt", ""); 
    fs.writeFileSync("favoriteBooms.txt", ""); 
    fs.writeFileSync("favoriteCombos.txt", "");  
}

function getStuff()
{
    const { exec } = require("child_process");

    exec("wmic PROCESS WHERE name='LeagueClientUx.exe' GET commandline", async (error, stdout, stderr) => 
    {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        const output = stdout;
        var portregex = new RegExp('--app-port=([0-9]*)'); 
        var authregex = new RegExp('(--remoting-auth-token=([\w-]*))');

        var portIndex = output.search(portregex); //Index of first - in --app-port
        var authIndex = output.search(authregex); //Index of first - in --remoting-auth-token

        var portSub = output.substring(portIndex, portIndex+20);
        var authSub = output.substring(authIndex, authIndex + 100);

        var portStart = portSub.indexOf('=');
        var authStart = authSub.indexOf('=');
        var portEnd = portSub.indexOf('"');
        var authEnd = authSub.indexOf('"');

        var port = portSub.substring(portStart+1, portEnd);
        var auth = authSub.substring(authStart+1, authEnd);

        var finalAuth = port + ':' + auth;
        var base64auth = btoa(finalAuth);

        realPort = port;
        realAuth = base64auth;
        partAuth = auth;
        
        startRequests();

    });
    
}

function startRequests()
{

  httprequestUpdate().then((data) => 
  {
    var str = data[0]['tag_name'];
    if (!(str==currentVersion))
    {
        document.getElementById("status").innerText = "There's an update for TFT-Randomizer available, check https://github.com/kkdj20/TFT_Randomizer/releases!";
    }
      
  });
  httprequestLL().then((data) => 
  {
      const response = {
          statusCode: 200,
          body: JSON.stringify(data),
      };
      return response;
  });

  httprequestArena().then((data) => 
  {
      const response = {
          statusCode: 200,
          body: JSON.stringify(data),
      };
      return response;
  });

  httprequestBoom().then((data) => 
  {
      const response = {
          statusCode: 200,
          body: JSON.stringify(data),
      };
      return response;
  });

}

function sendLL(id) {
  const http = require('https')
  const url = "https://127.0.0.1:" + realPort + "/lol-cosmetics/v1/selection/companion";

   return new Promise((resolve, reject) => {
      var thisAuth = new Buffer('riot:' + partAuth).toString('base64');
      const options = {
          "host": "127.0.0.1",
          "port": realPort,
          "path": "/lol-cosmetics/v1/selection/companion",
          "method": 'PUT',
          headers:
          {
              "accept": "application/json",
              Authorization: "Basic " + thisAuth,
              "Content-Type": "application/json"
          }
          
      };
      const req = http.request(options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }

      });
      req.on('error', (e) => {
        reject(e.message);
      });
      // send the request
     req.write(id + ""); 
     req.end();
  });
}

function sendArena(id) {
  const http = require('https')
  const url = "https://127.0.0.1:" + realPort + "/lol-cosmetics/v1/selection/tft-map-skin";

   return new Promise((resolve, reject) => {
      var thisAuth = new Buffer('riot:' + partAuth).toString('base64');
      const options = {
          "host": "127.0.0.1",
          "port": realPort,
          "path": "/lol-cosmetics/v1/selection/tft-map-skin",
          "method": 'PUT',
          headers:
          {
              "accept": "application/json",
              Authorization: "Basic " + thisAuth,
              "Content-Type": "application/json"
          }
          
      };
      const req = http.request(options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }

      });
      req.on('error', (e) => {
        reject(e.message);
      });
      // send the request
     req.write(id + ""); 
     req.end();
  });
}

function sendBoom(id) {
  const http = require('https')
  const url = "https://127.0.0.1:" + realPort + "/lol-cosmetics/v1/selection/tft-damage-skin";

   return new Promise((resolve, reject) => {
      var thisAuth = new Buffer('riot:' + partAuth).toString('base64');
      const options = {
          "host": "127.0.0.1",
          "port": realPort,
          "path": "/lol-cosmetics/v1/selection/tft-damage-skin",
          "method": 'PUT',
          headers:
          {
              "accept": "application/json",
              Authorization: "Basic " + thisAuth,
              "Content-Type": "application/json"
          }
          
      };
      const req = http.request(options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }

      });
      req.on('error', (e) => {
        reject(e.message);
      });
      // send the request
     req.write(id + ""); 
     req.end();
  });
}

function sendCombo(id)
{
    var index = 0;
    var ll = "";
    var arena = "";
    var boom = "";
    var l = false;
    var a = false;
    var b = false;

    for (var i = 0; i < id.length; i++)
    {
        if (id.charAt(i)==";")
        {
            str = id.substring(index, i);
            if (!l)
            {
                ll = str;
                l = true;
            }
            else if (!a)
            {
                arena = str;
                a = true;
            }
            id = id.substring(i+1);
            index = 0;
            i = 0;
            if(l && a)
            {
                boom = id;
                break;
            }
        }
    }
    

    sendLL(ll);
    sendArena(arena);
    sendBoom(boom);
}


function httprequestUpdate() {
    const http = require('https')

     return new Promise((resolve, reject) => {
        const options = {
            "host": "api.github.com",
            "path": "/repos/kkdj20/TFT_Randomizer/releases",
            "method": 'GET',
            headers:
            {
                'User-Agent': 'TFT_Randomizer'
            }
            
        };
        const req = http.request(options, (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
        // send the request
       req.end();
    });
}

function httprequestLL() {
    const http = require('https')
    const url = "https://127.0.0.1:" + realPort + "/lol-inventory/v1/inventory?inventoryTypes=%5B%22COMPANION%22%5D";

     return new Promise((resolve, reject) => {
        var thisAuth = new Buffer('riot:' + partAuth).toString('base64');
        const options = {
            "host": "127.0.0.1",
            "port": realPort,
            "path": "/lol-inventory/v1/inventory?inventoryTypes=%5B%22COMPANION%22%5D",
            "method": 'GET',
            headers:
            {
                Authorization: "Basic " + thisAuth,
                "Content-Type": "application/json"
            }
            
        };
        const req = http.request(options, (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                    llAnswer = makeList(llArr, body);
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
        // send the request
       req.end();
    });
}

function httprequestArena() {
  const http = require('https')
  const url = "https://127.0.0.1:" + realPort + "/lol-inventory/v1/inventory?inventoryTypes=%5B%22TFT_MAP_SKIN%22%5D";

   return new Promise((resolve, reject) => {
      var thisAuth = new Buffer('riot:' + partAuth).toString('base64');
      const options = {
          "host": "127.0.0.1",
          "port": realPort,
          "path": "/lol-inventory/v1/inventory?inventoryTypes=%5B%22TFT_MAP_SKIN%22%5D",
          "method": 'GET',
          headers:
          {
              Authorization: "Basic " + thisAuth,
              "Content-Type": "application/json"
          }
          
      };
      const req = http.request(options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }
          var body = [];
          res.on('data', function(chunk) {
              body.push(chunk);
          });
          res.on('end', function() {
              try {
                  body = JSON.parse(Buffer.concat(body).toString());
                  arenaAnswer = makeList(arenaArr, body);
              } catch(e) {
                  reject(e);
              }
              resolve(body);
          });
      });
      req.on('error', (e) => {
        reject(e.message);
      });
      // send the request
     req.end();
  });
}

function httprequestBoom() {
  const http = require('https')
  const url = "https://127.0.0.1:" + realPort + "/lol-inventory/v1/inventory?inventoryTypes=%5B%22TFT_DAMAGE_SKIN%22%5D";

   return new Promise((resolve, reject) => {
      var thisAuth = new Buffer('riot:' + partAuth).toString('base64');
      const options = {
          "host": "127.0.0.1",
          "port": realPort,
          "path": "/lol-inventory/v1/inventory?inventoryTypes=%5B%22TFT_DAMAGE_SKIN%22%5D",
          "method": 'GET',
          headers:
          {
              Authorization: "Basic " + thisAuth,
              "Content-Type": "application/json"
          }
          
      };
      const req = http.request(options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }
          var body = [];
          res.on('data', function(chunk) {
              body.push(chunk);
          });
          res.on('end', function() {
              try {
                  body = JSON.parse(Buffer.concat(body).toString());
                  boomAnswer = makeList(boomArr, body);
              } catch(e) {
                  reject(e);
              }
              resolve(body);
          });
      });
      req.on('error', (e) => {
        reject(e.message);
      });
      // send the request
     req.end();
  });
}

function httprequestCurrentCosmetics(type) 
{
    const http = require('https')
    const url = "https://127.0.0.1:" + realPort + "/lol-loadouts/v4/loadouts/scope/account";
  
    return new Promise((resolve, reject) => 
    {
        var thisAuth = new Buffer('riot:' + partAuth).toString('base64');
        const options = {
            "host": "127.0.0.1",
            "port": realPort,
            "path": "/lol-loadouts/v4/loadouts/scope/account",
            "method": 'GET',
            headers:
            {
                Authorization: "Basic " + thisAuth,
                "Content-Type": "application/json"
            }
            
        };
        const req = http.request(options, (res) => {
          if (res.statusCode < 200 || res.statusCode >= 300) {
                return reject(new Error('statusCode=' + res.statusCode));
            }
            var body = [];
            var result;
            res.on('data', function(chunk) {
                body.push(chunk);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString());
                    if (type=="Combo")
                    {
                        result = getLL(body)  + ";" + getArena(body)  + ";" + getBoom(body);
                    }
                    else
                    {
                        result = eval("get" + type + "(body)");
                    }
                    
                } catch(e) {
                    reject(e);
                }
                resolve(result);
            });
        });
        req.on('error', (e) => {
          reject(e.message);
        });
        // send the request
       req.end();
    });
}

function getLL(data)
{
    var test =data[0]['loadout']['COMPANION_SLOT'];
    var tempResult;
    var result;
    tempResult = test==undefined ? 1 : test;
    result = tempResult==1 ? 1 : tempResult['itemId'];
    return result;
}

function getArena(data)
{
    var test =data[0]['loadout']['TFT_MAP_SKIN_SLOT'];
    var tempResult;
    var result;
    tempResult = test==undefined ? 1 : test;
    result = tempResult==1 ? 1 : tempResult['itemId'];
    return result;
}

function getBoom(data)
{
    var test =data[0]['loadout']['TFT_DAMAGE_SKIN_SLOT'];
    var tempResult;
    var result;
    tempResult = test==undefined ? 1 : test;
    result = tempResult==1 ? 1 : tempResult['itemId'];
    return result;
}

function makeList(arr, data)
{
    for (var id in data) 
    {
        arr.push(data[id]["itemId"]);
    }
    var max = arr.length;
    var result = arr[getRandomInt(max)];
    return result;
}

function getRandomInt(max) 
{
    return Math.floor(Math.random() * max);
}

function readFavorites(type)
{
    var result;
    try 
    {
        result = fs.readFileSync('favorite' + type + 's.txt', 'utf-8');
    } 
    catch(e) 
    { 
        alert('Failed to save the file !'); 
    }
    return result;
}

function parseFile(data)
{
    var idArr = [];
    var index = 0;
    for (var i = 0; i < data.length; i++)
    {
        if (data.charAt(i)==',')
        {
            idArr.push(data.substring(index, i));
            index = i+1;
        }
    }
    return idArr;
}

function removeFromFavorites(type, id)
{
    var found = false;
    var tempArr = parseFile(readFavorites(type));
    for (var i = 0; i<tempArr.length; i++)
    {
        if (tempArr[i]==id)
        {
            found = true;
            tempArr.splice(i, 1);
        }
    }

    var str = "";
    for (var i = 0; i<tempArr.length; i++)
    {
        str += tempArr[i] + ",";
    }
    try 
    {
        fs.writeFileSync('favorite' + type + 's.txt', str, 'utf-8'); 
    } 
    catch(e) 
    { 
        alert('Failed to save the file !'); 
    }
    return found;

}


contextBridge.exposeInMainWorld("electron", {
    send: (channel, payload) => ipcRenderer.send(channel, payload),
    invoke: (channel, data) => {
      let validChannels = ["minimize", "maximize"]; 
      if (validChannels.includes(channel)) {
          return ipcRenderer.invoke(channel, data); 
      }
    },
    saveFavorites: (type, id) =>
    {
        var result = false;
        try 
        {
            var tempArr = parseFile(readFavorites(type));
            if (tempArr.indexOf(id)==-1)
            {
                result = true;
                fs.appendFileSync('favorite' + type + 's.txt', id + ",", 'utf-8'); 
            }
        } 
        catch(e) 
        { 
            alert('Failed to save the file !'); 
        }
        return result;
    },
    deleteFromFavorites: (type, id) =>
    {
        return removeFromFavorites(type, id);
    },
    getFavoriteLL: () =>
    {
        favoriteLLs = parseFile(readFavorites("LL"));
        favoriteLL = favoriteLLs[getRandomInt(favoriteLLs.length)];
        sendLL(favoriteLL);
        return favoriteLL;
    },
    getFavoriteArena: () =>
    {
        favoriteArenas = parseFile(readFavorites("Arena"));
        favoriteArena = favoriteArenas[getRandomInt(favoriteArenas.length)];
        sendArena(favoriteArena);
        return favoriteArena;
    },
    getFavoriteBoom: () =>
    {
        favoriteBooms = parseFile(readFavorites("Boom"));
        favoriteBoom = favoriteBooms[getRandomInt(favoriteBooms.length)];
        sendBoom(favoriteBoom);
        return favoriteBoom;
    },
    getFavoriteCombo: () => 
    {
        favoriteCombos = parseFile(readFavorites("Combo"));
        favoriteCombo = favoriteCombos[getRandomInt(favoriteCombos.length)];
        sendCombo(favoriteCombo);
        return favoriteCombo;
    },
    getRandomLL: () => 
    {
        var id = llArr[getRandomInt(llArr.length)]
        sendLL(id);
        return llAnswer;
    },
    getRandomArena: () => 
    {
        var id = arenaArr[getRandomInt(arenaArr.length)]
        sendArena(id);
        return arenaAnswer;
    },
    getRandomBoom: () => 
    {
        var id = boomArr[getRandomInt(boomArr.length)]
        sendBoom(id);
        return boomAnswer;
    },
    getRandomCombo: () => 
    {
        var ll = llArr[getRandomInt(llArr.length)]
        var arena = arenaArr[getRandomInt(arenaArr.length)]
        var boom = boomArr[getRandomInt(boomArr.length)]
        sendLL(ll);
        sendArena(arena);
        sendBoom(boom);
        return boomAnswer; //relic
    },
    getCurrentLL:  () => 
    {
        const promise = httprequestCurrentCosmetics("LL");
        return promise;
    },
    getCurrentArena: () =>
    {
        const promise = httprequestCurrentCosmetics("Arena");
        return promise;
    },
    getCurrentBoom:  () => 
    {
        const promise = httprequestCurrentCosmetics("Boom");
        return promise;
    },
    getCurrentCombo:  () => 
    {
        const promise = httprequestCurrentCosmetics("Combo");
        return promise;
    },
    toggleLLBox: () =>
    {
        llBox = !llBox;
    },
    toggleArenaBox: () =>
    {
        arenaBox = !arenaBox;
    },
    toggleBoomBox: () =>
    {
        boomBox = !boomBox;
    },
    toggleComboBox: () =>
    {
        comboBox = !comboBox;
    },
    toggleLLFavoriteBox: () =>
    {
        llFavoriteBox = !llFavoriteBox;
    },
    toggleArenaFavoriteBox: () =>
    {
        arenaFavoriteBox = !arenaFavoriteBox;
    },
    toggleBoomFavoriteBox: () =>
    {
        boomFavoriteBox = !boomFavoriteBox;
    },
    toggleComboFavoriteBox: () =>
    {
        comboFavoriteBox = !comboFavoriteBox;
    },
    getLLBox: () =>
    {
        return llBox;
    },
    getArenaBox: () =>
    {
        return arenaBox;
    },
    getBoomBox: () =>
    {
        return boomBox;
    },
    getComboBox: () =>
    {
        return comboBox;
    },
    getLLFavoriteBox: () =>
    {
        return llFavoriteBox;
    },
    getArenaFavoriteBox: () =>
    {
        return arenaFavoriteBox;
    },
    getBoomFavoriteBox: () =>
    {
        return boomFavoriteBox;
    },
    getComboFavoriteBox: () =>
    {
        return comboFavoriteBox;
    },
});