import { useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import TodoInput from './TodoInput';
import { Card, Typography, Badge } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';
import { TodoState } from '../../reducers/todoReducer';

const { Title } = Typography;

function TodoList() {
  const todos = useSelector((state: { todo: TodoState }) => state.todo.todos);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <UnorderedListOutlined className="text-blue-500 text-xl" />
            <Title level={4} className="!m-0">
              My Tasks
            </Title>
          </div>
          {todos.length > 0 && <Badge count={todos.length} color="blue" />}
        </div>

        <TodoInput />

        {todos.length > 0 ? (
          <ul className="mt-6 space-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : (
          <Card className="mt-6 text-center bg-gray-50">
            <Typography.Text type="secondary">
              Your list is empty. Add your first task above.
            </Typography.Text>
          </Card>
        )}
      </Card>
    </div>
  );
}

export default TodoList;
