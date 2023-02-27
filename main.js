const todoInput = document.querySelector(".todo__input"); // todo 입력
const todoList = document.querySelector(".todolist"); // todolist ul태그
const addBtn = document.querySelector(".btn__add"); // 추가 버튼

let todos = [];
let id = 0;

const init = () => {
  todoInput.addEventListener("keypress", (e) => {
    if (!e.target.value) return;
    if (e.key === "Enter") {
      appendTodos(e.target.value);
      todoInput.value = "";
    }
  });

  addBtn.addEventListener("click", () => {
    if (!todoInput.value) return;
    appendTodos(todoInput.value);
    todoInput.value = "";
  });
};

const setTodos = (newTodos) => {
  todos = newTodos;
};

const getAllTodos = () => {
  return todos;
};

const appendTodos = (text) => {
  const newId = id++;
  const newTodos = [
    ...getAllTodos(),
    { id: newId, isCompleted: false, content: text },
  ]; // 기존 todo + 새로운 todo
  setTodos(newTodos); // todo 업데이트
  paintTodos(); // HTML에 그려주기
};

const deleteTodo = (todoId) => {
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId);
  setTodos(newTodos);
  paintTodos();
};

const completeTodo = (todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo
  ); // 같으면 toggle해서, 다르면 그대로 반환

  // setTodos(newTodos);
  paintTodos();
};

const paintTodos = () => {
  todoList.innerHTML = ""; // 초기화
  const allTodos = getAllTodos(); // todo배열 가져오기

  allTodos.forEach((todo) => {
    // li
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo__item");

    // checkbox
    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("click", () => completeTodo(todo.id));

    // text
    const todotext = document.createElement("div");
    todotext.classList.add("todotext");
    todotext.innerText = todo.content;

    // delete
    const delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", () => deleteTodo(todo.id));
    delBtn.innerText = "X";

    if (todo.isCompleted) {
      todoItem.classList.add("checked");
      checkbox.innerText = "✔";
    }

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todotext);
    todoItem.appendChild(delBtn);

    todoList.appendChild(todoItem);
  });
};

init();
