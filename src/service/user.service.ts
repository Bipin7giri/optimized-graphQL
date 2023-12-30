import { it } from "node:test";
import { SuccessMessage } from "../utils/response.utils";
import AppError from "../utils/appError.utils";
import { AppDataSource } from "../PGDB/data-source";
import { User } from "../entities/User.entity";
import { Users, UsersInput } from "../resolvers/resolvers-types";
import { Education } from "../entities/Education.entity";

class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private educationRepository = AppDataSource.getRepository(Education);

    constructor() {
    }

    async getAll(payload: { parentTable: string[], relations: Record<string, string[]> }): Promise<Users[]> {
        const data = await this.userRepository.find({ select: payload.parentTable as any, relations: Object.keys(payload.relations) })
        return data as unknown as Users[]
    }


    async add(data: UsersInput): Promise<string> {
        const userData = await this.userRepository.save({
            name: data.name,
            address: data.address,
            age: Number(data.age),
        })
        const educationData = await this.educationRepository.save({
            collegeName: data.education.collegeName,
            courseName: data.education.courseName,
            level: data.education.level,
            user: userData
        })
        return SuccessMessage.Created
    }
}

export default UserService;
