import { VSCodeButton, VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react";
import { Item } from "../types";
import { useTodo } from "../contexts/TodoContext";
import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const TodoItem = (props: Item) => {
  const { todos, updateTodos } = useTodo();
  const [isChecked, setIsChecked] = useState(props.isChecked);

  function deleteTodo() {
    const newTodos = todos.filter((todo) => todo.id !== props.id);
    updateTodos(newTodos);
  }

  function toggleChecked() {
    setIsChecked((prevChecked) => !prevChecked);
    const newTodos = todos.map((todo) => {
      if (todo.id === props.id) {
        return {
          ...todo,
          isChecked: !todo.isChecked,
        };
      }
      return todo;
    });

    updateTodos(newTodos);
  }

  return (
    <li className="w-96 mx-auto max-h-16 flex justify-between items-center gap-3 px-3 mb-1 py-2">
      <VSCodeCheckbox checked={isChecked} onChange={toggleChecked} />
      <span className="flex-1 overflow-y-auto  py-1">{props.text}</span>
      <VSCodeButton onClick={deleteTodo}>
        <FaRegTrashAlt />
      </VSCodeButton>
    </li>
  );
};

export default TodoItem;
