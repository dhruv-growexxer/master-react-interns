export const API_URL = {
  USERS: 'https://jsonplaceholder.typicode.com/users',
};

export const allUsers = ['john', 'alex', 'george', 'simon', 'james'];

export const shuffle = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
