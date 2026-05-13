import { expect, test, describe, beforeAll } from "vitest";
import coordinator from "../coordinator";

import { z } from "zod";

beforeAll(async () => {
  await coordinator.dropAndCreateSchema();
});

describe("Login POST", () => {
  describe("Login User", () => {
    test("", async () => {
      const request = await fetch("http://localhost:3003/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "estevam",
          password: "123456",
          email: "login@gmail.com",
        }),
      });

      const loginRequest = await fetch("http://localhost:3003/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "login@gmail.com",
          password: "123456",
        }),
      });

      const loginResponse = await loginRequest.json();
      const cookies = loginRequest.headers.get("set-cookie");

      expect(cookies).toBeDefined();

      const isUUID = z.uuidv4().safeParse(loginResponse.user.id).success;

      expect(isUUID).toBe(true);
      expect(loginResponse.user).toEqual({
        id: loginResponse.user.id,
        email: "login@gmail.com",
        name: "estevam",
        created_at: loginResponse.user.created_at,
        updated_at: loginResponse.user.updated_at,
        code_reference: null,
        features: [],
        codeReference: null,
      });
    });
  });
});
