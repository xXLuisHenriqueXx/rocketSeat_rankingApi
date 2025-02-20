import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getSubscriberInviteCount } from "../functions/get-subscriber-invites-count";

export const getSubscriberInviteCountRoutes: FastifyPluginAsyncZod =
  async app => {
    app.get(
      "/subscribers/:subscriberId/ranking/count",
      {
        schema: {
          tags: ["Referral"],
          summary: "Get subscriber invites count",
          params: z.object({
            subscriberId: z.string(),
          }),
          response: {
            200: z.object({
              count: z.number(),
            }),
          },
        },
      },
      async request => {
        const { subscriberId } = request.params;

        const { count } = await getSubscriberInviteCount({ subscriberId });

        return { count };
      }
    );
  };
