//Global Virables:
//login inputs:
var loginDta;
var login;
var loginError;
//signUp inputs:
var signupDta;
var register;
var signupError;
var userName;
var fullName = '';

var allUser;
if(localStorage.getItem('saveAllUserArray') != null)
    allUser = JSON.parse(localStorage.getItem('saveAllUserArray'));
    
else
    allUser =[];

console.log(allUser);

//Regual expression:
var regName  = /^[A-Za-z]{2,}/;
var regEmail = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
var regPass  = /[A-Z]{2,}[a-z]{2,}[0-9]{4,}/m;

//Actions When logIn or signUp
document.addEventListener('click',function(e){
    //console.log(e.target.id)
    if(e.target.id == 'btn-login'){
        logIn();
    }
    else if(e.target.id == 'btn-signUp'){
        signUp();
    }
    else if(localStorage.getItem('SaveAuthUser')=='true'){
        userName = document.querySelector('.fullName');
        userName.innerHTML = 'Hello '+fullName;
    }

});

//Actions when signup
function signUp(){
    signupDta   = document.querySelectorAll('.inputSignUp input');
    register    = document.getElementById('.btn-signUp');
    signupError = document.querySelector('.alert-signUp');
    var logicName = false;
    var LogicEmail= false;
    var LogicPass = false;
    var sinupError= '';
    if(regName.test(signupDta[0].value)){
        console.log('Name: '+signupDta[0].value);
        logicName = true;
    }else{
        console.log('Error: You should entry real name ... ');
        if(sinupError != ''){
            sinupError += ' also real name, '
        }else{
            sinupError += 'You should entry real name '
        }
        signupDta[0].value = '';
    }

    if(regEmail.test(signupDta[1].value)){
        console.log('Email: '+signupDta[1].value);
        LogicEmail = true;
    }else{
        console.log('Error: You should real Email ... ');
        if(sinupError != ''){
            sinupError += 'also real Email, '
        }else{
            sinupError += 'You should entry real Email '
        }
        signupDta[1].value = '';
    }

    if(regPass.test(signupDta[2].value)){
        console.log('Pass: '+signupDta[2].value);
        LogicPass = true;
    }else{
        console.log('Error: You should entry strong password (frist two charcter uppercase or more second frist two charcter lowercase or more then minimum 4 digits) ... ');
        if(sinupError != ''){
            sinupError += `and strong password, 
            (frist two charcter uppercase or more second frist two charcter lowercase or more then minimum 4 digits)`
        }else{
            sinupError +=`You should entry strong password
            (frist two charcter uppercase or more second frist two charcter lowercase or more then minimum 4 digits)`
        }
        signupDta[2].value = '';
    }

    if(logicName && LogicEmail && LogicPass){
        allUser.push(setSignUpData());
        console.log(allUser);
        localStorage.setItem('saveAllUserArray',JSON.stringify(allUser));
        document.location.href = "./../index.html";
    }
    else{
        signupError.classList.add('alert');
        signupError.innerHTML = sinupError;
    }

};
//Alerts SignUp
function setSignUpData(){
    signUpOdj = {
        fullName: signupDta[0].value,
        email   : signupDta[1].value,
        password: signupDta[2].value,
    }
    return signUpOdj;
};

//Actions when login
function logIn(){
    loginDta    = document.querySelectorAll('.inputLogIn input');
    login       = document.getElementById('.btn-login');
    loginError  = document.querySelector('.alert-login');
    var logicEmail = false;
    var index;

    //console.log(allUser[0].email)
    

    if(regEmail.test(loginDta[0].value)){
        for(var i=0;i<allUser.length;i++){
            if(allUser[i].email.toLowerCase() == loginDta[0].value.toLowerCase()){
                logicEmail = true;
                index = i;
            }
        }
        //console.log(logicEmail);
        if(logicEmail==false){
            console.log('Error: This email not registered ....');
            console.log(loginError);
            loginError.classList.add('alert');
            loginError.innerHTML = 'Error: This email not registered.';
        }
        console.log(allUser[index].password);
        if(loginDta[1].value == allUser[index].password){
            //console.log('o.k');
            fullName = allUser[index].fullName;
            document.location.href = "./contentSite.html";
            localStorage.setItem('SaveAuthUser','true');
        }
        // else{
        //     console.log('Error: Your password is wrong ....');
        //     loginError.classList.add('alert');
        //     loginError.innerHTML = 'Error: Your password is wrong.';
        //     loginDta[1].value = '';
        // }
    }else{
       
        console.log('Error: the pattern email is wrong ....');
        loginError.classList.add('alert');
        loginError.innerHTML = 'Error: This email is wrong, Please entry the correct email.';
        // console.log(loginError.value);
        // console.log(loginError.innerHTML);
    }

}