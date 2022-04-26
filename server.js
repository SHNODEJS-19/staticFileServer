var express = require('express');
const os = require('os');
const { writeFile } = require('fs');

const app = express();


//routing to the homepage
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/pages/index.html')
})
app.get('/about', (req, res) =>{
    res.sendFile(__dirname + '/pages/about.html')
})

//handling the system route
app.get('/sys', (req, res) =>{
    const data = { "hostname":`${os.hostname()}`,"platform":`${os.platform()}`,
    "architecture":`${os.arch()}`,"numberOfCPUS":`${os.cpus().length}`,
    "networkInterfaces":`${os.networkInterfaces()}`,"uptime":`${os.uptime()}`}
    
    var dataStringfy = JSON.stringify(data);

    writeFile(__dirname + '/osinfo.json', dataStringfy,()=>{
        res.status(201).send("Your OS info has been saved successfully!")
    } )
})

//handling the 404 page
app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + '/pages/404.html')
})



app.listen(3000);
console.log('you are listening to port 3000')