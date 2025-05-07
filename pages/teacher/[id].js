// pages/teacher/[id].js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import TeacherProfile from "../../components/TeacherProfile";

const TeacherDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/teacher/${id}`)
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Veri alınamadı", err));
  }, [id]);

  if (!data) return <p>Yükleniyor...</p>;
  if (data.error) return <p>Hata: {data.error}</p>;

  return (
    <TeacherProfile
      teacher={data.teacher}
      calendar={data.calendar}
      reviews={data.reviews}
    />
  );
};

export default TeacherDetailPage;
