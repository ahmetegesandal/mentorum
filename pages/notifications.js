import LayoutMenu from "../components/LayoutMenu";
import UpcomingEvents from "../components/UpcomingEvents";
import Navbar from "../components/Navbar";

import { UserContext } from "../contexts/UserContext";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";

const Notifications = () => {
  const userData = useContext(UserContext);
  const router = useRouter();

  return (
    <>
      <LayoutMenu />
      <div className="layout-page">
        <Navbar />
        <div className="content-wrapper">
          <div className="container-xxl flex-grow-1 container-py">
            <div className="card bg-transparent shadow-none my-6 border-0">
              <div className="card-body row p-0 pb-6 g-6">
                <div className="col-12">
                  <div className="row g-4">
                    <div className="col-lg-8">fdsfsdd</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
