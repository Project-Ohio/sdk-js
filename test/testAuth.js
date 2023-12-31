document.addEventListener('DOMContentLoaded', async () => {
    let defaultClient = myohioassembly.ApiClient.instance;

    // Configure HTTP basic authorization: basicEmailPassword
    let basicEmailPassword = defaultClient.authentications['basicEmailPassword'];
    basicEmailPassword.username = 'admin@myohioassembly.com';
    basicEmailPassword.password = 'Admin23';

    let apiInstance = new myohioassembly.AuthApi();

    let req = {
        captchaResToken: '13a9aee1-0d94-4335-8ebe-bb4b1fb19e68',
        elevatedPass: 'mmsAdmin2323'
    }

    let opts = {
        'authLoginCreateRequest': req
    };

    let res;
    try {
        res = await new Promise((resolve, reject) => {
            apiInstance.authLoginCreate(opts, (error, data, response) => {
                if (error) {
                    reject({
                        summary: response,
                        res: {
                            status: error.status,
                            body: error.response.body
                        }
                    });
                    return;
                }

                // success
                resolve(response.body);
            });
        });
    } catch (err) {
        console.log('request error:', JSON.stringify(err, null, 2));
        return;
    }
    console.log('request success:', JSON.stringify(res, null, 2));
})
