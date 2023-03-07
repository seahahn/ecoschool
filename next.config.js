/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.BUILD_DIR || ".next", // 빌드 수행 시 결과물 나올 디렉토리
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // 빌드할 때 eslint 실행 안 시키기. 이로 인해 eslint 에러가 있어도 빌드가 수행됨
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
