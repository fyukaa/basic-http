const https = require("https");
const http = require("http");
const fs = require('fs');
const config = require("./config.json");

const heycert = Buffer.from('LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSUR6akNDQXJhZ0F3SUJBZ0lKQUtjT0JBRlcrT0JWTUEwR0NTcUdTSWIzRFFFQkN3VUFNSE14Q3pBSkJnTlYKQkFZVEFsUlNNUXN3Q1FZRFZRUUlFd0pZUkRFU01CQUdBMVVFQnhNSlNHVjVVM1Z5Wm1WeU1SSXdFQVlEVlFRSwpFd2xJWlhsVGRYSm1aWEl4RWpBUUJnTlZCQXNUQ1VobGVWTjFjbVpsY2pFYk1Ca0dBMVVFQXhNU2QzZDNMbWR5CmIzZDBiM0JwWVRFdVkyOXRNQjRYRFRJeU1EWXhOekUwTURNd00xb1hEVEkwTURZeE5qRTBNRE13TTFvd2N6RUwKTUFrR0ExVUVCaE1DVkZJeEN6QUpCZ05WQkFnVEFsaEVNUkl3RUFZRFZRUUhFd2xJWlhsVGRYSm1aWEl4RWpBUQpCZ05WQkFvVENVaGxlVk4xY21abGNqRVNNQkFHQTFVRUN4TUpTR1Y1VTNWeVptVnlNUnN3R1FZRFZRUURFeEozCmQzY3VaM0p2ZDNSdmNHbGhNUzVqYjIwd2dnRWlNQTBHQ1NxR1NJYjNEUUVCQVFVQUE0SUJEd0F3Z2dFS0FvSUIKQVFEYWI5YTFSUDV1ZW5iaitNV3B0UHRWMHVhRlU1Vjc5WFJoYUl5akhyd2hhTUUxM242bHVvdWd0djNJTFhqSwp1UTJlM3ZoR0R2RTROVVBlU0JhRkw3ZFVVcnViWGZ0ZEFCQjJvdVV0Tis0SnBZNE11QnlJTWNHcjQxQVFVakVhCjl6SlJDQlFJSGhpOGxQUS9MMS8zTXFwY1ZxQmpUNTFPRC9qYUI2UU1iSGVzaEN1cjlIVGo5RXE4ckhZOHRFTDIKTUJMY29JeWpXM1VkTGJIVEI5NUk2aVUyTmlha0F0VG9weXpmaXV4bEJjRE9yM2l0SDBuek9qcjY0RWoraUpidgo5MG5zRXRRYTNFYkVrMEtMY1RNYS9xdFZGY1BpeHpJUklVSVJZY1lXeGErN3RkcUUrOThRUERWYmoxbDY5NDIwCkd2YUFqRUdJMlYzUXp2MFBxU2dZbnMwTkFnTUJBQUdqWlRCak1BNEdBMVVkRHdFQi93UUVBd0lEaURBVEJnTlYKSFNVRUREQUtCZ2dyQmdFRkJRY0RBVEE4QmdOVkhSRUVOVEF6Z2hKM2QzY3VaM0p2ZDNSdmNHbGhNUzVqYjIyQwpFbmQzZHk1bmNtOTNkRzl3YVdFeUxtTnZiWUlKTVRJM0xqQXVNQzR4TUEwR0NTcUdTSWIzRFFFQkN3VUFBNElCCkFRQkJnTDZkZExJUVZpRElGTzIzNEZCWE8vZjRKOFNkVEN0YXh2OEpnM2dvVGtWbXJPamphcXB4K2FvTitRdEkKMXJqVllQTUNOVVNoYjcrZFEzTmVsTjNvRFRmS2tuNWtoNkpSdlhOOFVxeGI5eXpsMmNFbnhSNmpKajB4OWdGdgo5N21lZWVoN1ErTko4MkY3b28wYW5RVWk1MWVYWHdHUDlBS1RDK3NiUStqWWVLSlpYWDdkOTJ3dVM3MnhUY0V4Ci8yT0RyT01aYWszUkJlUUtDaHR2eUIwNGphWEFGdzdURENMbTRwRktSaUhMdUhNY1lVQ2IrcVNDMnJPSUh6VGMKS0dLZzBjUGgxVUhkdThoUVpPWTVicmR5V2RBTFpzK3cxekZ0UFhrMWZ5Y2xJdHV6MkZlcVdvM2FYN0pIRG1zeAppM3VreEF1Q3l5bVA2eU5qQm9PVmVhYVUKLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLQ==', "base64").toString();
const heykey = Buffer.from('LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb2dJQkFBS0NBUUVBMm0vV3RVVCtibnAyNC9qRnFiVDdWZExtaFZPVmUvVjBZV2lNb3g2OElXakJOZDUrCnBicUxvTGI5eUMxNHlya05udDc0Umc3eE9EVkQza2dXaFMrM1ZGSzdtMTM3WFFBUWRxTGxMVGZ1Q2FXT0RMZ2MKaURIQnErTlFFRkl4R3ZjeVVRZ1VDQjRZdkpUMFB5OWY5ektxWEZhZ1kwK2RUZy80Mmdla0RHeDNySVFycS9SMAo0L1JLdkt4MlBMUkM5akFTM0tDTW8xdDFIUzJ4MHdmZVNPb2xOalltcEFMVTZLY3MzNHJzWlFYQXpxOTRyUjlKCjh6bzYrdUJJL29pVzcvZEo3QkxVR3R4R3hKTkNpM0V6R3Y2clZSWEQ0c2N5RVNGQ0VXSEdGc1d2dTdYYWhQdmYKRUR3MVc0OVpldmVOdEJyMmdJeEJpTmxkME03OUQ2a29HSjdORFFJREFRQUJBb0lCQUI4bllrVDZNUnVLcGRnLwp5OWszY2IwODFobmY0T3NNQit3NG9BNUh2T2M2N0l1RlR5VE41VW9ucnl4VXAreXAxZko1dElreGFsL3M0T0FjCkFmSSs2dlBBMVBjRXdXdnpMV1h1TjZkcVdhM1FpZUR3aFVrN1ozYmZkYlRPTkNpM1p0cTl2eldsTFR3QU5wR28KYlJSeGluQ2Uva01Md05DNFlIS2dNbHAvUWRZOXhBTUxoOHRjeDN6N0FsUjIyeEpUY3VaeVpNZXQvanZ6bXhTQQpHb3FtYm94SW5tUnZNSjdaRHc4R25zTm5LZ1VBOG1xWnViZ2FOTnNDZHE4c3RyRE5QdER2TmRTRXlrMmJnWjFOCmZuR0VKMmY5MW03cWR6RXFLZGY1YnBwRWEya2d0Y0oyRHRlWlVxd0NUbmgwNndCUUtZcWV1Y0RhLy9RdDhJVngKYmtCYXo0RUNnWUVBOTJRczFwVDdpYkU0MmxqdElyMzQxMjgwWm1pOHE0aEkxaE5WT3haWm4yRThWZjBwK2p1RAordU9VQlMwL3IxN2M2azJuQ3JYYTVYdkFDTVNjSFBLVFJDY1VBNWN3MFdEcTRmS2FmVm8yNnhSU0FHSG9Gd1BCClNoUXk4enFrMnIvTVc5ZjdPcU4rck5QZnF1cnB6TnBBZVpaL3UvWXM0VllJQm52Z1UwL0xnK0VDZ1lFQTRnbTYKNHh4Nm9tQlFtUlZLaFdNNmtUMEUzSGhISlkyNCt6QVlWR2hiTVNlVExBU3AvYlNEaGVaeUtEWEd2Y0tzYTM0UApDZ2RXUlFDNEx0OHp4YnR3NTlRNC9uckhabENTdS85Z3owQmQ1WTFXRDYxdmNKKzZwdFZNT1J2NFhGS2w1elovClkwYnBrUW5yUkJ3M25pUzZvNTdBTGcwR1dtQkVvVEpyZU9ic2JxMENnWUJ3UExXUEFQYUJ5TEtYZFVMWXdVRjEKVkJGODZNVzRPTk42dERpMTN2VDROeUF0anZjTmZSVHFyWGRKUmZjZnREVWI0L0VHRGUxcXNkTTA1eVpBaDlsQwpVVXhtT0tEQVRXMGk1M01wcmRVK24vQjRGZk03QmN3YXRNRk0wbTFhaFN2TSsxY1Npbng5SW43V1IwK2RUZU4wCmhsQWJVWnVZKy9RV0pQdG9NTXFQWVFLQmdDc1dxYjZUZGprdjNRMWhocVFveDBoYWRtdkVyZU5Wd2RaNFU1cjcKamE2d0daa0JocG9yYUFzRlkrdVFYTU5kc2RxSDNEd1FLL3paWjBMZ0g1Rm82dHYyazZySEl1MjVIRStrSGdORQpCT0kyY0JwcStGeGl4b1Q1RWgrczJrcFhJdk1SYTNVMFZsL2tvU21KcTN5RkNlTVk1dytnUWY3R2JTN0JXc1ZnClY5KzlBb0dBSWQ3Z2Q4UTJmcEl1TWIzRkZkMFhOWUtmK0RaY0dWUXFEcFRtek4ydjY1STg1V3RKZGV3cHhqQnIKWFhHSDBZY3Z1SWRMRFNhZWlOc1VoY3lENmdLbGxNbE5nNnhXU2RpcUUzblI1Z3ErLys4dnNETXh3UmdwTnIrTApxeXRaZGsrRVZ1SUJSUFRzMmpjL2ZJY3VXSlVRanUraEZqV2VhQi9pVWhoRll4Y0tyN1E9Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0t', "base64").toString();

