var mysql=require("mysql");
var express=require("express");
var app=express();
var cors =require("cors");
const multer = require('multer');
var path=require("path");
const nodemailer = require("nodemailer");

app.use("/public", express.static("public"));
app.use(express.json());
app.use(cors());
// app.use(path);
var con=mysql.createConnection(
    {
        host: "localhost",
        user:"root",
        password:"",
        database:"company",
    }
);


const storage=multer.diskStorage({
    destination:path.join( './public/'),
    filename: function(req, file, callback) { callback(null,  Date.now() + '-' + path.extname(file.originalname))
}
})
app.post("/newapi/data",(req,resp)=>{
    var emailu = req.body.lemail;
    var passu = req.body.lpass;
   // console.log(passu);

    const query="select * from registration WHERE customer_email = ? AND customer_password = ?";
    con.query(query,[emailu,passu],(err,result)=>{
        if(result.length > 0)
        {
            const user = result[0];
            if(user.allow === 1) {
                resp.send({message: "User is Blocked!"});
            }
            else {
                resp.send(result);
            }
        }
        else
        {
            resp.send({message:"wrong email id and password"});
        }
    });
    // resp.json("");
});

app.post("/api/insert",(req,resp)=>{
    
    var username = req.body.name;
    var useremail = req.body.email;
    var usernumber = req.body.rnumber;
    var userpass = req.body.pass;
    console.log(username) ;       

    // const query="select * from registration WHERE customer_email = ? ";
    // con.query(query,[useremail],(err,result)=>{
    //     if(result.length > 0 )
    //     {
    //         console.log(result);  
    //         resp.send({message:"This email is already registered."});  
    //        // resp.send(result);
    //     }
    //     else
    //     {    
            const query1="Insert into registration (customer_name,customer_email,customer_number,customer_password) values(?,?,?,?)";
            con.query(query1,[username,useremail,usernumber,userpass]);
           // console.log(result);
            resp.json("");
       // }
    //});
});

app.post("/api/checkemail",(req,resp)=>{
    var emailu = req.body.email;
   
   // console.log(passu);

    const query="select * from registration WHERE customer_email = ? ";
    con.query(query,[emailu],(err,result)=>{
        if(result.length > 0)
        {
             
            resp.send({message:"Already Registered"});
        }
        
    });
    
});

app.post("/api/insertburger", (req,resp)=>{
     let upload=multer({storage:storage}).single('filename');
     
     upload (req,resp,function(err)
     {
     if(!req.file)
     {
        
         console.log("Not found");
     }
     
    else{
         
        var catid = req.body.cat_id;

        
        var sbimage = req.file.filename;
        var sbname = req.body.bname;
        var sbprice = req.body.bprice;
    // console.log(sbimage) ;  
        
        const query="Insert into add_burger (category_id,b_image,b_name,b_price) values(?,?,?,?)";
        con.query(query,[catid,sbimage,sbname,sbprice]);
        resp.send("");
    }
 
})
});

// app.post("/api/insertburger",(req,resp)=>{
    
//     var catid = req.body.cat_id;
//    // var sbimage = req.body.bimage;
//     var sbname = req.body.bname;
//     var sbprice = req.body.bprice;
//     // console.log(sbimage) ;       

//     const query="Insert into add_burger (category_id,b_image,b_name,b_price) values(?,?,?,?)";
//     con.query(query,[catid,sbimage,sbname,sbprice]);
//     resp.json("");
        
// });

app.get('/api/menu_data',(req,resp)=>{
    var ct_id=req.query.cid;

    const ins = "SELECT * FROM add_burger where category_id=?";
    con.query(ins,[ct_id],(err,result)=>{
        console.log(result);
        resp.send(result);
    });
});

app.post ('/api/shortedburgers', (req,resp) => {
    var idu = req.body.userid;
    var cc_id=req.body.ciid;
    // console.log(cc_id);

   /// const query = "SELECT p.burger_id, a.burger_id FROM payment p INNER JOIN add_burger a WHERE p.user_id = ?";
//    const query="select b.burger_id ,a.* ,b.* from payment as a,add_burger as b where a.user_id=? and a.burger_id=b.burger_id";
//     con.query(query,[idu],(err,result)=>{
//         console.log(result);
                       
        const query = "SELECT b.burger_id, b.b_name, b.b_price, b.b_image FROM ( SELECT p.burger_id, 1 AS order_priority FROM payment p INNER JOIN add_burger ab ON p.burger_id = ab.burger_id WHERE p.user_id = ? AND ab.category_id = ? UNION SELECT ab.burger_id, 2 AS order_priority FROM add_burger ab WHERE ab.category_id = ? AND ab.burger_id NOT IN ( SELECT burger_id FROM payment WHERE user_id = ? ) ) AS CombinedBurgers INNER JOIN add_burger b ON CombinedBurgers.burger_id = b.burger_id ORDER BY CombinedBurgers.order_priority, b.burger_id";
        con.query(query,[idu,cc_id,cc_id,idu],(err,result)=>{
            console.log(result);
        resp.send(result);
        });
});

