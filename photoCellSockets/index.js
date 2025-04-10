const { default: axios } = require('axios')
const express = require('express')
const jsdom = require('jsdom');
const app = express()
const port = 3000
const http = require("http");
const { Server } = require('socket.io');
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

const clientStates = {};
let interval;

io.on("connection", (socket) => {
    const clientId = socket.handshake.auth.tournamentId;
    console.log("Połączenie od klienta:", clientId);

    if (!clientId) {
        socket.disconnect();
        return;
    }

    if (!clientStates[clientId]) {
        clientStates[clientId] = {
            isDetonatorClicked: false,
            isStarted: false,
        };
    } else {
        log("emitreconnect");
        if (clientStates[clientId].isDetonatorClicked) {
            log("emitreconnectwifie");
            startInterval(clientStates[clientId]);
            setTimeout(() => {
                socket.emit("reconn");
            }, 100);
        }
    }

    socket.on("startReadingData", () => {
        const state = clientStates[clientId];
        console.log("Start od klienta:", clientId);

        startInterval(state);
    });

    socket.on("papaj", () => {
        clearInterval(interval);
        delete clientStates[clientId];
        console.log("Papaj od:", clientId);
    });

    socket.on("disconnect", () => {
        console.log("Rozłączenie klienta:", clientId);
        clearInterval(interval);
    });

    function startInterval(state) {
        if (interval) clearInterval(interval);

        interval = setInterval(async () => {
            const data = await getData();

            if (!data) {
                socket.emit("rip_papiez");
                clearInterval(interval);
                state.isDetonatorClicked = false;
                state.isStarted = false;
                return;
            }

            if (state.isDetonatorClicked) {
                if (state.isStarted) {
                    if (data.fotoLap == 1) io.emit("lap", data.lapsLeft);
                    if (data.fotoFinish == 1) {
                        log("koniec");
                        io.emit('finish', data.time);
                        clearInterval(interval);
                        state.isDetonatorClicked = false;
                        state.isStarted = false;
                    }
                } else if (data.fotoStart == 1) {
                    io.emit("start");
                    state.isStarted = true;
                }
            } else if (data.detonator == 1) {
                io.emit("boom", data.lapsLeft);
                state.isDetonatorClicked = true;
            }

            console.log("tick");
        }, 1000);
    }
});


const getData = async () => {
    try {
        const data = (await axios.get("http://192.168.0.1/awp/1/index.html", { timeout: 3000 })).data;
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