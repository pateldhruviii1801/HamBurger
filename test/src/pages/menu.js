import React,{useEffect,useState} from "react";
import Axios from "axios";
import {useLocation} from "react-router-dom";

function Menu() {

	const[list,setlist] = useState([]);
	const location = useLocation();
	const c_id = location.state.ccid;

		let user=JSON.parse(localStorage.getItem("mydata"));


useEffect(()=>{
		if(localStorage.getItem("mydata")==null  )
		{		
				Axios.get('http://localhost:1337/api/menu_data',
					{params:{ cid:c_id}}).then((response)=>{
						console.log(response.data);
					setlist(response.data);
				}); 
		}
		else{

			var uuid = user.uid;
//alert(uuid);
			Axios.post('http://localhost:1337/api/shortedburgers',
			{userid:uuid, ciid:c_id}).then((response)=>{
				// console.log(response.data);
				// alert('sucess');
				setlist(response.data);
			});

		}
},[]);

    function data_check(bid){
		let user=JSON.parse(localStorage.getItem("mydata"));

		if(localStorage.getItem("mydata")==null  )
		{
	
	
	     alert("please first login");
		 window.location='/login';
			
		}
		else{

			var uid=user.uid;
			alert(uid);

			Axios.post('http://localhost:1337/api/addingcart',
                {userid:uid,burgerid:bid}).then((response)=>{
					if(response.data.message)
					{
						console.log(response.data);
						alert(response.data.message);
						window.location = '/cart';
					}
				});

		}


	}

	function checkimage(val) {
		if (val.b_image){
			return(<img src={"http://localhost:1337/public/"+val.b_image} alt=" " class="img-fluid" />);
		}
		else{
			return(<img src="/assests/images/blog1.png" alt=" " class="img-fluid" />);
		}
	}

    return(
        <>
        <div class="main-banner-2">
        
            </div>
        
			<div class="breadcrumb-agile bg-light py-2">
		<ol class="breadcrumb bg-light m-0">
			<li class="breadcrumb-item">
				<a href="index.html">Home</a>
			</li>
			<li class="breadcrumb-item active" aria-current="page">Menu</li>
		</ol>
	</div>

            <section class="portfolio py-5">
		<div class="container py-xl-5 py-lg-3">
		<div class="title-section text-center mb-md-5 mb-4">
				<h3 class="w3ls-title mb-3">Our <span>Menu</span></h3>
	<p class="titile-para-text mx-auto">Inventore veritatis et quasi architecto beatae vitae dicta suntexplicabo.Nemoenim totam rem aperiam.</p>
			</div>
			<div class="row mt-4">	
	
		{list.map((val)=>{
return(

			  <div class="col-md-4">
					<div class="gallery-demo">
						<a>
							{checkimage(val)}
							<h4 class="p-mask">{val.b_name}-<span>Rs.{val.b_price}</span>
							<button type="submit" class="btn submit mb-4" onClick={()=>data_check(val.burger_id)}>CART</button>
							</h4>
						
						</a>
					</div>
				</div>
				

)
			  
			 }
			)
		} 
		</div>
		</div>
	</section>


	<div id="gal1" class="pop-overlay">
		<div class="popup">
			<img class="img-fluid" src="/assests/images/blog1.jpg" alt=""/>
			<h4 class="p-mask">French Burger - - <span>$22</span></h4>
			<a href="login.html" class="button-w3ls active mt-3">Order Now
				<span class="fa fa-caret-right ml-1" aria-hidden="true"></span>
			</a>
			<a class="close" href="#gallery">×</a>
		</div>
	</div>

	<div id="gal2" class="pop-overlay">
		<div class="popup">
			<img class="img-fluid" src="/assests/images/blog2.jpg" alt=""/>
			<h4 class="p-mask">Veg Muffin - <span>$16</span></h4>
			<a href="login.html" class="button-w3ls active mt-3">Order Now
				<span class="fa fa-caret-right ml-1" aria-hidden="true"></span>
			</a>
			<a class="close" href="#gallery">×</a>
		</div>
	</div>

	<div id="gal3" class="pop-overlay">
		<div class="popup">
			<img class="img-fluid" src="/assests/images/blog3.jpg" alt=""/>
			<h4 class="p-mask">Brioche - <span>$18</span></h4>
			<a href="login.html" class="button-w3ls active mt-3">Order Now
				<span class="fa fa-caret-right ml-1" aria-hidden="true"></span>
			</a>
			<a class="close" href="#gallery">×</a>
		</div>
	</div>

	<div id="gal4" class="pop-overlay">
		<div class="popup">
			<img class="img-fluid" src="/assests/images/g1.jpg" alt=""/>
			<h4 class="p-mask">Cheese Burger - <span>$20</span></h4>
			<a href="login.html" class="button-w3ls active mt-3">Order Now
				<span class="fa fa-caret-right ml-1" aria-hidden="true"></span>
			</a>
			<a class="close" href="#gallery">×</a>
		</div>
	</div>

	<div id="gal5" class="pop-overlay">
		<div class="popup">
			<img class="img-fluid" src="/assests/images/g2.jpg" alt=""/>
			<h4 class="p-mask">Chicken Burger - <span>$22</span></h4>
			<a href="login.html" class="button-w3ls active mt-3">Order Now
				<span class="fa fa-caret-right ml-1" aria-hidden="true"></span>
			</a>
			<a class="close" href="#gallery">×</a>
		</div>
	</div>

	<div id="gal6" class="pop-overlay">
		<div class="popup">
			<img class="img-fluid" src="/assests/images/g3.jpg" alt=""/>
			<h4 class="p-mask">Veg Burger - <span>$16</span></h4>
			<a href="login.html" class="button-w3ls active mt-3">Order Now
				<span class="fa fa-caret-right ml-1" aria-hidden="true"></span>
			</a>
			<a class="close" href="#gallery">×</a>
		</div>
	</div>
</>
);

}

export default Menu;