app.post('/api/cart', (req, resp) => {
    var userId = req.body.userid;   
    var burgerId = req.body.burgerid;      

    const query="select * from cart WHERE userid = ? AND bid = ? ";
    con.query(query,[userId,burgerId],(err,result)=>{
        if(result.length > 0 )
        {
            console.log(result);  
            resp.send({message:"This id is already registered."});  
           // resp.send(result);
        }
        else{
            const query="Insert into cart (userid,bid) values(?,?)";
            con.query(query,[userId,burgerId]);
            resp.send({message:"Burger Added."}); 
        }
    });
});

app.post("/api/category",(req,resp)=>{
    
    var cate_name = req.body.cat_name;
    // console.log(sbimg);

    const query="Insert into add_category (cat_name) values(?)";
    con.query(query,[cate_name]);
    resp.json(""); 
});

app.get('/api/usercategory',(req,resp)=>{
    const ins = "SELECT * FROM add_category";
    con.query(ins,(err,result)=>{
      //  console.log(result);
        resp.send(result);
    });
});

app.post('/api/addingCart',(req,resp)=>{

    const{userid,burgerid} = req.body;
    const query = "select * from orders where u_id = ? and bg_id = ?";
    con.query(query,[userid,burgerid],(err,result)=>{
        if(result.length > 0)
        {
            console.log(result);
            resp.send({message:"already exist"});
        }
        else{
            var qty = 1;
            const query = "INSERT INTO orders (u_id,bg_id,quantity) VALUES (?,?,?)";
            con.query(query,[userid,burgerid,qty]);
            resp.send({message:"Burger added to orders"});
        }
    });
});

app.post('/api/cartplus', (req, resp) => {
    const { order_id,quantity } = req.body;
    var qty=quantity+1;

    //console.log(quantity);

    const query = "Update orders set quantity=? where order_id=?";
    con.query(query, [qty, order_id], (err, result) => {
        if (err) {
            console.error(err);
            resp.send({ message: "Error adding to orders" });
        } else {
            resp.send({ message: "Quantity Updated!!!!" });
        }
    });
});


app.post('/api/cartminus', (req, resp) => {
    const { order_id,quantity } = req.body;
    var qty=quantity-1 ;

    //console.log(quantity);

    const query = "Update orders set quantity=? where order_id=?";
    con.query(query, [qty, order_id], (err, result) => {
        if (err) {
            console.error(err);
            resp.send({ message: "Error adding to orders" });
        } else {
            resp.send({ message: "Quantity Updated!!!!" });
        }
    });
});

app.post('/api/cartremove', (req, resp) => {
    const {order_id} = req.body;
    //console.log(quantity);

    const query = "Delete from orders where order_id=?";
    con.query(query, [order_id], (err, result) => {
        if (err) {
            console.error(err);
            resp.send({ message: "Error to remove" });
        } else {
            resp.send({ message: "Removed" });
        }
    });
});

app.get('/api/getCart',(req,resp)=>{
    const userid = req.query.uuid;
    console.log(userid);
    const query = "SELECT o.order_id, o.quantity, c.b_name, c.b_price FROM orders o INNER JOIN add_burger c ON o.bg_id = c.burger_id WHERE o.u_id = ?";
    con.query(query,[userid],(err,result)=>{
      if(err){
        console.error(err);
        resp.send('Server error');
       } 
       else{
            resp.send(result);
        }
    });
});

