import { User } from "../../generated/prisma/client";

export type LocalStrategyResponse = {
  auth: {
    token: string;
  },
  user: User;
}