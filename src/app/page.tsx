"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarDays, faLocationDot, faXmark,
  faChevronDown, faPhone, faEnvelope, faCircleCheck, faUser, faRankingStar, faClock, faBars, faUpload, faCopy, faTicket, faCheck
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import styles from "./page.module.css";

interface YogaEvent {
  name: string;
  price: string;
  instructor: string;
  date: string;
  time: string;
  level: string;
  spotsLeft: number;
  spotsMax: number;
}

const FEATURED_EVENT: YogaEvent = {
  name: "Morning Yoga Class with Coach Nita Rosalina",
  price: "Rp 75.000",
  instructor: "Nita Rosalina",
  date: "22 Juni 2026",
  time: "08:00 - 09:30 WIB",
  level: "Pemula",
  spotsLeft: 7,
  spotsMax: 15,
};

// English Translations for Featured Event
const FEATURED_EVENT_EN: YogaEvent = {
  name: "Morning Yoga Class with Coach Nita Rosalina",
  price: "IDR 75.000",
  instructor: "Nita Rosalina",
  date: "June 22, 2026",
  time: "08:00 - 09:30 WIB",
  level: "Beginner",
  spotsLeft: 7,
  spotsMax: 15,
};

const TRANSLATIONS = {
  id: {
    navAbout: "Tentang",
    navDetails: "Jadwal",
    navFaq: "FAQ",
    navBtn: "E-Tiket",
    lookupTitle: "Cek E-Tiket Anda",
    lookupSubtitle: "Masukkan kode booking untuk memeriksa status tiket.",
    labelLookupCode: "Kode Booking",
    labelLookupName: "Nama Pemesan *",
    btnLookupSearch: "Cari Status Tiket",
    lookupNotFound: "Tiket tidak ditemukan. Silakan periksa kembali Kode Booking dan Nama Pemesan Anda.",
    statusPending: "SEDANG DIPROSES",
    statusConfirmed: "PEMBAYARAN DIKONFIRMASI",
    pendingInfoTitle: "Pendaftaran Berhasil!",
    pendingInfoDesc: "Bukti transfer sedang diverifikasi oleh admin.",
    bookingCodeLabel: "KODE BOOKING ANDA",
    heroTag: "Kelas Yoga 2026",
    heroTitle: "Bergerak penuh niat, bernapas dengan damai",
    heroDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
    heroCtaPrimary: "Daftar Sesi Sekarang",
    heroCtaSecondary: "Detail Acara",
    countdownDays: "Hari",
    countdownHours: "Jam",
    countdownMinutes: "Menit",
    countdownSeconds: "Detik",
    aboutSubtitle: "Tentang SERENE SOUL",
    aboutTitle: "Perjalanan Penyembuhan Jiwa",
    aboutDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timelineTitle: "Fasilitas & Benefit Sesi",
    timeSlot1: "01",
    timeline1Title: "Matras & Blok Yoga Gratis",
    timeline1Desc: "Kami menyediakan matras yoga berkualitas tinggi dan blok penopang secara gratis untuk kenyamanan latihan Anda.",
    timeSlot2: "02",
    timeline2Title: "Minuman Hidrasi Menyegarkan",
    timeline2Desc: "Nikmati pilihan air kelapa organik segar atau teh herbal hangat setelah sesi selesai untuk memulihkan hidrasi tubuh.",
    timeSlot3: "03",
    timeline3Title: "Sound Healing Mangkuk Kristal",
    timeline3Desc: "Rasakan vibrasi penyembuhan batin yang mendalam melalui terapi suara mangkuk kristal murni untuk melepas penat.",
    timeSlot4: "04",
    timeline4Title: "Minyak Aromaterapi Premium",
    timeline4Desc: "Hirup kesegaran minyak aromaterapi lavender dan peppermint organik yang menenangkan pikiran selama relaksasi.",
    formLabelTransfer: "Unggah Bukti Transfer *",
    transferInfoTitle: "Informasi Rekening Transfer",
    transferBank: "Bank",
    transferAccount: "Nomor Rekening",
    transferRecipient: "Atas Nama",
    transferAmount: "Jumlah Transfer",
    transferPlaceholder: "Pilih file atau seret screenshot bukti transfer Anda di sini (PNG, JPG, JPEG)",
    transferFileLabel: "File terpilih:",
    detailsSubtitle: "Acara Terdekat",
    metaDetailLabel: "DETAIL ACARA",
    metaDate: "Tanggal",
    metaDateVal: "",
    metaTime: "Waktu Sesi",
    metaInstructor: "Pelatih",
    metaLevel: "Level",
    spotsLeft: "Sisa Slot Tersedia",
    spotsFull: "Kuota Penuh",
    btnRegister: "Daftar Sesi",
    btnViewLocation: "Lihat Lokasi",
    scheduleLabel: "Jadwal",
    slotsLabel: "Slot Tersedia",
    faqSubtitle: "Tanya Jawab",
    faqTitle: "Pertanyaan Umum",
    faqDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
    footerDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    sponsoredBy: "DIDUKUNG OLEH",
    footerNav: "Navigasi",
    footerContact: "Kontak Kami",
    footerCopyright: "© 2026 Serene Soul. All rights reserved.",
    footerTerms: "Syarat Ketentuan",
    footerPrivacy: "Kebijakan Privasi",
    modalTitle: "Daftar Sesi",
    modalSubtitle: "Silakan isi data lengkap untuk reservasi.",
    modalSubtitleSuccess: "E-Tiket akan segera diproses oleh sistem.",
    formLabelName: "Nama Lengkap *",
    formLabelEmail: "Alamat Email *",
    formLabelPhone: "Nomor WhatsApp*",
    formLabelNotes: "Catatan Medis (Opsional)",
    formPlaceholderNotes: "",
    formTerms: "Saya menyatakan bersedia mengikuti instruksi di Serene Studio secara kooperatif, sadar, dan aman demi kenyamanan bersama.",
    formSubmit: "Selesaikan Pendaftaran",
    ticketConfirm: "Pendaftaran Terkonfirmasi!",
    ticketSuccessDesc: "Selamat, pendaftaran Anda berhasil. Tiket resmi telah dikirim ke email ",
    ticketBrand: "BY SERENE SOUL",
    ticketLabelParticipant: "Peserta",
    ticketLabelDate: "Tanggal",
    ticketLabelTime: "Waktu",
    ticketLabelInstructor: "Instruktur",
    ticketLabelPrice: "Biaya",
    ticketLabelPlace: "Tempat",
    ticketPlaceVal: "Serene Studio",
    ticketView: "Lihat Tiket",
    ticketClose: "Selesai",
    faqData: [
      {
        q: "Bagaimana sifat acara event yoga di Serene Soul ini?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex commodo.",
      },
      {
        q: "Apakah saya perlu mempersiapkan matras atau alat yoga sendiri?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
      },
      {
        q: "Bagaimana cara melakukan konfirmasi atau pembatalan pendaftaran?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor reprehenderit.",
      },
      {
        q: "Kenapa kuota pendaftaran event dibatasi sangat sedikit?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis unde omnis.",
      },
    ]
  },
  en: {
    navAbout: "About",
    navDetails: "Schedule",
    navFaq: "FAQ",
    navBtn: "E-Ticket",
    lookupTitle: "Check Your E-Ticket",
    lookupSubtitle: "Enter the booking code to check ticket status.",
    labelLookupCode: "Booking Code",
    labelLookupName: "Booker's Name *",
    btnLookupSearch: "Search Ticket Status",
    lookupNotFound: "Ticket not found. Please double-check your Booking Code and Booker's Name.",
    statusPending: "PROCESSING",
    statusConfirmed: "PAYMENT CONFIRMED",
    pendingInfoTitle: "Registration Successful!",
    pendingInfoDesc: "Proof of transfer is being verified by our admin.",
    bookingCodeLabel: "YOUR BOOKING CODE",
    heroTag: "2026 Yoga Class",
    heroTitle: "Move with intention, breathe with peace",
    heroDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
    heroCtaPrimary: "Book Session Now",
    heroCtaSecondary: "Event Details",
    countdownDays: "Days",
    countdownHours: "Hours",
    countdownMinutes: "Minutes",
    countdownSeconds: "Seconds",
    aboutSubtitle: "About SERENE SOUL",
    aboutTitle: "A Journey of Soul Healing",
    aboutDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    timelineTitle: "Session Facilities & Benefits",
    timeSlot1: "01",
    timeline1Title: "Complimentary Mats & Blocks",
    timeline1Desc: "We provide high-quality yoga mats and support blocks for free to ensure your practice is perfectly comfortable.",
    timeSlot2: "02",
    timeline2Title: "Refreshing Hydration & Tea",
    timeline2Desc: "Enjoy organic coconut water or fresh warm herbal tea after your practice to replenish your body's hydration.",
    timeSlot3: "03",
    timeline3Title: "Pure Sound Healing Session",
    timeline3Desc: "Immerse yourself in deep therapeutic vibrations from pure crystal singing bowls to release pent-up stress.",
    timeSlot4: "04",
    timeline4Title: "Premium Aromatherapy Oils",
    timeline4Desc: "Inhale therapeutic organic lavender and peppermint essential oils to soothe your mind throughout the practice.",
    formLabelTransfer: "Upload Proof of Transfer *",
    transferInfoTitle: "Bank Transfer Information",
    transferBank: "Bank",
    transferAccount: "Account Number",
    transferRecipient: "Account Holder",
    transferAmount: "Transfer Amount",
    transferPlaceholder: "Select file or drag screenshot proof of transfer here (PNG, JPG, JPEG)",
    transferFileLabel: "Selected file:",
    detailsSubtitle: "Upcoming Event",
    metaDetailLabel: "EVENT DETAILS",
    metaDate: "Date",
    metaDateVal: "",
    metaTime: "Session Time",
    metaInstructor: "Instructor",
    metaLevel: "Level",
    spotsLeft: "Remaining Slots Available",
    spotsFull: "Sold Out",
    btnRegister: "Book Session",
    btnViewLocation: "View Location",
    scheduleLabel: "Schedule",
    slotsLabel: "Slots Available",
    faqSubtitle: "FAQs",
    faqTitle: "Frequently Asked Questions",
    faqDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
    footerDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    sponsoredBy: "SUPPORTED BY",
    footerNav: "Navigation",
    footerContact: "Contact Us",
    footerCopyright: "© 2026 Serene Soul. All rights reserved.",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",
    modalTitle: "Book Session",
    modalSubtitle: "Please fill in the details for reservation.",
    modalSubtitleSuccess: "E-Ticket will be processed by the system immediately.",
    formLabelName: "Your Full Name *",
    formLabelEmail: "Email Address *",
    formLabelPhone: "WhatsApp Number *",
    formLabelNotes: "Medical Notes / Special Requests (Optional)",
    formPlaceholderNotes: "",
    formTerms: "I agree to follow the instructions at Serene Studio cooperatively, consciously, and safely for our mutual comfort.",
    formSubmit: "Complete Registration",
    ticketConfirm: "Registration Confirmed!",
    ticketSuccessDesc: "Congratulations, your registration is successfully confirmed. Official ticket has been sent to email ",
    ticketBrand: "BY SERENE SOUL",
    ticketLabelParticipant: "Participant",
    ticketLabelDate: "Date",
    ticketLabelTime: "Time",
    ticketLabelInstructor: "Instructor",
    ticketLabelPrice: "Price",
    ticketLabelPlace: "Venue",
    ticketPlaceVal: "Serene Studio",
    ticketView: "View Ticket",
    ticketClose: "Done",
    faqData: [
      {
        q: "What is the nature of this Serene Soul yoga event?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex commodo.",
      },
      {
        q: "Do I need to prepare or bring my own yoga mat?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.",
      },
      {
        q: "How do I confirm or cancel my reservation?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure dolor reprehenderit.",
      },
      {
        q: "Why is the event participant quota so strictly limited?",
        a: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum sed perspiciatis unde omnis.",
      },
    ]
  }
};

