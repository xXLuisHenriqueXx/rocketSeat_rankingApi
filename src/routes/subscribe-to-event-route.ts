import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    "/subscriptions",
    {
      schema: {
        tags: ["subscription"],
        summary: "Create a new subscription to the event",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      console.log(name, email);

      return reply.status(201).send({ message: "Subscription created" });
    }
  );
};
