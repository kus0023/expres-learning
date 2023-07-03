const http = require('http');
const port = 8000;

const fs = require('fs');

function responseHandler(req, res){

    console.log(req.url);

    let filePath;

    switch(req.url){
        case '/': 
            filePath = './index.html'
            break;
        case '/profile':
            filePath = './profile.html'
            break;
        
        default:
            filePath = './404.html'
    }

    fs.readFile(filePath, (err, data)=>{
        if(err){
            console.log("Error", err);

            res.end('<p>Error Reading File</p>');
            return;
        }

        res.end(data);
    })

    //res.end("Hurray! We got your request and successfully send back response.");
}

const server = http.createServer(responseHandler);


server.listen(port, (error)=>{
    if(error){
        console.log(error);
        return;
    }

    console.log("Server is up and running on port:", port);
    
});
