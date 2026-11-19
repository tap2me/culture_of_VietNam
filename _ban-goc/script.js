document.addEventListener("DOMContentLoaded", () => {
  // AUDIO ELEMENTS & CONTROLS
  const audios = {
    "region-north": document.getElementById("audio-north"),
    "region-central": document.getElementById("audio-central"),
    "region-south": document.getElementById("audio-south"),
  };

  const trackDetails = {
    "region-north": {
      title: "Northern Folk Music",
      subtitle: "Hanoi Heritage",
    },
    "region-central": {
      title: "Hue Royal Court Music",
      subtitle: "Central Elegance",
    },
    "region-south": { title: "Don Ca Tai Tu", subtitle: "Southern Rhythm" },
  };

  let currentRegion = null;
  let isMutedByUser = false;
  let resumeAfterVideo = false;

  const audioBar = document.getElementById("audio-controller");
  const discIcon = document.getElementById("disc-icon");
  const trackTitle = document.getElementById("track-title");
  const trackSubtitle = document.getElementById("track-subtitle");
  const toggleAudioBtn = document.getElementById("toggle-audio-btn");
  const audioStatusText = document.getElementById("audio-status-text");

  // SCREENS
  const welcomeScreen = document.getElementById("welcome-screen");
  const mapScreen = document.getElementById("map-screen");
  const thanksScreen = document.getElementById("thanks-screen");
  const contentScreens = document.querySelectorAll(".content-screen");

  const audioBtnIcon = toggleAudioBtn.querySelector("i");
  const videos = document.querySelectorAll(".culture-video");

  // Cập nhật giao diện nút nhạc theo trạng thái thật của audio
  function updateAudioUI(isPlaying) {
    discIcon.classList.toggle("spinning", isPlaying);
    audioStatusText.textContent = isPlaying ? "Pause Music" : "Play Music";
    if (audioBtnIcon) {
      audioBtnIcon.classList.toggle("fa-pause", isPlaying);
      audioBtnIcon.classList.toggle("fa-play", !isPlaying);
    }
  }

  // HELPER: STOP ALL BACKGROUND MUSIC
  function stopAllMusic() {
    Object.values(audios).forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    discIcon.classList.remove("spinning");
  }

  // HELPER: có video nào đang phát không
  function isAnyVideoPlaying() {
    return Array.from(videos).some((v) => !v.paused && !v.ended);
  }

  // HELPER: tắt toàn bộ nhạc nền ngay lập tức (không reset về đầu bài)
  function pauseAllMusic() {
    Object.values(audios).forEach((audio) => {
      if (audio && !audio.paused) audio.pause();
    });
    updateAudioUI(false);
  }

  // CHỐT CHẶN: nhạc nền không bao giờ được phát khi video đang chạy.
  // Dù lệnh play() của nhạc đến muộn (autoplay chờ tải) thì vẫn bị dừng lại.
  Object.values(audios).forEach((audio) => {
    if (!audio) return;
    ["play", "playing"].forEach((evt) => {
      audio.addEventListener(evt, () => {
        if (isAnyVideoPlaying()) {
          audio.pause();
          updateAudioUI(false);
        }
      });
    });
  });

  // HELPER: PLAY AUDIO FOR SPECIFIC REGION
  function playRegionMusic(regionId) {
    stopAllMusic();

    currentRegion = regionId;
    const targetAudio = audios[regionId];
    const details = trackDetails[regionId];
    if (!targetAudio || !details) return;

    audioBar.classList.remove("hidden");
    trackTitle.textContent = details.title;
    trackSubtitle.textContent = details.subtitle;

    // Người dùng đã tắt nhạc thì giữ nguyên trạng thái tắt
    if (isMutedByUser) {
      updateAudioUI(false);
      return;
    }

    if (isAnyVideoPlaying()) {
      updateAudioUI(false);
      return;
    }

    targetAudio.volume = 0.6;
    targetAudio
      .play()
      .then(() => updateAudioUI(true))
      .catch((err) => {
        // Trình duyệt chặn autoplay -> hiện nút "Play Music" để bấm
        console.log("Autoplay blocked or interrupted:", err);
        updateAudioUI(false);
      });
  }

  // TOGGLE MUTE / PLAY MUSIC
  toggleAudioBtn.addEventListener("click", () => {
    if (!currentRegion) return;

    const activeAudio = audios[currentRegion];
    if (!activeAudio) return;

    if (activeAudio.paused) {
      isMutedByUser = false;
      // Đang xem video thì không bật nhạc nền chồng lên tiếng video
      resumeAfterVideo = false;
      videos.forEach((v) => {
        if (!v.paused) v.pause();
      });
      activeAudio
        .play()
        .then(() => updateAudioUI(true))
        .catch((err) => console.log("Play failed:", err));
    } else {
      isMutedByUser = true;
      activeAudio.pause();
      updateAudioUI(false);
    }
  });

  // HELPER: DỪNG VIDEO KHI RỜI TRANG
  function stopVideos() {
    videos.forEach((v) => {
      if (!v.paused) v.pause();
      if (v.currentTime > 0) v.currentTime = 0;
    });
  }

  // NAVIGATION LOGIC
  function showScreen(screenId) {
    welcomeScreen.classList.add("hidden");
    mapScreen.classList.add("hidden");
    thanksScreen.classList.add("hidden");
    stopVideos();
    contentScreens.forEach((s) => s.classList.add("hidden"));

    if (screenId === "welcome") {
      welcomeScreen.classList.remove("hidden");
      audioBar.classList.add("hidden");
      stopAllMusic();
      window.scrollTo({ top: 0 });
    } else if (screenId === "map") {
      mapScreen.classList.remove("hidden");
      audioBar.classList.add("hidden");
      stopAllMusic();
    } else if (screenId === "thanks-screen") {
      thanksScreen.classList.remove("hidden");
      audioBar.classList.add("hidden");
      stopAllMusic();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const targetScreen = document.getElementById(screenId);
      if (targetScreen) {
        targetScreen.classList.remove("hidden");
        window.scrollTo({ top: 0, behavior: "smooth" });
        playRegionMusic(screenId);
      }
    }
  }

  // EVENT LISTENERS
  document
    .getElementById("btn-explore")
    .addEventListener("click", () => showScreen("map"));

  // MAP PINS CLICK
  document.querySelectorAll(".map-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      const targetRegion = pin.getAttribute("data-target");
      showScreen(targetRegion);
    });
  });

  // DIRECT NEXT REGION BUTTONS
  document.querySelectorAll(".btn-next-region").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextRegion = btn.getAttribute("data-next");
      showScreen(nextRegion);
    });
  });

  // DIRECT PREVIOUS REGION BUTTONS
  document.querySelectorAll(".btn-prev-region").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prevRegion = btn.getAttribute("data-prev");
      showScreen(prevRegion);
    });
  });

  // RESTART FROM THANK-YOU SCREEN
  document
    .getElementById("btn-restart")
    .addEventListener("click", () => showScreen("welcome"));

  // BACK TO MAP BUTTONS
  document.querySelectorAll(".btn-back-map").forEach((btn) => {
    btn.addEventListener("click", () => showScreen("map"));
  });

  // KHI XEM VIDEO: TẮT NHẠC NỀN. VIDEO DỪNG/HẾT: BẬT LẠI NHẠC (nếu trước đó nhạc đang chạy)
  videos.forEach((video) => {
    const onVideoStart = () => {
      // Ghi nhớ nhạc có đang chạy trước khi video bắt đầu hay không
      const activeAudio = currentRegion && audios[currentRegion];
      if (activeAudio && !activeAudio.paused) resumeAfterVideo = true;
      if (isMutedByUser) resumeAfterVideo = false;
      pauseAllMusic();
    };
    video.addEventListener("play", onVideoStart);
    video.addEventListener("playing", onVideoStart);

    const onVideoStop = () => {
      if (isAnyVideoPlaying()) return;
      // Đã rời trang vùng miền (thanh nhạc ẩn) thì không bật lại
      if (audioBar.classList.contains("hidden")) {
        resumeAfterVideo = false;
        return;
      }
      if (!resumeAfterVideo || isMutedByUser) return;
      resumeAfterVideo = false;
      const audio = currentRegion && audios[currentRegion];
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => updateAudioUI(true))
          .catch(() => updateAudioUI(false));
      }
    };
    video.addEventListener("pause", onVideoStop);
    video.addEventListener("ended", onVideoStop);
  });
});
