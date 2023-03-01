const todoInput = document.querySelector(".todo__input"); // todo 입력
const todoList = document.querySelector(".todolist"); // todolist ul태그
const addBtn = document.querySelector(".btn__add"); // 추가 버튼
const allSelectBtn = document.querySelector(".btn__all__select"); // 전체 선택
const allDeleteBtn = document.querySelector(".btn__all__delete"); // 전체 삭제

const init = () => {
  paintTodos();

  // 엔터로 할 일 추가
  todoInput.addEventListener("keypress", (e) => {
    if (!e.target.value) return; // 공백일때는 추가 x

    if (e.key === "Enter") {
      appendTodos(e.target.value);
      todoInput.value = "";
    }
  });

  // 버튼으로 할 일 추가
  addBtn.addEventListener("click", () => {
    if (!todoInput.value) return; // 공백일때는 추가 x

    appendTodos(todoInput.value);
    todoInput.value = "";
  });

  // 전체삭제
  allDeleteBtn.addEventListener("click", () => {
    localStorage.clear();
    paintTodos();
  });

  // 전체버튼
  allSelectBtn.addEventListener("click", () => {
    getAllTodos().forEach((todo) => {
      selectTodo(todo.id);
    });
  });
};

const setTodos = (newTodos) => {
  // 로컬 업데이트
  localStorage.setItem("todolist", JSON.stringify(newTodos));
};

// 로컬로 부터 받아오기
const getAllTodos = () => {
  return localStorage.getItem("todolist")
    ? JSON.parse(localStorage.getItem("todolist"))
    : [];
};

// 할 일 추가
const appendTodos = (text) => {
  const currenttodos = getAllTodos();
  let id = currenttodos.length;
  const newTodos = { id: id, isSelected: false, content: text };
  currenttodos.push(newTodos);
  setTodos(currenttodos); // todo 업데이트
  paintTodos();
};

// 할 일 삭제
const deleteTodo = (todoId) => {
  const newTodos = getAllTodos().filter((todo) => todo.id !== todoId);
  setTodos(newTodos);
  paintTodos();
};

// 할 일 선택
const selectTodo = (todoId) => {
  const newTodos = getAllTodos().map((todo) =>
    todo.id === todoId ? { ...todo, isSelected: !todo.isSelected } : todo
  ); // 같으면 toggle해서, 다르면 그대로 반환
  // spread 를 통해 객체의 데이터를 가져옴

  setTodos(newTodos);
  paintTodos();
};

const editTodo = (e, todoId) => {
  const currentTodoItem = getAllTodos().filter((todo) => todo.id === todoId);
  const todoItem = e.target.parentNode; // li 태그
  const todotext = document.createElement("input");
  todotext.value = currentTodoItem[0].content; // 기존 input에 담겨있던 텍스트
  todotext.classList.add("edit__input");

  // 엔터로 수정
  todotext.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      updateTodo(e.target.value, todoId); // todo 수정
      document.body.removeEventListener("click", onClickBody);
    }
  });

  // todoItemElem 요소를 제외한 영역을 클릭 시, 수정모드 종료
  const onClickBody = (e) => {
    if (e.target.parentNode !== todoItem) {
      console.log("다른곳누름");
      console.log(e.target.parentNode);
      todoItem.removeChild(todotext);
      document.body.removeEventListener("click", onClickBody);
    }
  };

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

// 화면에 그리기(render)
const paintTodos = () => {
  todoList.innerHTML = "";

  const allTodos = getAllTodos();

  allTodos.forEach((todo) => {
    // <li>
    //   <div(checkbox)> </div>
    //    <div(text)> </div>
    //    <button> </button>
    //    <button> </button>
    // </li>

    const todoItem = document.createElement("li");
    todoItem.classList.add("todo__item");

    // checkbox
    const checkbox = document.createElement("div");
    checkbox.classList.add("checkbox");
    checkbox.addEventListener("click", () => selectTodo(todo.id));

    // text
    const todotext = document.createElement("div");
    todotext.classList.add("todotext");
    todotext.innerText = todo.content;

    // edit
    const editBtn = document.createElement("button");
    editBtn.classList.add("editBtn");
    editBtn.addEventListener("click", (e) => editTodo(e, todo.id));
    editBtn.innerText = "Edit";

    // delete
    const delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", () => deleteTodo(todo.id));
    delBtn.innerText = "X";

    if (todo.isSelected) {
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
