import { useDispatch } from 'react-redux';
import { addTodo } from '../../actions/todoActions';
import { Input, Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function TodoInput() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = (values: { task: string }) => {
    if (values.task.trim()) {
      dispatch(addTodo(values.task));
      form.resetFields();
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="flex gap-2">
      <Form.Item
        name="task"
        className="flex-1 mb-0"
        rules={[{ required: true, message: 'Please input your task!' }]}
      >
        <Input placeholder="Add a new task..." size="large" />
      </Form.Item>
      <Form.Item className="mb-0">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          icon={<PlusOutlined />}
          className="bg-blue-500"
        />
      </Form.Item>
    </Form>
  );
}

export default TodoInput;
