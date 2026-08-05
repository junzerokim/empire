"use client";

import { useEffect, useRef, useState } from "react";

type ContactDict = {
  name: string;
  email: string;
  phone: string;
  checkin: string;
  checkout: string;
  guests: string;
  room_type: string;
  message: string;
  message_placeholder: string;
  submit: string;
  success: string;
};

type RoomsDict = {
  room1_name: string;
  room2_name: string;
};

export default function ContactForm({
  t,
  rooms,
}: {
  t: ContactDict;
  rooms: RoomsDict;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [roomType, setRoomType] = useState<"standard" | "deluxe">("standard");
  const [roomOpen, setRoomOpen] = useState(false);
  const [guests, setGuests] = useState("");
  const roomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (roomRef.current && !roomRef.current.contains(e.target as Node)) {
        setRoomOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const roomOptions = [
    { value: "standard" as const, label: rooms.room1_name },
    { value: "deluxe" as const, label: rooms.room2_name },
  ];

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-6">✓</div>
        <p
          className="text-[#1a1a1a] text-xl"
          style={{ fontFamily: "'Noto Serif KR', serif" }}
        >
          {t.success}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
            {t.name}
          </label>
          <input
            type="text"
            required
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors bg-transparent"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
            {t.email}
          </label>
          <input
            type="email"
            required
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors bg-transparent"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
            {t.phone}
          </label>
          <input
            type="tel"
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors bg-transparent"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
            {t.guests}
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={guests}
            onChange={(e) => setGuests(e.target.value.replace(/[^0-9]/g, ""))}
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors bg-transparent"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
            {t.checkin}
          </label>
          <input
            type="date"
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors bg-transparent"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
            {t.checkout}
          </label>
          <input
            type="date"
            className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors bg-transparent"
          />
        </div>
      </div>

      <div ref={roomRef} className="relative">
        <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
          {t.room_type}
        </label>
        <button
          type="button"
          onClick={() => setRoomOpen((v) => !v)}
          className="w-full border-b border-gray-300 py-3 text-sm text-left focus:outline-none focus:border-[#c9a84c] transition-colors bg-transparent flex items-center justify-between"
        >
          <span>{roomOptions.find((o) => o.value === roomType)?.label}</span>
          <span className={`text-gray-400 text-xs transition-transform ${roomOpen ? "rotate-180" : ""}`}>
            ▾
          </span>
        </button>
        <input type="hidden" name="room_type" value={roomType} />
        {roomOpen && (
          <ul className="absolute z-10 top-full left-0 mt-1 w-full bg-white border border-gray-200 shadow-lg">
            {roomOptions.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    setRoomType(option.value);
                    setRoomOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-[#f8f4ee] ${
                    option.value === roomType ? "text-[#c9a84c]" : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <label className="block text-xs tracking-widest uppercase text-gray-500 mb-2">
          {t.message}
        </label>
        <textarea
          rows={4}
          placeholder={t.message_placeholder}
          className="w-full border-b border-gray-300 py-3 text-sm focus:outline-none focus:border-[#c9a84c] transition-colors bg-transparent resize-none placeholder:text-gray-300"
        />
      </div>

      <button
        type="submit"
        className="w-full py-4 bg-[#1a1a1a] text-[#c9a84c] text-sm tracking-widest uppercase hover:bg-[#c9a84c] hover:text-[#1a1a1a] transition-colors"
      >
        {t.submit}
      </button>
    </form>
  );
}
