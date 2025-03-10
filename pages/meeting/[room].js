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
        roomName: room,
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
        <div className="content-wrapper justify-content-center">
          <div className="container">
            <div className="row">
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "20px",
                  }}
                >
                  <div
                    ref={jitsiContainerRef}
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(MeetingPage), { ssr: false });
