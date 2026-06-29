// Shared constant kept in its own module so it can be imported without pulling
// in the content store (data.ts), which reads localStorage at import time.
export const STORAGE_KEY = "siteContent";
