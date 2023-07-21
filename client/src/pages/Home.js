import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
    <section className="home-wrapper-1 py-5">
      <div className="container-xxl">
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img src="images/main-banner-1.jpg" className='img-fluid rounded-3' alt="" />
              <div className="main-banner-content position-absolute">
                <h4>super charged for pro</h4>
                <h5>IPAD 13 PRO</h5>
                <p>From $999.0 or $44.0/month</p>
                <Link className='button'>Buy Now</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img src="images/catbanner-01.jpg" className='img-fluid rounded-3' alt="" />
                <div className="small-banner-content position-absolute">
                  <h4>Best sale</h4>
                  <h5>IPAD 13 PRO</h5>
                  <p>From $999.0 or<br/>$44.0/month</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-02.jpg" className='img-fluid rounded-3' alt="" />
                <div className="small-banner-content position-absolute">
                  <h4>new arrivalF</h4>
                  <h5>IPAD 13 PRO</h5>
                  <p>From $999.0 or<br/>$44.0/month</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-03.jpg" className='img-fluid rounded-3' alt="" />
                <div className="small-banner-content position-absolute">
                  <h4>50% Off</h4>
                  <h5>IPAD 13 PRO</h5>
                  <p>From $999.0 or<br/>$44.0/month</p>
                </div>
              </div>
              <div className="small-banner position-relative">
                <img src="images/catbanner-04.jpg" className='img-fluid rounded-3' alt="" />
                <div className="small-banner-content position-absolute">
                  <h4>Free engraving</h4>
                  <h5>IPAD 13 PRO</h5>
                  <p>From $999.0 or<br/>$44.0/month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}
