import { useEffect, useState, useContext } from "react";
import LayoutMenu from "../../components/LayoutMenu";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import CommentsSection from "../../components/CommentsSection";

const TicketDetails = ({ ticketData, commentsData }) => {
  const router = useRouter();
  const userData = useContext(UserContext);

  if (!ticketData) {
    return (
      <>
        <LayoutMenu />
        <div className="layout-page">
          <Navbar />
          <div className="container py-4">
            <h3>Ticket Bulunamadı</h3>
            <button className="btn btn-primary" onClick={() => router.push("/tickets")}>
              Geri Dön
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="container py-4">
          <button className="btn btn-primary mb-3" onClick={() => router.push("/tickets")}>
            Geri Dön
          </button>
          <h3>{ticketData.subject}</h3>
          <p><strong>Açıklama:</strong> {ticketData.description}</p>
          <p><strong>Durum:</strong> {ticketData.status}</p>
          <p><strong>Öncelik:</strong> {ticketData.priority}</p>
          <p><strong>Kullanıcı:</strong> {ticketData.userEmail}</p>
          <hr />
          <h4>Yorumlar</h4>
          <CommentsSection ticketId={ticketData.id} comments={commentsData} />
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const ticketResponse = await axios.get(`http://localhost:3000/api/tickets/${params.id}`);
    const commentsResponse = await axios.get(`http://localhost:3000/api/tickets/${params.id}/comments`);

    return {
      props: {
        ticketData: ticketResponse.data,
        commentsData: commentsResponse.data,
      },
    };
  } catch (error) {
    return { props: { ticketData: null, commentsData: [] } };
  }
}

export default TicketDetails;
