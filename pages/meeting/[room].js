import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import Swal from "sweetalert2";

const MeetingPage = () => {
  const router = useRouter();
  const { room } = router.query;
  const jitsiContainerRef = useRef(null);
  const [apiInstance, setApiInstance] = useState(null);
  const userData = useContext(UserContext);

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
        setApiInstance(api);

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

  const handleCompleteClass = async () => {
    const lessonLink = `/meeting/${room}`;
    console.log("🧪 userData:", userData);
    console.log("📡 Sending room:", lessonLink);

    try {
      const res = await fetch("/api/live-classes/complete", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room: lessonLink }),
      });

      const data = await res.json();
      console.log("✅ API response:", data);

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Ders tamamlandı!",
          text: "Katılımcılara kapatıldı.",
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Bir hata oluştu",
          text: data?.message || "Sunucu hatası.",
        });
      }
    } catch (error) {
      console.error("❌ Error:", error);
      await Swal.fire({
        icon: "error",
        title: "Ağ hatası",
        text: "İşlem sırasında bir hata oluştu.",
      });
    }
  };

  useEffect(() => {
    console.log("🚀 room from router:", room);
    console.log("👤 userData:", userData);
  }, [room, userData]);

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper justify-content-center">
          <div className="container">
            <div className="row">
              <div className="col">
                {userData?.role === "teacher" && (
                  <div className="text-center mb-3">
                    <button
                      className="btn btn-success"
                      onClick={handleCompleteClass}
                    >
                      Dersi Bitir
                    </button>
                  </div>
                )}
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
                    style={{ width: "100%", borderRadius: "8px" }}
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
