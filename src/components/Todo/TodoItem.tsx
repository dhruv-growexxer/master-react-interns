import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Button, Typography, Spin, Alert } from 'antd';
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { toggleTodoAsync, deleteTodoAsync, editTodoAsync } from '../../features/todos/todoThunks';
import { clearError } from '../../features/todos/todoSlice';
import { Todo } from '../../features/todos/todoTypes';
import { RootState } from '../../app/store';
import { useState } from 'react';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  const { loadingStates, errors } = useSelector((state: RootState) => state.todo);
  const isTogglingTodo = loadingStates[todo.id];
  const isDeletingTodo = loadingStates[`delete_${todo.id}`];
  const toggleError = errors[todo.id];
  const deleteError = errors[`delete_${todo.id}`];

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleToggle = async () => {
    await dispatch(
      toggleTodoAsync({ id: todo.id, completed: todo.completed, text: todo.text }) as any,
    );
  };

  const handleDelete = async () => {
    await dispatch(deleteTodoAsync(todo.id) as any);
  };

  const handleEditSave = async () => {
    if (newText.trim() && newText !== todo.text) {
      await dispatch(editTodoAsync({ id: todo.id, text: newText }) as any);
    }
    setIsEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all relative">
      {(isTogglingTodo || isDeletingTodo) && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}
      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isTogglingTodo || isDeletingTodo}
      />
      {isEditing ? (
        <div className="flex-1">
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-[78%] border border-gray-300 rounded px-2 py-1"
          />
          <Button onClick={handleEditSave} icon={<SaveOutlined />} className="ml-2" />
          <Button onClick={() => setIsEditing(false)} icon={<CloseOutlined />} className="ml-2" />
        </div>
      ) : (
        <Typography.Text className={`flex-1 ${todo.completed ? 'text-gray-400' : 'text-black'}`}>
          {todo.text}
        </Typography.Text>
      )}
      {!isEditing && (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => setIsEditing(true)}
          className="opacity-0 group-hover:opacity-100"
          disabled={isTogglingTodo || isDeletingTodo}
        />
      )}
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100"
        disabled={isTogglingTodo || isDeletingTodo}
      />
      {(toggleError || deleteError) && (
        <Alert
          message={toggleError || deleteError}
          type="error"
          showIcon
          className="mb-2"
          closable
          onClose={() => {
            if (toggleError) dispatch(clearError(todo.id));
            if (deleteError) dispatch(clearError(`delete_${todo.id}`));
          }}
        />
      )}
    </li>
  );
}

export default TodoItem;