export default function Home() {
  const [lang, setLang] = useState<"id" | "en">("en");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  // Modal Registration State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const charInputRef = useRef<HTMLInputElement>(null);
  const [ticketCode, setTicketCode] = useState("");

  // Form Fields State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Ticket Lookup Modal States
  const [isLookupOpen, setIsLookupOpen] = useState(false);
  const [lookupCode, setLookupCode] = useState("");
  const [searchResult, setSearchResult] = useState<any | null>(null);
  const [lookupStep, setLookupStep] = useState<number>(1);
  const [fullQrUrl, setFullQrUrl] = useState<string | null>(null);

  // Local state representing bookings database
  const [bookings, setBookings] = useState<any[]>([
    {
      code: "000-0000-000",
      name: "Dev Test",
      email: "dev@serenesoul.id",
      phone: "+62 800-0000-000",
      eventName: "Morning Yoga Class with Coach Nita Rosalina",
      date: "22 Juni 2026",
      time: "08:00 - 09:30 WIB",
      instructor: "Nita Rosalina",
      price: "Rp 75.000",
      status: "PENDING"
    },
    {
      code: "SRN-7777-SND",
      name: "Savitri Devi",
      email: "savitri.devi@gmail.com",
      phone: "+62 812-3456-7890",
      eventName: "Morning Yoga Class with Coach Nita Rosalina",
      date: "22 Juni 2026",
      time: "08:00 - 09:30 WIB",
      instructor: "Nita Rosalina",
      price: "Rp 75.000",
      status: "CONFIRMED"
    },
    {
      code: "SRN-8888-SND",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+62 821-9876-5432",
      eventName: "Morning Yoga Class with Coach Nita Rosalina",
      date: "June 22, 2026",
      time: "08:00 - 09:30 WIB",
      instructor: "Nita Rosalina",
      price: "IDR 75.000",
      status: "PENDING"
    }
  ]);

  // Mount detection to avoid NextJS Hydration mismatches with live dates
  useEffect(() => {
    setMounted(true);

    // Live Countdown Timer logic
    const targetDate = new Date("2026-06-07T16:00:00+07:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true });
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s, isExpired: false });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  // Automatic dummy verification delay process when viewing PENDING tickets
  useEffect(() => {
    if (searchResult && searchResult !== "NOT_FOUND" && searchResult.status === "PENDING") {
      setLookupStep(1);

      const timer1 = setTimeout(() => {
        setLookupStep(2);
      }, 3000);

      const timer2 = setTimeout(() => {
        setLookupStep(3);
      }, 6000);

      const timer3 = setTimeout(() => {
        setLookupStep(4);
      }, 9000);

      const timer4 = setTimeout(() => {
        setBookings((prev) =>
          prev.map((b) =>
            b.code.trim().toLowerCase() === searchResult.code.trim().toLowerCase()
              ? { ...b, status: "CONFIRMED" }
              : b
          )
        );
        setSearchResult((prev: any) =>
          prev && prev !== "NOT_FOUND" ? { ...prev, status: "CONFIRMED" } : prev
        );
      }, 10500);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [searchResult]);

  // Disable body scrolling on desktop and mobile when any modal overlay is active
  useEffect(() => {
    const isAnyModalOpen = isModalOpen || isLookupOpen || !!fullQrUrl;
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isModalOpen, isLookupOpen, fullQrUrl]);

  const handleOpenModal = () => {
    if (FEATURED_EVENT.spotsLeft <= 0) return;
    setIsModalOpen(true);
    setBookingSuccess(false);
    // Reset form fields
    setName("");
    setPhone("");
    setNotes("");
    setAgree(false);
    setScreenshot(null);
    setScreenshotUrl(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookingSuccess(false);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText("8690413829");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePasteCode = async () => {
    try {
      const text = await navigator.clipboard.readText();
      handleLookupCodeChange(text);
      charInputRef.current?.focus();
    } catch {
      charInputRef.current?.focus();
    }
  };

  const handleLookupCodeChange = (val: string) => {
    let letters = val.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().substring(0, 10);
    let formatted = "";
    if (letters.length > 0) {
      formatted += letters.substring(0, 3);
    }
    if (letters.length > 3) {
      formatted += "-" + letters.substring(3, 7);
    }
    if (letters.length > 7) {
      formatted += "-" + letters.substring(7, 10);
    }
    setLookupCode(formatted);
  };

  const handleOpenLookupModal = () => {
    setIsLookupOpen(true);
    setLookupCode("");
    setSearchResult(null);
  };

  const handleCloseLookupModal = () => {
    setIsLookupOpen(false);
  };

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupCode) return;

    const sanitizeCode = (code: string) => code.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    
    // Automatically reset developer test booking back to PENDING to trigger the 3-step timeline
    if (sanitizeCode(lookupCode) === "0000000000") {
      setBookings((prev) =>
        prev.map((b) =>
          sanitizeCode(b.code) === "0000000000" ? { ...b, status: "PENDING" } : b
        )
      );
    }

    const found = bookings.find(
      (b) => sanitizeCode(b.code) === sanitizeCode(lookupCode)
    );
    
    // Pass a fresh pending copy immediately if it's the dev code
    if (found && sanitizeCode(found.code) === "0000000000") {
      setSearchResult({ ...found, status: "PENDING" });
    } else {
      setSearchResult(found || "NOT_FOUND");
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !agree || !screenshot) return;

    const randomCode = `SRN-${Math.floor(1000 + Math.random() * 9000)}-SND`;
    setTicketCode(randomCode);

    // Save to local state database
    const newBooking = {
      code: randomCode,
      name: name,
      email: "",
      phone: phone,
      eventName: activeEvent.name,
      date: activeEvent.date,
      time: activeEvent.time,
      instructor: activeEvent.instructor,
      price: activeEvent.price,
      status: "PENDING"
    };
    setBookings((prev) => [...prev, newBooking]);

    setBookingSuccess(true);
    setTimeout(() => {
      modalBodyRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const t = TRANSLATIONS[lang];
  const activeEvent = lang === "id" ? FEATURED_EVENT : FEATURED_EVENT_EN;

  const isFull = activeEvent.spotsLeft === 0;

  return (
    <div style={{ position: "relative" }}>
      {/* HEADER NAVBAR */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <Image src="/logo.png" alt="Serene Soul" width={150} height={32} className={styles.logoImg} />
            <span>Serene Soul</span>
          </div>
          <nav className={styles.navLinks}>
            {/* Language Switcher Text ID/EN before About */}
            <div className={styles.langContainer}>
              <button
                onClick={() => setLang("en")}
                className={`${styles.langItem} ${lang === "en" ? styles.langActive : ""}`}
                title="English"
              >
                <span>EN</span>
              </button>
              <button
                onClick={() => setLang("id")}
                className={`${styles.langItem} ${lang === "id" ? styles.langActive : ""}`}
                title="Bahasa Indonesia"
              >
                <span>ID</span>
              </button>
            </div>

            <a href="#about" className={styles.navLink}>
              {t.navAbout}
            </a>
            <a href="#details" className={styles.navLink}>
              {t.navDetails}
            </a>
            <a href="#faqs" className={styles.navLink}>
              {t.navFaq}
            </a>

            <button onClick={handleOpenLookupModal} className={styles.navBtn}>
              <FontAwesomeIcon icon={faTicket} />
              {t.navBtn}
            </button>
          </nav>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={styles.mobileMenuBtn}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faXmark : faBars} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className={styles.mobileMenuDrawer}>
            <div className={styles.mobileMenuLangRow}>
              <span className={styles.mobileMenuLangLabel}>Language</span>
              <div className={styles.langContainer}>
                <button
                  onClick={() => setLang("id")}
                  className={`${styles.langItem} ${lang === "id" ? styles.langActive : ""}`}
                >ID</button>
                <button
                  onClick={() => setLang("en")}
                  className={`${styles.langItem} ${lang === "en" ? styles.langActive : ""}`}
                >EN</button>
              </div>
            </div>
            <a href="#about" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>{t.navAbout}</a>
            <a href="#details" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>{t.navDetails}</a>
            <a href="#faqs" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>{t.navFaq}</a>
            <button
              className={styles.mobileNavBtn}
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleOpenLookupModal();
              }}
            >
              <FontAwesomeIcon icon={faTicket} />
              {t.navBtn}
            </button>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className={styles.hero} id="home">
        <div className={styles.heroContainer}>
          <div className={`${styles.heroContent} ${styles.animateFadeInUp}`}>
            <div className={styles.tagline}>
              <span>{t.heroTag}</span>
            </div>
            <h1 className={styles.heroTitle}>
              {t.heroTitle}
            </h1>
            <p className={styles.heroDesc}>
              {t.heroDesc}
            </p>
            <div className={styles.heroBtnGroup}>
              <button onClick={handleOpenModal} className={styles.btnPrimary}>
                <span>{t.heroCtaPrimary}</span>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
              <a href="#details" className={styles.btnSecondary}>
                <span>{t.heroCtaSecondary}</span>
              </a>
            </div>
          </div>
        </div>
      </section>



      {/* ABOUT / BENEFITS SECTION */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="about">
        <div className={`${styles.sectionHeader} ${styles.animateFadeInUp}`}>
          <span className={styles.sectionSubtitle}>{t.aboutSubtitle}</span>
          <h2 className={styles.sectionTitle}>{t.aboutTitle}</h2>
          <p className={styles.sectionDesc}>
            {t.aboutDesc}
          </p>
        </div>

        <div className={styles.benefitsCardGrid}>
          <div className={`${styles.benefitGridCard} ${styles.animateFadeInUp}`}>
            <span className={styles.benefitCardNumber}>{t.timeSlot1}</span>
            <h3 className={styles.benefitCardTitleLabel}>{t.timeline1Title}</h3>
          </div>
          <div className={`${styles.benefitGridCard} ${styles.animateFadeInUp}`}>
            <span className={styles.benefitCardNumber}>{t.timeSlot2}</span>
            <h3 className={styles.benefitCardTitleLabel}>{t.timeline2Title}</h3>
          </div>
          <div className={`${styles.benefitGridCard} ${styles.animateFadeInUp}`}>
            <span className={styles.benefitCardNumber}>{t.timeSlot3}</span>
            <h3 className={styles.benefitCardTitleLabel}>{t.timeline3Title}</h3>
          </div>
          <div className={`${styles.benefitGridCard} ${styles.animateFadeInUp}`}>
            <span className={styles.benefitCardNumber}>{t.timeSlot4}</span>
            <h3 className={styles.benefitCardTitleLabel}>{t.timeline4Title}</h3>
          </div>
        </div>
      </section>

      {/* FEATURED EVENT DETAIL SECTION */}
      <section className={styles.section} id="details">
        <div className={styles.classSection}>
          {/* Header shows: Detail Acara Terdekat and directly below it the LIVE COUNTDOWN TIMER */}
          <div className={`${styles.sectionHeader} ${styles.animateFadeInUp}`}>
            <span className={styles.sectionSubtitle}>{t.detailsSubtitle}</span>

            {mounted && !timeLeft.isExpired && (
              <div style={{ marginTop: "1rem" }}>
                <div className={styles.countdownGrid}>
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownNumber}>
                      {timeLeft.days.toString().padStart(2, "0")}
                    </span>
                    <span className={styles.countdownLabel}>{t.countdownDays}</span>
                  </div>
                  <div className={styles.countdownDivider}>:</div>
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownNumber}>
                      {timeLeft.hours.toString().padStart(2, "0")}
                    </span>
                    <span className={styles.countdownLabel}>{t.countdownHours}</span>
                  </div>
                  <div className={styles.countdownDivider}>:</div>
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownNumber}>
                      {timeLeft.minutes.toString().padStart(2, "0")}
                    </span>
                    <span className={styles.countdownLabel}>{t.countdownMinutes}</span>
                  </div>
                  <div className={styles.countdownDivider}>:</div>
                  <div className={styles.countdownItem}>
                    <span className={styles.countdownNumber}>
                      {timeLeft.seconds.toString().padStart(2, "0")}
                    </span>
                    <span className={styles.countdownLabel}>{t.countdownSeconds}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Spotlight Card with 2-Column Location Image (landscape aspect ratio) & Content */}
          <div className={`${styles.spotlightContainer} ${styles.animateScaleIn}`}>
            <div className={styles.spotlightCard}>
              <div className={styles.spotlightLayout}>
                {/* Left Column: Landscape Studio Location Image */}
                <div className={styles.spotlightImageCol}>
                  <Image
                    src="/studio_venue.png"
                    alt="Serene Studio Venue"
                    fill
                    className={styles.spotlightLocationImage}
                  />
                  <span className={styles.spotlightImageTag}>Serene Studio Venue</span>
                </div>

                {/* Right Column: Event Content (Without title, start directly with details) */}
                <div className={styles.spotlightContentCol}>
                  <span className={styles.sectionSubtitle}>{t.metaDetailLabel}</span>
                  <div className={styles.spotlightMetaGrid}>
                    <div className={styles.spotlightMetaItem}>
                      <FontAwesomeIcon icon={faCalendarDays} />
                      <div>
                        <span>{t.metaDate}</span>
                        <strong>{activeEvent.date}{t.metaDateVal}</strong>
                      </div>
                    </div>
                    <div className={styles.spotlightMetaItem}>
                      <FontAwesomeIcon icon={faClock} />
                      <div>
                        <span>{t.metaTime}</span>
                        <strong>{activeEvent.time}</strong>
                      </div>
                    </div>
                    <div className={styles.spotlightMetaItem}>
                      <FontAwesomeIcon icon={faUser} />
                      <div>
                        <span>{t.metaInstructor}</span>
                        <strong>{activeEvent.instructor}</strong>
                      </div>
                    </div>
                    <div className={styles.spotlightMetaItem}>
                      <FontAwesomeIcon icon={faRankingStar} />
                      <div>
                        <span>{t.metaLevel}</span>
                        <strong>{activeEvent.level}</strong>
                      </div>
                    </div>
                  </div>

                  <div className={styles.spotlightFooter}>
                    <a
                      href="https://maps.google.com/?q=Jl.+Harmony+Rose+No.+18,+Kebayoran+Baru,+Jakarta+Selatan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.btnLocation}
                    >
                      <FontAwesomeIcon icon={faLocationDot} />
                      <span>{t.btnViewLocation}</span>
                    </a>

                    <button
                      onClick={handleOpenModal}
                      disabled={isFull}
                      className={styles.btnPrimary}
                    >
                      <span>{isFull ? t.spotsFull : t.btnRegister}</span>
                      <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "1rem" }} />
                    </button>
                  </div>

                  {/* Embedded Sponsors Block */}
                  <div className={styles.spotlightSponsors}>
                    <span className={styles.spotlightSponsorsTitle}>{t.sponsoredBy}</span>
                    <div className={styles.spotlightSponsorsLogos}>
                      <Image src="/rexona.png" alt="Rexona" width={110} height={36} className={styles.spotlightSponsorLogo} style={{ objectFit: "contain" }} />
                      <Image src="/closeup.png" alt="Close Up" width={72} height={24} className={styles.spotlightSponsorLogo} style={{ objectFit: "contain" }} />
                      <Image src="/dove.png" alt="Dove" width={72} height={36} className={styles.spotlightSponsorLogo} style={{ objectFit: "contain" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className={`${styles.section} ${styles.sectionAlt}`} id="faqs">
        <div className={`${styles.sectionHeader} ${styles.animateFadeInUp}`}>
          <span className={styles.sectionSubtitle}>{t.faqSubtitle}</span>
          <h2 className={styles.sectionTitle}>{t.faqTitle}</h2>
          <p className={styles.sectionDesc}>
            {t.faqDesc}
          </p>
        </div>

        <div className={`${styles.faqContainer} ${styles.animateFadeInUp}`}>
          {t.faqData.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openFaq === index ? styles.faqItemActive : ""
                }`}
            >
              <button onClick={() => toggleFaq(index)} className={styles.faqHeader}>
                <span className={styles.faqQuestion}>{faq.q}</span>
                <FontAwesomeIcon icon={faChevronDown} className={styles.faqIcon} />
              </button>
              <div className={styles.faqBody}>
                <div className={styles.faqContent}>{faq.a}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerInfo}>
            <div className={styles.footerLogo}>
              <Image src="/logo.png" alt="Serene Soul" width={150} height={28} className={styles.footerLogoImg} />
              <span>Serene Soul</span>
            </div>
            <p className={styles.footerDesc}>
              {t.footerDesc}
            </p>
          </div>

          <div className={styles.footerCol}>
            <h4>{t.footerNav}</h4>
            <div className={styles.footerLinks}>
              <a href="#about" className={styles.footerLink}>
                {t.navAbout}
              </a>
              <a href="#details" className={styles.footerLink}>
                {t.navDetails}
              </a>
              <a href="#faqs" className={styles.footerLink}>
                {t.navFaq}
              </a>
            </div>
          </div>

          <div className={styles.footerCol}>
            <h4>{t.footerContact}</h4>
            <div className={styles.footerContact}>
              <div className={styles.contactItem}>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Jl. Harmony Rose No. 18, Kebayoran Baru, Jakarta Selatan</span>
              </div>
              <div className={styles.contactItem}>
                <FontAwesomeIcon icon={faPhone} />
                <span>+62 821-3456-7890</span>
              </div>
              <div className={styles.contactItem}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>hello@serenesoul.id</span>
              </div>
              <div className={styles.contactItem}>
                <FontAwesomeIcon icon={faInstagram} />
                <a href="https://instagram.com/byserenesoul_" target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  @byserenesoul
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            {t.footerCopyright}
          </p>
          <div className={styles.footerSubLinks}>
            <a href="#" className={styles.footerSubLink}>
              {t.footerPrivacy}
            </a>
            <a href="#" className={styles.footerSubLink}>
              {t.footerTerms}
            </a>
          </div>
        </div>
      </footer>

      {/* POPUP REGISTRATION MODAL WINDOW */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {t.modalTitle}
              </h3>
              <p className={styles.modalSubtitle}>
                {bookingSuccess
                  ? t.modalSubtitleSuccess
                  : t.modalSubtitle}
              </p>
              <button onClick={handleCloseModal} className={styles.modalClose}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className={styles.modalBody} ref={modalBodyRef}>
              {!bookingSuccess ? (
                // Form Registration
                <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
                  <div className={styles.classSummary}>
                    <div>
                      <div className={styles.summaryTitle}>{activeEvent.name}</div>
                      <div className={styles.summarySlots}>
                        <div className={styles.summarySlotsLabel}>
                          <span>{t.slotsLabel}</span>
                          <span>{activeEvent.spotsLeft} / {activeEvent.spotsMax}</span>
                        </div>
                        <div className={styles.summaryProgressBg}>
                          <div
                            className={styles.summaryProgressFill}
                            style={{ width: `${(activeEvent.spotsLeft / activeEvent.spotsMax) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.summaryPrice}>{activeEvent.price}</div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="fullName" className={styles.formLabel}>
                      {t.formLabelName}
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      placeholder=""
                      className={styles.formInput}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  {/* Email field removed */}

                  <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber" className={styles.formLabel}>
                      {t.formLabelPhone}
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      required
                      placeholder=""
                      className={styles.formInput}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="specialNotes" className={styles.formLabel}>
                      {t.formLabelNotes}
                    </label>
                    <textarea
                      id="specialNotes"
                      placeholder={t.formPlaceholderNotes}
                      className={`${styles.formInput} ${styles.formTextarea}`}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className={styles.transferInfoBox}>
                    <div className={styles.transferInfoTitle}>{t.transferInfoTitle}</div>
                    <div className={styles.transferInfoRow}>
                      <span>{t.transferBank}:</span>
                      <strong>BCA</strong>
                    </div>
                    <div className={styles.transferInfoRow}>
                      <span>{t.transferAccount}:</span>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <button
                          type="button"
                          onClick={handleCopyAccount}
                          className={`${styles.copyBtn} ${copied ? styles.copyBtnCopied : ""}`}
                          title={lang === "id" ? "Salin Nomor Rekening" : "Copy Account Number"}
                        >
                          <FontAwesomeIcon icon={copied ? faCircleCheck : faCopy} />
                        </button>
                        <strong>869-041-3829</strong>
                      </div>
                    </div>
                    <div className={styles.transferInfoRow}>
                      <span>{t.transferRecipient}:</span>
                      <strong>Serene Soul Studio</strong>
                    </div>
                    <div className={styles.transferInfoRow}>
                      <span>{t.transferAmount}:</span>
                      <strong>{activeEvent.price}</strong>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {t.formLabelTransfer}
                    </label>
                    <input
                      type="file"
                      id="screenshotUpload"
                      accept="image/png, image/jpeg, image/jpg"
                      required={!screenshot}
                      className={styles.hiddenFileInput}
                      onChange={(e) => {
                        const file = e.target.files?.[0] || null;
                        setScreenshot(file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setScreenshotUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setScreenshotUrl(null);
                        }
                      }}
                    />
                    {screenshotUrl ? (
                      <div className={styles.uploadPreviewWrapper}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={screenshotUrl} alt="Preview" className={styles.screenshotPreviewImg} />
                        <label htmlFor="screenshotUpload" className={styles.uploadChangeBtn}>
                          <FontAwesomeIcon icon={faUpload} />
                          {lang === "id" ? "Ganti Foto" : "Change Photo"}
                        </label>
                      </div>
                    ) : (
                      <label htmlFor="screenshotUpload" className={styles.uploadLabel}>
                        <FontAwesomeIcon icon={faUpload} className={styles.uploadIcon} />
                        <span className={styles.uploadPlaceholder}>
                          {t.transferPlaceholder}
                        </span>
                      </label>
                    )}
                  </div>

                  <label className={styles.formTerms}>
                    <input
                      type="checkbox"
                      required
                      checked={agree}
                      onChange={(e) => setAgree(e.target.checked)}
                    />
                    <span>
                      {t.formTerms}
                    </span>
                  </label>

                  <button type="submit" disabled={isFull} className={styles.formSubmitBtn}>
                    <span>{isFull ? t.spotsFull : t.formSubmit}</span>
                  </button>
                </form>
              ) : (
                // Successful Registration - Pending Admin Confirmation Screen
                <div className={styles.ticketWrapper}>
                  <div className={styles.successIcon}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  <h4 className={styles.successTitle}>{t.pendingInfoTitle}</h4>
                  <p className={styles.successDesc}>
                    {t.pendingInfoDesc}
                  </p>

                  <div className={styles.pendingBookingCard}>
                    <div className={styles.pendingCardHeader}>
                      <span className={styles.pendingCardLabel}>{t.bookingCodeLabel}</span>
                      <strong className={styles.pendingCardCode}>{ticketCode}</strong>
                    </div>
                    
                    <div className={styles.pendingCardBody}>
                      <div className={styles.pendingCardRow}>
                        <span>{t.ticketLabelParticipant}:</span>
                        <strong>{name}</strong>
                      </div>
                      <div className={styles.pendingCardRow}>
                        <span>{t.ticketLabelDate}:</span>
                        <strong>{activeEvent.date}</strong>
                      </div>
                      <div className={styles.pendingCardRow}>
                        <span>{t.ticketLabelTime}:</span>
                        <strong>{activeEvent.time}</strong>
                      </div>
                      <div className={styles.pendingCardRow}>
                        <span>{t.ticketLabelPrice}:</span>
                        <strong>{activeEvent.price}</strong>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleCloseModal} className={styles.doneBtn}>
                    {t.ticketClose}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* POPUP TICKET LOOKUP MODAL WINDOW */}
      {isLookupOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>{t.lookupTitle}</h3>
              <p className={styles.modalSubtitle}>{t.lookupSubtitle}</p>
              <button onClick={handleCloseLookupModal} className={styles.modalClose}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <div className={styles.modalBody}>
              {(!searchResult || searchResult === "NOT_FOUND") ? (
                // Search Form
                <form onSubmit={handleLookupSubmit} className={styles.bookingForm}>
                  {searchResult === "NOT_FOUND" && (
                    <div className={styles.errorAlert}>
                      {t.lookupNotFound}
                    </div>
                  )}

                  <div className={styles.formGroup} style={{ position: "relative" }}>
                    <label className={styles.formLabel} style={{ textAlign: "center", marginBottom: "0.5rem", display: "block" }}>
                      {t.labelLookupCode}
                    </label>
                    <div
                      className={styles.charInputContainer}
                      onClick={() => charInputRef.current?.focus()}
                    >
                      <input
                        ref={charInputRef}
                        type="text"
                        value={lookupCode}
                        onChange={(e) => handleLookupCodeChange(e.target.value)}
                        maxLength={12}
                        className={styles.hiddenCharInput}
                        autoFocus
                      />
                      <div className={styles.charBoxRow}>
                        {Array.from({ length: 12 }).map((_, index) => {
                          const char = lookupCode[index] || "";
                          const isFocused = lookupCode.length === index && searchResult !== "NOT_FOUND";
                          const isHyphen = index === 3 || index === 8;

                          return (
                            <div
                              key={index}
                              className={`${styles.charBox} ${isFocused ? styles.charBoxFocused : ""} ${
                                isHyphen ? styles.charBoxHyphen : ""
                              }`}
                            >
                              {isHyphen ? "-" : char}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <button
                      type="button"
                      className={styles.pasteCodeBtn}
                      onClick={handlePasteCode}
                    >
                      <FontAwesomeIcon icon={faCopy} />
                      {lang === "id" ? "Tempel Kode" : "Paste Code"}
                    </button>
                  </div>

                  <button type="submit" className={styles.formSubmitBtn} style={{ marginTop: "1rem" }}>
                    <span>{t.btnLookupSearch}</span>
                  </button>
                </form>
              ) : (
                // Search Result Found - Display E-Ticket or Progress Timeline
                <div className={styles.ticketWrapper}>
                  {searchResult.status === "PENDING" ? (
                    // Animasi proses verifikasi
                    <div className={styles.timelineWrapper}>
                      <div className={styles.timelineTitle}>
                        {lang === "id" ? "Status Booking" : "Booking Status"}
                      </div>
                      <div className={styles.timelineSteps}>
                        {/* Step 1: Verifikasi Data Pemesan */}
                        <div className={`${styles.timelineStep} ${lookupStep >= 1 ? styles.stepActive : ""} ${lookupStep > 1 ? styles.stepCompleted : ""}`}>
                          <div className={styles.stepIndicator}>
                            {lookupStep > 1 ? <FontAwesomeIcon icon={faCheck} /> : "1"}
                          </div>
                          <div className={styles.stepInfo}>
                            <div className={styles.stepName}>
                              {lang === "id" ? "Proses Validasi" : "Validation Process"}
                            </div>
                            <div className={styles.stepDesc}>
                              {lang === "id" ? "Memeriksa detail booking oleh sistem" : "Checking booking details by system"}
                            </div>
                          </div>
                        </div>

                        {/* Step 2: Menunggu Verifikasi */}
                        <div className={`${styles.timelineStep} ${lookupStep >= 2 ? styles.stepActive : ""} ${lookupStep > 2 ? styles.stepCompleted : ""}`}>
                          <div className={styles.stepIndicator}>
                            {lookupStep > 2 ? <FontAwesomeIcon icon={faCheck} /> : "2"}
                          </div>
                          <div className={styles.stepInfo}>
                            <div className={styles.stepName}>
                              {lang === "id" ? "Menunggu Verifikasi" : "Waiting for Verification"}
                            </div>
                            <div className={styles.stepDesc}>
                              {lang === "id" ? "Bukti transfer sedang divalidasi oleh admin" : "Proof of transfer is being validated by admin"}
                            </div>
                          </div>
                        </div>

                        {/* Step 3: Proses Pembuatan Tiket */}
                        <div className={`${styles.timelineStep} ${lookupStep >= 3 ? styles.stepActive : ""} ${lookupStep > 3 ? styles.stepCompleted : ""}`}>
                          <div className={styles.stepIndicator}>
                            {lookupStep > 3 ? <FontAwesomeIcon icon={faCheck} /> : "3"}
                          </div>
                          <div className={styles.stepInfo}>
                            <div className={styles.stepName}>
                              {lang === "id" ? "Proses Pembuatan Tiket" : "Ticket Creation"}
                            </div>
                            <div className={styles.stepDesc}>
                              {lang === "id" ? "Mengalokasikan kuota dan menerbitkan e-tiket" : "Allocating quota and generating e-ticket"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Tiket CONFIRMED
                    <div className={styles.ticket}>
                      <div className={styles.ticketTop}>
                        <div className={styles.ticketTopRow}>
                          <div>
                            <div className={styles.ticketBrand}>{t.ticketBrand}</div>
                            <div className={styles.ticketClassName}>{searchResult.eventName}</div>
                          </div>
                        </div>
                      </div>

                      <div className={styles.ticketBottom}>
                        <div className={styles.ticketInfoList}>
                          <div className={styles.ticketInfoGroup}>
                            <span className={styles.ticketLabel}>{t.ticketLabelParticipant}</span>
                            <span className={styles.ticketVal}>{searchResult.name}</span>
                          </div>
                          <div className={styles.ticketInfoGroup}>
                            <span className={styles.ticketLabel}>{t.ticketLabelDate}</span>
                            <span className={styles.ticketVal}>{searchResult.date}</span>
                          </div>
                          <div className={styles.ticketInfoGroup}>
                            <span className={styles.ticketLabel}>{t.ticketLabelTime}</span>
                            <span className={styles.ticketVal}>{searchResult.time}</span>
                          </div>
                          <div className={styles.ticketInfoGroup}>
                            <span className={styles.ticketLabel}>{t.ticketLabelInstructor}</span>
                            <span className={styles.ticketVal}>{searchResult.instructor}</span>
                          </div>
                          <div className={styles.ticketInfoGroup}>
                            <span className={styles.ticketLabel}>{t.ticketLabelPrice}</span>
                            <span className={styles.ticketVal}>{searchResult.price}</span>
                          </div>
                          <div className={styles.ticketInfoGroup}>
                            <span className={styles.ticketLabel}>{t.ticketLabelPlace}</span>
                            <span className={styles.ticketVal}>{t.ticketPlaceVal}</span>
                          </div>
                        </div>

                        <div className={styles.ticketQrCol}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=${searchResult.code}&bgcolor=ffffff`}
                            alt="QR Code"
                            width={90}
                            height={90}
                            className={styles.ticketQr}
                          />
                          <button
                            type="button"
                            onClick={() => setFullQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${searchResult.code}&bgcolor=ffffff`)}
                            className={styles.viewQrBtn}
                          >
                            {lang === "id" ? "Lihat QR" : "View QR"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className={styles.lookupFooter}>
                    <button
                      type="button"
                      onClick={() => window.open("https://wa.me/6281234567890?text=Halo%20Admin%20Serene%20Soul,%20saya%20ingin%20melaporkan%20kendala%20verifikasi%20tiket.", "_blank")}
                      className={styles.reportBtn}
                    >
                      {lang === "id" ? "Laporkan Kendala" : "Report Issue"}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseLookupModal}
                      className={styles.doneBtnLookup}
                    >
                      {t.ticketClose}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN QR CODE OVERLAY MODAL */}
      {fullQrUrl && (
        <div className={styles.fullQrOverlay} onClick={() => setFullQrUrl(null)}>
          <div className={styles.fullQrContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.fullQrClose}
              onClick={() => setFullQrUrl(null)}
              aria-label="Close fullscreen QR"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className={styles.fullQrTitle}>
              {lang === "id" ? "E-Ticket QR Code" : "E-Ticket QR Code"}
            </h3>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={fullQrUrl} alt="QR Code Large" className={styles.largeQrImg} />
            <p className={styles.fullQrSubtitle}>
              {searchResult ? searchResult.code : ""}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
