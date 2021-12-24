import logo from "./src/hello.svg";

const image = document.createElement("img");
image.src = logo;

const app = document.getElementById("root");

app.appendChild(image);
