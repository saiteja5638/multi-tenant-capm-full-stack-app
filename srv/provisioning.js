const cds = require('@sap/cds');

module.exports = cds.service.impl(async function() {
  const provisioning = await cds.connect.to('cds.xt.SaasProvisioningService');

  provisioning.on('UPDATE', 'tenant', async (req) => {
    const { subscribedTenantId, subscribedSubdomain, xsappname, planName } = req.data;

    console.log('➡️ Tenant subscription started...');
    console.log('Tenant ID:', subscribedTenantId);
    console.log('Subdomain:', subscribedSubdomain);
    console.log('XSUAA app:', xsappname);
    console.log('Service Plan:', planName);

    // Build the subscriber-specific token URL
    const xsuaaBaseUrl = process.env.XSUAA_SERVICE_URL; // your provider XSUAA
    const tenantXsuaaUrl = xsuaaBaseUrl.replace(
      'https://',
      `https://${subscribedSubdomain}.`
    );

    console.log('Tenant-specific XSUAA URL:', tenantXsuaaUrl);

    // You can store this if you need per-tenant XSUAA access later:
    await cds.tx(req).run(
      INSERT.into('Tenants').entries({
        tenant_id: subscribedTenantId,
        subdomain: subscribedSubdomain,
        xsappname,
        xsuaa_url: tenantXsuaaUrl
      })
    );

    // Finish provisioning
    return 'Subscription successful';
  });
});
