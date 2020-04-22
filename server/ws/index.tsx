export default function (socket: any) {
  console.log("connected");
  socket.on("disconnect", () => {
    console.log("deco");
  });
  // whenever we receive a 'message' we log it out
  socket.on("message", function (message: any) {
    console.log(message);
  });
}
