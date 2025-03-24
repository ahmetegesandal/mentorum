import UserAvatar from "../UserAvatar";

export default function LessonCard({ lesson, isOnline }) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className="card p-2 h-100 shadow-none border">
        <div className="rounded-2 text-center mb-4">
          <a href={`/lessons/${lesson.id}`}>
            <img
              src={`${lesson.lesson_photo}`}
              alt={lesson.title}
              width="300"
              height="180"
              style={{ objectFit: "cover" }}
            />
          </a>
        </div>

        <div className="card-body p-4 pt-2">
          <div className="d-flex align-items-center mb-4 gap-3">
            <UserAvatar
              username={lesson.teacher_username}
              photo={lesson.teacher_profile}
              isOnline={isOnline}
            />
            <span>
              {lesson.teacher_name} {lesson.teacher_surname}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <span className="badge bg-label-primary">
              {lesson.category_name}
            </span>
            <p className="d-flex align-items-center fw-medium gap-1 mb-0">
              {Number(lesson.average_rating).toFixed(1)}
              <span className="text-warning">
                <i className="ti ti-star-filled ti-lg me-1"></i>
              </span>
              <span className="fw-normal">({lesson.review_count || "0"})</span>
            </p>
          </div>

          <a href={`/lessons/${lesson.id}`} className="h5">
            {lesson.title}
          </a>
          <p className="mt-1">
            {lesson.description
              .replace(/<\/?[^>]+(>|$)/g, "")
              .substring(0, 100)}
            ...
          </p>

          <p>
            <strong>Fiyat:</strong> {lesson.price}$
          </p>
          <a
            className="w-100 btn btn-label-primary d-flex align-items-center"
            href={`/lessons/${lesson.id}`}
          >
            <span className="me-2">Detayları Görüntüle</span>
            <i className="ti ti-chevron-right ti-xs scaleX-n1-rtl"></i>
          </a>
        </div>
      </div>
    </div>
  );
}
