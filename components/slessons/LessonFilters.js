export default function LessonFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedGrade,
  setSelectedGrade,
  selectedRating,
  setSelectedRating,
  selectedLanguage,
  setSelectedLanguage,
}) {
  return (
    <div className="card-header d-flex flex-wrap justify-content-between gap-4">
      <div className="d-flex justify-content-md-end align-items-center column-gap-6">
        <select
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Tüm Dersler</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <select
          className="form-select"
          value={selectedGrade}
          onChange={(e) => setSelectedGrade(e.target.value)}
        >
          <option value="">Tüm Düzeyler</option>
          <option value="beginner">Başlangıç</option>
          <option value="intermediate">Orta</option>
          <option value="advanced">İleri</option>
        </select>
        <select
          className="form-select"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="">Tüm Puanlar</option>
          <option value="1">1 Yıldız ve Üzeri</option>
          <option value="2">2 Yıldız ve Üzeri</option>
          <option value="3">3 Yıldız ve Üzeri</option>
          <option value="4">4 Yıldız ve Üzeri</option>
          <option value="5">5 Yıldız</option>
        </select>
        <select
          className="form-select"
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="">Tüm Diller</option>
          <option value="Turkish">Türkçe</option>
          <option value="English">İngilizce</option>
          <option value="French">Fransızca</option>
          <option value="German">Almanca</option>
          <option value="Spanish">İspanyolca</option>
        </select>
      </div>
    </div>
  );
}