app.post("/api/payment",(req,resp)=>{
    var userid = req.body.uuuid;
    var email = req.body.email;
    var pm = req.body.mode;
    let max=999999;
    let min=111111;
    let ran=Math.floor(Math.random()*(max-min)+min);
  //  console.log(ran);

    
    
    const query="select * from orders WHERE u_id = ? ";
    con.query(query,[userid],(err,result)=>{
        if(result.length > 0)
        {
            const a=result.length;
            for(i=0;i<a;i++){

var tran_id=ran;
var bg_id=result[i].bg_id;
var quantity=result[i].quantity;


                const query="Insert into payment(user_id,burger_id,quantity,payment_mode,transaction_id) values(?,?,?,?,?)";
                con.query(query,[userid,bg_id,quantity,pm,tran_id]);

                const smtpTransport = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                      user: "b25791345@gmail.com",
                      pass: "jbaoounrriqskerr",
                    },
                  });
                  const message = {
                    from: "b25791345@gmail.com",
                    to: email,
            
                    subject: "order conformation",
                    text: " order sucessfull",
                  };
            
                  smtpTransport.sendMail(message, (error, info) => {
                    if (error) {
                      console.error(error);
                    } else {
                      //console.log("Email sent:", info.response);
                      resp.send({ message: "1" });
                    }
                  });

            }
            
        }
        
    });

    //delete

    const deleteQuery = "DELETE FROM orders WHERE u_id = ?";
    con.query(deleteQuery, [userid], (err) => {
        if (err) {
            console.error("Error deleting from orders:", err);
            resp.send({message: "Server error"});
            return;
        }
        else {
            resp.send({ message: "Order place successfully"});
        }
    });
    //resp.send("");
});

app.get('/api/displayingOrders', (req, resp) => {
    const usid = req.query.userid;
    const fromDate = req.query.from;
    const toDate = req.query.to;

    if (fromDate && toDate) {
        query = "SELECT transaction_id, user_id, burger_id, time, status FROM orders WHERE user_id = ? AND time BETWEEN ? AND ?"
        con.query(query,[usid,fromDate,toDate],(err,result) => {
            //console.log("In if");
            console.log(result);
            resp.send(result);
        });
    }
   
    else{
       query = "SELECT transaction_id, user_id, GROUP_CONCAT(burger_id) AS purchased_burgers,time FROM payment WHERE user_id = ? GROUP BY transaction_id, user_id, time;"
        con.query(query,[usid],(err,result) => {
          //  console.log("In else");

            console.log(result);
            resp.send(result);
        });
    }
});

app.get('/api/viewingOrders', (req, resp) => {
    const transaction_id = req.query.transaction_id;
    const query = "SELECT p.payment_id, p.transaction_id, p.user_id, p.burger_id, p.quantity, p.payment_mode, p.time, p.is_canceled, b.b_name, b.b_price, r.customer_name, r.customer_email FROM payment p INNER JOIN add_burger b ON p.burger_id = b.burger_id INNER JOIN registration r ON p.user_id = r.customer_id WHERE p.transaction_id = ?";
    con.query(query, [transaction_id] , (err, result) => {
        resp.send(result);
    });
});

app.post('/api/iscancelled', (req, resp) => {
    const transaction_id = req.body.transaction_id;
    const burger_id = req.body.burger_id;
    const query = "UPDATE payment SET is_canceled=1 WHERE transaction_id=? and burger_id = ?";
    con.query(query, [transaction_id, burger_id]);
    resp.json("");
    // console.log(burger_id);
}); 

app.get('/api/countOrders', (req, resp) => {
    // const burgerid = req.query.bgid;
    const fromDate = req.query.from;
    const toDate = req.query.to;

    if (fromDate && toDate) {
        query = "SELECT burger_id, COUNT(burger_id) AS quantity FROM payment WHERE time > ? AND time < ? GROUP BY burger_id"
        con.query(query,[fromDate,toDate],(err,result) => {
            resp.send(result);
        });
    }
   
    else{
       query = "SELECT burger_id, COUNT(burger_id) AS quantity FROM payment GROUP BY burger_id"
        con.query(query,(err,result) => {
            resp.send(result);
        });
    }
        
});

app.get('/api/allusers',(req,resp)=>{
    const ins = "SELECT * FROM registration";
    con.query(ins,(err,result)=>{
      //  console.log(result);
        resp.send(result);
    });
});

app.get('/api/userallburger/:userId', (req, resp) => {
    const userId = req.params.userId;
    console.log(userId);

    const ins = "SELECT a.b_name AS burger_name, SUM(p.quantity) AS total_quantity FROM payment p JOIN add_burger a ON p.burger_id = a.burger_id WHERE p.user_id = ? GROUP BY p.burger_id";
    
    con.query(ins, [userId], (err, result) => {
        resp.send(result);
        
    });
});

