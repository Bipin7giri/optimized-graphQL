import { AppDataSource } from "../PGDB/data-source";

export const connectDb = () => {
  AppDataSource.initialize()
    .then(() => {
      console.log("Database connected")
    })
    .catch((error) => console.log(error));
};
