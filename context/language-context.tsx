"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "id";

type LanguageContextType = {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
    en: {
        "settings.appearance.title": "Appearance",
        "settings.appearance.desc": "Select your preferred interface theme.",
        "settings.regional.title": "Regional Settings",
        "settings.regional.desc": "Set your language and date formats for audit logs.",
        "settings.notifications.title": "Email Notifications",
        "settings.notifications.desc": "Choose what updates you want to receive.",
        "theme.light": "Light",
        "theme.dark": "Dark",
        "theme.system": "System",
        "lang.en": "English",
        "lang.id": "Bahasa Indonesia",
        "save": "Save Preferences",
        "saving": "Saving..."
    },
    id: {
        "settings.appearance.title": "Tampilan",
        "settings.appearance.desc": "Pilih tema antarmuka yang Anda sukai.",
        "settings.regional.title": "Pengaturan Regional",
        "settings.regional.desc": "Atur bahasa dan format tanggal untuk log audit.",
        "settings.notifications.title": "Notifikasi Email",
        "settings.notifications.desc": "Pilih pembaruan apa yang ingin Anda terima.",
        "theme.light": "Terang",
        "theme.dark": "Gelap",
        "theme.system": "sistem",
        "lang.en": "Inggris",
        "lang.id": "Bahasa Indonesia",
        "save": "Simpan Preferensi",
        "saving": "Menyimpan..."
    }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");

    // Load from local storage if available
    useEffect(() => {
        const savedLang = localStorage.getItem("language") as Language;
        if (savedLang && (savedLang === "en" || savedLang === "id")) {
            setLanguage(savedLang);
        }
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
