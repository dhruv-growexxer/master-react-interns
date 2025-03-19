import { useParams } from 'react-router-dom';

export const UserProfile = () => {
  const { id } = useParams();
  return <h1>User Profile for ID: {id}</h1>;
};
