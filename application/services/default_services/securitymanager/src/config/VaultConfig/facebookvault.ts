var vault = require("node-vault")
({ 
    apiVersion: 'v1', 
    endpoint: process.env.vault, 
    token: 'vault-geppetto-2021' 
});

export class VaultConfig 
{
    facebookvaultConfig(callback) 
    {
        vault.read('sso/login/facebook').then((credentials) => 
        {
            callback(credentials.data);
        });
    }
}