import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

class Database {
  userName = process.env.DBUser;
  password = process.env.DBPass;
  host = process.env.DBHost;
  port = process.env.DBPort;
  dbName = process.env.DBName;
  dbDialect = process.env.DBDialect;
  sequelize = new Sequelize(this.dbName, this.userName, this.password, {
    host: this.host,
    dialect: this.dbDialect,
  });

  connect = async () => {
    await this.sequelize.authenticate();
    console.log("db Contected");
  };
  sync = async () => {
    try {
      await this.sequelize.sync();
      console.log("db sync");
    } catch (err) {
      console.log("db sync error");
    } finally {
      this.sequelize.close();
    }
  };
}

export default Database;
