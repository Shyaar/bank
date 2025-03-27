let users = JSON.parse(localStorage.getItem("users"))  || []
console.log(users)


let submit = document.getElementById('submitBtn')



function genAccNum (){
    let num = Math.floor(Math.random()*100000000000)
    let check = users.find(user => user.accountNum == num)

    if(!check){
        return num
    }else{
        genAccNum()
    }
}

function clearErr(id){
    document.getElementById(id).style.display = "none"
}



submit.addEventListener("click",()=>{

    let firstName = document.getElementById('fName').value
    let lastName = document.getElementById('lName').value
    let email = document.getElementById('email').value
    let dateOfBirth = document.getElementById('dob').value
    let referral = document.getElementById('reff').value
    let password = document.getElementById('pass').value
    let conPassword = document.getElementById('conPass').value

    let valid = true

    if(firstName == ""){
        document.getElementById('fnError').style.display = 'block'
        valid=false
    }
    if(lastName == ""){
        document.getElementById('lnError').style.display = 'block'
        valid=false
    }
    if(dateOfBirth == ""){
        document.getElementById('dobError').style.display = 'block'
        valid=false
    }
    if(email == ""){
        document.getElementById('eError').style.display = 'block'
        valid=false
    }
    if(password == ""){
        document.getElementById('passError').style.display = 'block'
        valid=false
    }
    if(conPassword == ""){
        document.getElementById('conPassError').style.display = 'block'
        valid=false
    }
    if(password != conPassword){
        document.getElementById('passCheck').style.display = 'block' 
        setTimeout(()=>{
            document.getElementById('passCheck').style.display = 'none' 
        },3000)
        valid=false
    }
if (!valid){
    return
}

    else{
       const user = users.find(user => user.email == email)
        console.log(users)

    if(!user){
        let accountNum = genAccNum()
        let userData={
            firstName,
            lastName,
            email,
            dateOfBirth,
            password,
            accountNum,
            accountbalance: 0,
            reffcode: `OC12-${accountNum}`,
            history:[]
        }
        if(referral){
            let refree = users.find(user => user.reffcode == referral)
            console.log(refree)
            if(refree){
                let refreeindex = users.indexOf(refree) 
                users[refreeindex].accountbalance += 100
                console.log(refree)
                console.log(users[refreeindex].accountbalance)
                console.log(refreeindex)

            }
        }

        users.push(userData)
        console.log(users)
        localStorage.setItem("users", JSON.stringify(users))
        
        alert(`Account successfully created, your account Number is ${accountNum}. Continue to login`)

        window.location.href = "login.html"
        return
        }
    else {alert(`user Found with email ${email}. Please Login instead`)}
    }
}
)

