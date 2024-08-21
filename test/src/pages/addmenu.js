import React,{useEffect,useState} from "react";
import {useForm} from 'react-hook-form';
import Axios from "axios";

function Addmenu() {

	const [list,setlist] = useState([]);
	const [filename,setfilename]= useState("");

    const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	useEffect(()=>{

		Axios.get('http://localhost:1337/api/cat_data').then((response)=>{
			setlist(response.data);
		});
	},[]);
 
    const onSubmit = (data) => {
		var id_cid=document.getElementById('cname').value;
       // var id_image=document.getElementById('bimage').value;
        var id_name=document.getElementById('bname').value;
		var id_price=document.getElementById('bprice').value;
		//alert(id_image);
        			
			   let formData = new FormData();
			   formData.append("filename",filename);
				formData.append("cat_id",id_cid);
				formData.append("bname",id_name);
				formData.append("bprice",id_price);
		
		Axios.post('http://localhost:1337/api/insertburger',formData, {
            headers: {"Content-Type":"multipart/form-data"} }).then((response)=>{
				if(response.data.message)
				{
					alert(response.data.message);
					window.location = "/addmenu";
				}
				else{
					//	console.log(response);
						// alert('Success');
						window.location = "/";
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
			<li class="breadcrumb-item active" aria-current="page">Add Menu</li>
		</ol>
	</div>
    <div class="login-contect py-5">
		<div class="container py-xl-5 py-3">
			<div class="login-body">
				<div class="login p-4 mx-auto">
					<h5 class="text-center mb-4">Add Menu</h5>
					<form>

					   <div class="form-group">
							<label>Enter Category Name</label>
							<select   id="cname" required>
								<option value="none"></option>
							{list.map((val)=>{
							return(
								<option value={val.cat_id}>{val.cat_name}</option>
							)
						})} 
						
							</select>
						</div>
						
						<div className="form-group">
                  <label className="mb-2">Burger Image</label>

				  <input type="file" className="form-control" id="bimage" name="image1" onChange={(e) => setfilename(e.target.files[0])} />
                  {/* <input type="file" className="form-control" id="bimage" name="image1" onChange={(e) => setfilename(e.target.files[0])} {...register("image1", {
                      required: "Image is required",
                      validate: {
                        fileFormat: (value) =>
                          ["image/jpeg", "image/png", "image/jpg"].includes(
                            value[0]?.type
                          ) || "Only .jpg, .jpeg, and .png formats are allowed",
                        fileSize: (value) =>
                          value[0]?.size <= 5 * 1024 * 1024 ||
                          "File size should not exceed 5MB",
                      },
                    })}/>
                  {errors.image1 && (
                    <p className="text-danger">{errors.image1.message}</p>
                  )} */}
                </div>
						<div class="form-group">
							<label>Burger Name</label>
							<input type="text" class="form-control"  id="bname" placeholder="" required/>
						</div>
						<div class="form-group">
							<label class="mb-2">Burger Price</label>
							<input type="number" class="form-control"  id="bprice" placeholder="" required/>
						</div>
                        <input type="submit" value="ADD" class="btn submit mb-4" onClick={handleSubmit(onSubmit)}/>
						
                        </form>
						{/* <p class="forgot-w3ls text-center mb-3">
							<a class="text-da">Forgot your password?</a>
						</p>
						<p class="account-w3ls text-center text-da">
							Don't have an account?
							<a href="/register">Create one now</a>
						</p>
					 */}
				</div>
			</div>
		</div>
	</div>
</>
  );
}

export default Addmenu;