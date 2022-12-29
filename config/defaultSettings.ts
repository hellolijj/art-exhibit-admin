import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  "title": ' ',
  "navTheme": "light",
  "colorPrimary": "#f46e00",
  "layout": "mix",
  "contentWidth": "Fluid",
  "fixedHeader": true,
  "fixSiderbar": false,
  "pwa": false,
  "logo": "/logo2.png",
  "splitMenus": false,
  "siderMenuType": "sub"
};

export default Settings;
