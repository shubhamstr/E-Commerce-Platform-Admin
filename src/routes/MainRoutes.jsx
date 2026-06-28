import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import ProtectedRoute from './ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('views/Utils/Typography')));
const SamplePage = Loadable(lazy(() => import('views/SamplePage')));
const ManageUsers = Loadable(lazy(() => import('views/ManageUsers')));
const ManageCategories = Loadable(lazy(() => import('views/ManageCategories')));
const ManageProducts = Loadable(lazy(() => import('views/ManageProducts')));
const BulkImport = Loadable(lazy(() => import('views/BulkImport')));
const ManageContacts = Loadable(lazy(() => import('views/ManageContacts')));
const ManageOrders = Loadable(lazy(() => import('views/ManageOrders')));
const ManageEmailLogs = Loadable(lazy(() => import('views/ManageEmailLogs')));
const Profile = Loadable(lazy(() => import('views/Profile')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <ProtectedRoute allowedRoles={['admin', 'seller']}>
      <MainLayout />
    </ProtectedRoute>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/sample-page', element: <SamplePage /> },
    {
      path: '/manage-users',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageUsers />
        </ProtectedRoute>
      )
    },
    {
      path: '/manage-categories',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageCategories />
        </ProtectedRoute>
      )
    },
    {
      path: '/manage-products',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'seller']}>
          <ManageProducts />
        </ProtectedRoute>
      )
    },
    {
      path: '/manage-products/bulk-import',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'seller']}>
          <BulkImport />
        </ProtectedRoute>
      )
    },
    {
      path: '/manage-contacts',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageContacts />
        </ProtectedRoute>
      )
    },
    {
      path: '/manage-orders',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'seller']}>
          <ManageOrders />
        </ProtectedRoute>
      )
    },
    {
      path: '/manage-email-logs',
      element: (
        <ProtectedRoute allowedRoles={['admin']}>
          <ManageEmailLogs />
        </ProtectedRoute>
      )
    },
    {
      path: '/profile',
      element: (
        <ProtectedRoute allowedRoles={['admin', 'seller']}>
          <Profile />
        </ProtectedRoute>
      )
    }
  ]
};

export default MainRoutes;
