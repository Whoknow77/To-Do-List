const addButton = document.querySelector(".btn__add"); // 할 일 추가하기
const todo = document.querySelector(".text__input"); // 할 일
const deleteButton = document.querySelector(".btn__all__delete"); // 삭제
const todoList = document.querySelector(".list");
const addTodo = () => {
  if (!todo.value) {
    todo.focus();
    return;
  }
  let item = document.createElement("li");
  let del = document.createElement("button");
  let check = document.createElement("input");
  del.innerText = "X";
  item.appendChild(check);
  item.innerText = todo.value;
  item.appendChild(del);
  todoList.appendChild(item);
  todo.focus();
  todo.value = "";
};
// <li> <checkbox> <text> <button> </li>

addButton.addEventListener("click", addTodo);
