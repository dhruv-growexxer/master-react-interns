import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../features/todos/todoSlice';
import { addTodoAsync } from '../../features/todos/todoThunks';
import { Input, Button, Form, Alert } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { RootState } from '../../app/store';

function TodoInput() {
  const dispatch = useDispatch();
  const { loadingStates, errors } = useSelector((state: RootState) => state.todo);
  const isAddingTodo = loadingStates['add'];
  const addError = errors['add'];
  const [form] = Form.useForm();

  const handleSubmit = async (values: { task: string }) => {
    if (values.task.trim()) {
      await dispatch(addTodoAsync(values.task) as any);
      form.resetFields();
    }
  };

  return (
    <>
      {addError && (
        <Alert
          message={addError}
          type="error"
          showIcon
          className="mb-4"
          closable
          onClose={() => dispatch(clearError('add'))}
        />
      )}
      <Form form={form} onFinish={handleSubmit} className="flex gap-2">
        <Form.Item
          name="task"
          className="flex-1 mb-0"
          rules={[{ required: true, message: 'Please input your task!' }]}
        >
          <Input placeholder="Add a new task..." size="large" disabled={isAddingTodo} />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={isAddingTodo ? <LoadingOutlined /> : <PlusOutlined />}
            className="bg-blue-500"
            loading={isAddingTodo}
            disabled={isAddingTodo}
          />
        </Form.Item>
      </Form>
    </>
  );
}

export default TodoInput;
