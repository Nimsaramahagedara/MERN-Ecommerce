import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import {BsSearch} from 'react-icons/bs';

export const Header = () => {
  return (
    <>
    <header className='header-top-strip py-3'>
        <div className='container-xxl text-align-right'>
            <div className='row justify-content-between'>
                <div className='col-6'>
                    <p className='text-white mb-0'>Free shipping over $500</p>
                </div>
                <div className='col-4'>
                    <p className='text-white mb-0'>Hotline : <a href='tel:0763355762' className='text-white'>0763355762</a></p>
                </div>
            </div>
        </div>
    </header>
    <header className='header-upper py-3'>
        <div className='container-xxl'>
            <div className='row align-items-center'>
                <div className='col-2'>
                    <h2><Link className='text-white'>Ecommerce</Link></h2>
                </div>
                <div className='col-5'>
                    <div className="input-group">
                        <input 
                        type="text" 
                        class="form-control py-2" 
                        placeholder="Search Product Here" 
                        aria-label="Search Product Here" 
                        aria-describedby="basic-addon2"/>
                        <span className="input-group-text p-3" id="basic-addon2"><BsSearch/></span>
                    </div>
                </div>
                <div className='col-5'>
                    <div className='header-upper-links d-flex align-items-center justify-content-between'>
                        <div>
                            <Link className='d-flex align-items-center gap-10 text-white'>
                            <img src="/images/compare.svg" alt='' className=''/>
                            <p className='mb-0'>Compare<br/>Products</p>
                            </Link>
                        </div>
                        <div>
                            <Link className='d-flex align-items-center gap-10 text-white'>
                            <img src="/images/wishlist.svg" alt='' className=''/>
                            <p className='mb-0'>Favorites<br/>Wishlist</p>
                            </Link>
                        </div>
                        <div>
                            <Link className='d-flex align-items-center gap-10 text-white'>
                            <img src="/images/user.svg" alt='' className=''/>
                            <p className='mb-0'>User<br/>Login</p>
                            </Link>
                        </div>
                        <div>
                            <Link className='d-flex align-items-center gap-10 text-white'>
                            <img src="/images/cart.svg" alt='' className=''/>
                            <div className='d-flex flex-column'>
                                <span className='badge bg-white text-dark'>0</span>
                                <p className='mb-0'>$500</p>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <header className='header-bottom py-3'>
        <div className="container-xxl">
            <div className="row">
                <div className="col-12">
                    <div className="menu-bottom d-flex align-items-center gap-30">
                        <div>
                            <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="images/menu.svg" alt="" /><span className='me-5 d-inline-block'>Shop Categories</span>
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><Link className="dropdown-item text-white" to="#">Action</Link></li>
                                <li><Link className="dropdown-item text-white" to="#">Another action</Link></li>
                                <li><Link className="dropdown-item text-white" to="#">Something else here</Link></li>
                            </ul>
                            </div>
                        </div>
                        <div className="menu-links">
                            <div className="d-flex align-items-center gap-15">
                                <NavLink to='/'>Home</NavLink>
                                <NavLink to='/store'>Our Store</NavLink>
                                <NavLink to='/Blog'>Blogs</NavLink>
                                <NavLink to='/contact'>Contact</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    </>
  )
}
