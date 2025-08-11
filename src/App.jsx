import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123", completed: false },
    { id: 1, content: "코딩 공부하기", completed: false },
    { id: 2, content: "잠 자기", completed: true },
  ]);

  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <hr />
      <TodoInput todoList={todoList} setTodoList={setTodoList} />
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const newTodo = { id: Date.now(), content: inputValue.trim(), completed: false };


  return (
    <>
      <input
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button
        onClick={() => {
          const newTodo = { id: Number(new Date()), content: inputValue };
          const newTodoList = [...todoList, newTodo];
          setTodoList(newTodoList);
          setInputValue("");
        }}
      >
        추가하기
      </button>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul>
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(todo.content);

  const startEdit = () => {
    setInputValue(todo.content); // 최신 내용으로 초기화
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!inputValue.trim()) return;
    setTodoList(prev =>
      prev.map(el => (el.id === todo.id ? { ...el, content: inputValue.trim() } : el))
    );
    setIsEditing(false);
  };

  const toggleComplete = () => {
    setTodoList(prev => prev.map(el => el.id === todo.id ? { ...el, completed: !el.completed } : el));
  };

  return (
    <li className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label className="todo-left">
        <input type="checkbox" checked={todo.completed} onChange={toggleComplete} />
      
      </label>
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="btn save" onClick={handleSave}>저장</button>
          <button className="btn cancel" onClick={() => setIsEditing(false)}>취소</button>
        </>
      ) : (
        <>
          <span className="todo-content">{todo.content}</span>
          <button className="btn edit" onClick={startEdit}>수정</button>
        </>
      )}
      <button className="btn delete" onClick={() => setTodoList(prev => prev.filter(el => el.id !== todo.id))}>
        삭제
      </button>
    </li>
  );
}

export default App;
