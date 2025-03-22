import LessonCard from "./LessonCard";

export default function LessonGrid({ lessons, onlineTeachers }) {
  return (
    <div className="row gy-6 mb-6">
      {lessons.length > 0 ? (
        lessons
          .toReversed()
          .map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isOnline={onlineTeachers[lesson.teacher_id]}
            />
          ))
      ) : (
        <p>Ders bulunamadı.</p>
      )}
    </div>
  );
}
