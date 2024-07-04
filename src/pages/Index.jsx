import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const { theme, setTheme } = useTheme();

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const toggleTodo = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
  };

  const incompleteCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Todo App</h1>
        <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          Toggle {theme === "light" ? "Dark" : "Light"} Mode
        </Button>
      </header>
      <main>
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Add a new todo</CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Enter todo"
            />
            <Button onClick={addTodo}>Add</Button>
          </CardContent>
        </Card>
        <ul className="space-y-2">
          {todos.map((todo, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(index)}
              />
              <span className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </span>
              <Button variant="destructive" onClick={() => deleteTodo(index)}>
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </main>
      <Separator className="my-4" />
      <footer className="flex justify-between items-center">
        <span>{incompleteCount} items left</span>
        <Button variant="secondary" onClick={clearCompleted}>
          Clear Completed
        </Button>
      </footer>
    </div>
  );
};

export default Index;