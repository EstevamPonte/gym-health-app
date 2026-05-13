import { expect, test, describe, beforeAll } from "vitest";
import coordinator from "../coordinator";

beforeAll(async () => {
  await coordinator.dropAndCreateSchema();
});

describe("User POST", () => {
  describe("Create User", () => {
    test("Create User", async () => {
      const request = await fetch("http://localhost:3003/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "estevam",
          password: "123456",
          email: "tecoponte@gmail.com",
        }),
      });

      const response = await request.json();

      expect(response).toEqual({
        id: response.id,
        name: "estevam",
        email: "tecoponte@gmail.com",
        created_at: response.created_at,
        updated_at: response.updated_at,
        features: [],
      });

      expect(request.status).toBe(200);
    });

    test("Create User with same email", async () => {
      const request = await fetch("http://localhost:3003/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "estevam2",
          password: "123456",
          email: "tecoponte@gmail.com",
        }),
      });
      const response = await request.json();
      expect(request.status).toBe(400);
      expect(response.error).toBe("Já existe um usuário com esse nome");
    });

    test("Create User with invalid email", async () => {
      const request = await fetch("http://localhost:3003/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "estevam2",
          password: "123456",
          email: "tecopontegmail.com",
        }),
      });

      const response = await request.json();
      const errorParsed = JSON.parse(response.error);

      expect(request.status).toBe(400);
      expect(errorParsed.fieldErrors.email).toBeDefined();
      expect(errorParsed.fieldErrors.email[0]).toBe("Email invalido");
    });

    test("Create User with invalid password", async () => {
      const request = await fetch("http://localhost:3003/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "estevam2",
          password: "123",
          email: "password@gmail.com",
        }),
      });

      const response = await request.json();
      const errorParsed = JSON.parse(response.error);

      expect(request.status).toBe(400);
      expect(errorParsed.fieldErrors.password).toBeDefined();
      expect(errorParsed.fieldErrors.password[0]).toBe(
        "A senha deve ter pelo menos 6 caracteres",
      );
    });

    test("Create User with no password", async () => {
      const request = await fetch("http://localhost:3003/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "estevam2",
          email: "password@gmail.com",
        }),
      });

      const response = await request.json();

      console.log(response.error);

      expect(request.status).toBe(400);
      expect(response.error).toBe("Senha precisa ser informada");
    });
  });
});
