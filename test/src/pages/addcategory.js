import Axios from "axios";
import React from "react";

function Addcategory(){

  function submit(){
    var id_cname = document.getElementById('cname').value;

    Axios.post('http://localhost:1337/api/category',
        {cat_name:id_cname}).then((response)=>{
            if(response.data.message){
                alert(response.data.message);
                window.location='/addcategory'
            }
            else{
                console.log(response);
                window.location='/addmenu'
            }
        });
  }

    return (
<>
<div class="main-banner-2">

	</div>

	<div class="breadcrumb-agile bg-light py-2">
		<ol class="breadcrumb bg-light m-0">
			<li class="breadcrumb-item">
				<a href="/">Home</a>
			</li>
			<li class="breadcrumb-item active" aria-current="page">Add Category</li>
		</ol>
	</div>
    <div class="login-contect py-5">
		<div class="container py-xl-5 py-3">
			<div class="login-body">
				<div class="login p-4 mx-auto">
					<h5 class="text-center mb-4">Add Category</h5>
					<form>
						<div class="form-group">
							<label>Enter Category Name</label>
							<input type="text" class="form-control"  id="cname" placeholder="" required/>
						</div>

                        <input type="submit" value="Submit" onClick={submit} class="btn submit mb-4"/>
                    </form>

				</div>
			</div>
		</div>
	</div>
</>
    );
}

export default Addcategory;