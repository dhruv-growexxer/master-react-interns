import { useFetch } from '../../hooks/useFetch';
import { Spin } from 'antd';
import { API_URL } from '../../utils/constants';

export default function UsersList() {
  const { data: users, loading, error } = useFetch<{ name: string }[]>(API_URL.USERS);

  if (loading) return <Spin />;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.name}>{user.name}</li>
      ))}
    </ul>
  );
}
