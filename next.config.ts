/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  // این خط را کاملاً حذف یا کامنت کنید

  // اگر پروژه شما در یک ساب‌پوشه (مثل username.github.io/repo-name/) قرار می‌گیرد
  // نام مخزن خود را جایگزین کنید
  // basePath: '/techno-store',

  images: {
    unoptimized: true, // برای hosted شدن روی GitHub Pages لازم است
  },
}

module.exports = nextConfig