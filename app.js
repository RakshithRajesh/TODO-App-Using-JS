// Just a Unique ID function i have in my code snippets;
const uniqid = (prefix = "") => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 = (performance && performance.now && performance.now() * 1000) || 0; //Time in microseconds since page-load or 0 if unsupported
  return (
    prefix +
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = Math.random() * 16; //random number between 0 and 16
      if (d > 0) {
        //Use timestamp until depleted
        r = (d + r) % 16 | 0;
        d = Math.floor(d / 16);
      } else {
        //Use microseconds since page-load if supported
        r = (d2 + r) % 16 | 0;
        d2 = Math.floor(d2 / 16);
      }
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    })
  );
};

var span = document.getElementById("date");

function time() {
  var d = new Date();
  var s = d.getSeconds();
  var m = d.getMinutes();
  var h = d.getHours();
  span.textContent =
    ("0" + h).substr(-2) +
    ":" +
    ("0" + m).substr(-2) +
    ":" +
    ("0" + s).substr(-2);
}

setInterval(time, 1000);

let todo_list = localStorage.getItem("todos") || "[]";
todo_list = JSON.parse(todo_list);

const todo_list_html = document.getElementById("todo_list");
const todo_title = document.getElementById("add_todo_title");
const add_todo = document.getElementById("add_todo_button");

const delete_todo = (id) => {
  todo_list = todo_list.filter((t) => t.id !== id);
  update();
};

function toggle_todo(id) {
  let index = todo_list.findIndex((t) => t.id === id);
  todo_list[index]["status"] = !todo_list[index]["status"];
  update();
}

const update = () => {
  saveTodos();
  let markup = todo_list.map((t, i) => {
    return `<div class="todo_item ${t.status ? "complete" : "incomplete"}">
                    <div>
                        <input onchange="toggle_todo('${t.id}')" id="${
      t.id
    }" type="checkbox" />
                        <label for="${t.id}">${t.title}</label>
                    </div>
                    <div>
                        <button onclick="delete_todo('${
                          t.id
                        }')" class="primary danger sm">X</button>
                    </div>
                </div>`;
  });

  todo_list_html.innerHTML = "";
  markup.forEach((m) => {
    todo_list_html.innerHTML = m + todo_list_html.innerHTML;
  });
};

add_todo.addEventListener("click", function (e) {
  const title = todo_title.value;

  if (title !== "") {
    let newTodo = {
      title,
      id: uniqid("todo-"),
      status: false,
    };

    todo_list = [...todo_list, newTodo];
    update();
    todo_title.value = "";
  } else alert("Please enter a valid title.");
});

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todo_list));
};

update();
