document.querySelector('#signupBtn').addEventListener("click", submitFormData );

function submitFormData(e){
  e.preventDefault();
 
  let email = $("#email").val();
  let firstName = $("#firstName").val();
  let lastName = $("#lastName").val();
  let state = $("#state").val();
  let newRecord = { email:email, firstName: firstName, lastName: lastName, state:state };

  let returnVal;
  ( async () => {
    try{
      returnVal = await axios.post('http://localhost:3000/users', newRecord);
    } catch (error) {
      console.error(error)
    }
    if ( returnVal.status === 200){
      $('#statusCode').text("Added User Successfully");
      $("#statusCode").addClass("success");
    } else if ( returnVal.status === 404){
      $('#statusCode').text("User Not found");
      $('#statusCode').addClass("failure");
      
    }
  })();
  
}



