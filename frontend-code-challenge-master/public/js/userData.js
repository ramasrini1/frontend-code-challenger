let headers = ["Id", "Email", "First Name", "Last Name", "Status", "Edit", "Delete"];

function deleteUser(e){
  let item = e.target.id;
   ( async () => {
     try{
       const result = await axios.delete(`http://localhost:3000/users/${item}`);
     } catch (error) {
       console.error(error)
     }
   })();
}

const getUsers = async () => {
  try {
    let url = "http://localhost:3000/users";
    let users = await axios.get(url);
    const header = $('#results thead tr');
    const body = $('#results tbody');

    headers.forEach((heading) => {
      header.append(
        $(`<th>${heading}</th>`)
      );
    });

    for (let i = 0; i < users.data.length; i++) {
      var row = document.createElement("tr");
      $(row).append(`<td>${users.data[i].id}</td>`);
      $(row).append(`<td>${users.data[i].email}</td>`);
      $(row).append(`<td>${users.data[i].firstName}</td>`);
      $(row).append(`<td>${users.data[i].lastName}</td>`);
      $(row).append(`<td>${users.data[i].state}</td>`);
      $(row).append(`<td> <a href="./update.html?user=${users.data[i].id}">Edit</a> </td>`);
      $(row).append(`<td><button class="delete" style="color:red; border:none" id=${users.data[i].id}>X</button></td>`);
      body.append(row);
    }
   
  } catch (error) {
    console.error(error)
  }
}

getUsers();

$(document).on('click','.delete', function (e) {
    let item = e.target.id;
     ( async () => {
       try{
         const result = await axios.delete(`http://localhost:3000/users/${item}`);
         history.go(0);
       } catch (error) {
         console.error(error)
       }
     })();
});






