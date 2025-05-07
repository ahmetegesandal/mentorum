// components/UserAvatar.js

"use client";

import React from "react";
import { useRouter } from "next/router";

export default function TeacherAvatar({ username, photo, isOnline }) {
  const router = useRouter();

  const handleProfile = (username) => {
    if (!username) {
      console.error("Hata: teacher_username değeri tanımsız!");
      return;
    }
    router.push(`/profile/${username}`);
  };

  const avatarClass = `avatar ${isOnline ? "avatar-online" : "avatar-offline"}`;
  const avatarSrc = photo
    ? `/img/avatars/${photo}`
    : "/img/avatars/default.png";

  return (
    <a target="__blank" onClick={() => handleProfile(username)}>
      <div className={avatarClass}>
        <img src={avatarSrc} alt="Avatar" className="rounded-circle" />
      </div>
    </a>
  );
}
