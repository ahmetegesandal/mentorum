import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";

const MeetingPage = () => {
  const router = useRouter();
  const { room } = router.query;
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.JitsiMeetExternalAPI && room) {
      const domain = "meet.jit.si";
      const options = {
        roomName: room, // 📌 Dinamik olarak URL'den gelen oda ismi kullanılıyor!
        width: "100%",
        height: "600px",
        parentNode: jitsiContainerRef.current,
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
          defaultLanguage: "tr",
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WELCOME_PAGE: false,
          SHOW_POWERED_BY: false,
          BRAND_WATERMARK_LINK: "https://yourwebsite.com",
          TOOLBAR_BUTTONS: [
            "microphone",
            "camera",
            "chat",
            "hangup",
            "desktop",
            "settings",
            "raisehand",
          ],
        },
      };

      try {
        const api = new window.JitsiMeetExternalAPI(domain, options);

        api.addEventListener("videoConferenceJoined", () => {
          console.log("You have joined the conference.");
        });

        return () => {
          api.dispose();
        };
      } catch (error) {
        console.error("Failed to initialize JitsiMeetExternalAPI:", error);
      }
    }
  }, [room]);

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "20px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <div
              ref={jitsiContainerRef}
              style={{
                width: "80%",
                height: "600px",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(MeetingPage), { ssr: false });
