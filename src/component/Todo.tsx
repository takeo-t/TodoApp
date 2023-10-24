// src/components/Todo.tsx

import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoProps {
  id: number;
  text: string;
  onDelete: (id: number) => void;
}

export const Todo: React.FC<TodoProps> = ({ id, text, onDelete }) => {
  return (
    <ListItem>
      <ListItemText primary={text} />
      <IconButton onClick={() => onDelete(id)} edge="end" aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
}

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const [todos, setTodos] = useState<Array<{ id: number; text: string }>>([]);
  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      setTodos(prev => [...prev, { id: Date.now(), text: input }]);
      setInput('');
    }
  };

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px' }}>
      <h1>Todo App</h1>
      <div style={{ display: 'flex', gap: '10px' }}>
        <TextField 
          variant="outlined" 
          fullWidth 
          label="New Todo" 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleAdd()}
        />
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <List>
        {todos.map(todo => (
          <Todo key={todo.id} {...todo} onDelete={handleDelete} />
        ))}
      </List>
    </div>
  );
}
