import { createConnection, getConnection } from "typeorm/globals";

async function connect() {
  await createConnection();
}

export default {
  connect,
  getConnection,
};
