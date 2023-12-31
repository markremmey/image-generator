import "./style.css";

const form = document.querySelector("form");

console.log("javascript start");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("javascript start");

  const data = new FormData(form);

  const response = await fetch("http://localhost:8080/dream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: data.get("prompt"),
    }),
  });

  const { image } = await response.json();

  const result = document.querySelector("#result");
  result.innerHTML = `<img src="${image}" width="512" />`;
});
