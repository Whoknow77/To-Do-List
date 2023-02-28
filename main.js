const todoInput = document.querySelector(".todo__input"); // todo 입력
const todoList = document.querySelector(".todolist"); // todolist ul태그
const addBtn = document.querySelector(".btn__add"); // 추가 버튼
const allSelectBtn = document.querySelector(".btn__all__select");
const allDeleteBtn = document.querySelector(".btn__all__delete");

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

  allDeleteBtn.addEventListener("click", () => {
    getAllTodos().splice(0);
    paintTodos();
  });

  allSelectBtn.addEventListener("click", () => {
    getAllTodos().forEach((todo) => {
      completeTodo(todo.id);
    });
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
  // spread 를 통해 객체의 데이터를 가져옴

  setTodos(newTodos);
  paintTodos();
};

const editTodo = (e, todoId) => {
  const oldtodoItem = getAllTodos().filter((todo) => todo.id === todoId);
  const todoItem = e.target.parentNode; // li 태그
  const todotext = document.createElement("input");
  todotext.value = oldtodoItem[0].content;
  todotext.classList.add("edit__input");

  todotext.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      updateTodo(e.target.value, todoId); // todo 수정
      document.body.removeEventListener("click", onClickBody);
    }
  });

  const onClickBody = (e) => {
    if (e.target.parentNode !== todoItem) {
      todoItem.removeChild(todotext);
      document.body.removeEventListener("click", onClickBody);
    }
  };

  // todoItemElem 요소를 제외한 영역을 클릭 시, 수정모드 종료
  document.body.addEventListener("click", onClickBody);

  todoItem.appendChild(todotext);
  todotext.focus();
};

const updateTodo = (text, todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, content: text } : todo
  );
  setTodos(newTodos);
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

    // edit
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", (e) => editTodo(e, todo.id));
    editBtn.innerText = "Edit";

    if (todo.isCompleted) {
      todoItem.classList.add("checked");
      checkbox.innerText = "✔";
    }

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todotext);
    todoItem.appendChild(editBtn);
    todoItem.appendChild(delBtn);

    todoList.appendChild(todoItem);
  });
};

init();
