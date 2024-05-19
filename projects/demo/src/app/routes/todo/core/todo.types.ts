export type Todo = {
  id: string;
  title: string;
  label: string | null;
  items: TodoItem[];
  remindOn: Date | null;
}

export type TodoItem = {
  id: string;
  description: string;
  isCompleted: boolean;
}