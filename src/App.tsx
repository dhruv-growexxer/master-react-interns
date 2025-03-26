import './styles.css';
import TodoList from './components/Todo/TodoList';
import { ConfigProvider } from 'antd';

export default function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4361ee',
          borderRadius: 8,
        },
      }}
    >
      <TodoList />
    </ConfigProvider>
  );
}
