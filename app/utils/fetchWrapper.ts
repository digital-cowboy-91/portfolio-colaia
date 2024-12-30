const base = process.env.SERVER_BASE_URL;

export async function fetcher(endpoint: string, options?: RequestInit) {
  try {
    const res = await fetch(base + endpoint, options);

    try {
      return await res.json();
    } catch (jsonError) {
      return await res.text();
    }
  } catch (error) {
    throw error;
  }
}
