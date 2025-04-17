const express = require('express');

const app = express();

app.listen(3000,()=>{
    console.log("Server is running successfuly listing on port:3000")
});

//request handler
app.use((req,res)=>{
    console.log("insed server",res)
res.send("Hello from the server!!")
});