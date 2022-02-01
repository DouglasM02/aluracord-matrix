export default function handleApiGit(user = '') {
  let data = null;
  if (user) {
    data = fetch(`https://api.github.com/users/${user}`)
      .then((response) => response.json())
      .then((response) => {
        data = response;
        return data;
      })
      .catch((error) => console.log(error));
  }
  // console.log('usuario na funcao ', user);
  // console.log('dentro da funcao', data);
  return data;
}
