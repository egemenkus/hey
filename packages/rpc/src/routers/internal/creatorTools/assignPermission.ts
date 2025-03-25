import { Regex } from "@hey/data/regex";
import prisma from "@hey/db/prisma/db/client";
import { TRPCError } from "@trpc/server";
import { boolean, object, string } from "zod";
import { creatorToolsAccess } from "../../../middlewares/creatorToolsAccess";
import { authedProcedure } from "../../../procedures/authedProcedure";

export const assignPermission = authedProcedure
  .use(creatorToolsAccess)
  .input(
    object({
      account: string().regex(Regex.evmAddress),
      permission: string(),
      enabled: boolean()
    })
  )
  .mutation(async ({ input }) => {
    try {
      const { account, permission, enabled } = input;

      if (enabled) {
        await prisma.accountPermission.create({
          data: { permissionId: permission, accountAddress: account }
        });

        return { enabled };
      }

      await prisma.accountPermission.deleteMany({
        where: { permissionId: permission, accountAddress: account }
      });

      return { enabled };
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  });
