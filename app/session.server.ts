import { createCookieSessionStorage } from '@remix-run/node';

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({ 
    cookie: { 
      sameSite: "lax",
      secrets: ["s3cret1"], 
      name: '_royaltysubs_session', 
    } 
  });

export { getSession, commitSession, destroySession };
