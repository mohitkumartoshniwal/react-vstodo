import {
  VSCodeTextField,
  VSCodeButton,
} from "@vscode/webview-ui-toolkit/react";
import { useTodo } from "../contexts/TodoContext";
import { useState } from "react";
import { Item } from "../types";
import { nanoid } from "nanoid";
import { FaPlus } from "react-icons/fa";

const InputBox = () => {
  const { todos, updateTodos } = useTodo();
  const [text, setText] = useState("");

  function addTodo() {
    if (text.length === 0) return;

    const todoItem: Item = {
      id: nanoid(),
      isChecked: false,
      text,
    };
    updateTodos([...todos, todoItem]);
    setText("");
  }

  return (
    <div className="w-full flex justify-center gap-3">
      <VSCodeTextField
        value={text}
        onChange={(e) => {
          setText((e.target as HTMLInputElement).value);
        }}
        placeholder="Enter text here"
        className="w-1/2"
      />
      <VSCodeButton onClick={addTodo}>
        <FaPlus />
      </VSCodeButton>
    </div>
  );
};

export default InputBox;
