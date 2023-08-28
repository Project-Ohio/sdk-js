document.addEventListener('DOMContentLoaded', async () => {
    let defaultClient = myohioassembly.ApiClient.instance;

    // Configure Bearer (JWT) access token for authorization: bearerTokenAuth
    let bearerTokenAuth = defaultClient.authentications['bearerTokenAuth'];
    bearerTokenAuth.accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJteW9oaW9hc3NlbWJseS5jb20iLCJzdWIiOiIxNzcwODJhZS0xNjZlLTQ2MzItYWYxMC01MDM5ZWVmNmJhOTEiLCJleHAiOjE2OTMyNzE4MTEsImp0aSI6IjNjZmRjMWYzLTg4M2ItNGYyYy1iNDcxLTMxNjE3MGE0NWYyZSIsInJvbGUiOjN9.NuH9oTy0QuuaYBArTjUFRwyuA4FqBbyngLVSDbENDsg";

    let apiInstance = new myohioassembly.AuthApi();

    let opts = {
        'authEmailUpdateRequestRequest': new myohioassembly.AuthEmailUpdateRequestRequest(
            'email@example.com',
            'email@example.com'
        )
    };

    let res;
    try {
        res = await new Promise((resolve, reject) => {
            apiInstance.authEmailUpdateRequest(opts, (error, data, response) => {
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
