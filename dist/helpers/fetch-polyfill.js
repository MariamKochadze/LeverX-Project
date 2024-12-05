export const request = async (url, method) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve({
                    json() {
                        return new Promise((res, rej) => {
                            try {
                                res(JSON.parse(xhr.responseText));
                            }
                            catch (error) {
                                rej(new Error('Faild to parse'));
                            }
                        });
                    },
                });
            }
            else {
                reject(new Error(`Failed to load users: ${xhr.status}`));
            }
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send();
    });
};
//# sourceMappingURL=fetch-polyfill.js.map