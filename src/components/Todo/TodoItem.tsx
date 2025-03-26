import { Button, Typography, Spin, Alert, Input } from 'antd';
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { Todo } from '../../features/todos/todoApi';
import { useState } from 'react';
import {
  useToggleTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} from '../../features/todos/todoApi';

interface TodoItemProps {
  todo: Todo;
  editTodoId: string | null;
  setEditTodoId: React.Dispatch<React.SetStateAction<string | null>>;
}

function TodoItem({ todo }: TodoItemProps) {
  const [toggleTodo, { isLoading: isToggling }] = useToggleTodoMutation();
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation();
  const [editTodo, { isLoading: isEditing }] = useEditTodoMutation();

  const [isEditingMode, setIsEditingMode] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleToggle = async () => {
    await toggleTodo({ id: todo.id, completed: todo.completed, text: todo.text });
  };

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  };

  const handleEdit = async () => {
    if (newText.trim() && newText !== todo.text) {
      await editTodo({ id: todo.id, newText });
    }
    setIsEditingMode(false);
  };

  const isLoading = isToggling || isDeleting || isEditing;

  return (
    <li className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <Spin size="small" />
        </div>
      )}
      <Button type="text" onClick={handleToggle} disabled={isLoading} className="p-0">
        <CheckOutlined
          className={`text-xl ${todo.completed ? 'text-green-500' : 'text-gray-300'}`}
        />
      </Button>
      {isEditingMode ? (
        <Input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onPressEnter={handleEdit}
          onBlur={handleEdit}
          autoFocus
          disabled={isLoading}
        />
      ) : (
        <Typography.Text
          className={`flex-1 ${todo.completed ? 'text-gray-400' : 'text-black'}`}
          onDoubleClick={() => setIsEditingMode(true)}
        >
          {todo.text}
        </Typography.Text>
      )}
      <Button
        type="text"
        icon={isEditingMode ? <CheckOutlined /> : <EditOutlined />}
        onClick={() => setIsEditingMode(!isEditingMode)}
        className="opacity-0 group-hover:opacity-100"
        disabled={isLoading}
      />
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100"
        disabled={isLoading}
      />
    </li>
  );
}

export default TodoItem;
