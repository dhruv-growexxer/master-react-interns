import { useDispatch } from 'react-redux';
import { Checkbox, Button, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { toggleTodo, removeTodo, Todo } from '../../features/todos/todoSlice';

interface TodoItemProps {
  todo: Todo;
}

function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch();

  return (
    <li className="group flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-blue-200 transition-all">
      <Checkbox checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
      <Typography.Text
        delete={todo.completed}
        className={`flex-1 ${todo.completed ? 'text-gray-400' : 'text-black'}`}
      >
        {todo.text}
      </Typography.Text>
      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        onClick={() => dispatch(removeTodo(todo.id))}
        className="opacity-0 group-hover:opacity-100"
      />
    </li>
  );
}

export default TodoItem;
