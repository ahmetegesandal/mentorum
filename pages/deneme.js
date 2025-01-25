// pages/meeting.js
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import LayoutMenu from "../components/LayoutMenu";
import Navbar from "../components/Navbar";

const MeetingPage = () => {
  const jitsiContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.JitsiMeetExternalAPI) {
      const domain = "meet.jit.si";
      const options = {
        roomName: "TestRoom",
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

        // Event listeners for better user interaction
        api.addEventListener("videoConferenceJoined", () => {
          console.log("You have joined the conference.");
        });

        api.addEventListener("videoConferenceLeft", () => {
          console.log("You have left the conference.");
        });

        // Cleanup function to remove Jitsi instance on unmount
        return () => {
          api.dispose();
        };
      } catch (error) {
        console.error("Failed to initialize JitsiMeetExternalAPI:", error);
      }
    } else {
      console.warn(
        "JitsiMeetExternalAPI is not available or not supported by the browser."
      );
    }
  }, []); // Empty dependency array ensures this runs only once

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
                width: "80%", // Genişlik %80, tasarıma göre özelleştirilebilir
                height: "600px", // Yükseklik sabit
                borderRadius: "8px", // Kenarları yuvarlatılmış
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Hafif gölge
              }}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(MeetingPage), { ssr: false });
