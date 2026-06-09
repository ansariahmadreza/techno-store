import { create } from "zustand";
import { persist } from "zustand/middleware";
import { RegisterFormData } from "@/utils/valid";
import { RegisterFormData2 } from "./utils/validExit";

interface UserState {
  user: { name: string; email: string } | null;
  user2: { email: string } | null;
  currentEmail: string | null;
  allEmails: string[];
  setUser: (data: RegisterFormData) => void;
  setUser2: (data: RegisterFormData2) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      user2: null,
      currentEmail: null,
      allEmails: [],

      setUser: (data: RegisterFormData) => {
        const { allEmails, currentEmail } = get();
        const newEmail = data.email;
        
        // ذخیره ایمیل قبلی در لیست همه ایمیل‌ها (اگر قبلاً ذخیره نشده باشد)
        if (currentEmail && currentEmail !== newEmail && !allEmails.includes(currentEmail)) {
          set({ allEmails: [...allEmails, currentEmail] });
        }
        
        // اگر ایمیل جدید در لیست همه ایمیل‌ها نیست، اضافه کن
        if (!allEmails.includes(newEmail)) {
          set({ allEmails: [...allEmails, newEmail] });
        }
        
        // تنظیم کاربر جاری و ایمیل جاری
        set({ 
          user: { name: data.name, email: newEmail }, 
          user2: null,
          currentEmail: newEmail
        });
      },

      setUser2: (data: RegisterFormData2) => {
        const { allEmails, currentEmail } = get();
        const newEmail = data.email;
        
        // ذخیره ایمیل قبلی در لیست همه ایمیل‌ها (اگر قبلاً ذخیره نشده باشد)
        if (currentEmail && currentEmail !== newEmail && !allEmails.includes(currentEmail)) {
          set({ allEmails: [...allEmails, currentEmail] });
        }
        
        // اگر ایمیل جدید در لیست همه ایمیل‌ها نیست، اضافه کن
        if (!allEmails.includes(newEmail)) {
          set({ allEmails: [...allEmails, newEmail] });
        }
        
        // تنظیم کاربر جاری و ایمیل جاری
        set({ 
          user2: { email: newEmail }, 
          user: null,
          currentEmail: newEmail
        });
      },

      logout: () => {
        const { currentEmail, allEmails } = get();
        
        // ذخیره ایمیل فعلی در لیست همه ایمیل‌ها قبل از خروج
        if (currentEmail && !allEmails.includes(currentEmail)) {
          set({ allEmails: [...allEmails, currentEmail] });
        }
        
        // پاک کردن کاربر جاری
        set({ 
          user: null, 
          user2: null, 
          currentEmail: null 
        });
      }
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        user2: state.user2,
        currentEmail: state.currentEmail,
        allEmails: state.allEmails
      })
    }
  )
);