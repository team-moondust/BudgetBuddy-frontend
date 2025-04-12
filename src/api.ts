export async function api<Res extends object, Req extends object>(
  method: "GET" | "POST",
  endpoint: string,
  payload: Req
) {
  const fetchRes = await fetch(
    `${import.meta.env.VITE_API_URL}/api${endpoint}`,
    {
      method,
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const jsonRes = await fetchRes.json();
  return jsonRes as Res;
}
