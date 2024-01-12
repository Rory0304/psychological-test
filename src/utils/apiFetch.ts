interface RequestOptions {
  method?: 'POST' | 'GET';
  headers?: { [key: string]: string };
  body?: string | object;
}

const apiFetch = <T>(url: string, options: RequestOptions = {}) => {
  return new Promise<T>((resolve, reject) => {
    fetch(url, {
      method: options.method || 'GET',
      headers: options.headers || { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `HTTP error: ${response.status} - ${response.statusText}`
          );
        }
        return response.json();
      })
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

export default apiFetch;
