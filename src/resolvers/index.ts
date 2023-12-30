
import { SuccessMessage } from "../utils/response.utils";
import AppError from "../utils/appError.utils";
import {
  Users,
  Resolvers,
  UsersInput,
} from "./resolvers-types";
import UserService from "../service/user.service";
import { parseSelectionSet } from "../utils/ParseGraphqlReq";

const userService = new UserService();
export const resolvers: Resolvers = {
  Query: {
    user: async (_, args, context, info: any): Promise<Users[]> => {
      const parsedFields: any = parseSelectionSet(info.fieldNodes[0].selectionSet.selections);
      const data = await userService.getAll(parsedFields)
      return data as unknown as Users[]
    },
  },
  Mutation: {
    createUser: async (
      _,
      args: { input: UsersInput }
    ): Promise<string> => {
      try {
        return await userService.add(args.input)
      } catch (error) {
        throw AppError.InternalServer(SuccessMessage.SERVER_ERROR);
      }
    },
  },
};
