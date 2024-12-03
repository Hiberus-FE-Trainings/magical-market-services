export const secret = "secret-key";

export const generateKey = async () => {
  return await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"]
  );
};
