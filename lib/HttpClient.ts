class HttpClient {
    private constructor() {
        //
    }

    static createInstance(): HttpClient {
        return new HttpClient();
    }

    async get(url: string): Promise<unknown> {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await import(`/api/mocks/${url}`);
                resolve(value.default);
            } catch (e) {
                reject(new Error('invalid "url"'));
            }
        });
    }
    //you can realise another httpClient methods here
}

export default HttpClient.createInstance();
