const { contextBridge, ipcRenderer } = require("electron")

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var realAuth;
var realPort;
var partAuth;
var finalData;
var llAnswer;
var arenaAnswer;
var boomAnswer;
var llArr = [];
var arenaArr = [];
var boomArr = [];

getStuff()

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

function sendLL() {
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
     req.write(llAnswer + ""); 
     req.end();
  });
}

function sendArena() {
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
     req.write(arenaAnswer + ""); 
     req.end();
  });
}

function sendBoom() {
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
     req.write(boomAnswer + ""); 
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


contextBridge.exposeInMainWorld("electron", {
    send: (channel, payload) => ipcRenderer.send(channel, payload),
    invoke: (channel, data) => {
      let validChannels = ["minimize", "maximize"]; // list of ipcMain.handle channels you want access in frontend to
      if (validChannels.includes(channel)) {
          return ipcRenderer.invoke(channel, data); 
      }
    },
    getRandomLL: () => 
    {
      llAnswer = llArr[getRandomInt(llArr.length)]
      sendLL();
      return llAnswer;
    },
    getRandomArena: () => 
    {
      arenaAnswer = arenaArr[getRandomInt(arenaArr.length)]
      sendArena();
      return arenaAnswer;
    },
    getRandomBoom: () => 
    {
      boomAnswer = boomArr[getRandomInt(boomArr.length)]
      sendBoom();
      return boomAnswer;
    }
});