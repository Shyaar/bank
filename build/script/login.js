let accNum = document.getElementById('accnum')
let password = document.getElementById('pass')
let submit = document.getElementById('submitBtn')


function clearErr(id){
    document.getElementById(id).style.display = 'none'
}

let users = JSON.parse(localStorage.getItem("users"))

submit.addEventListener("click", ()=>{
    let valid = true
if (accNum.value == "") {
    document.getElementById("accErr").style.display = "block";
    valid = false
  }
if(password.value == ""){
    document.getElementById("passError").style.display = "block"; 
    valid = false
}

if(!valid){
    return
}
else{    
    let user = users.find(user => user.accountNum == accNum.value)
        if(user){
            if(password.value !== user.password){
                document.getElementById('IncorrectPass').style.display = 'block'
                setTimeout(()=>{
                    document.getElementById('IncorrectPass').style.display = 'none'  
                },3000)
            }
            else{
                localStorage.setItem("loggedInUser", JSON.stringify(user))
                window.location.href = "index.html"
            }
        }
}
})
