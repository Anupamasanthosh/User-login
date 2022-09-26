var emailError=document.getElementById('email-error')
var passwordError=document.getElementById('password-error')
var submitError=document.getElementById('submit-error')

function validateEmail()
{
    var email=document.getElementById('contact-email').value
    if(email.length==0)
    {
        emailError.innerHTML='Email is required'
        return false;
    }
    if(!email.match(/^[A-Za-z]\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))
    {
        emailError.innerHTML='Email is invalid'
        return false;
    }
    emailError.innerHTML='<i class="fa-solid fa-check"></i>'
    return true;
}
function validatePassword()
{
    var password=document.getElementById('contact-password').value
    if(password.length==0)
    {
        passwordError.innerHTML='Password is required'
        return false
    }
    if(password.length<=5)
    {
        passwordError.innerHTML='Password should be of atleast 6 characters'
        return false
    }
    passwordError.innerHTML='<i class="fa-solid fa-check"></i>'
    return true
}   
function validatePhone()
{
    var phone=document.getElementById('contact-phone').value
    if(phone.length==0)
    {
        passwordError.innerHTML='Phone is required'
        return false
    }
    if(phone.length<=5)
    {
        passwordError.innerHTML='Phone should be of atleast 6 digits'
        return false
    }
    phoneError.innerHTML='<i class="fa-solid fa-check"></i>'
    return true
}   

function validateForm()
{
    if(!validateEmail() || !validatePassword() || !validatePhone())
    {
        submitError.innerHTML='please fix these errors'
        return false
    }
}