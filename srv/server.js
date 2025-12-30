const cds = require("@sap/cds");

cds.on("bootstrap", (app) => {

//   app.use(async (req, res, next) => {
//         try {
//             if (req.url == '/' ) {
//                 next()
//             } 
//             if ((req.path.includes('LOCATION')) || (req.path.includes('$metadata'))) {
//                  await authenticate(req, next)
//             }
//             else
//             {
//                 next()
//             }

//         } catch (error) {
//             console.log(error)
//             next()
//         }
//     })
})
// Start CDS server
module.exports = cds.server;


// Function to make a POST request with basic authentication


