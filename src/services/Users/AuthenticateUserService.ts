import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../repositories/UserRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { instanceToPlain } from "class-transformer";
import * as cookie from "cookie";
import { Response } from "express";

interface IAuthenticateRequest {
  name: string;
  password: string;
}

const EXPIRATIONS_IN_MILLISECONDS = 60 * 60 * 24 * 30 * 1000; // 30 Days

function setSessionCookie(sessionToken: string, response: Response) {
  const setCookie = cookie.serialize("session_id", sessionToken, {
    path: "/",
    maxAge: EXPIRATIONS_IN_MILLISECONDS / 1000,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
}

function clearSessionCookie(response: Response) {
  const setCookie = cookie.serialize("session_id", "invalid", {
    path: "/",
    maxAge: -1,
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  });

  response.setHeader("Set-Cookie", setCookie);
}

function getCookie(cookies: string) {
  return cookie.parseCookie(cookies);
}

class AuthenticateUserService {
  async execute({ name, password }: IAuthenticateRequest) {
    const userRepositories = getCustomRepository(UserRepositories);

    const user = await userRepositories.findOne(
      {
        name,
      },
      { relations: ["codeReference"] },
    );
    if (!user) {
      throw new Error("Email/Senha está incorreto");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email/Senha está incorreto");
    }

    const token = sign(
      {
        name: user.name,
      },
      "51dfd5bda8356ced09e100a297586a3d",
      {
        subject: String(user.id),
      },
    );

    let userResponse = instanceToPlain(user);

    return { ...userResponse, token };
  }
}

export {
  AuthenticateUserService,
  clearSessionCookie,
  setSessionCookie,
  getCookie,
};
