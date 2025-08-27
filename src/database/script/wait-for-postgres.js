"use strict";
exports.__esModule = true;
var node_child_process_1 = require("node:child_process");
function checkPostgres() {
    (0, node_child_process_1.exec)("docker exec postgres-dev pg_isready --host localhost", handleReturn);
    function handleReturn(error, stdout) {
        if (stdout.search("accepting connections") === -1) {
            process.stdout.write(".");
            checkPostgres();
            return;
        }
        console.log("\n🟢 Postgres está pronto e aceitando conexões!\n");
    }
}
process.stdout.write("\n\n🔴 Aguardando Postgres aceitar conexões");
checkPostgres();
