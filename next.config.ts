/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // اضافه کنید
  images: {
    unoptimized: true,  // برای GitHub Pages لازم است
  },
  trailingSlash: true,  // برای GitHub Pages توصیه می‌شود
}

module.exports = nextConfig