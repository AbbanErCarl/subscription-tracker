import createApp from "./app.js";

const port = 5500;

createApp().listen(port, () => {
  console.log(`Server is running on this port ${String(port)}`);
});