/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images: {
        domains: ['shopping-phinf.pstatic.net'], // 여기에 문제가 발생한 도메인 추가
      },
    output: 'standalone',
};

export default nextConfig;
