const cds = require('@sap/cds');
const req = require('express/lib/request');
const axios = require('axios');
const { INSERT } = require('@sap/cds/lib/ql/cds-ql');
module.exports = (srv) => {
  srv.on('UPDATE', 'tenant', async (req) => {
    const { subscribedSubdomain, subscribedTenantId, xsappname } = req.data;
    console.log("Subdomain:", subscribedSubdomain);
    console.log("Tenant ID:", subscribedTenantId);
    console.log("XSUAA App:", xsappname);

    // Optionally, you can store or use this info
  });
  srv.on('getTileInfo', async (req, res) => {
    let { appName } = req.data;
    try {
      if (appName == 'L') {
        let getLocation = await cds.run('select * from VCP_SALES_ORDERS_LOCATION;')
        return {
          subtitle: "Locations",
          title: "LOCATION",
          icon: "sap-icon://locate-me",
          info: "1600 Created",
          infoState: (getLocation.length > 5) ? 'Positive' : (getLocation.length >= 2) ?'Critical':'Negative',
          number: (getLocation.length).toString(),
          numberDigits: 1,
          numberFactor: "L",
          numberState: (getLocation.length > 5) ? 'Positive' : (getLocation.length >= 2) ?'Critical':'Negative',
          numberUnit: "INR",
          stateArrow: (getLocation.length > 5) ? 'Up' : 'Down'
        }
      }
      if (appName == 'P') {
        let getProducts = await cds.run('select * from VCP_SALES_ORDERS_PRODUCTS;')
        return {
          subtitle: "product",
          title: "PRODUCTS",
          icon: "sap-icon://product",
          info: "V_1600 Created",
          infoState: (getProducts.length > 5) ? 'Positive' :(getProducts.length >= 2) ?'Critical':'Negative',
          number: (getProducts.length).toString(),
          numberDigits: 1,
          numberFactor: "P",
          numberState: (getProducts.length > 5) ? 'Positive' :(getProducts.length >= 2) ?'Critical':'Negative',
          numberUnit: "INR",
          stateArrow: (getProducts.length > 5) ? 'Up' : 'Down'
        }
      }
      if (appName == 'C') {
        let getCustomers = await cds.run('select * from VCP_SALES_ORDERS_CUSTOMERS;')
        return {
          subtitle: "Customers",
          title: "CUSTOMERS",
          icon: "sap-icon://group",
          info: "01 Created",
          infoState: (getCustomers.length > 5) ? 'Critical' : (getCustomers.length >= 2) ? 'Critical' : 'Negative',
          number: (getCustomers.length).toString(),
          numberDigits: 1,
          numberFactor: "C",
          numberState: (getCustomers.length > 5) ? 'Critical' : (getCustomers.length >= 2) ? 'Critical' : 'Negative',
          numberUnit: "INR",
          stateArrow: (getCustomers.length > 5) ? 'Up' : 'Down'
        }
      }
      if (appName == 'O') {
        let getJoblogs = await cds.run('select * from VCP_SALES_ORDERS_JOB_LOGS;')
        return {
          subtitle: "Job overview",
          title: "JOBOVERVIEW",
          icon: "sap-icon://switch-views",
          info: 'Jobs',
          infoState: (getJoblogs.length > 5) ? 'Critical' : (getJoblogs.length >= 2) ? 'Critical' : 'Negative',
          number: (getJoblogs.length).toString(),
          numberDigits: 1,
          numberFactor: "J",
          numberState: (getJoblogs.length > 5) ? 'Critical' : (getJoblogs.length >= 2) ? 'Critical' : 'Negative',
          numberUnit: "INR",
          stateArrow: (getJoblogs.length > 5) ? 'Up' : 'Down'
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
  srv.on('CreateJobTemplate',async(req)=>{
     let Jobs = req.data.CreateJob;
    try {
      for (let index = 0; index < Jobs.length; index++) {
        const element = Jobs[index];
        let UserId = (req.headers['x-forwarded-host']).split('-')[0];
        const apiUrl = 'https://jobscheduler-rest.cfapps.us10.hana.ondemand.com/scheduler/jobs';
        const user = 'sbss_q2swbfcgu7bnpudzwfutebll+3uvxall6knw6vs9iznyp4oe+ffu3r8zgyesryc4him=';
        const pass = 'aa_dVLtLhBFjGm3uEAXz1jgTCv7g68=';
        let userName = element.name
        element['name'] = `${element.name}_${UserId}`

        const response = await axios.post(apiUrl, element, {
          auth: {
            username: user,
            password: pass
          }
        });
        console.log('Response:', response.data);
        let Struc = {
          name: userName,
          description: element.description,
          active: element.active,
          httpMethod: element.httpMethod,
          action: element.action
        }

        await cds.run(INSERT.into("VCP_SALES_ORDERS_JOB_LOGS").entries(Struc))
        return {
          res: response.data
        }
      }
    } catch (error) {
      console.log(error)
    }
  })
  srv.on('getJobsLogs',async(req)=>{
    try {
  

    } catch (error) {
       console.log(error)
    }
  })
};

// Example usage
