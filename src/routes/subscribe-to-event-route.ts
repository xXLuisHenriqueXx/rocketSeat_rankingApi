import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { subscribeToEvent } from "../functions/subscribe-to-event";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    "/subscriptions",
    {
      schema: {
        tags: ["Subscription"],
        summary: "Create a new subscription to the event",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberID: z.string().uuid(),
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email, referrer } = request.body;

      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      });

      return reply
        .status(201)
        .send({ subscriberID: subscriberId, message: "Subscription created" });
    }
  );
};
