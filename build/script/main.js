let users = JSON.parse(localStorage.getItem("users"));
console.log(users)

let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser")) || [];

console.log(loggedInUser)

if (loggedInUser == "" ) {
  window.location.href = "login.html";
  console.log("null")
}

let loggedUserIndex = users.indexOf(
  users.find((user) => loggedInUser.accountNum == user.accountNum)
);

let loggedUserName = `${users[loggedUserIndex].firstName}  ${users[loggedUserIndex].lastName}`

let loggedUserAccount = users[loggedUserIndex].accountNum




let history = users[loggedUserIndex].history


let date = new Date()
let time = new Date()
date = `${date.getDate()}-${date.getDay()}-${date.getFullYear()}`


time = `${time.getHours()}: ${time.getMinutes()}`





let greeting = document.getElementById("loggedUser");
greeting.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}! 👋`;

let balanceDisplay = document.getElementById("avBalance");
let balance = users[loggedUserIndex].accountbalance;

updateBalance()

function updateBalance() {
  users = JSON.parse(localStorage.getItem("users"));
  usersBalance = users[loggedUserIndex];

  balanceDisplay.textContent = usersBalance.accountbalance;
}



updateHistory()

function updateHistory(){
  let recent = document.getElementById("recent")
    recent.innerHTML = ""
  
  users[loggedUserIndex].history.forEach(history => {


    let displayName = null
    
    if(history.transaction == "transfer-Out"){
      displayName = history.receiver
      
    }else
    
    if(history.transaction == "transfer-In"){
      displayName = history.sentFrom

    }else
    {
      displayName = history.transaction
    }

    let historyArea = document.createElement('div') 
    historyArea.className ="flex flex-col gap-4 h-full overflow-y-auto"
    historyArea.id ="recent"

    historyArea.innerHTML =`
                <div id="hisCards" class="flex justify-between my-2">
                    <div id="left" class="flex items-center gap-2">
                        <div
                            class="rounded-full overflow-hidden w-[40px] h-[40px] md:w-[45px] md:h-[45px] border border-purple-300">
                            <img src="https://img.freepik.com/free-vector/abstract-logo-flame-shape_1043-44.jpg?ga=GA1.1.1237231128.1741731549&semt=ais_hybrid"
                                alt="">
                        </div>
                        <div id="text">
                            <p class="text-[18px] font-bold md:text-[20px] lg:text-[24px]">${displayName}</p>
                            <p class="text-[10px] md:text-[12px] lg:text-[15px]">${history.date} ${history.time}</p>
                        </div>
                    </div>
                    <div id="value" class="flex flex-col ">
                        <p class="font-bold">${history.amount}</p>
                        <p class="text-[12px] self-center
                        ">${history.trasactionType}</p>
                    </div>
                </div>
            </div>
            ` 
  recent.insertAdjacentElement("beforeend",historyArea)            
  });
} 

let visibility = document.getElementById("visible");

visibility.addEventListener("click", () => {
  if (visibility.id == "visible") {
    balanceDisplay.textContent = "******";
    visibility.id = "invisible";
    return;
  }

  if (visibility.id == "invisible") {
    balanceDisplay.textContent = balance;
    visibility.id = "visible";
    return;
  }
});

let transfer = document.getElementById("transfer");
let deposit = document.getElementById("deposit");
let Withdraw = document.getElementById("Withdraw");
let trasaction = document.getElementById("transaction");
let cancel = document.getElementById("cancel");
let actionBtn = document.getElementById("transferBtn");



deposit.addEventListener("click", () => {

  let tArea = document.getElementById("transaction");

  tArea.innerHTML = `
                <input id="tranferAmm" type="text" class="flex border border-purple-300  p-1 text-[12px] rounded-[10px] py-3 justify-center items-center w-full my-1" placeholder="enter amount">

                <div id="btns" class="flex gap-2">
                                        
                    <button id="deposit" class="flex border border-blue-500 bg-blue-400 text-white  p-1 text-[12px] rounded-[16px] justify-center items-center w-full" onclick="depositCash(tranferAmm.value)">Deposit</button>

                    <button id="cancel" class="flex border border-blue-500 bg-blue-400 text-white  p-1 text-[12px] rounded-[16px] justify-center items-center w-full" onclick="cancelTransaction()">Cancel</button>
                </div>`;
});

Withdraw.addEventListener("click", () => {

  let tArea = document.getElementById("transaction");

  tArea.innerHTML = `
                <input id="tranferAmm" type="text" class="flex border border-purple-300  p-1 text-[12px] rounded-[10px] py-3 justify-center items-center w-full my-1" placeholder="enter amount">

                <div id="btns" class="flex gap-2">
                                        
                    <button id="withdraw" class="flex border border-blue-500 bg-blue-400 text-white  p-1 text-[12px] rounded-[16px] justify-center items-center w-full" onclick="WithdrawCash(tranferAmm.value)">Withdraw</button>

                    <button id="cancel" class="flex border border-blue-500 bg-blue-400 text-white  p-1 text-[12px] rounded-[16px] justify-center items-center w-full" onclick="cancelTransaction()">Cancel</button>
                </div>`;
});

transfer.addEventListener("click", () => {
  
let tArea = document.getElementById("transaction");

tArea.innerHTML = `
                <input id="tranferAcc" type="text" class="flex border border-purple-300  p-1 text-[12px] rounded-[10px] py-3 justify-center items-center w-full my-1" placeholder="enter account number">

                <input id="tranferAmm" type="text" class="flex border border-purple-300  p-1 text-[12px] rounded-[10px] py-3 justify-center items-center w-full my-1" placeholder="enter amount">

                <div id="btns" class="flex gap-2">
                                        
                    <button id="transfer" class="flex border border-blue-500 bg-blue-400 text-white  p-1 text-[12px] rounded-[16px] justify-center items-center w-full" onclick="transferCash(tranferAcc.value,tranferAmm.value)">Transfer</button>

                    <button id="cancel" class="flex border border-blue-500 bg-blue-400 text-white  p-1 text-[12px] rounded-[16px] justify-center items-center w-full" onclick="cancelTransaction()">Cancel</button>
                </div>`;
;
})

function cancelTransaction() {
  document.getElementById("transaction").innerHTML = "";
}

function transferCash(accNum,amount){
    

    let to = users.find((user) =>accNum.trim() == user.accountNum);

  
      let indexOfTo = users.indexOf(
        users.find((user) => user.accountNum == to.accountNum)
      );

  
      if (to) {
        console.log(to);
        if (balance < amount) {
          alert("insufficient Funds!!");
        } else {
          users[loggedUserIndex].accountbalance -= amount;
          users[indexOfTo].accountbalance += Number(amount);  
          localStorage.setItem("users", JSON.stringify(users));
  
          users = JSON.parse(localStorage.getItem("users"));
          console.log(users);
          updateBalance();
        }
      };

     let senderRecent = {
        transaction: "transfer-Out",
        sender: `${users[loggedUserIndex].firstName} ${users[loggedUserIndex].lastName}`,
        senderAccount: loggedUserAccount,
        amount,
        receiver:`${to.firstName} ${to.lastName}`,
        date,
        time,
        trasactionType:"debit",
      }

      let receiverRecent = {
        transaction: "transfer-In",
        sentFrom: loggedUserName,
        senderAccount: loggedUserAccount,
        amount,
        receiver:to,
        date,
        time,
        trasactionType:"credit",
      }

      users[loggedUserIndex].history.push(senderRecent)
      users[indexOfTo].history.push(receiverRecent)
      localStorage.setItem("users",JSON.stringify(users))
      updateBalance()
      updateHistory()
      
}


function depositCash(amount) {

  users[loggedUserIndex].accountbalance += Number(amount);

  let recent = {
    transaction: "Deposit",
    amount,
    date,
    time,
    trasactionType:"Credit",
  }

  users[loggedUserIndex].history.push(recent)
  localStorage.setItem("users",JSON.stringify(users))
  updateBalance()
  updateHistory()
}

function WithdrawCash(amount) {

  users[loggedUserIndex].accountbalance -= Number(amount);

  let recent = {
    transaction: "Withdrawal",
    amount,
    date,
    time,
    trasactionType:"debit",
  }

  users[loggedUserIndex].history.push(recent)
  localStorage.setItem("users",JSON.stringify(users))
  updateBalance()
  updateHistory()
}

