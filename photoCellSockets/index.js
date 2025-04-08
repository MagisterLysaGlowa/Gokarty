const { default: axios } = require('axios')
const express = require('express')
const jsdom = require('jsdom');
const app = express()
const port = 3000
const http = require("http");
const { Server, Socket } = require('socket.io');
const { log } = require('console');

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
        optionsSuccessStatus: 204
    }
})



io.on("connection", (socket) => {
    let interval;
    let isDetonatorClicked = false;
    let isStarted = false


    socket.on("startReadingData", () => {
        try {
            console.log("Dostalem");
            isDetonatorClicked = false
            isStarted = false
            interval = setInterval(async () => {
                const data = await getData()
                if (!data) return
                if (isDetonatorClicked) {
                    if (isStarted) {
                        if (data.fotoLap == 1) io.emit("lap", data.lapsLeft)
                        if (data.fotoFinish == 1) {
                            log("dupa")
                            log(data);
                            io.emit('finish', data.time);
                            clearInterval(interval)
                            isDetonatorClicked = false
                            isStarted = false
                        }
                    }
                    else if (data.fotoStart == 1) {
                        io.emit("start")
                        isStarted = true;
                    }

                }
                else if (data.detonator == 1) {
                    io.emit("boom", data.lapsLeft);
                    isDetonatorClicked = true;
                }
                console.log(123);
            }, 1000)
        } catch (error) { }
    })
    socket.on("papaj", () => {
        isDetonatorClicked = false;
        isStarted = false;
        clearInterval(interval)
    })
})


const getData = async () => {
    try {
        const data = (await axios.get("http://192.168.0.1/awp/1/index.html")).data;
        const html = new jsdom.JSDOM(data);
        const ps = html.window.document;

        const cosik = [1, 1000, 60000]

        return {
            lapsLeft: ps.querySelectorAll(".lap_counter")[Number(ps.querySelector(".main_lap_counter").textContent)].textContent,
            laps: ps.querySelector(".main_lap_counter").textContent,
            time: ps.querySelector(".lap_time")
                .textContent
                .replace(/^T#|[a-zA-Z]/g, '')
                .split('_')
                .reverse()
                .reduce((prev, next, index) => prev + next * cosik[index], 0),
            detonator: ps.querySelector(".lap_start").textContent,
            fotoStart: ps.querySelector(".foto_0").textContent,
            fotoLap: ps.querySelector(".foto_1").textContent,
            fotoFinish: ps.querySelector(".foto_2").textContent,
        };
    } catch (error) {

    }
};

server.listen(2137, () => console.log("Działam na papieżu"))