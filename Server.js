var http = require("http")
var fs = require("fs")
const {exec} = require("child_process")
let port = 13542

http.createServer(function(req, res){
    console.log(req.headers)
    let body = '';
    let code
    req.on('readable', function () {
        body += req.read();
        code = body.slice(12)

        console.log(code)
        
    });

    setTimeout(() => {
      // console.log("code", code)
      fs.writeFile("build.js", code, function (error){
        if(error){
          console.log(error)
        }else{
          console.log("success")
        }
      })
    }, 0);

    setTimeout(() => {
      exec("webpack", function(error, stdout, stderr) {
        if(error){
            console.error(error);
        }
        else{
            console.log("webpack success");
        }
    })
    }, 1);

    setTimeout(() => {
      fs.readFile("./dist/main.js", function(error, data){
        if(error){
          console.log("read fail")
        }
        else{
          let code = data.toString()
          
          res.write(`<!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Render</title>
          </head>
          <body>
              <script>${code}</script>
          </body>
          </html>`)
          res.end()
        }
      })
    }, 2);
    
   
}).listen(port)

// exec('npm run build', (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
//   });



