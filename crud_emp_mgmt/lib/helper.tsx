const BASE_URL = "http://localhost:3000";

export const getUsersFromDB = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  const json = await response.json();
  return json;
};
