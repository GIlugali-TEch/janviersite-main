// import { addRole } from './dashboard.js'

+ function($) {
    $('.palceholder').click(function() {
      $(this).siblings('input').focus();
    });
  
    $('.form-control').focus(function() {
      $(this).parent().addClass("focused");
    });
  
    $('.form-control').blur(function() {
      var $this = $(this);
      if ($this.val().length == 0)
        $(this).parent().removeClass("focused");
    });
    $('.form-control').blur();
  
    // validetion
    $.validator.setDefaults({
      errorElement: 'span',
      errorClass: 'validate-tooltip'
    });
  
   
      
  
  }(jQuery);

  const loginForm = document.querySelector('[name="loginForm"]')
  //login frontend
  // function login (e){
  //   e.preventDefault()

    
  //   const email = document.querySelector('input[name="email"]').value
  //   const password = document.querySelector('input[name="password"]').value
  //   // const loginButton = document.querySelector()


  //   fetch('http://localhost:8080/login', {
  //     method:'POST',
  //     body: JSON.stringify({
  //       email,
  //       password
  //     }),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //   .then((res)=> res.json())
  //   .then((data)=>{
  //     if(data.success === true){
  //       console.log(data)
  //       localStorage.setItem('Albido', data.foundUser._id)
  //       window.location.href = 'http://localhost:8080/dashboard'

  //     }else{
  //       console.log("error")
  //     }
  //   })
  // }

  // loginForm.addEventListener("submit",login)