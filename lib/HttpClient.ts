class HttpClient {
    private constructor() {
        //
    }

    static createInstance(): HttpClient {
        return new HttpClient();
    }

    async get<T = unknown>(url: string): Promise<T> {
        return new Promise(async (resolve, reject) => {
            try {
                const value = await import(`/api/mocks/${url}`);
                resolve(value.default);
            } catch (e) {
                reject(new Error('invalid "url"'));
            }
        });
    }
}

export default HttpClient.createInstance();
