using vcp_sales_orders from '../db/schema';

@path: 'catalog'
service CatalogService {
  entity LOCATION    as projection on vcp_sales_orders.LOCATION;
  // entity SalesOrders as projection on vcp_sales_orders.SalesOrders;
  entity Products    as projection on vcp_sales_orders.Products;
  entity JOB_LOGS as projection on vcp_sales_orders.JOB_LOGS;
  entity Customers   as projection on vcp_sales_orders.Customers;
  // entity Logs        as projection on vcp_sales_orders.Logs;
  function call(UserT:String) returns String;
     type DynamicAppLauncher {
        subtitle     : String;
        title        : String;
        icon         : String;
        info         : String;
        infoState    : String;
        number       : Decimal(9, 2);
        numberDigits : Integer;
        numberFactor : String;
        numberState  : String;
        numberUnit   : String;
        stateArrow   : String;
    }

  type jobSc {
    name        : String;
    description : String;
    active      : Boolean;
    httpMethod  : String;
    action      : String;
    schedules   : array of job_schedules;
  }

  type job_schedules {
    description : String;
    type        : String;
    active      : Boolean;
    time        : String;
  }

   type response{
     res:String;
   }

  // Delivers KPI Information for Launchpad Tiles
  function getTileInfo(appName: String)                 returns DynamicAppLauncher;
  action CreateJobTemplate(CreateJob: array of jobSc) returns response;
  function  getJobsLogs() returns String;

}
