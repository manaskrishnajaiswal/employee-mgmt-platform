const BASE_URL = "http://localhost:3000";
console.log(URL);
export const getUsersFromDB = async () => {
  const response = await fetch(`${BASE_URL}/api/users`);
  const json = await response.json();
  return json;
};
