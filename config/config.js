// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import React from 'react';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV, REACT_APP_API_URL, REACT_APP_DEFAULT_PAGE_SIZE } = process.env;
console.log(
  'REACT_APP_ENV',
  REACT_APP_ENV,
  'REACT_APP_API_URL',
  REACT_APP_API_URL,
  'REACT_APP_DEFAULT_PAGE_SIZE',
  REACT_APP_DEFAULT_PAGE_SIZE,
);
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          path: '/user/forgotpassword',
          layout: false,
          name: 'forgotpassword',
          component: './user/forgotpassword',
        },
        {
          path: '/user/resetpassword',
          layout: false,
          name: 'resetpassword',
          component: './user/resetpassword',
        },
        {
          path: '/user/activateaccount',
          layout: false,
          name: 'activateaccount',
          component: './user/activateaccount',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/dashboard/analysis',
      name: 'dashboard',
      component: './dashboard/analysis',

      icon: 'dashboard',
      // routes: [
      //   {
      //     path: '/dashboard',
      //     redirect: '/dashboard/analysis',
      //   },
      //   {
      //     name: 'analysis',
      //     icon: 'smile',
      //     path: '/dashboard/analysis',
      //     component: './dashboard/analysis',
      //   },
      //   // {
      //   //   name: 'monitor',
      //   //   icon: 'smile',
      //   //   path: '/dashboard/monitor',
      //   //   component: './dashboard/monitor',
      //   // },
      //   // {
      //   //   name: 'workplace',
      //   //   icon: 'smile',
      //   //   path: '/dashboard/workplace',
      //   //   component: './dashboard/workplace',
      //   // },
      // ],
    },
    // {
    //   access: 'canAccess',
    //   path: '/roles',
    //   icon: 'form',
    //   name: 'Roles',
    //   routes: [
    //     {
    //       path: '/roles',
    //       redirect: '/roles/list',
    //     },
    //     {
    //       name: 'List',
    //       icon: 'smile',
    //       path: '/roles/list',
    //       component: './role/role-list',
    //     },
    //     {
    //       name: 'New',
    //       icon: 'smile',
    //       path: '/roles/new',
    //       component: './role/role-entry',
    //     },
    //     {
    //       name: 'Update',
    //       hideInMenu: true,
    //       icon: 'smile',
    //       path: '/roles/edit/:id',
    //       component: './role/role-update',
    //     },
    //   ],
    // },
    // {
    //   access: 'canAccess',
    //   path: '/resources',
    //   icon: 'table',
    //   name: 'Resources',
    //   routes: [
    //     {
    //       path: '/resources',
    //       redirect: '/resources/list',
    //     },
    //     {
    //       name: 'List',
    //       icon: 'smile',
    //       path: '/resources/list',
    //       component: './resource/list',
    //     },
    //     {
    //       name: 'New',
    //       icon: 'smile',
    //       path: '/resources/new',
    //       component: './resource/entry',
    //     },
    //     {
    //       name: 'Update',
    //       hideInMenu: true,
    //       icon: 'smile',
    //       path: '/resources/edit/:id',
    //       component: './resource/update',
    //     },
    //   ],
    // },
    // {
    //   access: 'canAccess',
    //   path: '/permissions',
    //   icon: 'folder',
    //   name: 'Permissions',
    //   routes: [
    //     {
    //       path: '/permissions',
    //       redirect: '/permissions/list',
    //     },
    //     {
    //       name: 'List',
    //       icon: 'smile',
    //       path: '/permissions/list',
    //       component: './permission/list',
    //     },
    //     {
    //       name: 'New',
    //       icon: 'smile',
    //       path: '/permissions/new',
    //       component: './permission/entry',
    //     },
    //     {
    //       name: 'Update',
    //       hideInMenu: true,
    //       icon: 'smile',
    //       path: '/permissions/edit/:id',
    //       component: './permission/update',
    //     },
    //     {
    //       name: 'Manage',
    //       icon: 'smile',
    //       path: '/permissions/manage',
    //       component: './permission/manage',
    //     },
    //   ],
    // },
    {
      path: '/users/new',
      component: './user/user-entry',
    },
    {
      path: '/users/edit/:id',
      component: './user/user-update',
    },
    {
      access: 'canAccess',
      path: '/users/list',
      icon: 'user',
      component: './user/user-list',

      name: 'Users',
      // routes: [
      //   {
      //     path: '/users',
      //     redirect: '/users/list',
      //   },
      //   {
      //     name: 'List',
      //     icon: 'smile',
      //     path: '/users/list',
      //     component: './user/user-list',
      //   },
      //   {
      //     name: 'New',
      //     icon: 'smile',
      //     path: '/users/new',
      //     component: './user/user-entry',
      //   },
      //   {
      //     name: 'Update',
      //     hideInMenu: true,
      //     icon: 'smile',
      //     path: '/users/edit/:id',
      //     component: './user/user-update',
      //   },
      // ],
    },
    {
      path: '/property/new',
      component: './property/entry',
    },
    {
      path: '/property/edit/:id',
      component: './property/update',
    },
    {
      path: '/property/list',
      icon: 'form',
      name: 'Property',
      component: './property/list',

      // routes: [
      //   {
      //     path: '/property',
      //     redirect: '/property/list',
      //   },
      //   {
      //     name: 'List',
      //     icon: 'smile',
      //     path: '/property/list',
      //     component: './property/list',
      //   },
      //   {
      //     name: 'New',
      //     icon: 'smile',
      //     path: '/property/new',
      //     component: './property/entry',
      //   },
      //   {
      //     name: 'Update',
      //     hideInMenu: true,
      //     icon: 'smile',
      //     path: '/property/edit/:id',
      //     component: './property/update',
      //   },
      // ],
    },
    {
      // name: 'New',
      // icon: 'smile',
      path: '/blogs/new',
      component: './blogs/entry',
    },
    {
      path: '/blogs/edit/:id',
      component: './blogs/update',
    },
    {
      path: '/blogs/list',
      icon: 'reconciliation',
      name: 'Blog',
      component: './blogs/list',

      // routes: [
      //   {
      //     path: '/blog',
      //     redirect: '/blogs/list',
      //   },
      //   {
      //     name: 'List',
      //     icon: 'smile',
      //     path: '/blogs/list',
      //     component: './blogs/list',
      //   },
      //   {
      //     name: 'New',
      //     icon: 'smile',
      //     path: '/blogs/new',
      //     component: './blogs/entry',
      //   },
      //   {
      //     name: 'Update',
      //     hideInMenu: true,
      //     icon: 'smile',
      //     path: '/blogs/edit/:id',
      //     component: './blogs/update',
      //   },

      // ],
    },

    {
      path: '/subCategories/new',
      component: './subCategories/entry',
    },
    {
      path: '/subCategories/edit/:id',
      component: './subCategories/update',
    },
    {
      path: '/categories/new',
      component: './categories/entry',
    },
    {
      path: '/categories/edit/:id',
      component: './categories/update',
    },
    {
      path: '/categories/list',
      component: './categories/list',
      icon: 'appstore',
      name: 'Categories',
      // routes: [
      //   {
      //     path: '/subCategories',
      //     redirect: '/categories/list',
      //   },
      //   {
      //     name: 'List',
      //     icon: 'smile',
      //     path: '/categories/list',
      //     component: './categories/list',
      //   },
      //   {
      //     name: 'New',
      //     icon: 'smile',
      //     path: '/categories/new',
      //     component: './categories/entry',
      //   },
      //   {
      //     name: 'Update',
      //     hideInMenu: true,
      //     icon: 'smile',
      //     path: '/categories/edit/:id',
      //     component: './categories/update',
      //   },
      // ],
    },
    {
      path: '/subCategories/new',
      component: './subCategories/entry',
    },
    {
      path: '/subCategories/list',
      // icon: 'bars',
      icon: 'appstore',
      name: 'Sub Categories',
      component: './subCategories/list',

      // routes: [
      //   {
      //     path: '/subCategories',
      //     redirect: '/subCategories/list',
      //   },
      //   {
      //     name: 'List',
      //     icon: 'smile',
      //     path: '/subCategories/list',
      //     component: './subCategories/list',
      //   },
      //   {
      //     name: 'New',
      //     icon: 'smile',
      //     path: '/subCategories/new',
      //     component: './subCategories/entry',
      //   },
      //   {
      //     name: 'Update',
      //     hideInMenu: true,
      //     icon: 'smile',
      //     path: '/subCategories/edit/:id',
      //     component: './subCategories/update',
      //   },
      // ],
    },

    {
      path: '/amenities/new',
      component: './amenities/entry',
    },
    {
      path: '/amenities/edit/:id',
      component: './amenities/update',
    },
    {
      path: '/amenities/list',

      icon: 'form',
      name: 'Amenities',
      component: './amenities/list',

      // routes: [
      //   {
      //     path: '/amenities',
      //     redirect: '/amenities/list',
      //   },
      //   {
      //     name: 'List',
      //     icon: 'smile',
      //     path: '/amenities/list',
      //     component: './amenities/list',
      //   },
      //   {
      //     name: 'New',
      //     icon: 'smile',
      //     path: '/amenities/new',
      //     component: './amenities/entry',
      //   },
      //   {
      //     name: 'Update',
      //     hideInMenu: true,
      //     icon: 'smile',
      //     path: '/amenities/edit/:id',
      //     component: './amenities/update',
      //   },
      // ],
    },
    {
      path: '/highlights/new',
      component: './highlights/entry',
    },
    {
      path: '/highlights/edit/:id',
      component: './highlights/update',
    },
    {
      path: '/highlights/list',
      icon: 'highlight',
      name: 'Highlights',
      component: './highlights/list',

      // routes: [
      //   {
      //     path: '/highlights',
      //     redirect: '/highlights/list',
      //   },
      //   {
      //     name: 'List',
      //     icon: 'smile',
      //     path: '/highlights/list',
      //     component: './highlights/list',
      //   },
      //   {
      //     name: 'New',
      //     icon: 'smile',
      //     path: '/highlights/new',
      //     component: './highlights/entry',
      //   },
      //   {
      //     name: 'Update',
      //     hideInMenu: true,
      //     icon: 'smile',
      //     path: '/highlights/edit/:id',
      //     component: './highlights/update',
      //   },
      // ],
    },

    {
      path: '/contact/list',
      icon: 'phone',
      name: 'Contact',
      component: './contact/list',
    },

    {
      path: '/purchase/new',
      component: './purchase/entry',
    },
    {
      path: '/purchase/edit/:id',
      component: './purchase/update',
    },
    {
      path: '/purchase/list',
      icon: 'shop',
      name: 'Purchase',
      component: './purchase/list',

      // routes: [
      //   {
      //     path: '/purchase',
      //     redirect: '/purchase/list',
      //   },
      //   {
      //     name: 'List',
      //     icon: 'smile',
      //     path: '/purchase/list',
      //     component: './purchase/list',
      //   },
      //   // {
      //   //   name: 'New',
      //   //   icon: 'smile',
      //   //   path: '/purchase/new',
      //   //   component: './purchase/entry',
      //   // },
      //   {
      //     name: 'Update',
      //     hideInMenu: true,
      //     icon: 'smile',
      //     path: '/purchase/edit/:id',
      //     component: './purchase/update',
      //   },
      // ],
    },
    // {
    //   path: '/list',
    //   icon: 'table',
    //   name: 'list',
    //   routes: [
    //     {
    //       path: '/list/search',
    //       name: 'search-list',
    //       component: './list/search',
    //       routes: [
    //         {
    //           path: '/list/search',
    //           redirect: '/list/search/articles',
    //         },
    //         {
    //           name: 'articles',
    //           icon: 'smile',
    //           path: '/list/search/articles',
    //           component: './list/search/articles',
    //         },
    //         {
    //           name: 'projects',
    //           icon: 'smile',
    //           path: '/list/search/projects',
    //           component: './list/search/projects',
    //         },
    //         {
    //           name: 'applications',
    //           icon: 'smile',
    //           path: '/list/search/applications',
    //           component: './list/search/applications',
    //         },
    //       ],
    //     },
    //     {
    //       path: '/list',
    //       redirect: '/list/table-list',
    //     },
    //     {
    //       name: 'table-list',
    //       icon: 'smile',
    //       path: '/list/table-list',
    //       component: './list/table-list',
    //     },
    //     {
    //       name: 'basic-list',
    //       icon: 'smile',
    //       path: '/list/basic-list',
    //       component: './list/basic-list',
    //     },
    //     {
    //       name: 'card-list',
    //       icon: 'smile',
    //       path: '/list/card-list',
    //       component: './list/card-list',
    //     },
    //   ],
    // },
    // {
    //   access: 'canAccess',
    //   path: '/products',
    //   icon: 'form',
    //   name: 'Products',
    //   routes: [
    //     {
    //       path: '/products',
    //       redirect: '/products/list',
    //     },
    //     {
    //       name: 'List',
    //       icon: 'smile',
    //       path: '/products/list',
    //       component: './product/product-list',
    //     },
    //     {
    //       name: 'New',
    //       icon: 'smile',
    //       path: '/products/new',
    //       component: './product/product-entry',
    //     },
    //     {
    //       name: 'Update',
    //       hideInMenu: true,
    //       icon: 'smile',
    //       path: '/products/edit/:id',
    //       component: './product/product-update',
    //     },

    //   ],
    // },
    // {
    //   path: '/profile',
    //   name: 'profile',
    //   icon: 'profile',
    //   routes: [
    //     {
    //       path: '/profile',
    //       redirect: '/profile/basic',
    //     },
    //     {
    //       name: 'basic',
    //       icon: 'smile',
    //       path: '/profile/basic',
    //       component: './profile/basic',
    //     },
    //     {
    //       name: 'advanced',
    //       icon: 'smile',
    //       path: '/profile/advanced',
    //       component: './profile/advanced',
    //     },
    //   ],
    // },
    // {
    //   name: 'result',
    //   icon: 'CheckCircleOutlined',
    //   path: '/result',
    //   routes: [
    //     {
    //       path: '/result',
    //       redirect: '/result/success',
    //     },
    //     {
    //       name: 'success',
    //       icon: 'smile',
    //       path: '/result/success',
    //       component: './result/success',
    //     },
    //     {
    //       name: 'fail',
    //       icon: 'smile',
    //       path: '/result/fail',
    //       component: './result/fail',
    //     },
    //   ],
    // },
    // {
    //   hideInMenu: true,
    //   name: 'exception',
    //   icon: 'warning',
    //   path: '/exception',
    //   routes: [
    //     {
    //       path: '/exception',
    //       redirect: '/exception/403',
    //     },
    //     {
    //       name: '403',
    //       icon: 'smile',
    //       path: '/exception/403',
    //       component: './exception/403',
    //       hideInMenu: true,
    //     },
    //     {
    //       name: '404',
    //       icon: 'smile',
    //       path: '/exception/404',
    //       component: './exception/404',
    //     },
    //     {
    //       name: '500',
    //       icon: 'smile',
    //       path: '/exception/500',
    //       component: './exception/500',
    //     },
    //   ],
    // },
    {
      name: 'account',
      icon: 'user',
      path: '/account',
      routes: [
        {
          name: 'settings',
          icon: 'smile',
          path: '/account/settings',
          component: './account/settings',
        },
      ],
    },
    // {
    //   name: 'editor',
    //   icon: 'highlight',
    //   path: '/editor',
    //   routes: [
    //     {
    //       path: '/editor',
    //       redirect: '/editor/flow',
    //     },
    //     {
    //       name: 'flow',
    //       icon: 'smile',
    //       path: '/editor/flow',
    //       component: './editor/flow',
    //     },
    //     {
    //       name: 'mind',
    //       icon: 'smile',
    //       path: '/editor/mind',
    //       component: './editor/mind',
    //     },
    //     {
    //       name: 'koni',
    //       icon: 'smile',
    //       path: '/editor/koni',
    //       component: './editor/koni',
    //     },
    //   ],
    // },
    // {
    //   path: '/',
    //   redirect: '/dashboard/analysis',
    // },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    // {
    //   requestLibPath: "import { request } from 'umi'",
    //   schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
    //   projectName: 'swagger',
    // },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
  define: {
    API_URL: REACT_APP_API_URL || 'http://localhost:5005',
    DEFAULT_PAGE_SIZE: REACT_APP_DEFAULT_PAGE_SIZE || 10,
  },
});
