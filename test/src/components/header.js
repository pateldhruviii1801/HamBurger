import React  from "react";


function Header(){
	let user=JSON.parse(localStorage.getItem("mydata"));
	function logout(){
		localStorage.clear();
		window.location='/';
	}

return(


    <>
    <header id="home">
		
		<div class="top-bar py-2 border-bottom">
			<div class="container">
				<div class="row middle-flex">
					<div class="col-xl-7 col-md-5 top-social-agile mb-md-0 mb-1 text-lg-left text-center">
						<div class="row">
							<div class="col-xl-3 col-6 header-top_w3layouts">
								<p class="text-da">
									<span class="fa fa-map-marker mr-2"></span>Parma Via, Italy
								</p>
							</div>
							<div class="col-xl-3 col-6 header-top_w3layouts">
								<p class="text-da">
									<span class="fa fa-phone mr-2"></span>+1 000263676
								</p>
							</div>
							<div class="col-xl-6"></div>
						</div>
					</div>
					<div class="col-xl-5 col-md-7 top-social-agile text-md-right text-center pr-sm-0 mt-md-0 mt-2">
						<div class="row middle-flex">
							<div class="col-lg-5 col-4 top-w3layouts p-md-0 text-right">
							
                               {
									localStorage.getItem("mydata")==null ?
									<>
										<a href="/login" class="btn login-button-2 text-uppercase text-wh">
										<span class="fa fa-sign-in mr-2"></span>Login</a>
									</>	
									:
									<>
	<h3>{user.name}</h3>
	{user.mob}
										<a href="/login" class="btn login-button-2 text-uppercase text-wh" onClick={logout}>
										<span class="fa fa-sign-in mr-2"></span>Logout</a>
									</>
                                }

							</div>
							<div class="col-lg-7 col-8 social-grid-w3">
								
								<ul class="top-right-info">
									<li>
										<p>Follow Us:</p>
									</li>
									<li class="facebook-w3">
										<a href="#facebook">
											<span class="fa fa-facebook-f"></span>
										</a>
									</li>
									<li class="twitter-w3">
										<a href="#twitter">
											<span class="fa fa-twitter"></span>
										</a>
									</li>
									<li class="google-w3">
										<a href="#google">
											<span class="fa fa-google-plus"></span>
										</a>
									</li>
									<li class="dribble-w3">
										<a href="#dribble">
											<span class="fa fa-dribbble"></span>
										</a>
									</li>
								</ul>
								
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>

    <div class="main-top py-1">
		<div class="container">
			<div class="nav-content">
			
				<h1>
					<a id="logo" class="logo" href="index.html">
						<img src="images/logo.png" alt="" class="img-fluid"/><span>Tasty</span> Burger
					</a>
				</h1>
				
				<div class="nav_web-dealingsls">
					<nav>
						<label for="drop" class="toggle">Menu</label>
						<input type="checkbox" id="drop" />
						<ul class="menu">
							<li><a href="/">Home</a></li>
							<li><a href="/about">About Us</a></li>
							<li>
								
								<label for="drop-3" class="toggle toogle-2">Pages <span class="fa fa-angle-down"
										aria-hidden="true"></span>
								</label>
								<a href="#pages">Pages <span class="fa fa-angle-down" aria-hidden="true"></span></a>
								<input type="checkbox" id="drop-3" />
								<ul>
									<li><a class="drop-text" href="#services">Services</a></li>
									<li><a class="drop-text" href="/about">Our Chefs</a></li>
									<li><a class="drop-text" href="#blog">Blog</a></li>
									<li><a class="drop-text" href="single.html">Single Page</a></li>
									<li><a class="drop-text" href="/login">Login</a></li>
									<li><a class="drop-text" href="/register">Register</a></li>
								</ul>
							</li>
							<li><a href="/menu" hidden >Menu</a></li>
							<li><a href="/con">Contact Us</a></li>
							<li><a href="/addmenu">Add Menu</a></li>
							<li><a href="/category">Category</a></li>
							<li><a href="/addcategory">Add Category</a></li>
							<li><a href="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
</svg></a></li>
							<li>
							<li><a href="/myorders">My Orders</a></li>
							<li><a href="/count">Count Orders</a></li>
								
							</li>
						</ul>
					</nav>
				</div>
			
			</div>
		</div>
	</div>
    
    </>
);

}

export default Header;