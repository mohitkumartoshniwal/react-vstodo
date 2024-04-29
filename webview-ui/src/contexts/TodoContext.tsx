import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Item } from "../types";
import { vscode } from "../vscode";

type Todo = {
  todos: Item[];
  updateTodos: (newTodos: Item[]) => void;
};

const initialValues: Todo = {
  todos: [],
  updateTodos: () => {},
};

const Todo = createContext<Todo>(initialValues);

export const TodoProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Item[]>([]);

  useEffect(() => {
    const storedTodos = vscode.getState();
    if (storedTodos) {
      setTodos(storedTodos as Item[]);
    }
  }, []);

  const updateTodos = (newTodos: Item[]) => {
    setTodos(newTodos);
    vscode.setState(newTodos);
  };

  return (
    <Todo.Provider
      value={{
        todos,
        updateTodos,
      }}
    >
      {children}
    </Todo.Provider>
  );
};

export const useTodo = () => {
  return useContext(Todo);
};
