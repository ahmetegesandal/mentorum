const TeacherProfile = ({ teacher, calendar, reviews }) => {
    return (
      <div className="container mt-5">
        <h2>{teacher.name} {teacher.surname}</h2>
        <img src={`/img/avatars/${teacher.photo}`} alt={teacher.name} className="img-thumbnail" />
        <p><strong>Uzmanlık:</strong> {teacher.expertise}</p>
        <p><strong>Hakkımda:</strong> {teacher.bio}</p>
  
        <hr />
        <h4>Müsaitlik Takvimi</h4>
        {calendar.length > 0 ? (
          <ul>
            {calendar.map((slot, idx) => (
              <li key={idx}>
                {slot.date} - {slot.time}
              </li>
            ))}
          </ul>
        ) : (
          <p>Şu anda müsaitlik bulunmamaktadır.</p>
        )}
  
        <hr />
        <h4>Yorumlar</h4>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((r, idx) => (
              <li key={idx}>
                <strong>{r.student_name}</strong>: {r.comment} ({r.rating} ⭐)
              </li>
            ))}
          </ul>
        ) : (
          <p>Henüz yorum yok.</p>
        )}
  
        <button className="btn btn-success">Deneme Dersi Ayırt</button>
      </div>
    );
  };
  
  export default TeacherProfile;
  