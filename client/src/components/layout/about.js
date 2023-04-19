// import Layout from "antd/es/layout/layout";
import React from "react";
import Header from "./header";
import './about.css'
const AboutPage = () =>{
    return(
        <>
        <Header>

        </Header>

<div className="bg-light">
  <div className="container py-5">
    <div className="row h-100 align-items-center py-5">
      <div className="col-lg-6">
        <h1 className="display-4-bd">Expense Tracker</h1>
        <h1 className="lead  mb-0 dislpay-1">
          Manage your money and spend it wisely with our Expense Tracker</h1>
      
      </div>
      <div className="col-lg-6 d-none mx-auto d-lg-block rounded"><img src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg" alt="" className="img-fluid"></img></div>
    </div>
  </div>
</div>



<div className="bg-light py-5">
  <div className="container py-5">
    <div className="row mb-4">
      <div className="col-lg-5">
        <h2 className="display-4 font-weight-light"> </h2>
      </div>
    </div>
    
    <div className="row text-center">
      
      

      <div className="col-l-4 col-sm-6 mb-8">
        <div className="bg-white rounded shadow-sm py-5 px-4"><img src="https://bootstrapious.com/i/snippets/sn-about/avatar-3.png" alt="" width="100" className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"></img>
          <h5 className="mb-0">Jayesh Gore</h5><span className="small text-uppercase text-muted">CEO - Founder</span>
          <ul className="social mb-0 list-inline mt-3">
          <p className="font-italic text-muted">Please Provide Your Valuable Feedback</p>
          <address>
<a href="mailto:webmaster@example.com">jayeshgore4171@gmail.com</a>

</address>
          </ul>
        </div>
      </div>
   
      
      <div className="col-lg-6 d-none d-lg-block"><img src="https://bootstrapious.com/i/snippets/sn-about/illus.png" alt="" className="img-fluid"></img></div>

      
    </div>
    </div>
</div>


<footer className="bg-light pb-5">
  <div className="container text-center">
    <p className="font-italic text-muted mb-0">&copy; Copyrights Company.com All rights reserved.</p>
  </div>
</footer>

        
        </>
    )
}
export default AboutPage