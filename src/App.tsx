// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import { Todo } from "./component/Todo";
import { TodoCard } from "./component/atoms/TodoCard";

function App(){
  const todoSample = {
    id: 1,
    text: "Sample Todo Item"
  };

  const handleDelete = (id: number) => {
    // ここにToDoを削除するためのロジックを書く
    console.log(`Todo with id ${id} is to be deleted.`);
  };

  return (
    <div>
      <Todo id={todoSample.id} text={todoSample.text} onDelete={handleDelete} />
      <TodoCard />
    </div>
  );
}

export default App;