import { createDispatchHook, useDispatch, useSelector } from 'react-redux';
import { Checkbox, Button, Typography, Spin, Alert } from 'antd';
import { DeleteOutlined, LoadingOutlined, EditOutlined } from '@ant-design/icons';
import { Todo, clearError } from '../../store/slices/todoSlice';
import { RootState } from '../../store';
import { useState } from 'react';
import { toggleTodoAsync } from '../../store/thunk/toggleTodo';
import { deleteTodoAsync } from '../../store/thunk/deleteTodo';
import { editTodoAsync } from '../../store/thunk/editTodo';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);
  const { loadingStates, errors } = useSelector((state: RootState) => state.todo);
  const isTogglingTodo = loadingStates[todo.id];
  const isDeletingTodo = loadingStates[`delete_${todo.id}`];
  const toggleError = errors[todo.id];
  const deleteError = errors[`delete_${todo.id}`];

  const handleToggle = async () => {
    await dispatch(
      toggleTodoAsync({ id: todo.id, completed: todo.completed, text: todo.text }) as any,
    );
  };

  const handleEdit = async () => {
    if (newText !== todo.text) {
      await dispatch(editTodoAsync({ id: todo.id, text: newText }) as any);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteTodoAsync(todo.id) as any);
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
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          className={`flex-1 ${todo.completed ? 'text-gray-400' : 'text-black'}`}
        />
      ) : (
        <Typography.Text className={`flex-1 ${todo.completed ? 'text-gray-400' : 'text-black'}`}>
          {todo.text}
        </Typography.Text>
      )}

      {isEditing ? (
        <Button onClick={handleEdit} type="primary">
          Save
        </Button>
      ) : (
        <Button
          type="default"
          icon={<EditOutlined />}
          onClick={() => setIsEditing(true)}
          className="group hover:bg-blue-500 transition-colors duration-300 opacity-0 group-hover:opacity-100"
          disabled={isTogglingTodo || isDeletingTodo}
        />
      )}

      {!isEditing && (
        <>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            className="opacity-0 group-hover:opacity-100"
            disabled={isTogglingTodo || isDeletingTodo}
          />
        </>
      )}

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
