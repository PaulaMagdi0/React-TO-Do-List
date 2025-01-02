import { useState } from 'react';

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleInputChange = (event) => {
    setTodo(event.target.value);
  };

  const handleAddTodo = () => {
    if (todo.trim()) {
      const newTodo = {
        id: Date.now(),
        text: todo,
        completed: false 
      };
      setTodos([...todos, newTodo]);
      setTodo("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const handleDone = (id) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-dark mb-3">Todo List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          name='text'
          className="form-control p-3"
          value={todo}
          onKeyDown={handleKeyPress}
          onChange={handleInputChange}
          placeholder="Enter Your Task Here"
        />
        <button onClick={handleAddTodo} className="btn btn-dark">Save</button>
      </div>
      <div className="mt-4">
        {todos.map(({ id, text, completed }) => (
          <div key={id} className="alert alert-light border rounded mb-2 d-flex justify-content-between align-items-center">
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>
              {text}
            </span>
            <div>                            
              <button onClick={() => handleDone(id)} className={`btn btn-sm ${completed ? 'btn-warning' : 'btn-success'} me-2`}>
                {completed ? 'Not Done' : 'Done'}
              </button>
              <button onClick={() => handleDelete(id)} className="btn btn-danger btn-sm">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
