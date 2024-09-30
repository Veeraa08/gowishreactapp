/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'
import {OrderListPage} from '../pages/orders/order_list/OrderListPage'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import {SubCategoryPage} from '../pages/sub-categories/SubCategories'
import {ProductsListPage} from '../pages/products/ProductsListPage'
import {ProductDetailsPage} from '../pages/product_details/ProductDetailsPage'
import { EmployeesPage } from '../admin/employees/Employees'

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const {currentUser} = useAuth()
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout/*' element={<Logout />} />
          {currentUser ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              <Route index element={<Navigate to='/home' />} />
            </>
          ) : (
            <>
              <Route element={<MasterLayout />}>
                <Route path='/*' element={<DashboardWrapper />} />
                <Route index element={<Navigate to='/home' />} />
                <Route path='sub_categories/:mainCategoryId' element={<SubCategoryPage />} />
                <Route path='products/:subCategoryId' element={<ProductsListPage />} />
                <Route path='product_details/:productId' element={<ProductDetailsPage />} />
                <Route path='admin/:productId' element={<EmployeesPage />} />
                {/* <Route path='auth/*' element={<AuthPage />} />
                <Route path='*' element={<Navigate to='/auth' />} /> */}
              </Route>
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}
