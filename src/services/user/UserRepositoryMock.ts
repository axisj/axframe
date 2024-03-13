import { delay } from "@axframe/utils";
import {
  GetProgramFnRequest,
  GetProgramFnResponse,
  PutChangePwRequest,
  PutChangePwResponse,
  SignInRequest,
  SignInResponse,
  UserRepositoryInterface,
} from "./UserRepositoryInterface";
import { setApiHeader } from "../apiWrapper";
import { setAppData } from "@core/utils/store";
import pkg from "../../../package.json";
import { v4 as uuidv4 } from "uuid";
import { signInMockData } from "services/serviceMockUpData";

export class UserRepositoryMock implements UserRepositoryInterface {
  async signIn(_params: SignInRequest): Promise<SignInResponse> {
    await delay(300);

    // throw new ApiError(ApiErrorCode.ACCESS_DENIED);

    const headers = {
      authorization: uuidv4(),
      token: uuidv4(),
    };

    setApiHeader(headers.authorization);
    setAppData({
      name: pkg.name,
      version: pkg.version,
      authorization: headers.authorization,
      token: headers.token ?? "",
    });

    return {
      rs: signInMockData,
    };
  }

  signOut(): Promise<void> {
    return Promise.resolve(undefined);

    // await apiWrapper<SignInResponse>("get", "/v1/users/logout", {}, { ignoreError: true });
    // return;
  }

  async getProgramFn(_params: GetProgramFnRequest): Promise<GetProgramFnResponse> {
    await delay(100);
    return {
      ds: ["fn01", "fn02", "fn03", "fn04"],
    };
  }

  async putChangePw(_params: PutChangePwRequest): Promise<PutChangePwResponse> {
    await delay(300);
    return {};
  }
}
