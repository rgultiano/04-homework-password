// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  // if -1 is returned the user cancelled out of password generation
  if(password !== -1)
    passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){
  // init criteria variables

  // variable for selected criteria length
  var critLength = 8;

  // array of acceptable Char Options
  //     name: Charset Name to be displayed in the prompt
  //     charset: characters to be included in random generation if charset is selcted
  var critCharOptions = [
    {
      name: "lowercase",
      charset: "abcdefghijklmnopqrstuvwxyz"
    }, 
    {
      name: "uppercase",
      charset: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }, 
    {
      name: "numeric",
      charset: "0123456789"
    }, 
    {
      name: "special",
      charset: "~!@#$%^&*()_+-?.="
    }, 
  ]

  // prompt for criteria
  var validInput = false;

  // prompt characters
  while(!validInput){
    var critLength = window.prompt("Enter the number of characters for the password (min: 8, max 128):");
    
    // if the user clicks cancel, return -1 to indicate no password was generated
    if(!critLength)
    {
      return -1;
    }

    // validate length is between 8-128 (inclusive)
    if((!isNaN(critLength) && critLength >= 8 && critLength <= 128)){
      validInput = true;
    }else{
      if(!confirm("Invalid input. Please select a character value between 8 and 128!"))
      {
        // if the user clicks cancel, return -1 to indicate no password was generated
        return -1;
      }
    }
  }

  var charset="";
  var charSetSelected = false;

  while(!charSetSelected){
    // prompt each of charOption and add it to the charset if selected
    critCharOptions.forEach(function(option){
      var validInput = false;
      while (!validInput){
        var selection = window.prompt("Include " + option.name + " characters? (Y/N)");
        // check for a valid input
        switch(selection.toUpperCase()){
          // if 'Y' selected add the option's charset
          case 'Y':
            charset += option.charset;
            validInput = true;
            break;
          // if 'N' selected mark as valid input
          case 'N':
            validInput = true;
            break;

          // otherwise invalid input, alert and loop
          default:
            if(!confirm("Invalid input. Please input either 'Y' or 'N'.")){
              // if the user clicks cancel, return -1 to indicate no password was generated
              return -1;
            }
            break;
        }
      }
    });

    // if an option was selected break, otherwise alert and loop
    if(charset !== ""){
      charSetSelected = true;
    } else {
      if(!confirm("Please select at least one chracter type to include.")){
        // if the user clicks cancel, return -1 to indicate no password was generated
        return -1;
      }
    } 
  }

  //generate password
  var retPass = "";
  //iterate through to generate each charcter for the password
  for(i = 0; i < critLength; i++){
    // generate the random character from the selected charset
    retPass += charset.charAt(Math.floor(Math.random()*charset.length));
  }
  
  //return the generated password
  return retPass;

}