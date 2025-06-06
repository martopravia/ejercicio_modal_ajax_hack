let users = [];
const finderInput = document.querySelector("#finder-input");
const tableBody = document.querySelector("#users-table");
const errorMessage = document.querySelector(".errorMessage");

fetch(
  "https://gist.githubusercontent.com/SuecoMarcus/a77af69f0e84c3125a5c0cf43a3ac41b/raw/918cd058b7e2286a36e79643c63a5ebca097d7c8/users.json"
)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error al realizar el fetch");
    }
    return response.json();
  })
  .then((data) => {
    users = data;
    showUsers(users);
  })
  .catch((error) => {
    console.error(error);
  });

function showUsers(list) {
  tableBody.innerHTML = "";
  if (list.length === 0) {
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";
  for (const user of list) {
    const row = `
        <tr>
          <th scope="row">${user.id}</th>
          <td>${user.firstname}</td>
          <td>${user.lastname}</td>
          <td>${user.age}</td>
        </tr>
        `;
    tableBody.insertAdjacentHTML("beforeend", row);
  }
}

finderInput.addEventListener("input", () => {
  const textTyped = finderInput.value.toLowerCase();
  const filtered = [];
  for (const user of users) {
    const name = user.firstname.toLowerCase();
    const lastname = user.lastname.toLowerCase();
    if (name.includes(textTyped) || lastname.includes(textTyped)) {
      filtered.push(user);
    }
  }
  showUsers(filtered);
});
