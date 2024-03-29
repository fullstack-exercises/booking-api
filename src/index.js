import express from "express";
import "dotenv/config";

// Routes
import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";

// Sentry
import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";

// Middleware
import notFoundErrorHandler from "./middleware/notFoundErrorHandler.js";
import log from "./middleware/logMiddleware.js";

const app = express();

Sentry.init({
  dsn: "https://72545ff7a8ba3288a8886d86a06cb8b6@o4506665413640193.ingest.sentry.io/4506665424715776",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

// Log
app.use(log);

// Routes
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

// app.get("/", (req, res) => {
//   res.send("Hello world!");
// });

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(notFoundErrorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
