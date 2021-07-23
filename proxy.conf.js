const server = 'https://demo.incentro.digital'
module.exports = {
  "/alfresco": {
    "target": server,
    "secure": false,
    "changeOrigin": true
  },
  "/activiti-app": {
    "target": server,
    "secure": false,
    "changeOrigin": true
  }
};
