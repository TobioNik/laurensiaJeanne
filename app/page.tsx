"use client";

import { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  Stars,
  Camera,
  MessageCircleHeart,
} from "lucide-react";
import Image from "next/image";
import FloatingHearts from "@/components/FloatingHearts";

export default function NewYearGreeting() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const targetDate = new Date("2026-01-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsUnlocked(true);
        setIsLoading(false);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsLoading(false);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">
          <Heart size={64} fill="currentColor" />
        </div>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-background bg-grid-pattern flex items-center justify-center p-6 relative overflow-hidden">
        {/* Floating hearts animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-up opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >
              <Heart size={24} fill="currentColor" className="text-primary" />
            </div>
          ))}
        </div>

        <div className="max-w-2xl w-full text-center space-y-8 relative z-10 animate-fade-in">
          <div className="animate-bounce-slow">
            <Heart
              size={80}
              fill="currentColor"
              className="text-primary mx-auto mb-6"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif tracking-tighter">
            Tunggu Sebentar...
          </h1>

          <p className="text-xl md:text-2xl font-light text-muted-foreground">
            Pesan spesial ini akan terbuka pada:
          </p>

          <div className="bg-white/50 backdrop-blur-sm border border-primary/20 rounded-3xl p-8 md:p-12 shadow-lg">
            <p className="text-3xl font-serif italic text-primary mb-8">
              1 Januari 2026, 00:00
            </p>

            <div className="grid grid-cols-4 gap-4">
              {[
                { value: timeLeft.days, label: "Hari" },
                { value: timeLeft.hours, label: "Jam" },
                { value: timeLeft.minutes, label: "Menit" },
                { value: timeLeft.seconds, label: "Detik" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-primary/10 rounded-2xl p-4 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {item.value.toString().padStart(2, "0")}
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-lg text-muted-foreground font-light animate-pulse">
            Sabar ya sayang, bentar lagi... 💕
          </p>
        </div>

        <style jsx>{`
          @keyframes float-up {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0.2;
            }
            50% {
              opacity: 0.3;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes scale-in {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes bounce-slow {
            0%,
            100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          .animate-float-up {
            animation: float-up linear infinite;
          }

          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }

          .animate-scale-in {
            animation: scale-in 0.6s ease-out backwards;
          }

          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background bg-grid-pattern selection:bg-primary selection:text-white overflow-hidden relative">
      {/* Floating particles background - continuous animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-particle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
            }}
          >
            {i % 3 === 0 ? (
              <Heart
                size={12}
                fill="currentColor"
                className="text-primary/20"
              />
            ) : i % 3 === 1 ? (
              <Sparkles size={10} className="text-accent/20" />
            ) : (
              <div className="w-2 h-2 bg-primary/20 rounded-full" />
            )}
          </div>
        ))}
      </div>

      {/* Gradient orbs background - slow moving */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 animate-fade-in-up">
        <FloatingHearts count={25} />
        <div className="absolute top-10 left-10 animate-float-slow text-primary opacity-50">
          <Heart
            size={48}
            fill="currentColor"
            className="animate-pulse-gentle"
          />
        </div>
        <div className="absolute bottom-20 right-10 animate-float-reverse text-accent opacity-50">
          <Stars
            size={64}
            fill="currentColor"
            className="animate-spin-very-slow"
          />
        </div>

        <div className="z-10 text-center space-y-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium animate-bounce-in">
            <Sparkles size={16} className="animate-spin-slow" />
            <span>Tahun Baru, Sayang Baru? Enggak, Sayang Kamu Terus!</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-serif tracking-tighter leading-none animate-slide-up">
            HAPPY <br />
            <span className="text-primary italic animate-gradient-text">
              NEW YEAR
            </span>{" "}
            <br />
            2026
          </h1>

          <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-delayed">
            Terima kasih sudah menemaniku di tahun 2025. Mari buat lebih banyak
            kenangan indah, tawa yang lebih keras, dan cinta yang lebih dalam di
            tahun ini.
          </p>
        </div>

        {/* Floating Photos with enhanced animation */}
        <div className="absolute top-1/4 right-[5%] hidden lg:block animate-photo-float">
          <div className="bg-white p-2 rounded-lg shadow-xl border-4 border-white hover:scale-110 hover:rotate-6 transition-all duration-500 cursor-pointer">
            <Image
              src="/photobooth.jpeg"
              alt="Memory 1"
              width={250}
              height={300}
              className="rounded object-cover"
            />
            <p className="mt-2 font-serif text-center italic text-primary">
              LUCUKK
            </p>
          </div>
        </div>

        <div className="absolute bottom-1/4 left-[5%] hidden lg:block animate-photo-float-reverse">
          <div className="bg-white p-2 rounded-lg shadow-xl border-4 border-white hover:scale-110 hover:-rotate-6 transition-all duration-500 cursor-pointer">
            <Image
              src="/natal1.jpeg"
              alt="Memory 2"
              width={320}
              height={280}
              className="rounded object-cover"
            />
            <p className="mt-2 font-serif text-center italic text-primary">
              Natalan Sama Preman <br /> BONDOWOSO
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-foreground text-background relative">
        <FloatingHearts count={20} minSize={8} maxSize={20} />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-end mb-16 animate-slide-up-gallery">
            <h2 className="text-5xl md:text-7xl font-serif flex-1">
              Rewind <br /> Our <span className="text-primary">Best</span>{" "}
              Moments
            </h2>
            <div className="flex gap-4">
              <div className="p-4 rounded-full border border-background/20 animate-rotate-360">
                <Camera size={24} />
              </div>
              <div className="p-4 rounded-full bg-primary text-white animate-pulse-gentle">
                <Heart size={24} fill="currentColor" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Column 1 */}
            <div
              className="space-y-4 animate-fade-in-stagger"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="relative group overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-500">
                <Image
                  src="/photo2.jpeg"
                  alt="US"
                  width={400}
                  height={600}
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white text-primary px-4 py-2 rounded-full font-serif italic animate-bounce-in">
                    The Beginning
                  </span>
                </div>
              </div>
              <div className="bg-primary/20 p-8 rounded-2xl hover:bg-primary/30 transition-all duration-300 hover:scale-105">
                <p className="text-2xl font-serif italic">
                  "Setiap Detik Sama Preman Bondowoso Itu Berati."
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div
              className="space-y-4 md:pt-20 animate-fade-in-stagger"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative group overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-500">
                <Image
                  src="/natal2.jpeg"
                  alt="US"
                  width={400}
                  height={400}
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 group-hover:-rotate-1"
                />
              </div>
              <div className="relative group overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-500">
                <Image
                  src="/photobooth2.jpeg"
                  alt="US"
                  width={400}
                  height={500}
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 group-hover:rotate-1"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div
              className="space-y-4 animate-fade-in-stagger"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="bg-accent/20 p-8 rounded-2xl text-foreground hover:bg-accent/30 transition-all duration-300 hover:scale-105">
                <p className="text-2xl font-serif italic text-white">
                  "2026: Program Mengendutkan Jeanne Jaya Jaya."
                </p>
              </div>
              <div className="relative group overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-500">
                <Image
                  src="/ulbul.jpeg"
                  alt="US"
                  width={400}
                  height={700}
                  className="w-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100 group-hover:-rotate-1"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Love Letter Section */}
      <section className="py-32 px-6 relative">
        <FloatingHearts count={30} minSize={12} maxSize={32} />
        <div className="max-w-3xl mx-auto text-center space-y-12 animate-fade-in-up">
          <MessageCircleHeart
            size={48}
            className="mx-auto text-primary animate-heartbeat"
          />
          <h2 className="text-4xl md:text-6xl font-serif italic">
            Surat Kecil untuk Jeanne Si Preman Bondowoso
          </h2>

          <div className="relative p-8 md:p-12 border border-primary/20 rounded-[3rem] bg-white shadow-sm overflow-hidden hover:shadow-xl transition-all duration-500">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-blob" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-2000" />

            <p className="text-xl md:text-2xl leading-relaxed font-light relative z-10">
              "Sayang, makasih ya udah jadi orang yang paling sabar, paling
              nyantol, dan paling bisa bikin aku ketawa di tahun kemarin. Ada
              hari-hari yang berasa cepet banget, ada juga hari yang beratnya
              kebangetan… tapi anehnya, semuanya kok kek lebih bisa dijalanin
              kalau ada kamu di samping aku, asekkkk.
              <br />
              <br />
              Aku ngerti kok, hubungan yang sehat itu bukan yang isinya bahagia
              terus. Kadang kita capek, kadang salah paham, kadang cara kita
              mikir atau nyampeinnya beda, hehhehe. Tapi yang bikin aku
              bersyukur, sejauh ini kita selalu milih buat balik ngobrol, bukan
              saling diem. Milih buat ngerti, bukan sekadar pengin bener
              sendiri. Dan menurut aku, itu udah sesuatu yang besar.
              <br />
              <br />
              Jujur nihhh, IZIINNNNN, kamu tuh bukan cuma orang yang aku sayang.
              Kamu rumah. Tempat aku bisa jadi diri sendiri tanpa harus mikir
              ini harus gimana, itu harus gimana, kek jadi diri sendiri, jadi
              batman pun bisa. Intinya kek aku bisa cerita hal receh sampai hal
              yang sebenarnya susah buat aku bilang ke siapa-siapa. Kamu juga
              pelan-pelan ngajarin aku buat jadi versi diri yang lebih sabar,
              lebih berani ngomong jujur, dan lebih dewasa ngadepin banyak hal.
              <br />
              <br />
              Dunia mungkin bakal terus berubah tiap tahun. Rencana bisa
              tiba-tiba berantakan, jadwal bisa kacau, hidup kadang nggak sesuai
              ekspektasi. Tapi ada satu hal yang pengin aku jaga: kita tetap
              saling milih. Bukan karena semuanya gampang, tapi karena dari awal
              pun kita tahu, hubungan ini memang butuh diusahain. Dan rasa
              sayang aku ke kamu bukan yang sekadar bertahan, tapi tumbuh.
              Pelan, tapi nyata.
              <br />
              <br />
              Jadi, yokkkk masuk 2026 dengan versi yang lebih tenang. Lebih
              jujur kalau lagi capek, lebih cepet minta maaf kalau salah, dan
              lebih inget kalau kita itu satu tim, kita adalah batman dan robin.
              Aku pengin lebih hadir, lebih peka, dan lebih konsisten ada buat
              kamu, bukan cuma pas lagi enak, tapi juga pas lagi sedih-sedihnya.
              <br />
              <br />
              Dan kalau suatu hari kamu ngerasa ragu, capek, atau ngerasa
              sendirian, inget satu hal: aku di sini. Di pihak kamu. Selalu. I
              love you, always."
            </p>

            <div className="mt-8 pt-8 border-t border-primary/10">
              <p className="font-serif italic text-primary text-2xl animate-pulse-gentle">
                With Love, Ninic ❤️
                <br />
                IZINNNN
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-primary/10 text-center">
        <div className="relative">
          <h2 className="text-[15vw] font-serif leading-none opacity-5 select-none pointer-events-none uppercase animate-text-shimmer">
            FOREVER
          </h2>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground">
              Built with love for you &bull; 2026
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delayed {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(100px) rotate(12deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(12deg);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-100px) rotate(-12deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotate(-12deg);
          }
        }

        @keyframes slide-up-gallery {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-stagger {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* New continuous animations */
        @keyframes particle-float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.3;
          }
          25% {
            transform: translate(20px, -30px) rotate(90deg);
            opacity: 0.5;
          }
          50% {
            transform: translate(-10px, -60px) rotate(180deg);
            opacity: 0.3;
          }
          75% {
            transform: translate(-30px, -30px) rotate(270deg);
            opacity: 0.5;
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-reverse {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(20px);
          }
        }

        @keyframes pulse-gentle {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes spin-very-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate-360 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes heartbeat {
          0%,
          100% {
            transform: scale(1);
          }
          10% {
            transform: scale(1.1);
          }
          20% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.1);
          }
          40% {
            transform: scale(1);
          }
        }

        @keyframes photo-float {
          0%,
          100% {
            transform: translateY(0px) rotate(12deg);
          }
          50% {
            transform: translateY(-15px) rotate(12deg);
          }
        }

        @keyframes photo-float-reverse {
          0%,
          100% {
            transform: translateY(0px) rotate(-12deg);
          }
          50% {
            transform: translateY(15px) rotate(-12deg);
          }
        }

        @keyframes gradient-text {
          0%,
          100% {
            filter: brightness(1);
          }
          50% {
            filter: brightness(1.2);
          }
        }

        @keyframes text-shimmer {
          0% {
            opacity: 0.05;
          }
          50% {
            opacity: 0.08;
          }
          100% {
            opacity: 0.05;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s backwards;
        }

        .animate-fade-in-delayed {
          animation: fade-in-delayed 1s ease-out 0.6s backwards;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1.2s ease-out 0.8s backwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 1.2s ease-out 1s backwards;
        }

        .animate-slide-up-gallery {
          animation: slide-up-gallery 1s ease-out;
        }

        .animate-fade-in-stagger {
          animation: fade-in-stagger 0.8s ease-out backwards;
        }

        /* Continuous animations */
        .animate-particle-float {
          animation: particle-float linear infinite;
        }

        .animate-blob {
          animation: blob 20s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: float-reverse 5s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }

        .animate-spin-very-slow {
          animation: spin-very-slow 20s linear infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-rotate-360 {
          animation: rotate-360 10s linear infinite;
        }

        .animate-heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }

        .animate-photo-float {
          animation: photo-float 4s ease-in-out infinite;
        }

        .animate-photo-float-reverse {
          animation: photo-float-reverse 5s ease-in-out infinite;
        }

        .animate-gradient-text {
          animation: gradient-text 3s ease-in-out infinite;
        }

        .animate-text-shimmer {
          animation: text-shimmer 8s ease-in-out infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </main>
  );
}
