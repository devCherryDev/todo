import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  // Lade die Todos aus dem localStorage, wenn die Komponente geladen wird
  useEffect(() => {
    const savedTodos = loadFromLocalStorage('todos');
    if (savedTodos) {
      setTodos(savedTodos);
    }
  }, []);

  // Funktion zum Hinzufügen eines neuen Todos
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, { text: newTodo, completed: false }];
      setTodos(updatedTodos);
      saveToLocalStorage('todos', updatedTodos);
      setNewTodo(''); // Leere das Eingabefeld nach dem Hinzufügen
    }
  };

  // Funktion zum Verarbeiten von Enter-Taste in der Eingabe
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  // Funktion zum Umschalten des Status eines Todos (completed/uncompleted)
  const toggleTodoCompletion = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveToLocalStorage('todos', updatedTodos);
  };

  // Funktion zum Löschen eines Todos
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    saveToLocalStorage('todos', updatedTodos);
  };

  return (
    <div className="App-header">
      <h1>Sophie's ToDo's</h1>
      <input
        type="text"
        placeholder="Neues Todo eingeben"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={handleKeyPress}
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />
      <button onClick={addTodo} style={{ marginLeft: '10px', padding: '10px', fontSize: '16px' }}>
        Hinzufügen
      </button>
      <ul style={{ marginTop: '20px' }}>
        {todos.map((todo, index) => (
          <li key={index} style={{ fontSize: '18px', marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoCompletion(index)}
                style={{ marginRight: '10px'}}
              />
            </div>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(index)} style={{ marginLeft: '30px' , padding: '5px 10px' }}>
              Löschen
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Speichern in localStorage
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Laden aus localStorage
function loadFromLocalStorage(key) {
  const savedData = localStorage.getItem(key);
  return savedData ? JSON.parse(savedData) : null;
}

export default App;
