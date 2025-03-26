import { Form, Input, Button, Alert } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useAddTodoMutation } from '../../features/todos/todoApi';

function TodoInput() {
  const [addTodo, { isLoading, error }] = useAddTodoMutation();
  const [form] = Form.useForm();

  const handleSubmit = async (values: { task: string }) => {
    if (values.task.trim()) {
      await addTodo(values.task);
      form.resetFields();
    }
  };

  return (
    <>
      {error && (
        <Alert message="Failed to add todo" type="error" showIcon className="mb-4" closable />
      )}
      <Form form={form} onFinish={handleSubmit} className="flex gap-2">
        <Form.Item
          name="task"
          className="flex-1 mb-0"
          rules={[{ required: true, message: 'Please input your task!' }]}
        >
          <Input placeholder="Add a new task..." size="large" disabled={isLoading} />
        </Form.Item>
        <Form.Item className="mb-0">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<PlusOutlined />}
            className="bg-blue-500"
            loading={isLoading}
            disabled={isLoading}
          />
        </Form.Item>
      </Form>
    </>
  );
}

export default TodoInput;
