const fs = require("fs");
const express = require("express");
// const Gpio = require("pigpio").Gpio;
// const flowMeter = new Gpio(4, {
//     mode: Gpio.INPUT,
//     pullUpDown: Gpio.PUD_DOWN,
//     edge: Gpio.RISING_EDGE
// });

const data = fs.existsSync("data.bin")
    ? fs.readFileSync("data.bin")
        .subarray(0, -1)
        .toString("utf-8")
        .split(/\s*\n\s*/g)
        .map(line => {
            let split = line.split(/,\s*/g);
            return [
                parseInt(split[0]),
                parseInt(split[1])
            ]
        })
    : [];

let amt = data.length > 0 ? data.reduce((acc, v) => {
    return v[1] > acc ? v[1] : acc;
}, 0) : 0;

let ios = [];

function piss() {
    amt += 2.25;
    addAmt(amt);
}

const ws = fs.createWriteStream("data.bin", {
    flags: "a"
});

function addAmt(amt) {
    let date = Date.now();
    data.push([date, amt]);
    ws.write(`${date}, ${amt}\n`);
    for (let io of ios) io.emit("piss", amt);
}

setInterval(() => {
    if (Math.random() < .2) piss();
}, 10000);

// flowMeter.on("interrupt", piss);

module.exports = function(server) {

    const io = require("socket.io")(server);

    io.on("connect", socket => {
        socket.emit("piss", amt);
    });

    ios.push(io);

    let router = new express.Router({

    });

    router.get("/peepeedata.json", (req, res) => {
        res.status(200).send(data);
    });

    return router;
}