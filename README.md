**Proje Kurulum Rehberi**

Bu rehber, `https://github.com/ahmetegesandal/my-app` projesini yerel ortamda çalıştırmak için gerekli adımları içermektedir.

---

## **1. Gerekli Uygulamalar**

Projeyi çalıştırabilmek için aşağıdaki uygulamaların sisteminize kurulu olması gerekmektedir:

### **1.1 Node.js ve npm**

- Proje bir **Node.js** uygulaması olduğu için, en az **Node.js 16.x** veya üzeri bir sürüm yüklenmelidir.
- **Yüklemek için:**
  - [Node.js Resmi Sitesi](https://nodejs.org/) üzerinden **LTS sürümünü** indirin ve yükleyin.
  - Yüklemeyi doğrulamak için terminal veya komut satırında aşağıdaki komutları çalıştırın:
    ```bash
    node -v  # Node.js sürümünü gösterir
    npm -v   # npm sürümünü gösterir
    ```

### **1.2 Git**

- Projeyi GitHub üzerinden klonlamak için **Git** gereklidir.
- **Yüklemek için:**
  - [Git Resmi Sitesi](https://git-scm.com/) üzerinden işletim sisteminize uygun versiyonu indirin ve yükleyin.
  - Windows kullanıcıları **Git Bash** seçeneğini de kurmalıdır.
  - Yüklemeyi doğrulamak için terminal veya komut satırında aşağıdaki komutu çalıştırın:
    ```bash
    git --version  # Git sürümünü gösterir
    ```

### **1.3 XAMPP (MySQL İçin)**

- Eğer proje **MySQL** veritabanı kullanıyorsa, yerel MySQL sunucusu çalıştırmak için **XAMPP** yüklenmelidir.
- **Yüklemek için:**
  - [XAMPP Resmi Sitesi](https://www.apachefriends.org/) üzerinden işletim sisteminize uygun versiyonu indirin ve yükleyin.
  - **XAMPP Kontrol Paneli** üzerinden **MySQL servisini başlatın.**

### **1.4 Bir Kod Editörü (Önerilen: VS Code)**

- Kod yazmak ve düzenlemek için **Visual Studio Code (VS Code)** önerilir.
- **Yüklemek için:**
  - [VS Code Resmi Sitesi](https://code.visualstudio.com/) üzerinden indirin ve yükleyin.

---

## **2. Projeyi Kurma ve Çalıştırma**

Aşağıdaki adımları takip ederek projeyi yerel ortamda çalıştırabilirsiniz.

### **2.1 Projeyi Klonlama**

Terminal veya komut satırında aşağıdaki komutu çalıştırın:

```bash
git clone https://github.com/ahmetegesandal/my-app.git
cd my-app
```

### **2.2 Bağımlılıkları Yükleme**

```bash
npm install
```

### **2.4 Veritabanı Kurulumu**

1. **MySQL’i açın (XAMPP üzerinden).**
2. **phpMyAdmin** veya MySQL terminali ile yeni bir veritabanı oluşturun:
   ```sql
   CREATE DATABASE my_auth_db;
   ```

### **2.5 Projeyi Çalıştırma**

```bash
npm run dev  # Geliştirme modunda çalıştırır
node server.js  # Anlık sohbet uygulamasının çalışması için boş bir cmd de başlatmak gerekli.
```

- Sunucu başarılı şekilde başlarsa, **http://localhost:3000/** adresinden erişebilirsiniz.

---

## **4. Sonuç**

Bu döküman, projeyi sorunsuz bir şekilde yerel ortamda çalıştırmanız için gerekli tüm adımları içermektedir. Eğer sorun yaşarsanız, ekip üyelerinizden veya proje sahibiyle iletişime geçerek destek alabilirsiniz. 🚀

## Kullanıcı Hesapları

Aşağıdaki kullanıcı hesaplarını test amaçlı kullanabilirsiniz:

| Kullanıcı Adı | Şifre  | Yetki                          |
| ------------- | ------ | ------------------------------ |
| ege           | ege123 | admin                          |
| sena          | ege123 | admin                          |
| emir          | ege123 | admin                          |
| ufuk          | ege123 | admin                          |
| hatice        | ege123 | admin                          |
| furkan        | ege123 | admin                          |
| sibel         | ege123 | teacher                        |
| yavuz         | ege123 | student                        |
| senem         | ege123 | parent                         |
| doruk         | ege123 | student (seneme bağlı öğrenci) |
