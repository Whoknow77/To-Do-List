const addButton = document.querySelector(".btn__add"); // 할 일 추가하기
const todo = document.querySelector(".text__input"); // 할 일
const todoList = document.querySelector(".list");
const addTodo = () => {
  if (!todo.value) {
    todo.focus();
    return;
  }
  let item = document.createElement("li");
  let del = document.createElement("button");
  let span = document.createElement("span");
  del.innerText = "X";
  del.addEventListener("click", deleteTodo); // 삭제 버튼 이벤트
  item.appendChild(span);
  span.innerText = todo.value;
  item.appendChild(del);
  item.addEventListener("click", () => {
    span.classList.toggle("select");
  });

  todoList.appendChild(item);
  todo.focus();
  todo.value = "";
};

const deleteTodo = (e) => {
  e.target.parentElement.remove();
};
// <li> <checkbox> <text> <button> </li>

addButton.addEventListener("click", addTodo);
