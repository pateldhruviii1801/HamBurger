import React from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form';

function Register(){

	// function check_email(){
	// 	var uemail=document.getElementById('email').value;
	// 	//alert(uemail);
	// 	//window.location.reload();


	// 	Axios.post('http://localhost:1337/api/checkemail',
	// 		{email:uemail}).then((response)=>{
	// 			if(response.data.message)
	// 			{
	// 				console.log(response);
	// 				alert(response.data.message);
	// 				window.location.reload();
					
	// 			}
			
		
	// 		});

	// }


		const {
			register,       
			handleSubmit,
			formState: { errors },
		  } = useForm();
		
			const onSubmit = (data) => {				
					var uname=document.getElementById('nm').value;
					var uemail=document.getElementById('email').value;
					var unumber=document.getElementById('rnumber').value;
					var upsw=document.getElementById('password').value;
					alert(unumber);
					
					Axios.post('http://localhost:1337/api/insert',
						{name:uname,email:uemail,rnumber:unumber,pass:upsw}).then((response)=>{
							if(response.data.message)
							{
								alert(response.data.message);
								window.location = "/register"; 
							}
							else{
			
					alert('Success');
					window.location = "/login";
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
			<li class="breadcrumb-item active" aria-current="page">Register Page</li>
		</ol>
	</div>

        	<div class="login-contect py-5">
		<div class="container py-xl-5 py-3">
			<div class="login-body">
				<div class="login p-4 mx-auto">
					<h5 class="text-center mb-4">Register Now</h5>
				
						<div class="form-group">
							<label>Your Name</label>
							<input type="text" class="form-control" name="name" id="nm"  {...register("name", { required: "Your name is mandatory",})} required/>
							{errors.name && <span className="error" >{errors.name?.message}</span>}
						</div>
						<div class="form-group">
							<label>Email</label>
							<input type="email" class="form-control" name="email" id="email" {...register("email", { required: "Email is mandatory",
          					pattern: {value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
           					message: `The email is not a valid email address.`}})} required />
							{errors.email && (<div style={{ whiteSpace: "pre-line", color: "red" }}>{errors.email.message}</div>)}
						</div>
                        <div class="form-group">
							<label>Mobile Number</label>
							<input type="number" class="form-control" name="number" id="rnumber" {...register("number", { required: "Number is mandatory",
          					pattern: {value: /^[7-9][0-9]{9}$/,
           					message: `Invalid mobile number.`}})} required/>
							{errors.number && (<div style={{ whiteSpace: "pre-line", color: "red" }}>{errors.number.message}</div>)}
						</div>
						<div class="form-group">
							<label class="mb-2">Password</label>
							<input type="password" className="form-control" name="password1" id="password"
        					{...register("password1", { required: "Password is mandatory",
          					pattern: {value: /^(?=.[A-Z])(?=.[!@#$%^&*])(?=.{8,})/,
           					message: `Password must be at least 8 characters long\ninclude an uppercase letter\na special character.`}
        					})}/>
      						{errors.password1 && (<div style={{ whiteSpace: "pre-line", color: "red" }}>{errors.password1.message}</div>)}
						</div>
					
						<button type="submit" class="btn submit mb-4" onClick={handleSubmit(onSubmit)}>Register</button>
						<p class="text-center">
							<a href="#" class="text-da">By clicking Register, I agree to your terms</a>
						</p>
					
				</div>
			</div>
		</div>
	</div>
        </>
    );
}

export default Register;