export const request = async <T>(url: string, method: string): Promise<T> => {
  try {
    const response = await fetch(url, { method });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} - ${response.statusText}`
      );
    }

    const data = (await response.json()) as T;
    return data;
  } catch (error) {
    throw new Error(`Error occurred: ${(error as Error).message}`);
  }
};