const forbidden = fs.readFileSync('./html/error/403.html', 'utf-8');
const notfound = fs.readFileSync("./html/error/404.html", "utf-8");
const gateway = fs.readFileSync("./html/error/502.html", 'utf-8');

const options = {
  'key': heykey,
  'cert': heycert
};

const host = ["www.growtopia1.com", 'www.growtopia2.com', "growtopia1.com", "growtopia2.com"];

function printColor(word, color) {
  let colors = ['\x1b[42m']; // Default: Hijau
  const reset = '\x1b[0m'; // Reset warna

  if (color === 1) colors = ['\x1b[42m'];
  if (color === 2) colors = ['\x1b[41m'];
  if (color === 3) colors = ['\x1b[45m'];

  const coloredWord = word.split('').map((letter, index) => `${colors[index % colors.length]}${letter}${reset}`).join('');

  console.log(coloredWord + reset); // Menambahkan reset untuk menghindari efek warna yang berlebihan
}

const servers = http.createServer(async function (req, res) {
  const fileUrl = __dirname + "/htdocs/" + req.url;
  const ip = req.connection.remoteAddress.replace('::ffff:', '');
  fs.readFile(fileUrl, function (err, data) {
    if (err) {
      if (err.code === "ENOENT") {
        if (req.url.startsWith("/cache") && req.headers.accept === "*/*" && host.indexOf(req.headers.host) === 0) {
		  printColor(" [!] Growtopia Missing Files | From: " + ip + " | Path URL: " + req.url, 2);
          res.writeHead(301, {
            'Location': `${config.path}${req.url}`
          }).end();
        }
        res.writeHead(404, {
          'Content_Type': "text/html"
        });
        res.end(notfound);
      } else if (err.code === "EISDIR") {
        if (req.url === '/') {
          res.writeHead(301, {
            'Content_Type': "text/html"
          });
          res.write("<script>window.location.replace(\"" + config.discord + "\");</script>");
          res.end();
        } else {
          res.writeHead(403, {
            'Content_Type': 'text/html'
          });
          res.end(forbidden);
        }
      } else {
        res.writeHead(502, {
          'Content_Type': "text/html"
        });
        res.end(gateway);
      }
    } else {
      if (req.url === "/growtopia/server_data.php" && req.method.toLowerCase() === "post") {
        res.writeHead(200, {
          'Content-Type': "text/html"
        });
        res.write(data, () => {
		  printColor(" [!] Growtopia Connection | From: " + ip + " | Path URL: " + req.url, 3);
          res.end();
          res.destroy();
        });
      } else {
        if (req.url.startsWith("/cache") && req.headers.accept === '*/*' && host.indexOf(req.headers.host) === 0) {
          res.writeHead(200, {
            'Content_Type': "text/html"
          });
          res.end(data);
          if (config.logs === true) {
			printColor(" [!] Growtopia Downloader | From: " + ip + " | Path URL: " + req.url, 1);
          }
        } else {
          res.writeHead(403, {
            'Content_Type': "text/html"
          });
          res.end(forbidden);
        }
      }
    }
  });
});

