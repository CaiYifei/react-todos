import { useState } from "react";
import styles from "./App.module.css";
import type { TODO, TODOS } from "./types/App/index";

function App() {
  const [todos, setTodos] = useState<TODOS>([]);
  const [todosStore, setTodosStore] = useState<TODOS>([]);

  const handleChange = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    const trimedValue = value.trim();
    if (!trimedValue) {
      setTodos(todosStore);
    } else {
      setTodos(
        todosStore.filter((item: TODO) => item.name.includes(trimedValue))
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    const { value } = event.target as HTMLInputElement;

    if (key === "Enter") {
      if (todos.length === 0) {
        const newTodos = [...todosStore, { name: value, isSelected: false }];
        setTodosStore(newTodos);
        setTodos(newTodos);
      } else {
        alert("todo已存在");
      }
    }
  };

  const complete = () => {
    const newTodos = todosStore.filter((item: TODO) => !item.isSelected);
    setTodosStore(newTodos);
    setTodos(newTodos);
  };

  const clearSelected = () => {
    todosStore.forEach((item: TODO) => {
      item.isSelected = false;
    });
    setTodosStore([...todosStore]);
    setTodos([...todosStore]);
  };

  const handleCheckbox = (todo: TODO) => {
    todo.isSelected = !todo.isSelected;
    setTodos([...todos]);
  };

  return (
    <div className={styles.app}>
      <input
        placeholder="按回车键新添todo"
        className={styles.inputSection}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {todos.length > 0 && (
        <div className={styles.popoverSection}>
          <div className={styles.todosList}>
            {todos.map((todo: TODO) => (
              <div
                key={todo.name}
                className={styles.todoItem}
                onClick={() => handleCheckbox(todo)}
              >
                <input
                  type="checkbox"
                  checked={todo.isSelected}
                  className={styles.checkboxComp}
                />
                <div className={styles.text} title={todo.name}>
                  {todo.name}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.controlSection}>
            <div className={styles.btn}>
              剩余{todosStore.filter((item: TODO) => !item.isSelected).length}
              个未选中
            </div>

            <div className={styles.btn} onClick={complete}>
              选中的todo全部完成
            </div>

            <div className={styles.btn} onClick={clearSelected}>
              清除选中
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
