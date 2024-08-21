import React from "react";
import Axios from "axios";

function Login(){
    
    var submit_data=()=>{
        var email=document.getElementById('email').value;
        var psd=document.getElementById('psw').value;
        
		Axios.post('http://localhost:1337/newapi/data',
			{lemail:email,lpass:psd}).then((response)=>{
				if(response.data.message)
				{
					alert(response.data.message);
					alert('unsuccessful');
					window.location = "/login" 
				}
				else{
				
                    let data={uid:response.data[0].customer_id,name:response.data[0].customer_name,email:response.data[0].customer_email,mob:response.data[0].customer_number}
					localStorage.setItem('mydata',JSON.stringify(data));
		
					window.location = "/";
					alert('Success');


				}
		
			});
    }
return(
    
<>

<div class="main-banner-2">

	</div>

	<div class="breadcrumb-agile bg-light py-2">
		<ol class="breadcrumb bg-light m-0">
			<li class="breadcrumb-item">
				<a href="/">Home</a>
			</li>
			<li class="breadcrumb-item active" aria-current="page">Login Page</li>
		</ol>
	</div>

<div class="login-contect py-5">
		<div class="container py-xl-5 py-3">
			<div class="login-body">
				<div class="login p-4 mx-auto">
					<h5 class="text-center mb-4">Login Now</h5>
					
						<div class="form-group">
							<label>Your Email</label>
							<input type="email" class="form-control"  id="email" placeholder="" required/>
						</div>
						<div class="form-group">
							<label class="mb-2">Password</label>
							<input type="password" class="form-control"  id="psw" placeholder="" required/>
						</div>
                        <input type="submit" value="Login" class="btn submit mb-4" onClick={submit_data}/>
						
                        
						<p class="forgot-w3ls text-center mb-3">
							<a class="text-da">Forgot your password?</a>
						</p>
						<p class="account-w3ls text-center text-da">
							Don't have an account?
							<a href="/register">Create one now</a>
						</p>
					
				</div>
			</div>
		</div>
	</div>
</>
);
}
export default Login;