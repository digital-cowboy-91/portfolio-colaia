const base = process.env.SERVER_BASE_URL;

export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  try {
    const res = await fetch(base + endpoint, options);

    return await res.json();
  } catch (error) {
    throw error;
  }
}
