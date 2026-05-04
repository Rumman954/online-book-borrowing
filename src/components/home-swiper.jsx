"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function HomeSwiper({ books }) {
  const slides = books.slice(0, 6);
  if (slides.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--library-ink)]">
            Reader picks carousel
          </h2>
          <p className="mt-2 max-w-xl text-sm opacity-80">
            Swipe through staff favorites—each title is available to borrow today.
          </p>
        </div>
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1.15}
        autoplay={{ delay: 4200, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2.1 },
          1024: { slidesPerView: 3.1 },
        }}
        className="!pb-10"
      >
        {slides.map((book) => (
          <SwiperSlide key={book.id}>
            <div className="flex gap-4 rounded-2xl bg-base-100 p-4 shadow-sm ring-1 ring-[color-mix(in_oklab,var(--library-ink)_8%,transparent)]">
              <div className="relative h-36 w-24 shrink-0 overflow-hidden rounded-lg bg-base-200">
                <Image
                  src={book.image_url}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--library-sage)]">
                  {book.category}
                </p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug line-clamp-2">
                  {book.title}
                </p>
                <p className="text-sm opacity-70">{book.author}</p>
                {book.available_quantity <= 0 ? (
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-[var(--library-accent)]">
                    Coming Soon
                  </p>
                ) : null}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
