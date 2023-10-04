interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Operations Manager', 'Driver', 'Customer Service Representative', 'Passenger'],
  tenantName: 'Team',
  applicationName: 'shuttletaxi v1',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage future bookings', 'Manage routes', 'Manage drivers', 'Manage vehicles'],
  getQuoteUrl: 'https://app.roq.ai/proposal/98362580-4394-423a-b073-12015fcb721d',
};
