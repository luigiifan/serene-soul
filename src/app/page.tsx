"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLeaf, faCalendarCheck, faArrowRight, faMusic,
  faChild, faCalendarDays, faLocationDot, faXmark,
  faChevronDown, faPhone, faEnvelope, faCircleCheck, faUser, faRankingStar, faClock, faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import styles from "./page.module.css";

interface YogaEvent {
  name: string;
  category: string;
  price: string;
  instructor: string;
  date: string;
  time: string;
  duration: string;
  level: string;
  spotsLeft: number;
  spotsMax: number;
  tag: string;
}

const FEATURED_EVENT: YogaEvent = {
  name: "Zen Sound Bath Healing Journey",
  category: "Meditasi & Yoga",
  price: "Rp 150.000",
  instructor: "Savitri Devi",
  date: "Minggu, 7 Juni 2026",
  time: "16:00 - 17:30 WIB",
  duration: "90 Menit",
  level: "Semua Level",
  spotsLeft: 7,
  spotsMax: 15,
  tag: "Event Terbatas & Eksklusif",
};

// English Translations for Featured Event
const FEATURED_EVENT_EN: YogaEvent = {
  name: "Zen Sound Bath Healing Journey",
  category: "Sound Meditation & Yoga",
  price: "IDR 150.000",
  instructor: "Savitri Devi",
  date: "Sun, June 7, 2026",
  time: "16:00 - 17:30 WIB",
  duration: "90 Minutes",
  level: "All Levels",
  spotsLeft: 7,
  spotsMax: 15,
  tag: "Limited & Exclusive Event",
};

