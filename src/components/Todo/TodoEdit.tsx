import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Input, Form, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { updateTodoAsync, Todo } from '../../features/todos/todoSlice';

interface EditTodoModalProps {
  todo: Todo;
}

function EditTodoModal({ todo }: EditTodoModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const showModal = () => {
    form.setFieldsValue({ text: todo.text });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = async (values: { text: string }) => {
    await dispatch(updateTodoAsync({ id: todo.id, text: values.text }) as any);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="text" icon={<EditOutlined />} onClick={showModal} />
      <Modal title="Edit Task" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Form form={form} onFinish={handleUpdate}>
          <Form.Item name="text" rules={[{ required: true, message: 'Task cannot be empty!' }]}>
            <Input placeholder="Edit your task..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default EditTodoModal;
