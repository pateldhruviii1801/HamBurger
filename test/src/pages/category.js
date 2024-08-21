import React,{useEffect,useState} from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Category(){

    const [list,setlist] = useState([]);

	useEffect(()=>{

		Axios.get('http://localhost:1337/api/usercategory').then((response)=>{
			setlist(response.data);
		});
	},[]);

    return (
        <>
        <div class="main-banner-2"></div>
        	<div class="team py-5" id="chefs">
		<div class="container-fluid py-xl-5 py-lg-3">
			<div class="title-section text-center mb-md-5 mb-4">
				<h3 class="w3ls-title mb-3">Our <span>Chefs</span></h3>
				<p class="titile-para-text mx-auto">Inventore veritatis et quasi architecto beatae vitae dicta sunt
					explicabo.Nemo
					enim totam rem aperiam.</p>
			</div>
			<div class="row team-bottom pt-4">
                
            {list.map((val)=>{
			return(
				<div class="col-lg-3 col-6 team-grid">
					<a href="#team"><img src="assests/images/t1.png" class="img-fluid" alt=""/></a>
					<div class="caption">
						<div class="team-text">
						<Link to='/menu' state={{ccid:val.cat_id}}>{val.cat_name}</Link>
						</div>
					</div>
				</div>
                )
            })} 
			</div>
		</div>
	        </div>
        </>
    );
}

export default Category;