app.get('/api/forgot', (req, res) => {
    var email = req.query.email; 
    const query = "SELECT * FROM registration WHERE customer_email=?";
    
    con.query(query, [email], (err, result) => {
   
      if (result.length === 0) {
        return res.send({ message: "Email not found" });
      }
  
      const user = result[0];
      const password = user.customer_password; 
  
      const smtpTransport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "b25791345@gmail.com",
            pass: "jbaoounrriqskerr",
        },
      });
  
      const message = {
        from: "b25791345@gmail.com",
        to: email,
        subject: "Your Password",
        text: `Your password is: ${password}`,
      };
  
      smtpTransport.sendMail(message, (error, info) => {
          res.send({ message: "Password sent to email" });
        
      });
    });
  });

  app.get('/api/cat_data',(req,resp)=>{
    const ins = "SELECT * FROM add_category";
    con.query(ins,(err,result)=>{
      //  console.log(result);
        resp.send(result);
    });
});

  app.post("/api/admincategory",(req,resp)=>{
    var cat_name = req.body.cat_name;
    var cat_desc = req.body.cat_desc;
    // console.log(sbimage) ;       

    const query="Insert into add_category (cat_name, cat_desc) values(?,?)";
    con.query(query,[cat_name,cat_desc]);
    resp.json("");
        
});

app.get("/api/adminview_data",(req,resp)=>{
    const query="SELECT add_burger.*,add_category.cat_name FROM add_burger JOIN add_category ON add_burger.category_id = add_category.cat_id";
    con.query(query, (err, result) => {
    resp.send(result);
    });    
});

app.get('/api/admindisplayingOrders', (req, resp) => {
    const usid = req.query.userid;
    const fromDate = req.query.from;
    const toDate = req.query.to;

    if (fromDate && toDate) {
        query = "SELECT * FROM payment AND time > ? AND time < ?";
        con.query(query,[usid,fromDate,toDate],(err,result) => {
            //console.log("In if");
            console.log(result);
            resp.send(result);
        });
    }
   
    else{
       query = "SELECT a.*, b.transaction_id,b.user_id,b.time,b.status, SUM(b.quantity) AS total_qty FROM registration AS a JOIN payment AS b ON a.customer_id = b.user_id GROUP BY b.transaction_id";
        con.query(query,[usid],(err,result) => {
          //  console.log("In else");

            console.log(result);
            resp.send(result);
        });
    }
});

app.get('/api/showusers', (req, resp) => {
    const customer_id = req.query.customer_id;
    const query = "SELECT * FROM registration";
    con.query(query, [customer_id] , (err, result) => {
        resp.send(result);
    });
});

app.post('/api/allowusers', (req, resp) => {
    const customer_id = req.body.customer_id;
    const query = "UPDATE registration SET allow=1 WHERE customer_id=?";
    con.query(query, [customer_id]);
    resp.json("");
    // console.log(burger_id);
}); 

app.get('/api/admincat', (req, resp) => {
    let admincat = {};
    const query = "SELECT COUNT(*) AS categoryCount FROM add_category";
    con.query(query, (err, result) => {
        admincat.categoryCount = result[0].categoryCount;

    const query = "SELECT COUNT(*) AS burgerCount FROM add_burger";
    con.query(query, (err, result) => {
        admincat.burgerCount = result[0].burgerCount;

    const query = "SELECT COUNT(*) AS orderCount FROM payment";
    con.query(query, (err, result) => {
        admincat.orderCount = result[0].orderCount;

    const query = "SELECT SUM(b_price * quantity) AS totalEarnings FROM payment JOIN add_burger ON add_burger.burger_id";
    con.query(query, (err, result) => {
        admincat.totalEarnings = result[0].totalEarnings;

    const query = "SELECT COUNT(*) AS userCount FROM registration";
    con.query(query, (err, result) => {
        admincat.userCount = result[0].userCount;

        resp.json(admincat);
    });
});
});
});
});
});


app.post("/newapi/adminlogin",(req,resp) => {
    const emailu = req.body.lemail;
    const passu = req.body.lpass;
   // console.log(passu);

    const query="SELECT * FROM admin_login WHERE admin_email = ? AND admin_pass = ?";
    con.query(query,[emailu,passu],(err,result)=>{
        if(result.length > 0)
        {
                resp.send(result);
        }
        else
        {
            resp.send({message:"Wrong email id and password."});
        }
    });
});

app.post('/api/getcat',(req,resp) => {
    const catid = req.body.catid;

    const query = "SELECT * FROM add_category WHERE cat_id = ?";

    con.query(query,[catid], (err,result) => {
        if (err) {
            console.error("Database query error:", err);
            return resp.status(500).send({ error: 'An error occurred while fetching data.' });
        }
        if (result.length === 0) {
            return resp.status(404).send({ message: 'No data found for the provided ID.' });
        }
        console.log(result);
        resp.send(result[0]);
    });


});

