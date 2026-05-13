async function dropAndCreateSchema() {
  await fetch("http://localhost:3003/dropschema", {
    method: "GET",
  });
}

const coordinator = {
  dropAndCreateSchema,
};

export default coordinator;
