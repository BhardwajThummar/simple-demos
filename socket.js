const { Server } = require("socket.io");

const io = new Server({ /* options */ });

io.on("connection", (socket) => {
    let socketid = socket.id;
    io.emit('user connect', `${socketid} Connected`)

    socket.on("message", (msg) => {
        console.log("msg :>>", msg)
    })

    setInterval(() => {
        socket.emit("update", "world");
    }, 3000)

    socket.on('sendMessage', () => {

    })

    socket.on("disconnect", () => {
        let socketid = socket.id;
        io.emit('user disconnect', `${socketid} disconnected`)
        console.log("disconnected", socket.id);
    });
});

io.listen(3000)