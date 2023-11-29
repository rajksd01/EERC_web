import React from 'react';

const ContactPage = () => {
  return (
    <>
      {/* Breadcrumb Area */}
      <section className="breadcrumb-area breadcrumb-area-four pt-175 pb-160">
        {/* Breadcrumb Content */}
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <h2 className="title">Contact Us</h2>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.html">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Contact</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        {/* Breadcrumb Shape Wrap */}
        <div className="breadcrumb-shape-wrap-three">
          <img src="assets/img/images/breadcrumb_shape04.png" alt="" className="wow zoomIn" data-wow-delay=".2s" />
          <img src="assets/img/images/breadcrumb_shape05.png" alt="" className="wow zoomIn" data-wow-delay=".2s" />
          <img src="assets/img/images/breadcrumb_shape06.png" alt="" className="wow zoomIn" data-wow-delay=".2s" />
        </div>
      </section>
      {/* Breadcrumb Area End */}

      {/* Contact Area */}
      <section className="inner-contact-area">
        <div className="container">
          {/* Inner Contact Wrap */}
          <div className="inner-contact-wrap">
            <div className="row">
              <div className="col-xl-9 col-lg-10">
                {/* Section Title */}
                <div className="section-title title-style-two mb-50">
                  <h2 className="title">Have a <span>Cool Project?</span> Get in touch!</h2>
                </div>
                {/* Inner Contact Form Wrap */}
                <div className="inner-contact-form-wrap">
                  <form action="#">
                    
                    <div className="form-grp">
                      <label htmlFor="name"><i className="fas fa-user"></i></label>
                      <input type="text" id="name" placeholder="Name" />
                    </div>
                    
                    <div className="form-grp">
                      <label htmlFor="phone"><i className="fas fa-phone"></i></label>
                      <input type="text" id="phone" placeholder="Phone" />
                    </div>
                   
                    <div className="form-grp">
                      <label htmlFor="email"><i className="fas fa-envelope"></i></label>
                      <input type="email" id="email" placeholder="Email Address" />
                    </div>
                 
                    <div className="form-grp">
                      <label htmlFor="subject"><i className="fas fa-book-alt"></i></label>
                      <input type="text" id="subject" placeholder="Subject" />
                    </div>
                  
                    <div className="form-grp">
                      <label htmlFor="comment"><i className="fas fa-user-edit"></i></label>
                      <textarea name="comment" id="comment" placeholder="How can we help you? Feel free to get in touch!"></textarea>
                    </div>
                   
                    <button type="submit" className="btn">Send Message <span></span></button>
                  </form>
                </div>
               
                <div id="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.8749856588697!2d83.46412561500131!3d27.69025848279899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39968688683c2f29%3A0x71d2c23af969aad0!2sECSC%20Group(Computer%20sale%2Fservice%20center)!5e0!3m2!1sen!2sin!4v1679325248264!5m2!1sen!2sin"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                {/* Inner Contact Info */}
                <div className="inner-contact-info">
                  {/* List Wrap */}
                  <ul className="list-wrap">
                    {/* Contact Info Item */}
                    <li>
                      <div className="contact-info-item">
                        <div className="icon">
                          <img src="assets/img/icon/loction_icon03.png" alt="" />
                        </div>
                        <div className="content">
                          <h6 className="title">Address</h6>
                          <p>Butwal, Nepal</p>
                        </div>
                      </div>
                    </li>
                    {/* Contact Info Item */}
                    <li>
                      <div className="contact-info-item">
                        <div className="icon">
                          <img src="assets/img/icon/mail_icon03.png" alt="" />
                        </div>
                        <div className="content">
                          <h6 className="title">Email</h6>
                          <a href="mailto:your@email.com">info@computersc.com.np</a>
                        </div>
                      </div>
                    </li>
                    {/* Contact Info Item */}
                    <li>
                      <div className="contact-info-item">
                        <div className="icon">
                          <img src="assets/img/icon/phone_icon03.png" alt="" />
                        </div>
                        <div className="content">
                          <h6 className="title">Phone</h6>
                          <a href="tel:0123456789">+977-9867756460</a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
