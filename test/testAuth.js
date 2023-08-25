document.addEventListener('DOMContentLoaded', async () => {
    let defaultClient = myohioassembly.ApiClient.instance;

    // Configure HTTP basic authorization: basicEmailPassword
    let basicEmailPassword = defaultClient.authentications['basicEmailPassword'];
    basicEmailPassword.username = 'user4@myohioassembly.com';
    basicEmailPassword.password = 'User4';

    let apiInstance = new myohioassembly.AuthApi();

    let req = {
        captchaResToken: 'a709118c-7b73-47ea-aa15-d419f50c1556',
        elevatedPass: 'User44'
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
