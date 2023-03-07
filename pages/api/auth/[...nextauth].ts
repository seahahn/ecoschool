import NextAuth, {Account, Session, User} from "next-auth";
import {JWT} from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Auth 로그인 및 토큰 등 사용자 정보를 가져오기 위한 설정
 * 현재는 keycloak만을 위한 설정임
 */
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      id: "email-password-credential",
      name: "Credentials",
      type: "credentials",
      credentials: {
        phone: {label: "Phone", type: "text", placeholder: "010-0000-0000"},
        password: {label: "Password", type: "password"},
      },
      async authorize(credentials: any, req: any) {
        // console.log('credentials', credentials);
        const {id, password} = credentials;

        try {
          // const result = await apis.signIn({phone, password});
          const result = {
            access_token: "********************",
            expires_in: 3600,
            refresh_expires_in: 36000,
            refresh_token: "********************",
            token_type: "Bearer",
            id_token: "********************",
            "not-before-policy": 1654161106,
            session_state: "test",
            scope: "openid email profile",
            status: 201,
          };
          console.log("Login authorize result", result);

          if (result.status !== 201) {
            throw new Error("unknown error");
          }
          // 정상적으로 로그인 성공
          console.log("Login authorize success");
          return {...credentials, ...result}; // 아래 callbacks-jwt의 user로 전달됨
        } catch (err: any) {
          /** 로그인 실패한 경우
           * 잘못된 정보 입력 or 첫 로그인으로 인한 비밀번호 변경 필요 -> err.response
           * 사용자 인증 서버가 꺼져있음 -> err
           * 이외에는 알 수 없는 에러
           */
          console.log("Login authorize error", err);
          return err.response ? err.response : err;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({user, account, profile, email, credentials}) {
      // if (user.status === 201) {
      console.log("signIn success", user);
      return true;
      // }

      /** When using the Credentials Provider the user object is the response returned from the authorize callback
       * and the profile object is the raw body of the HTTP POST submission.
       * 참고: https://next-auth.js.org/configuration/callbacks#sign-in-callback
       */
      // if (user.status === 401) {
      //   // 잘못된 사용자 정보 입력한 경우
      //   console.log("signIn wrongInfo", user);
      //   throw new Error("401");
      // } else if (user.status === 400) {
      //   // 첫 로그인 등으로 인해 임시 비밀번호 변경해야 할 경우
      //   console.log("signIn updatepw", user);
      //   throw new Error("400");
      // } else if (user.code === "ECONNREFUSED") {
      //   // 서버가 꺼져있는 경우
      //   // response: undefined
      //   console.log("signIn ECONNREFUSED", user);
      //   throw new Error("500");
      // } else {
      //   // 알 수 없는 에러
      //   console.log("signIn error", user);
      //   return false;
      // }
    },
    async redirect({url, baseUrl}) {
      // redirect할 URL이 별도로 지정된 경우, 해당 URL으로 redirect함
      const targetUrl = url === baseUrl ? baseUrl : url;
      return targetUrl;
    },
    async session({session, token}: {session: Session; token: JWT}) {
      // jwt에서 보낸 token이 여기로 전달됨
      const newSession = {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        idToken: token.idToken,
        error: token.error ? token.error : null,
      };
      // console.log('session', session);

      return newSession;
    },
    async jwt({token, user, account}: {token: JWT; user?: User | null; account?: Account | null}) {
      // 첫 로그인일 때만 account와 user가 있음
      // 이후 세션 불러올 때는 undefined임
      // if (account && user) {
      //   // console.log('account && user');
      //   const newToken = {
      //     ...token,
      //     accessToken: user.access_token,
      //     refreshToken: user.refresh_token,
      //     idToken: user.id_token,
      //     accessTokenExpired: Date.now() + Number(user.expires_in) * 1000,
      //     refreshTokenExpired: Date.now() + Number(user.refresh_expires_in) * 1000,
      //   };

      //   return newToken;
      // }

      // 현재 시각이 accessToken 만료 시각 전이라면 기존 토큰 그대로 보냄
      // console.log(
      //   'Should return ex-token',
      //   Date.now() < Number(token.accessTokenExpired),
      // );
      if (Date.now() < Number(token.accessTokenExpired)) return token;

      // 현재 시각이 accessToken 만료 시각 후라면 refreshToken을 이용해서 새로운 토큰을 받음
      return token;
    },
  },
});

type CustomJWTType = {
  accessTokenExpired: number;
  refreshTokenExpired: number;
};

// const refreshTokens = async (token: JWT & CustomJWTType) => {
//   try {
//     // refreshToken이 만료되었다면 Error 발생
//     if (Date.now() > token.refreshTokenExpired) throw new Error();

//     const details = {
//       client_id: authClientId,
//       client_secret: authClientSecret,
//       grant_type: ["refresh_token"],
//       refresh_token: token.refreshToken,
//     };
//     const formBody: string[] = [];
//     Object.entries(details).forEach(([key, value]: [string, any]) => {
//       const encodedKey = encodeURIComponent(key);
//       const encodedValue = encodeURIComponent(value);
//       formBody.push(`${encodedKey}=${encodedValue}`);
//     });
//     const formData = formBody.join("&");

//     const response = await axios({
//       method: "POST",
//       url: `${authIssuer}/${authTokenUrl}`,
//       data: formData,
//       timeout: 1000 * 60,
//       headers: {
//         ContentType: "application/x-www-form-urlencoded;charset=UTF-8",
//       },
//     });
//     const responseData = response.data;
//     // console.log('refreshTokens response');
//     return {
//       ...token,
//       accessToken: responseData.access_token,
//       accessTokenExpired: Date.now() + Number(responseData.expires_in) * 1000,
//       refreshToken: responseData.refresh_token,
//       idToken: responseData.id_token,
//       // ? refreshToken 만료 시각 전이면 기존 refreshToken으로 보내는게 나을지 고려 필요
//       refreshTokenExpired: Date.now() + Number(responseData.refresh_expires_in) * 1000,
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: "RefreshTokenExpired",
//     };
//   }
// };
