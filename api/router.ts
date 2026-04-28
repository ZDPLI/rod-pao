import { authRouter } from "./auth-router";
import { createRouter, publicQuery } from "./middleware";
import { categoryRouter } from "./routers/category";
import { serviceRouter } from "./routers/service";
import { contentRouter } from "./routers/content";
import { settingsRouter } from "./routers/settings";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  category: categoryRouter,
  service: serviceRouter,
  content: contentRouter,
  settings: settingsRouter,
});

export type AppRouter = typeof appRouter;
