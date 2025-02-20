import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { env } from "./env";
import { accessInviteLinkRoute } from "./routes/access-invite-link-route";
import { getRankingRoute } from "./routes/get-ranking-route";
import { getSubscriberInviteClicksRoutes } from "./routes/get-subscriber-invite-clicks-route";
import { getSubscriberInviteCountRoutes } from "./routes/get-subscriber-invites-count-route";
import { getSubscriberRankingPositionRoutes } from "./routes/get-subscriber-ranking-position-routes";
import { subscribeToEventRoute } from "./routes/subscribe-to-event-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);
app.register(fastifyCors, {
  origin: true,
});

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Ranking API NLW",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(subscribeToEventRoute);
app.register(accessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoutes);
app.register(getSubscriberInviteCountRoutes);
app.register(getSubscriberRankingPositionRoutes);
app.register(getRankingRoute);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server is running on port 3333");
});
