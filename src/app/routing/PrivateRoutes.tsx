import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {SubCategoryPage} from '../pages/sub-categories/SubCategories'
import {ProductsListPage} from '../pages/products/ProductsListPage'
import {ProductDetailsPage} from '../pages/product_details/ProductDetailsPage'
import {CartPage} from '../pages/cart/CartPage'
import {FavoritePage} from '../pages/favorite/FavoritePage'
import {QuickOrderPage} from '../pages/orders/quick_order/QuickOrderPage'
import {ProfileDetailsPage} from '../modules/profile_details/ProfileDetailsPage'
import {OrderListPage} from '../pages/orders/order_list/OrderListPage'
import {OrderCancelListPage} from '../pages/orders/order_cancel_list/OrderCancelListPage'
import {MyUsersPage} from '../pages/my_users/MyUsersPage'
import {MyOverViewPage} from '../pages/my_over_view/MyOverViewPage'
import {useAuth} from '../modules/auth'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  const {currentUser} = useAuth()

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/home' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='sub_categories/:mainCategoryId' element={<SubCategoryPage />} />
        <Route path='products/:subCategoryId' element={<ProductsListPage />} />
        <Route path='product_details/:productId' element={<ProductDetailsPage />} />
        <Route path='order_list' element={<OrderListPage />} />
        <Route path='cart' element={<CartPage />} />
        <Route path='favorites' element={<FavoritePage />} />
        <Route path='quick_order' element={<QuickOrderPage />} />
        <Route
          path='profile'
          element={
            <SuspensedView>
              <ProfileDetailsPage />
            </SuspensedView>
          }
        />
        <Route
          path='order_cancel_list'
          element={
            <SuspensedView>
              <OrderCancelListPage />
            </SuspensedView>
          }
        />
        <Route
          path='my_users'
          element={
            <SuspensedView>
              <MyUsersPage />
            </SuspensedView>
          }
        />
        <Route
          path='my_over_view'
          element={
            <SuspensedView>
              <MyOverViewPage />
            </SuspensedView>
          }
        />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
