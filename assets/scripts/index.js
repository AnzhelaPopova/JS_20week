fetch("https://swapi.dev/api")
  .then((response) => response.json())
  .then((data) => {
    // Получение списка ключей объекта
    const keys = Object.keys(data);

    // Отображение списка ключей в выпадающем списке
    const select = document.getElementById("keys-list");
    keys.forEach((key) => {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = key;
      select.appendChild(option);
    });
  });

let preload = document.getElementById("preload");
preload.style.display = "none";
let button = document.getElementById("data_output");
let newElement = document.createElement("p");
data_output.after(newElement);

function send() {
  preload.style.display = "block";
  let selectInput = document.getElementById("keys-list");
  let selecttInputValue = selectInput.value;

  let commentInput = document.getElementById("comment");
  let commentInputValue = commentInput.value;
  newElement.innerHTML = " ";
  try {
    if (
      commentInputValue == "" ||
      commentInputValue < 0 ||
      commentInputValue >= 10
    ) {
      throw new Error("Введите значение от 0 до 9");
    } else {
      fetch(`https://swapi.dev/api/${selecttInputValue}`)
        .then((response) => response.json())
        .then((data) => {
          preload.style.display = "none";
          newElement.style.color = "black";
          return (newElement.innerHTML =
            "Имя: " + data.results[commentInputValue].name);
        });
    }
  } catch (error) {
    preload.style.display = "none";
    newElement.innerHTML = `Что то пошло не так. Подробности:` + error.message;
    newElement.style.color = "red";
  } finally {
    commentInput.value = " ";
  }
}
