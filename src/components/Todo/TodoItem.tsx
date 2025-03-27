import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Button, Typography, Spin, Alert, Input } from 'antd';
import { DeleteOutlined, LoadingOutlined, EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { toggleTodoAsync, deleteTodoAsync, updateTodoAsync, clearError, Todo } from '../../features/todos/todoSlice';
import { RootState } from '../../app/store';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();
  const { loadingStates, errors } = useSelector((state: RootState) => state.todo);

  const isTogglingTodo = loadingStates[todo.id];
  const isDeletingTodo = loadingStates[`delete_${todo.id}`];
  const isUpdatingTodo = loadingStates[`update_${todo.id}`];
  const toggleError = errors[todo.id];
  const deleteError = errors[`delete_${todo.id}`];
  const updateError = errors[`update_${todo.id}`];

  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const handleToggle = async () => {
    await dispatch(toggleTodoAsync({ id: todo.id, completed: todo.completed, text: todo.text }) as any);
  };

  const handleDelete = async () => {
    await dispatch(deleteTodoAsync(todo.id) as any);
  };

  const handleUpdate = async () => {
    if (newText.trim() && newText !== todo.text) {
      await dispatch(updateTodoAsync({ id: todo.id, text: newText, completed: todo.completed }) as any);
    }
    setIsEditing(false);
  };

  return (
    <li className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all relative">
      {(isTogglingTodo || isDeletingTodo || isUpdatingTodo) && (
        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-lg">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </div>
      )}

      <Checkbox
        checked={todo.completed}
        onChange={handleToggle}
        disabled={isTogglingTodo || isDeletingTodo || isUpdatingTodo}
      />

      {isEditing ? (
        <Input
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onPressEnter={handleUpdate}
          onBlur={handleUpdate}
          disabled={isUpdatingTodo}
          size="small"
        />
      ) : (
        <Typography.Text
          className={`flex-1 cursor-pointer ${todo.completed ? 'text-gray-400 line-through' : 'text-black'}`}
          onClick={() => setIsEditing(true)}
        >
          {todo.text}
        </Typography.Text>
      )}

      {isEditing ? (
        <div className="flex gap-1">
          <Button
            icon={<CheckOutlined />}
            size="small"
            type="primary"
            onClick={handleUpdate}
            loading={isUpdatingTodo}
          />
          <Button
            icon={<CloseOutlined />}
            size="small"
            onClick={() => {
              setIsEditing(false);
              setNewText(todo.text);
            }}
          />
        </div>
      ) : (
        <div className="flex gap-1">
          <Button
            icon={<EditOutlined />}
            size="small"
            onClick={() => setIsEditing(true)}
            disabled={isTogglingTodo || isDeletingTodo}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            size="small"
            onClick={handleDelete}
            loading={isDeletingTodo}
          />
        </div>
      )}

      {/* Errors */}
      <div className="absolute bottom-[-20px] left-0 w-full">
        {toggleError && (
          <Alert
            message={toggleError}
            type="error"
            closable
            onClose={() => dispatch(clearError(todo.id))}
          />
        )}
        {deleteError && (
          <Alert
            message={deleteError}
            type="error"
            closable
            onClose={() => dispatch(clearError(`delete_${todo.id}`))}
          />
        )}
        {updateError && (
          <Alert
            message={updateError}
            type="error"
            closable
            onClose={() => dispatch(clearError(`update_${todo.id}`))}
          />
        )}
      </div>
    </li>
  );
}

export default TodoItem;
