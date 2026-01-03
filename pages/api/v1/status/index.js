import database from "infra/database.js";

async function status(request, response) {
  const databaseVersionJson = await database.query("SELECT version();");

  const databaseVersion = databaseVersionJson.rows[0].version.split(" ")[1];

  const databaseMaxConnectionsJson = await database.query(
    "SHOW max_connections;",
  );

  const databaseMaxConnections =
    databaseMaxConnectionsJson.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const databaseConnectionsJson = await database.query({
    text: "SELECT * FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });

  const databaseConnections = databaseConnectionsJson.rowCount;

  const updateAt = new Date().toISOString();

  response.status(200).json({
    update_at: updateAt,
    dependecies: {
      database: {
        version: databaseVersion,
        max_connections: parseInt(databaseMaxConnections),
        openned_connections: parseInt(databaseConnections),
      },
    },
  });
}

export default status;