app.put('/api/category_update', (req, resp) => {
    const cat_id = req.body.cat_id;
    const cat_name = req.body.cat_name;
    const cat_desc = req.body.cat_desc;

    const query = "UPDATE add_category SET cat_name = ?, cat_desc = ? WHERE cat_id = ?";

    con.query(query,[cat_name,cat_desc,cat_id], (err,result) => {
        if (err) {
            console.error("Database query error:", err);
            return resp.status(500).send({ error: 'An error occurred while updating the data.' });
        }
        if (result.affectedRows === 0) {
            return resp.status(404).send({ message: 'No data found for the provided ID.' });
        }
        console.log(result);
        resp.send({ message: 'Sports data updated successfully!' });
    });
});

app.post('/api/cat_delete/:cat_id', (req, resp) => {
    const cate_id = req.body.cat_id;

    const query = "DELETE FROM add_burger WHERE cat_id = ?";

    con.query(query,[cate_id]);
});

app.post('/api/product_delete/:burger_id', (req, resp) => {
    const burger_id = req.params.burger_id;

    const query = "DELETE FROM add_burger WHERE burger_id = ?";

    con.query(query,[burger_id]);
    console.log(burger_id);
});

app.post('/api/getproductdata', (req, res) => {
  const burger_id = req.body.burgerid;
  const query="SELECT a.*,b.* from add_burger as a,add_category as b where a.category_id = b.cat_id and a.burger_id = ?";
  
  con.query(query, [burger_id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result[0]); // Sending the first matching result
    }
  });
});

// app.get('/api/getpass',(req,resp) => {
//     const adminid = req.query.adminid;

//     const query = "SELECT * FROM admin_login WHERE admin_id = ?";

//     con.query(query,[adminid], (err,result) => {
//         if (err) {
//             console.error("Database query error:", err);
//             return resp.status(500).send({ error: 'An error occurred while fetching data.' });
//         }
//         if (result.length === 0) {
//             return resp.status(404).send({ message: 'No data found for the provided ID.' });
//         }
//         console.log("Result from DB: ", result[0]);
//         resp.json(result[0]);
//     });
// });

app.post("/api/changepass", (req, resp) => {    
    const { email, currentPassword, newPassword } = req.body;

    if (!email || !currentPassword || !newPassword) {
        return resp.status(400).send({ message: "All fields are required" });
    }

    const query = "SELECT * FROM admin_login WHERE admin_email = ?";
    con.query(query, [email], (err, result) => {
        if (err) {
            return resp.status(500).send({ message: "Error checking the user" });
        }

        if (result.length === 0) {
            return resp.status(404).send({ message: "User not found" });
        }

        const user = result[0];
        if (user.admin_pass !== currentPassword) {
            return resp.status(400).send({ message: "Current password is incorrect" });
        }

        const updateQuery = "UPDATE admin_login SET admin_pass = ? WHERE admin_email = ?";
        con.query(updateQuery, [newPassword, email], (updateErr, updateResult) => {
            if (updateErr) {
                return resp.status(500).send({ message: "Error updating the password" });
            }

            resp.send({ message: "Password changed successfully" });
        });
    });
});

app.post('/api/product_update', (req, resp) => {
         const upload = multer({ storage: storage }).single('b_image');
      
         upload(req, resp, (err) => {
          const { burger_id, category_id, b_name, b_price } = req.body;
           let b_image = req.body.b_image; 
      
           if (req.file) {
             b_image = req.file.filename;
           }
          const sql = "UPDATE add_burger SET category_id = ?, b_image = ?, b_name = ?, b_price = ? WHERE burger_id = ?";
          
          con.query(sql, [category_id, b_image, b_name, b_price, burger_id], (err, result) => {
            if (err) {
              return resp.status(500).json({ message: 'Error updating product', error: err });
            }
            resp.json({ message: 'Product updated successfully!' });
          });
         });
});

// In your Node.js backend
app.post('/api/updateOrderStatus', (req, res) => {
    const { transaction_id, status, reason } = req.body;

    // Assuming you are using a database connection here
    const sql = "UPDATE payment SET status = ? , reason = ? WHERE  transaction_id=?";
    
    con.query(sql, [status, reason, transaction_id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database update failed.' });
        }
        return res.json({ success: true, message: 'Order status updated successfully.' });
    });
});

// app.post('/api/rejectreason/:rejectionReason', (req, resp) => {
//     const { transaction_id, status } = req.body;

//     const query = "UPDATE payment SET status = 2 WHERE  transaction_id=?";

//     con.query(query,[status, transaction_id]);
//     console.log(status, transaction_id);
// });


con.connect(function(err)
{
    if(err) throw err;
    console.log("db connected");
});

var port=1337;

app.listen(port,()=>{
    console.log("Connected");
});