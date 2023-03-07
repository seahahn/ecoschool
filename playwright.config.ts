// playwright.config.ts
// 참고: https://playwright.dev/docs/test-configuration
import {type PlaywrightTestConfig, devices} from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const CI = process.env.CI === "true";
const config: PlaywrightTestConfig = {
  forbidOnly: CI, // test.only 등 focused test 존재 시 에러 발생 여부. if enabled, the CI throws when there's a focused test (test.only)
  retries: CI ? 1 : 0, // 테스트 재시도 횟수
  testDir: "tests/e2e", // 테스트 파일 위치
  use: {
    trace: CI ? "off" : "retain-on-failure", // Record trace for each test, but remove it from successful test runs.
    headless: true, // true: GUI 표시 안 함 | false: GUI 표시
    viewport: {width: 1280, height: 720}, // 테스트 시 사용할 화면 크기
    ignoreHTTPSErrors: true, // Whether to ignore HTTPS errors during navigation
    baseURL: "http://localhost:3000", // 테스트 시 사용할 호스트 주소. 이를 사용하면 테스트 코드에서 페이지 이동 시 full URL 입력하지 않아도 됨.
    screenshot: CI ? "off" : "only-on-failure", // 테스트 실패 시 스크린샷 저장
    video: CI ? "off" : "on-first-retry", // Record video only when retrying a test for the first time
  },
  webServer: {
    command: "yarn start", // 웹 서버 실행 커맨드
    port: 3000,
    reuseExistingServer: true,
  },
  // 테스트할 브라우저 종류 설정(참고: https://playwright.dev/docs/api/class-testproject)
  projects: [
    {
      name: "chromium",
      use: devices["Desktop Chrome"],
    },
    {
      name: "firefox",
      use: devices["Desktop Firefox"],
    },
    {
      name: "webkit",
      use: devices["Desktop Safari"],
    },
    // {
    //   name: "Mobile Chrome",
    //   use: devices["Pixel 5"],
    // },
    // {
    //   name: "Mobile Safari",
    //   use: devices["iPhone 13 Pro"],
    // },
  ],
};
export default config;
