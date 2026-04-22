// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw';
import { productSlider, carouselItems, products, users } from './data';

const generateRandomSlug = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const handlers = [
    // ProductSlider
    http.get('/ProductSlider', () => {
        return HttpResponse.json(productSlider);
    }),

    http.get('/ProductSlider/:id', ({ params }) => {
        const { id } = params;
        const item = productSlider.find(p => p.id === id);

        if (!item) {
            return HttpResponse.json(
                { message: 'Product Slider item not found' },
                { status: 404 }
            );
        }
        return HttpResponse.json(item);
    }),

    //  Carousel
    http.get('/Carousel', () => {
        //console.log(' MSW: GET /Carousel');
        return HttpResponse.json(carouselItems);
    }),

    http.get('/Carousel/:id', ({ params }) => {
        const { id } = params;
        const item = carouselItems.find(c => c.id === id);

        if (!item) {
            return HttpResponse.json(
                { message: 'Carousel item not found' },
                { status: 404 }
            );
        }
        return HttpResponse.json(item);
    }),

    //  Products
    http.get('/Products', ({ request }) => {
        //  console.log(' MSW: GET /Products');

        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get("_page") || "1");
        const per_page = parseInt(url.searchParams.get("_per_page") || "10");
        const title = url.searchParams.get("title") || "";

        let filteredProducts = [...products];

        if (title) {
            filteredProducts = filteredProducts.filter(p =>
                p.title.toLowerCase().includes(title.toLowerCase())
            );
        }

        const start = (page - 1) * per_page;
        const end = start + per_page;
        const paginatedProducts = filteredProducts.slice(start, end);

        return HttpResponse.json(paginatedProducts, {
            headers: {
                "X-Total-Count": filteredProducts.length.toString(),
                "Access-Control-Expose-Headers": "X-Total-Count"
            }
        });
    }),




    // ثبت نام کاربر (REGISTER) 
    http.post('/api/users/register', async ({ request }) => {
        try {
            const body = await request.json() as any;

            // اعتبارسنجی
            const errors: string[] = [];

            if (!body.namefamily || body.namefamily.trim() === '') {
                errors.push('نام و نام خانوادگی الزامی است');
            }

            if (!body.email || body.email.trim() === '') {
                errors.push('ایمیل الزامی است');
            } else if (!/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/.test(body.email)) {
                errors.push('فرمت ایمیل نامعتبر است');
            }

            if (!body.password || body.password.length < 6) {
                errors.push('رمز عبور باید حداقل 6 کاراکتر باشد');
            }

            if (body.password !== body.confrimPassword) {
                errors.push('رمز عبور و تکرار آن مطابقت ندارند');
            }

            if (errors.length > 0) {
                return HttpResponse.json(
                    { success: false, message: errors[0], errors },
                    { status: 400 }
                );
            }

            // بررسی ایمیل تکراری
            const existingUser = users.find(u => u.email === body.email);
            if (existingUser) {
                return HttpResponse.json(
                    { success: false, message: 'این ایمیل قبلاً ثبت نام کرده است' },
                    { status: 409 }
                );
            }

            // ✅ ایجاد کاربر جدید با slug رندوم
            const newUser = {
                slug: generateRandomSlug(),  // ← slug رندوم 12 کاراکتری
                namefamily: body.namefamily.trim(),
                email: body.email.trim().toLowerCase(),
                password: body.password,
                confrimPassword: body.confrimPassword,
                createdAt: new Date().toISOString()
            };

            users.push(newUser);
            // حذف اطلاعات حساس
            const { password, confrimPassword, ...safeUser } = newUser;
            const token = `mock-token-${newUser.slug}-${Date.now()}`;

            return HttpResponse.json(
                {
                    success: true,
                    message: 'ثبت نام با موفقیت انجام شد',
                    user: safeUser,
                    token
                },
                { status: 201 }
            );

        } catch (error) {
            console.error('Registration error:', error);
            return HttpResponse.json(
                { success: false, message: 'خطای داخلی سرور' },
                { status: 500 }
            );
        }
    }),

    // ============ دریافت همه کاربران ============
    http.get('/api/users', () => {
        const safeUsers = users.map(({ password, confrimPassword, ...rest }) => rest);
        return HttpResponse.json(safeUsers);
    }),

    // ============ دریافت کاربر با slug ============
    http.get('/api/users/by-slug/:slug', ({ params }) => {
        const { slug } = params;


        const user = users.find(u => u.slug === slug);

        if (!user) {

            return HttpResponse.json(
                { success: false, message: 'کاربر یافت نشد' },
                { status: 404 }
            );
        }
        const { password, confrimPassword, ...safeUser } = user;
        return HttpResponse.json(safeUser);
    }),


    http.get('/api/users/check-email', async ({ request }) => {
        const url = new URL(request.url);
        const email = url.searchParams.get('email');

        console.log(`📝 MSW: GET /api/users/check-email?email=${email}`);
        console.log(`📝 Current users in MSW:`, users.map(u => u.email)); // ← این خط را اضافه کن

        const user = users.find(u => u.email === email);

        if (user) {
            console.log(`✅ User found: ${user.email}`);
            const { password, confrimPassword, ...safeUser } = user;
            return HttpResponse.json({ exists: true, user: safeUser });
        }

        console.log(`❌ User not found with email: ${email}`);
        return HttpResponse.json({ exists: false });
    }),


];

