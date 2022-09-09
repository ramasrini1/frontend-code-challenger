document.querySelector('#updateBtn').addEventListener("click", submitFormData );

let userInfo;
let baseURL = "http://localhost:3000/users/";

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
let userId = getParameterByName('user');

async function getUser(){
  try {
    let url = `${baseURL}${userId}`;
    console.log("url is " + url)
    return await axios.get(url);
  }  catch (error) {
    console.error(error)
  }
}

async function displayForm(){
  userInfo = await getUser();
  $("#email").val(userInfo.data.email);
  $("#firstName").val(userInfo.data.firstName);
  $("#lastName").val(userInfo.data.lastName);
  $("#state").val(userInfo.data.state);
  
}

displayForm();

function submitFormData(e){
  e.preventDefault();
 
  let email = $("#email").val();
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let state = $("#state").val();
  let updatedRecord = { id:userId, email:email, firstName: firstName, lastName: lastName, state:state };
  let returnVal;
  ( async () => {
    try{
      returnVal = await axios.put(`http://localhost:3000/users/${userId}`, 
      updatedRecord
      );
    } catch (error) {
      console.error(error)
    }
    if ( returnVal.status === 200){
      $('#statusCode').text("Updated User Successfully");
      $("#statusCode").addClass("success")
      
     
    } else if ( returnVal.status === 404){
      $('#statusCode').text("User Not found");
      $('#statusCode').css('color','red');
      
    }
  })();
  
}





