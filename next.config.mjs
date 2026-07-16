const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true },
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: "/struny-school",
        assetPrefix: "/struny-school/",
        trailingSlash: true
      }
    : {})
};

export default nextConfig;