const TRANSLATIONS = {
  id: {
    navAbout: "Tentang",
    navDetails: "Detail Sesi",
    navFaq: "FAQ",
    navBtn: "Daftar Sesi",
    heroTag: "Event Spesial Terbatas",
    heroTitle: "Bergerak penuh niat, bernapas dengan damai",
    heroDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
    heroCtaPrimary: "Daftar Sesi Sekarang",
    heroCtaSecondary: "Detail Acara",
    countdownSubtitle: "Waktu Tersisa Menuju Event",
    countdownDays: "Hari",
    countdownHours: "Jam",
    countdownMinutes: "Menit",
    countdownSeconds: "Detik",
    aboutSubtitle: "Manfaat Sesi",
    aboutTitle: "Kembalikan Keseimbangan Diri",
    aboutDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip.",
    benefit1Title: "Relaksasi Sound Healing",
    benefit1Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.",
    benefit2Title: "Yoga Gerak Lembut",
    benefit2Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip.",
    benefit3Title: "Keheningan Studio Zen",
    benefit3Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
    detailsSubtitle: "Acara Terdekat",
    detailsTitle: "Event Terbatas yang Akan Datang",
    metaDetailLabel: "DETAIL ACARA",
    metaDate: "Hari & Tanggal",
    metaDateVal: "",
    metaTime: "Waktu Sesi",
    metaInstructor: "Guru Pengajar",
    metaLevel: "Level",
    spotsLeft: "Sisa Slot Tersedia",
    spotsMaxLabel: "dari",
    spotsFull: "Kuota Penuh",
    btnRegister: "Daftar Sesi",
    btnViewLocation: "Lihat Lokasi",
    scheduleLabel: "Jadwal",
    faqSubtitle: "Tanya Jawab",
    faqTitle: "Pertanyaan Umum",
    faqDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
    footerDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    sponsoredBy: "DIDUKUNG OLEH",
    footerNav: "Navigasi",
    footerTheme: "Tema Sesi",
    footerContact: "Kontak Kami",
    footerCopyright: "© 2026 Serene Soul. All rights reserved.",
    footerTerms: "Syarat Ketentuan",
    footerPrivacy: "Kebijakan Privasi",
    modalTitle: "Pesan Slot Event",
    modalTitleSuccess: "Pendaftaran Berhasil!",
    modalSubtitle: "Silakan isi data lengkap Anda untuk reservasi.",
    modalSubtitleSuccess: "E-ticket Anda telah diterbitkan di bawah ini.",
    formLabelName: "Nama Lengkap Anda *",
    formPlaceholderName: "Masukkan nama lengkap",
    formLabelEmail: "Alamat Email *",
    formLabelPhone: "Nomor WhatsApp aktif *",
    formLabelNotes: "Catatan Medis (Opsional)",
    formPlaceholderNotes: "Contoh: cedera punggung belakang, asma, sedang hamil, dll.",
    formTerms: "Saya menyatakan bersedia mengikuti instruksi relaksasi di Serene Studio secara kooperatif, sadar, dan aman demi kenyamanan bersama.",
    formSubmit: "Selesaikan Pendaftaran",
    ticketConfirm: "Pendaftaran Terkonfirmasi!",
    ticketSuccessDesc: "Selamat, pendaftaran Anda berhasil. Tiket resmi telah dikirim ke email ",
    ticketBrand: "SERENE SOUL YOGA LIMITED EVENT",
    ticketLabelParticipant: "Peserta",
    ticketLabelDate: "Tanggal",
    ticketLabelTime: "Waktu",
    ticketLabelInstructor: "Instruktur",
    ticketLabelPrice: "Investasi",
    ticketLabelPlace: "Tempat",
    ticketPlaceVal: "Serene Studio",
    ticketClose: "Tutup Tiket",
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
    navDetails: "Details",
    navFaq: "FAQ",
    navBtn: "Book Session",
    heroTag: "Special Limited Event",
    heroTitle: "Move with intention, breathe with peace",
    heroDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.",
    heroCtaPrimary: "Book Session Now",
    heroCtaSecondary: "Event Details",
    countdownSubtitle: "Time Remaining Until the Event",
    countdownDays: "Days",
    countdownHours: "Hours",
    countdownMinutes: "Minutes",
    countdownSeconds: "Seconds",
    aboutSubtitle: "Session Benefits",
    aboutTitle: "Restore Your Inner Balance",
    aboutDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip.",
    benefit1Title: "Sound Healing Relaxation",
    benefit1Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim.",
    benefit2Title: "Gentle Yoga Stretch",
    benefit2Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip.",
    benefit3Title: "Zen Studio Serenity",
    benefit3Desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu.",
    detailsSubtitle: "Upcoming Event",
    detailsTitle: "Featured Upcoming Event",
    metaDetailLabel: "EVENT DETAILS",
    metaDate: "Day & Date",
    metaDateVal: "",
    metaTime: "Session Time",
    metaInstructor: "Instructor",
    metaLevel: "Level",
    spotsLeft: "Remaining Slots Available",
    spotsMaxLabel: "of",
    spotsFull: "Sold Out",
    btnRegister: "Book Session",
    btnViewLocation: "View Location",
    scheduleLabel: "Schedule",
    faqSubtitle: "FAQs",
    faqTitle: "Frequently Asked Questions",
    faqDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris.",
    footerDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    sponsoredBy: "SUPPORTED BY",
    footerNav: "Navigation",
    footerTheme: "Themes",
    footerContact: "Contact Us",
    footerCopyright: "© 2026 Serene Soul. All rights reserved.",
    footerTerms: "Terms & Conditions",
    footerPrivacy: "Privacy Policy",
    modalTitle: "Book Event Slot",
    modalTitleSuccess: "Registration Successful!",
    modalSubtitle: "Please fill in your details for reservation.",
    modalSubtitleSuccess: "Your e-ticket has been generated below.",
    formLabelName: "Your Full Name *",
    formPlaceholderName: "Enter your full name",
    formLabelEmail: "Email Address *",
    formLabelPhone: "Active WhatsApp Number *",
    formLabelNotes: "Medical Notes / Special Requests (Optional)",
    formPlaceholderNotes: "Example: lower back injury, asthma, pregnant, etc.",
    formTerms: "I agree to follow the relaxation instructions at Serene Studio cooperatively, consciously, and safely for our mutual comfort.",
    formSubmit: "Complete Registration",
    ticketConfirm: "Registration Confirmed!",
    ticketSuccessDesc: "Congratulations, your registration is successfully confirmed. Official ticket has been sent to email ",
    ticketBrand: "SERENE SOUL YOGA LIMITED EVENT",
    ticketLabelParticipant: "Participant",
    ticketLabelDate: "Date",
    ticketLabelTime: "Time",
    ticketLabelInstructor: "Instructor",
    ticketLabelPrice: "Investment",
    ticketLabelPlace: "Venue",
    ticketPlaceVal: "Serene Studio",
    ticketClose: "Close Ticket",
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
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [ticketCode, setTicketCode] = useState("");

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);

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

  const handleOpenModal = () => {
    if (FEATURED_EVENT.spotsLeft <= 0) return;
    setIsModalOpen(true);
    setBookingSuccess(false);
    // Reset form fields
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setAgree(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBookingSuccess(false);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !agree) return;

    // Simulate booking process & ticket generation
    const randomCode = `SRN-${Math.floor(1000 + Math.random() * 9000)}-SND`;
    setTicketCode(randomCode);
    setBookingSuccess(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const t = TRANSLATIONS[lang];
  const activeEvent = lang === "id" ? FEATURED_EVENT : FEATURED_EVENT_EN;

  const isFull = activeEvent.spotsLeft === 0;
  const isAlmostFull = activeEvent.spotsLeft > 0 && activeEvent.spotsLeft <= 4;

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
                onClick={() => setLang("id")}
                className={`${styles.langItem} ${lang === "id" ? styles.langActive : ""}`}
                title="Bahasa Indonesia"
              >
                <span>ID</span>
              </button>
              <button
                onClick={() => setLang("en")}
                className={`${styles.langItem} ${lang === "en" ? styles.langActive : ""}`}
                title="English"
              >
                <span>EN</span>
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

            <a href="#details" className={styles.navBtn}>
              {t.navBtn}
            </a>
          </nav>
          <button onClick={handleOpenModal} className={styles.mobileMenuBtn}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
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

        <div className={styles.benefitsGrid}>
          <div className={`${styles.benefitCard} ${styles.animateFadeInUp} ${styles.animateDelay1}`}>
            <div className={styles.benefitIcon}><FontAwesomeIcon icon={faMusic} /></div>
            <h3>{t.benefit1Title}</h3>
            <p>{t.benefit1Desc}</p>
          </div>
          <div className={`${styles.benefitCard} ${styles.animateFadeInUp} ${styles.animateDelay2}`}>
            <div className={styles.benefitIcon}><FontAwesomeIcon icon={faChild} /></div>
            <h3>{t.benefit2Title}</h3>
            <p>{t.benefit2Desc}</p>
          </div>
          <div className={`${styles.benefitCard} ${styles.animateFadeInUp} ${styles.animateDelay3}`}>
            <div className={styles.benefitIcon}><FontAwesomeIcon icon={faLeaf} /></div>
            <h3>{t.benefit3Title}</h3>
            <p>{t.benefit3Desc}</p>
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
                <span>+62 821-3456-7890 (WA Admin)</span>
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
                {bookingSuccess ? t.modalTitleSuccess : t.modalTitle}
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

            <div className={styles.modalBody}>
              {!bookingSuccess ? (
                // Form Registration
                <form onSubmit={handleBookingSubmit} className={styles.bookingForm}>
                  <div className={styles.classSummary}>
                    <div>
                      <div className={styles.summaryTitle}>{activeEvent.name}</div>
                      <div className={styles.summaryInstructor}>
                        {t.scheduleLabel}: {activeEvent.date} | {activeEvent.time}
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
                      placeholder={t.formPlaceholderName}
                      className={styles.formInput}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="emailAddress" className={styles.formLabel}>
                      {t.formLabelEmail}
                    </label>
                    <input
                      id="emailAddress"
                      type="email"
                      required
                      placeholder="contoh@email.com"
                      className={styles.formInput}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phoneNumber" className={styles.formLabel}>
                      {t.formLabelPhone}
                    </label>
                    <input
                      id="phoneNumber"
                      type="tel"
                      required
                      placeholder="08xxxxxxxxxx"
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
                // Successful E-Ticket Confirmation Display
                <div className={styles.ticketWrapper}>
                  <div className={styles.successIcon}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                  <h4 className={styles.successTitle}>{t.ticketConfirm}</h4>
                  <p className={styles.successDesc}>
                    {t.ticketSuccessDesc} <strong>{email}</strong>.
                  </p>

                  <div className={styles.ticket}>
                    <div className={styles.ticketTop}>
                      <div className={styles.ticketBrand}>{t.ticketBrand}</div>
                      <div className={styles.ticketClassName}>{activeEvent.name}</div>
                    </div>
                    <div className={styles.ticketBottom}>
                      <div className={styles.ticketInfoGroup}>
                        <span className={styles.ticketLabel}>{t.ticketLabelParticipant}</span>
                        <span className={styles.ticketVal}>{name}</span>
                      </div>
                      <div className={styles.ticketInfoGroup}>
                        <span className={styles.ticketLabel}>{t.ticketLabelDate}</span>
                        <span className={styles.ticketVal}>{activeEvent.date}</span>
                      </div>
                      <div className={styles.ticketInfoGroup}>
                        <span className={styles.ticketLabel}>{t.ticketLabelTime}</span>
                        <span className={styles.ticketVal}>{activeEvent.time}</span>
                      </div>
                      <div className={styles.ticketInfoGroup}>
                        <span className={styles.ticketLabel}>{t.ticketLabelInstructor}</span>
                        <span className={styles.ticketVal}>{activeEvent.instructor}</span>
                      </div>
                      <div className={styles.ticketInfoGroup}>
                        <span className={styles.ticketLabel}>{t.ticketLabelPrice}</span>
                        <span className={styles.ticketVal}>{activeEvent.price}</span>
                      </div>
                      <div className={styles.ticketInfoGroup}>
                        <span className={styles.ticketLabel}>{t.ticketLabelPlace}</span>
                        <span className={styles.ticketVal}>{t.ticketPlaceVal}</span>
                      </div>

                      <div className={styles.ticketBarcodeRow}>
                        <div className={styles.barcode}>|||| | || ||| || ||</div>
                        <div className={styles.ticketId}>{ticketCode}</div>
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
    </div>
  );
}
