// instrumentation.ts (در ریشه پروژه، کنار پوشه app)
export async function register() {
  // فقط در محیط development اجرا شود
  if (process.env.NODE_ENV === 'development') {
    
    // برای سمت سرور Node.js (Server Components, Route Handlers, API routes)
    if (process.env.NEXT_RUNTIME === 'nodejs') {
      try {
        const { server } = await import('./mocks/server');
        server.listen({
          onUnhandledRequest: 'bypass', // درخواست‌های بدون هندلر را نادیده بگیر
        });
      } catch (error) {
        console.error('❌ Failed to start MSW Server:', error);
      }
    }
    
    // برای سمت مرورگر (Client Components) - اختیاری
    if (process.env.NEXT_RUNTIME === 'edge') {
      // console.log('⚠️ MSW does not support Edge runtime');
    }
  }
}