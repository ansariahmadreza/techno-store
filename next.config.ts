/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // برگردونیم (برای استاتیک خروجی گرفتن)
  
  images: {
    unoptimized: true,  // لازمه برای GitHub Pages
  },
  
  trailingSlash: true,  // برای مسیردهی بهتر
  
  // اگه مخزن تو ساب‌پوشه هست (مثل username.github.io/repo-name/)
  // basePath: '/techno-clone.github.io',
}

module.exports = nextConfig