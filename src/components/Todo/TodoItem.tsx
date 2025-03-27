import { useState } from 'react';
import { Input, Checkbox, Button, Typography, Spin, Alert } from 'antd';
import { EditOutlined, SaveOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleTodoAsync,
  deleteTodoAsync,
  editTodoAsync,
  Todo,
  clearError,
} from '../../features/todos/todoSlice';
import { RootState } from '../../app/store';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  const { loadingStates, errors } = useSelector((state: RootState) => state.todo);
  const isTogglingTodo = loadingStates[todo.id];
  const isDeletingTodo = loadingStates[`delete_${todo.id}`];
  const isEditingTodo = loadingStates[`edit_${todo.id}`];
  const toggleError = errors[todo.id];
  const deleteError = errors[`delete_${todo.id}`];
  const editError = errors[`edit_${todo.id}`];

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleToggle = async () => {
    await dispatch(
      toggleTodoAsync({ id: todo.id, completed: todo.completed, text: todo.text }) as any,
    );
  };

  const handleDelete = async () => {
    await dispatch(deleteTodoAsync(todo.id) as any);
  };

  const handleEdit = async () => {
    await dispatch(editTodoAsync({ id: todo.id, text: editedText }) as any);
    setIsEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all relative">
      {(isTogglingTodo || isDeletingTodo || isEditingTodo) && (
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
        <Input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onPressEnter={handleEdit}
          disabled={isEditingTodo}
          className="flex-1"
        />
      ) : (
        <Typography.Text className={`flex-1 ${todo.completed ? 'text-gray-400' : 'text-black'}`}>
          {todo.text}
        </Typography.Text>
      )}

      {isEditing ? (
        <Button type="text" icon={<SaveOutlined />} onClick={handleEdit} disabled={isEditingTodo} />
      ) : (
        <Button type="text" icon={<EditOutlined />} onClick={() => setIsEditing(true)} />
      )}

      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={handleDelete}
        disabled={isTogglingTodo || isDeletingTodo}
      />

      {(toggleError || deleteError || editError) && (
        <Alert
          message={toggleError || deleteError || editError}
          type="error"
          showIcon
          className="mb-2"
          closable
          onClose={() => {
            if (toggleError) dispatch(clearError(todo.id));
            if (deleteError) dispatch(clearError(`delete_${todo.id}`));
            if (editError) dispatch(clearError(`edit_${todo.id}`));
          }}
        />
      )}
    </li>
  );
}

export default TodoItem;
