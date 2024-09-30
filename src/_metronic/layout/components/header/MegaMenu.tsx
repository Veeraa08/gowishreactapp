/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {baseUrl2} from '../../../../app/modules/auth/core/ApiAxios'
import {toAbsoluteUrl} from '../../../helpers'

const MegaMenu = (Categories: any) => {
  const [getSubCategories, setSubCategories] = useState([])
  const [getMainCategory, setMainCategory] = useState([] as any)
  useEffect(() => {
    if (Categories) {
      if (Categories.subCategories && Categories.subCategories !== undefined) {
        setSubCategories(Categories?.subCategories)
      }

      if (Categories.mainCategory && Categories.mainCategory !== undefined) {
        setMainCategory(Categories?.mainCategory)
      }
    }
  }, [Categories])
  return (
    <>
      {/*begin:Row*/}
      <div className='row'>
        {/*begin:Col*/}
        <div className='col-lg-8 mb-3 mb-lg-0 py-3 px-3 py-lg-6 px-lg-6'>
          {/*begin:Row*/}
          <div className='row'>
            {/*begin: subcategory menu Col*/}
            {getSubCategories.length > 0 &&
              getSubCategories.map((subc: any, i) => {
                return (
                  <div className='col-lg-6 mb-3' key={i}>
                    {/*begin:Menu item*/}
                    <div className='menu-item p-0 m-0'>
                      {/*begin:Menu link*/}
                      <Link to={toAbsoluteUrl('/admin/' + subc?.id)} className='menu-link'>
                      {/* <Link to={toAbsoluteUrl('/products/' + subc?.id)} className='menu-link'> */}
                        <div className='symbol symbol-50px me-3'>
                          <img src={subc?.small_thumbnail} className='' alt='' />
                          {/* <img src={baseUrl2 + subc?.category_image} className='' alt='' /> */}
                        </div>
                        <span className='d-flex flex-column'>
                          <span className='fs-6 fw-bold text-gray-800'>{subc?.subcategory_name}</span>
                          {/* <span className='fs-7 fw-semibold text-gray-500'>{subc?.category_name}</span> */}
                          <span className='fs-7 fw-semibold text-muted'>
                            {subc?.category_name}
                          </span>
                        </span>
                      </Link>
                      {/*end:Menu link*/}
                    </div>
                    {/*end:Menu item*/}
                  </div>
                )
              })}
          </div>
          {/*end:Row*/}
        </div>
        {/*end:Col*/}
        {/*begin:Col*/}
        {/*begin:Heading*/}
        <div className='col-lg-4 col-lg-4 py-3 px-3 py-lg-6 px-lg-6 rounded-end'>
          <img src={baseUrl2 + getMainCategory?.category_image} className='rounded mw-100' alt='' />
        </div>
        {/*end:Heading*/}
        {/*end:Col*/}
      </div>
      {/*end:Row*/}
    </>
  )
}

export default MegaMenu;