const express = require("express");
const redis = require("redis");
const process = require("process");


const app = express();
const client = redis.createClient({
    host: "redis-server",
    port: 6379
});

client.set("visits", 0);

app.get("/", (req, res)=>{
    process.exit(0);
    client.get('visits', (err, visits)=>{
        let latest_visitor = parseInt(visits) + 1;
        res.send("Number of visits " + latest_visitor);
        client.set("visits", latest_visitor);
    });
});

app.listen(8081, ()=>{
    console.log("Listening to port 4001");
})