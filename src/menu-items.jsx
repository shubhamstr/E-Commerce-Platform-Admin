// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MailIcon from '@mui/icons-material/Mail';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import DnsIcon from '@mui/icons-material/Dns';

const icons = {
  PeopleIcon: PeopleIcon,
  CategoryIcon: CategoryIcon,
  ShoppingBagIcon: ShoppingBagIcon,
  ContactMailIcon: ContactMailIcon,
  ReceiptIcon: ReceiptIcon,
  MailIcon: MailIcon,
  CloudUploadIcon: CloudUploadIcon,
  LocalOfferIcon: LocalOfferIcon,
  DnsIcon: DnsIcon,
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon
};

// ==============================|| MENU ITEMS ||============================== //

// eslint-disable-next-line
export default {
  items: [
    {
      id: 'navigation',
      title: 'ShopNest',
      caption: 'Dashboard',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          url: '/dashboard/default'
        }
      ]
    },
    {
      id: 'manage',
      title: 'Manage',
      // caption: 'Prebuild Pages',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'manage-users',
          title: 'Manage Users',
          type: 'item',
          url: '/manage-users',
          icon: icons['PeopleIcon'],
          allowedRoles: ['admin']
        },
        {
          id: 'manage-categories',
          title: 'Manage Categories',
          type: 'item',
          url: '/manage-categories',
          icon: icons['CategoryIcon'],
          allowedRoles: ['admin']
        },
        {
          id: 'manage-products',
          title: 'Manage Products',
          type: 'item',
          url: '/manage-products',
          icon: icons['ShoppingBagIcon'],
          allowedRoles: ['admin', 'seller']
        },
        {
          id: 'bulk-import-products',
          title: 'Bulk Import Products',
          type: 'item',
          url: '/manage-products/bulk-import',
          icon: icons['CloudUploadIcon'],
          allowedRoles: ['admin', 'seller']
        },
        {
          id: 'manage-contacts',
          title: 'Manage Contacts',
          type: 'item',
          url: '/manage-contacts',
          icon: icons['ContactMailIcon'],
          allowedRoles: ['admin']
        },
        {
          id: 'manage-orders',
          title: 'Manage Orders',
          type: 'item',
          url: '/manage-orders',
          icon: icons['ReceiptIcon'],
          allowedRoles: ['admin', 'seller']
        },
        {
          id: 'manage-email-logs',
          title: 'Email Logs',
          type: 'item',
          url: '/manage-email-logs',
          icon: icons['MailIcon'],
          allowedRoles: ['admin']
        },
        {
          id: 'manage-system-logs',
          title: 'App Health & Logs',
          type: 'item',
          url: '/manage-system-logs',
          icon: icons['DnsIcon'],
          allowedRoles: ['admin']
        },
        {
          id: 'manage-audit-logs',
          title: 'Audit Logs',
          type: 'item',
          url: '/manage-audit-logs',
          icon: icons['SecurityOutlinedIcon'],
          allowedRoles: ['admin']
        },
        {
          id: 'manage-coupons',
          title: 'Manage Coupons',
          type: 'item',
          url: '/manage-coupons',
          icon: icons['LocalOfferIcon'],
          allowedRoles: ['admin', 'seller']
        },
        {
          id: 'sample-page',
          title: 'Sample Page',
          type: 'item',
          url: '/sample-page',
          icon: icons['ChromeReaderModeOutlinedIcon'],
          allowedRoles: ['admin', 'seller']
        }
        // {
        //   id: 'auth',
        //   title: 'Authentication',
        //   type: 'collapse',
        //   icon: icons['SecurityOutlinedIcon'],
        //   children: [
        //     {
        //       id: 'login-1',
        //       title: 'Login',
        //       type: 'item',
        //       url: '/login',
        //       target: true
        //     },
        //     {
        //       id: 'register',
        //       title: 'Register',
        //       type: 'item',
        //       url: '/register',
        //       target: true
        //     }
        //   ]
        // }
      ]
    }
    // {
    //   id: 'utils',
    //   title: 'Utils',
    //   type: 'group',
    //   icon: icons['AccountTreeOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'util-icons',
    //       title: 'Icons',
    //       type: 'item',
    //       url: 'https://mui.com/material-ui/material-icons/',
    //       icon: icons['AppsOutlinedIcon'],
    //       external: true,
    //       target: true
    //     },
    //     {
    //       id: 'util-typography',
    //       title: 'Typography',
    //       type: 'item',
    //       url: '/utils/util-typography',
    //       icon: icons['FormatColorTextOutlinedIcon']
    //     }
    //   ]
    // },
    // {
    //   id: 'support',
    //   title: 'Support',
    //   type: 'group',
    //   icon: icons['ContactSupportOutlinedIcon'],
    //   children: [
    //     {
    //       id: 'disabled-menu',
    //       title: 'Disabled Menu',
    //       type: 'item',
    //       url: '#',
    //       icon: icons['BlockOutlinedIcon'],
    //       disabled: true
    //     },
    //     {
    //       id: 'documentation',
    //       title: 'Documentation',
    //       type: 'item',
    //       url: 'https://codedthemes.gitbook.io/materially-react-material-documentation/',
    //       icon: icons['HelpOutlineOutlinedIcon'],
    //       external: true,
    //       target: true
    //     }
    //   ]
    // }
  ]
};