const server = https.createServer(options, async function (req, res) {
  const fileUrl = __dirname + "/htdocs/" + req.url;
  const ip = req.connection.remoteAddress.replace('::ffff:', '');
  fs.readFile(fileUrl, function (err, data) {
    if (err) {
      if (err.code === 'ENOENT') {
        if (req.url.startsWith("/cache") && req.headers.accept === '*/*' && host.indexOf(req.headers.host) === 0) {
          printColor(" [!] Growtopia Missing Files | From: " + ip + " | Path URL: " + req.url, 2);
          res.writeHead(301, {
            'Location': `${config.path}${req.url}`
          }).end();
		  return;
        }
        res.writeHead(404, {
          'Content_Type': 'text/html'
        });
        res.end(notfound);
      } else if (err.code === "EISDIR") {
        if (req.url === '/') {
          res.writeHead(301, {
            'Content_Type': 'text/html'
          });
          res.write("<script>window.location.replace(\"" + config.discord + "\");</script>");
          res.end();
        } else {
          res.writeHead(403, {
            'Content_Type': "text/html"
          });
          res.end(forbidden);
        }
      } else {
        res.writeHead(502, {
          'Content_Type': 'text/html'
        });
        res.end(gateway);
      }
    } else {
      if (req.url === "/growtopia/server_data.php" && req.method.toLowerCase() === "post") {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.write(data, () => {
          printColor(" [!] Growtopia Connection | From: " + ip + " | Path URL: " + req.url, 3);
          res.end();
          res.destroy();
        });
      } else {
        if (req.url.startsWith("/cache") && req.headers.accept === "*/*" && host.indexOf(req.headers.host) === 0) {
          res.writeHead(200, {
            'Content_Type': "text/html"
          });
          res.end(data);
          if (config.logs === true) {
            printColor(" [!] Growtopia Downloader | From: " + ip + " | Path URL: " + req.url, 1);
          }
        } else {
          res.writeHead(403, {
            'Content_Type': "text/html"
          });
          res.end(forbidden);
        }
      }
    }
  });
});

servers.listen(80);
server.listen(443);

console.log("  ____             _   _     _____ _                ");
console.log(" | __ )  ___  __ _| |_| |__ |  ___| | __ _ _ __ ___ ");
console.log(" |  _ \\ / _ \\/ _` | __| '_ \\| |_  | |/ _` | '__/ _ \\");
console.log(" | |_) |  __/ (_| | |_| | | |  _| | | (_| | | |  __/");
console.log(" |____/ \\___|\\__,_|\\__|_| |_|_|   |_|\\__,_|_|  \\___|");
console.log("                                                   ");
console.log("============================================================");
console.log("");
console.log("Welcome to the BeathFlare. Please configurate your server at config.json");
console.log("Connected to the server. Listening port 80, 443. Please don't block away!");
console.log("");
console.log("============================================================");

servers.on('connection', function (conn) {});
server.on("connection", function (conn) {});