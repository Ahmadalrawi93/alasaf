// ===== شركة العساف للمحاماة - ملف JavaScript =====

// انتظار تحميل الصفحة
document.addEventListener('DOMContentLoaded', function () {
  // تهيئة التأثيرات
  initScrollAnimations();
  initSmoothScrolling();
  initContactForm();
  initMobileMenu();
});

// ===== تأثيرات التمرير =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // مراقبة العناصر التي تحتاج تأثيرات
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

// ===== التمرير السلس =====
function initSmoothScrolling() {
  // إضافة تأثير التمرير السلس للروابط الداخلية
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===== نموذج الاتصال =====
function initContactForm() {
  const contactForm = document.querySelector('.contact-form form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // جمع بيانات النموذج
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // التحقق من صحة البيانات
      if (validateForm(data)) {
        // إرسال البيانات (يمكن ربطها بخادم لاحقاً)
        sendContactForm(data);
      }
    });
  }
}

// ===== التحقق من صحة النموذج =====
function validateForm(data) {
  const errors = [];

  // التحقق من الاسم
  if (!data.name || data.name.trim().length < 2) {
    errors.push('الاسم مطلوب ويجب أن يكون أكثر من حرفين');
  }

  // التحقق من البريد الإلكتروني
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('البريد الإلكتروني غير صحيح');
  }

  // التحقق من الموضوع
  if (!data.subject || data.subject.trim().length < 3) {
    errors.push('الموضوع مطلوب ويجب أن يكون أكثر من 3 أحرف');
  }

  // التحقق من الرسالة
  if (!data.message || data.message.trim().length < 10) {
    errors.push('الرسالة مطلوبة ويجب أن تكون أكثر من 10 أحرف');
  }

  // عرض الأخطاء إذا وجدت
  if (errors.length > 0) {
    showNotification(errors.join('<br>'), 'error');
    return false;
  }

  return true;
}

// ===== إرسال نموذج الاتصال =====
function sendContactForm(data) {
  // إظهار رسالة التحميل
  const submitBtn = document.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'جاري الإرسال...';
  submitBtn.disabled = true;

  // محاكاة إرسال البيانات (يمكن استبدالها بطلب AJAX حقيقي)
  setTimeout(() => {
    // إعادة تعيين النموذج
    document.querySelector('.contact-form form').reset();

    // إعادة تعيين الزر
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;

    // إظهار رسالة النجاح
    showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');

    // إرسال البيانات الفعلية (يمكن ربطها بخادم)
    console.log('بيانات النموذج:', data);

    // يمكن إضافة كود إرسال حقيقي هنا
    // fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });

  }, 2000);
}

// ===== إظهار الإشعارات =====
function showNotification(message, type = 'info') {
  // إنشاء عنصر الإشعار
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // إضافة الأنماط
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

  // إضافة إلى الصفحة
  document.body.appendChild(notification);

  // إضافة مستمع لإغلاق الإشعار
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.addEventListener('click', () => {
    notification.remove();
  });

  // إزالة الإشعار تلقائياً بعد 5 ثوان
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// ===== القائمة المحمولة =====
function initMobileMenu() {
  // إنشاء زر القائمة المحمولة
  const header = document.querySelector('.header-content');
  const nav = document.querySelector('.nav');

  // إضافة زر القائمة المحمولة
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;

  header.appendChild(mobileMenuBtn);

  // إضافة مستمع للنقر
  mobileMenuBtn.addEventListener('click', function () {
    nav.classList.toggle('mobile-active');
    this.innerHTML = nav.classList.contains('mobile-active') ?
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  // إضافة الأنماط للقائمة المحمولة
  const style = document.createElement('style');
  style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: var(--primary-color);
                flex-direction: column;
                padding: 1rem;
                box-shadow: var(--shadow);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav.mobile-active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav li {
                width: 100%;
                text-align: center;
            }
            
            .nav a {
                display: block;
                padding: 1rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
  document.head.appendChild(style);
}

// ===== تأثيرات إضافية =====

// تأثير الكتابة التدريجية للعنوان الرئيسي
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// تأثير العد التنازلي للأرقام
function animateNumbers() {
  const numbers = document.querySelectorAll('.number');

  numbers.forEach(number => {
    const target = parseInt(number.getAttribute('data-target'));
    const duration = 2000; // 2 ثانية
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      number.textContent = Math.floor(current);
    }, 16);
  });
}

// تحسين الأداء - Lazy Loading للصور
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// تحسين SEO - إضافة البيانات المنظمة
function addStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "شركة العساف للمحاماة - محامي في العراق ومحامي في بغداد",
    "description": "محامي في العراق ومحامي في بغداد متخصص في تسجيل الشركات العراقية، صياغة العقود القانونية، المرافعة في المحاكم، والاستشارات القانونية في العراق",
    "url": window.location.href,
    "telephone": "07803580000",
    "email": "altaf.altaf1984@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "الحارثية - شارع الكندي قرب دائرة الهجرة",
      "addressLocality": "بغداد",
      "addressCountry": "IQ"
    },
    "serviceArea": {
      "@type": "Country",
      "name": "Iraq"
    },
    "keywords": "محامي في العراق، محامي في بغداد، تسجيل شركات عراقية، انشاء شركات عراقية، دعوى قضائية في المحاكم العراقية، تسجيل شركة في العراق، مرافعه في محكمة، صياغه عقود قانونية، استشارات قانونية في العراق، مستشار قانوني",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "الخدمات القانونية",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تسجيل الشركات العراقية وإنشاء الشركات"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "صياغة العقود القانونية"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "المرافعة في المحاكم والدعاوى القضائية"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "الاستشارات القانونية في العراق"
          }
        }
      ]
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// تهيئة البيانات المنظمة
addStructuredData();

// ===== نظام تبديل اللغة =====
class LanguageManager {
  constructor() {
    this.currentLang = localStorage.getItem('language') || 'ar';
    this.toggleBtn = null;
    this.dropdown = null;
    this.selector = null;
    this.currentPage = this.detectCurrentPage();
    this.init();
  }

  detectCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('services.html')) return 'services';
    if (path.includes('team.html')) return 'team';
    if (path.includes('clients.html')) return 'clients';
    if (path.includes('contact.html')) return 'contact';
    return 'home';
  }

  init() {
    // تحميل اللغة المحفوظة
    this.setLanguage(this.currentLang, false);
    
    // إعداد زر التبديل والقائمة
    document.addEventListener('DOMContentLoaded', () => {
      this.toggleBtn = document.getElementById('languageToggle');
      this.dropdown = document.getElementById('languageDropdown');
      this.selector = document.querySelector('.language-selector');
      
      if (this.toggleBtn && this.dropdown) {
        // فتح/إغلاق القائمة عند الضغط على الزر
        this.toggleBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleDropdown();
        });
        
        // اختيار اللغة من القائمة
        const options = this.dropdown.querySelectorAll('.language-option');
        options.forEach(option => {
          option.addEventListener('click', (e) => {
            e.stopPropagation();
            const lang = option.getAttribute('data-lang');
            if (lang) {
              this.setLanguage(lang);
              this.closeDropdown();
            }
          });
        });
        
        // إغلاق القائمة عند الضغط في أي مكان
        document.addEventListener('click', () => {
          this.closeDropdown();
        });
        
        this.updateToggleButton();
        this.updateDropdownSelection();
      }
    });
  }

  toggleDropdown() {
    if (this.selector) {
      this.selector.classList.toggle('active');
    }
  }

  closeDropdown() {
    if (this.selector) {
      this.selector.classList.remove('active');
    }
  }

  setLanguage(lang, animate = true) {
    this.currentLang = lang;
    localStorage.setItem('language', lang);
    
    // تحديث اتجاه الصفحة
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    document.body.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
    
    // تحديث المحتوى حسب الصفحة
    if (typeof translations !== 'undefined') {
      this.updateContent(animate);
      this.updateToggleButton();
      this.updateDropdownSelection();
    }
  }

  updateContent(animate = true) {
    const trans = translations[this.currentLang];
    
    // تحديث الهيدر (موجود في جميع الصفحات)
    this.updateText('.logo-text', trans.companyName, animate);
    this.updateText('.nav a[href="index.html"]', trans.nav.home, animate);
    this.updateText('.nav a[href="services.html"]', trans.nav.services, animate);
    this.updateText('.nav a[href="team.html"]', trans.nav.team, animate);
    this.updateText('.nav a[href="clients.html"]', trans.nav.clients, animate);
    this.updateText('.nav a[href="contact.html"]', trans.nav.contact, animate);
    
    // تحديث الفوتر (موجود في جميع الصفحات)
    this.updateText('.footer p', trans.footer.copyright, animate);
    
    // تحديث محتوى الصفحة المحددة
    switch(this.currentPage) {
      case 'home':
        this.updateHomePage(trans, animate);
        break;
      case 'services':
        this.updateServicesPage(trans, animate);
        break;
      case 'team':
        this.updateTeamPage(trans, animate);
        break;
      case 'clients':
        this.updateClientsPage(trans, animate);
        break;
      case 'contact':
        this.updateContactPage(trans, animate);
        break;
    }
  }

  updateHomePage(trans, animate) {
    // قسم البطل
    this.updateText('.hero h1', trans.hero.title, animate);
    this.updateText('.hero h2', trans.hero.subtitle, animate);
    const heroParagraphs = document.querySelectorAll('.hero p');
    if (heroParagraphs.length >= 2) {
      this.updateText(heroParagraphs[0], trans.hero.description, animate);
      this.updateText(heroParagraphs[1], trans.hero.subdescription, animate);
    }
    this.updateText('.hero .cta-button', trans.hero.cta, animate);
    
    // قسم الخدمات
    const servicesTitle = document.querySelector('.services .section-title');
    if (servicesTitle) {
      this.updateText(servicesTitle, trans.services.mainTitle, animate);
    }
    
    const serviceCards = document.querySelectorAll('.services .service-card');
    if (serviceCards.length >= 3) {
      this.updateText(serviceCards[0].querySelector('h3'), trans.services.service1.title, animate);
      this.updateText(serviceCards[0].querySelector('p'), trans.services.service1.description, animate);
      this.updateText(serviceCards[0].querySelector('a'), trans.services.service1.cta, animate);
      
      this.updateText(serviceCards[1].querySelector('h3'), trans.services.service2.title, animate);
      this.updateText(serviceCards[1].querySelector('p'), trans.services.service2.description, animate);
      this.updateText(serviceCards[1].querySelector('a'), trans.services.service2.cta, animate);
      
      this.updateText(serviceCards[2].querySelector('h3'), trans.services.service3.title, animate);
      this.updateText(serviceCards[2].querySelector('p'), trans.services.service3.description, animate);
      this.updateText(serviceCards[2].querySelector('a'), trans.services.service3.cta, animate);
    }
    
    // قسم العملاء
    const clientsTitle = document.querySelector('.clients .section-title');
    if (clientsTitle) {
      this.updateText(clientsTitle, trans.clients.title, animate);
    }
    
    // ترجمة أسماء العملاء
    const clientCards = document.querySelectorAll('.clients .client-card');
    if (clientCards.length >= 7) {
      this.updateText(clientCards[0].querySelector('.client-name'), trans.clients.client1Name, animate);
      this.updateText(clientCards[0].querySelector('.client-title'), trans.clients.client1Title, animate);
      
      this.updateText(clientCards[1].querySelector('.client-name'), trans.clients.client2Name, animate);
      this.updateText(clientCards[1].querySelector('.client-title'), trans.clients.client2Title, animate);
      
      this.updateText(clientCards[2].querySelector('.client-name'), trans.clients.client3Name, animate);
      this.updateText(clientCards[2].querySelector('.client-title'), trans.clients.client3Title, animate);
      
      this.updateText(clientCards[3].querySelector('.client-name'), trans.clients.client4Name, animate);
      this.updateText(clientCards[3].querySelector('.client-title'), trans.clients.client4Title, animate);
      
      this.updateText(clientCards[4].querySelector('.client-name'), trans.clients.client5Name, animate);
      this.updateText(clientCards[4].querySelector('.client-title'), trans.clients.client5Title, animate);
      
      this.updateText(clientCards[5].querySelector('.client-name'), trans.clients.client6Name, animate);
      this.updateText(clientCards[5].querySelector('.client-title'), trans.clients.client6Title, animate);
      
      this.updateText(clientCards[6].querySelector('.client-name'), trans.clients.client7Name, animate);
      this.updateText(clientCards[6].querySelector('.client-title'), trans.clients.client7Title, animate);
    }
    
    // قسم فريق العمل
    const teamTitle = document.querySelector('.team .section-title');
    if (teamTitle) {
      this.updateText(teamTitle, trans.team.title, animate);
    }
    
    // ترجمة أسماء فريق العمل
    const teamMembers = document.querySelectorAll('.team .team-member');
    if (teamMembers.length >= 5) {
      this.updateText(teamMembers[0].querySelector('.member-name'), trans.team.member1Name, animate);
      this.updateText(teamMembers[0].querySelector('.member-position'), trans.team.member1Position, animate);
      this.updateText(teamMembers[0].querySelector('.member-details'), trans.team.member1Details, animate);
      
      this.updateText(teamMembers[1].querySelector('.member-name'), trans.team.member2Name, animate);
      this.updateText(teamMembers[1].querySelector('.member-position'), trans.team.member2Position, animate);
      this.updateText(teamMembers[1].querySelector('.member-details'), trans.team.member2Details, animate);
      
      this.updateText(teamMembers[2].querySelector('.member-name'), trans.team.member3Name, animate);
      this.updateText(teamMembers[2].querySelector('.member-position'), trans.team.member3Position, animate);
      this.updateText(teamMembers[2].querySelector('.member-details'), trans.team.member3Details, animate);
      
      this.updateText(teamMembers[3].querySelector('.member-name'), trans.team.member4Name, animate);
      this.updateText(teamMembers[3].querySelector('.member-position'), trans.team.member4Position, animate);
      this.updateText(teamMembers[3].querySelector('.member-details'), trans.team.member4Details, animate);
      
      this.updateText(teamMembers[4].querySelector('.member-name'), trans.team.member5Name, animate);
      this.updateText(teamMembers[4].querySelector('.member-position'), trans.team.member5Position, animate);
      this.updateText(teamMembers[4].querySelector('.member-details'), trans.team.member5Details, animate);
    }
    
    // قسم من نحن
    const aboutTitle = document.querySelector('section[style*="padding: 2rem 0"] h2');
    if (aboutTitle) {
      this.updateText(aboutTitle, trans.about.title, animate);
      const aboutParagraphs = document.querySelectorAll('section[style*="padding: 2rem 0"] p');
      if (aboutParagraphs.length >= 2) {
        this.updateText(aboutParagraphs[0], trans.about.text1, animate);
        this.updateText(aboutParagraphs[1], trans.about.text2, animate);
      }
    }
    
    // ترجمة معلومات الاتصال في الفوتر
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
      const contactItems = contactSection.querySelectorAll('.contact-item span');
      if (contactItems.length >= 4) {
        // العنوان
        if (contactItems[2] && contactItems[2].textContent.includes('الحارثية')) {
          this.updateText(contactItems[2], trans.contactInfo.address, animate);
        }
        // ساعات العمل
        const workingHoursSpan = contactSection.querySelector('.contact-item:nth-child(4) span:last-child');
        if (workingHoursSpan && workingHoursSpan.innerHTML.includes('جميع أيام')) {
          workingHoursSpan.innerHTML = trans.contactInfo.workingDays + '<br>' + trans.contactInfo.workingHours;
        }
      }
      
      // الإنستغرام
      const instagramLink = contactSection.querySelector('a[href*="instagram"]');
      if (instagramLink) {
        const instagramSpan = instagramLink.querySelector('span');
        if (instagramSpan) {
          this.updateText(instagramSpan, trans.contactInfo.instagram, animate);
        }
      }
    }
  }

  updateServicesPage(trans, animate) {
    // عنوان الصفحة
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      this.updateText(pageHeader.querySelector('h1'), trans.servicesPage.pageTitle, animate);
      this.updateText(pageHeader.querySelector('p'), trans.servicesPage.pageSubtitle, animate);
    }
    
    // عنوان الخدمات الرئيسية
    const mainServicesTitle = document.querySelector('.services .section-title');
    if (mainServicesTitle) {
      this.updateText(mainServicesTitle, trans.servicesPage.mainServicesTitle, animate);
    }
    
    // الخدمات الرئيسية
    const serviceCards = document.querySelectorAll('.services .service-card');
    if (serviceCards.length >= 3) {
      this.updateText(serviceCards[0].querySelector('h3'), trans.servicesPage.service1.title, animate);
      this.updateText(serviceCards[0].querySelector('p'), trans.servicesPage.service1.description, animate);
      this.updateText(serviceCards[0].querySelector('a'), trans.servicesPage.service1.cta, animate);
      
      this.updateText(serviceCards[1].querySelector('h3'), trans.servicesPage.service2.title, animate);
      this.updateText(serviceCards[1].querySelector('p'), trans.servicesPage.service2.description, animate);
      this.updateText(serviceCards[1].querySelector('a'), trans.servicesPage.service2.cta, animate);
      
      this.updateText(serviceCards[2].querySelector('h3'), trans.servicesPage.service3.title, animate);
      this.updateText(serviceCards[2].querySelector('p'), trans.servicesPage.service3.description, animate);
      this.updateText(serviceCards[2].querySelector('a'), trans.servicesPage.service3.cta, animate);
    }
    
    // الخدمات الإضافية
    const additionalServicesTitle = document.querySelectorAll('.section-title')[1];
    if (additionalServicesTitle) {
      this.updateText(additionalServicesTitle, trans.servicesPage.additionalServicesTitle, animate);
    }
    
    // ترجمة الخدمات الإضافية
    const additionalServices = document.querySelectorAll('section[style*="padding: 2rem 0"][style*="var(--light-bg)"] .fade-in');
    if (additionalServices.length >= 4) {
      this.updateText(additionalServices[0].querySelector('h3'), trans.servicesPage.additionalService1.title, animate);
      this.updateText(additionalServices[0].querySelector('p'), trans.servicesPage.additionalService1.description, animate);
      
      this.updateText(additionalServices[1].querySelector('h3'), trans.servicesPage.additionalService2.title, animate);
      this.updateText(additionalServices[1].querySelector('p'), trans.servicesPage.additionalService2.description, animate);
      
      this.updateText(additionalServices[2].querySelector('h3'), trans.servicesPage.additionalService3.title, animate);
      this.updateText(additionalServices[2].querySelector('p'), trans.servicesPage.additionalService3.description, animate);
      
      this.updateText(additionalServices[3].querySelector('h3'), trans.servicesPage.additionalService4.title, animate);
      this.updateText(additionalServices[3].querySelector('p'), trans.servicesPage.additionalService4.description, animate);
    }
    
    // كيف نعمل
    const howWeWorkTitle = document.querySelectorAll('.section-title')[2];
    if (howWeWorkTitle) {
      this.updateText(howWeWorkTitle, trans.servicesPage.howWeWorkTitle, animate);
    }
    
    // ترجمة خطوات العمل
    const workSteps = document.querySelectorAll('section[style*="var(--white)"] .fade-in');
    if (workSteps.length >= 4) {
      this.updateText(workSteps[0].querySelector('h3'), trans.servicesPage.step1.title, animate);
      this.updateText(workSteps[0].querySelector('p'), trans.servicesPage.step1.description, animate);
      
      this.updateText(workSteps[1].querySelector('h3'), trans.servicesPage.step2.title, animate);
      this.updateText(workSteps[1].querySelector('p'), trans.servicesPage.step2.description, animate);
      
      this.updateText(workSteps[2].querySelector('h3'), trans.servicesPage.step3.title, animate);
      this.updateText(workSteps[2].querySelector('p'), trans.servicesPage.step3.description, animate);
      
      this.updateText(workSteps[3].querySelector('h3'), trans.servicesPage.step4.title, animate);
      this.updateText(workSteps[3].querySelector('p'), trans.servicesPage.step4.description, animate);
    }
  }

  updateTeamPage(trans, animate) {
    // عنوان الصفحة
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      this.updateText(pageHeader.querySelector('h1'), trans.teamPage.pageTitle, animate);
      this.updateText(pageHeader.querySelector('p'), trans.teamPage.pageSubtitle, animate);
    }
    
    // أعضاء الفريق مع جميع التفاصيل
    const teamMembers = document.querySelectorAll('.team-member');
    
    // عضو 1 - الطاف عساف
    if (teamMembers[0]) {
      this.updateText(teamMembers[0].querySelector('.member-name'), trans.team.member1Name, animate);
      this.updateText(teamMembers[0].querySelector('.member-position'), trans.team.member1Position, animate);
      const intro1 = teamMembers[0].querySelector('.member-details > p');
      if (intro1) this.updateText(intro1, trans.team.member1Intro, animate);
      const title1 = teamMembers[0].querySelector('.member-details h4');
      if (title1) this.updateText(title1, trans.team.member1Title, animate);
      const quals1 = teamMembers[0].querySelectorAll('.member-details li');
      if (quals1.length >= 7) {
        this.updateText(quals1[0], trans.team.member1Qual1, animate);
        this.updateText(quals1[1], trans.team.member1Qual2, animate);
        this.updateText(quals1[2], trans.team.member1Qual3, animate);
        this.updateText(quals1[3], trans.team.member1Qual4, animate);
        this.updateText(quals1[4], trans.team.member1Qual5, animate);
        this.updateText(quals1[5], trans.team.member1Qual6, animate);
        this.updateText(quals1[6], trans.team.member1Qual7, animate);
      }
    }
    
    // عضو 2 - قيس ابراهيم
    if (teamMembers[1]) {
      this.updateText(teamMembers[1].querySelector('.member-name'), trans.team.member2Name, animate);
      this.updateText(teamMembers[1].querySelector('.member-position'), trans.team.member2Position, animate);
      const intro2 = teamMembers[1].querySelector('.member-details > p');
      if (intro2) this.updateText(intro2, trans.team.member2Intro, animate);
      const title2 = teamMembers[1].querySelector('.member-details h4');
      if (title2) this.updateText(title2, trans.team.member2Title, animate);
      const quals2 = teamMembers[1].querySelectorAll('.member-details li');
      if (quals2.length >= 2) {
        this.updateText(quals2[0], trans.team.member2Qual1, animate);
        this.updateText(quals2[1], trans.team.member2Qual2, animate);
      }
    }
    
    // عضو 3 - ساهرة حسين
    if (teamMembers[2]) {
      this.updateText(teamMembers[2].querySelector('.member-name'), trans.team.member3Name, animate);
      this.updateText(teamMembers[2].querySelector('.member-position'), trans.team.member3Position, animate);
      const intro3 = teamMembers[2].querySelector('.member-details > p');
      if (intro3) this.updateText(intro3, trans.team.member3Intro, animate);
      const title3 = teamMembers[2].querySelector('.member-details h4');
      if (title3) this.updateText(title3, trans.team.member3Title, animate);
      const quals3 = teamMembers[2].querySelectorAll('.member-details li');
      if (quals3.length >= 4) {
        this.updateText(quals3[0], trans.team.member3Qual1, animate);
        this.updateText(quals3[1], trans.team.member3Qual2, animate);
        this.updateText(quals3[2], trans.team.member3Qual3, animate);
        this.updateText(quals3[3], trans.team.member3Qual4, animate);
      }
    }
    
    // عضو 4 - مثنى عبد الستار
    if (teamMembers[3]) {
      this.updateText(teamMembers[3].querySelector('.member-name'), trans.team.member4Name, animate);
      this.updateText(teamMembers[3].querySelector('.member-position'), trans.team.member4Position, animate);
      const intro4 = teamMembers[3].querySelector('.member-details > p');
      if (intro4) this.updateText(intro4, trans.team.member4Intro, animate);
      const title4 = teamMembers[3].querySelector('.member-details h4');
      if (title4) this.updateText(title4, trans.team.member4Title, animate);
      const quals4 = teamMembers[3].querySelectorAll('.member-details li');
      if (quals4.length >= 5) {
        this.updateText(quals4[0], trans.team.member4Qual1, animate);
        this.updateText(quals4[1], trans.team.member4Qual2, animate);
        this.updateText(quals4[2], trans.team.member4Qual3, animate);
        this.updateText(quals4[3], trans.team.member4Qual4, animate);
        this.updateText(quals4[4], trans.team.member4Qual5, animate);
      }
    }
    
    // عضو 5 - هاجر مجيد
    if (teamMembers[4]) {
      this.updateText(teamMembers[4].querySelector('.member-name'), trans.team.member5Name, animate);
      this.updateText(teamMembers[4].querySelector('.member-position'), trans.team.member5Position, animate);
      const intro5 = teamMembers[4].querySelector('.member-details > p');
      if (intro5) this.updateText(intro5, trans.team.member5Intro, animate);
      const title5 = teamMembers[4].querySelector('.member-details h4');
      if (title5) this.updateText(title5, trans.team.member5Title, animate);
      const quals5 = teamMembers[4].querySelectorAll('.member-details li');
      if (quals5.length >= 2) {
        this.updateText(quals5[0], trans.team.member5Qual1, animate);
        this.updateText(quals5[1], trans.team.member5Qual2, animate);
      }
    }
  }

  updateClientsPage(trans, animate) {
    // عنوان الصفحة
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      this.updateText(pageHeader.querySelector('h1'), trans.clientsPage.pageTitle, animate);
      this.updateText(pageHeader.querySelector('p'), trans.clientsPage.pageSubtitle, animate);
    }
    
    // عنوان القسم
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
      this.updateText(sectionTitle, trans.clientsPage.sectionTitle, animate);
    }
    
    // وصف القسم
    const sectionDesc = document.querySelector('.clients p[style*="text-align: center"]');
    if (sectionDesc) {
      this.updateText(sectionDesc, trans.clientsPage.sectionDescription, animate);
    }
    
    // العملاء مع الترجمات الكاملة
    const clientCards = document.querySelectorAll('.client-card');
    const clientData = [
      { name: trans.clients.client1Name, title: trans.clients.client1Title, testimonial: trans.clients.client1Testimonial },
      { name: trans.clients.client2Name, title: trans.clients.client2Title, testimonial: trans.clients.client2Testimonial },
      { name: trans.clients.client3Name, title: trans.clients.client3Title, testimonial: trans.clients.client3Testimonial },
      { name: trans.clients.client4Name, title: trans.clients.client4Title, testimonial: trans.clients.client4Testimonial },
      { name: trans.clients.client5Name, title: trans.clients.client5Title, testimonial: trans.clients.client5Testimonial },
      { name: trans.clients.client6Name, title: trans.clients.client6Title, testimonial: trans.clients.client6Testimonial },
      { name: trans.clients.client7Name, title: trans.clients.client7Title, testimonial: trans.clients.client7Testimonial }
    ];
    
    clientCards.forEach((card, index) => {
      if (clientData[index]) {
        this.updateText(card.querySelector('.client-name'), clientData[index].name, animate);
        this.updateText(card.querySelector('.client-title'), clientData[index].title, animate);
        const testimonial = card.querySelector('.client-testimonial');
        if (testimonial) {
          this.updateText(testimonial, '"' + clientData[index].testimonial + '"', animate);
        }
      }
    });
    
    // أنواع العملاء
    const clientTypesTitle = document.querySelectorAll('.section-title')[1];
    if (clientTypesTitle) {
      this.updateText(clientTypesTitle, trans.clientsPage.clientTypesTitle, animate);
    }
    
    // ترجمة أنواع العملاء
    const clientTypes = document.querySelectorAll('section[style*="padding: 2rem 0"] > .container > div > div');
    if (clientTypes.length >= 4) {
      this.updateText(clientTypes[0].querySelector('h3'), trans.clients.clientType1Title, animate);
      this.updateText(clientTypes[0].querySelector('p'), trans.clients.clientType1Desc, animate);
      
      this.updateText(clientTypes[1].querySelector('h3'), trans.clients.clientType2Title, animate);
      this.updateText(clientTypes[1].querySelector('p'), trans.clients.clientType2Desc, animate);
      
      this.updateText(clientTypes[2].querySelector('h3'), trans.clients.clientType3Title, animate);
      this.updateText(clientTypes[2].querySelector('p'), trans.clients.clientType3Desc, animate);
      
      this.updateText(clientTypes[3].querySelector('h3'), trans.clients.clientType4Title, animate);
      this.updateText(clientTypes[3].querySelector('p'), trans.clients.clientType4Desc, animate);
    }
  }

  updateContactPage(trans, animate) {
    // عنوان الصفحة
    const pageHeader = document.querySelector('.page-header');
    if (pageHeader) {
      this.updateText(pageHeader.querySelector('h1'), trans.contactPage.pageTitle, animate);
      this.updateText(pageHeader.querySelector('p'), trans.contactPage.pageSubtitle, animate);
    }
    
    // معلومات الاتصال
    const contactInfoTitle = document.querySelector('.contact-info h2');
    if (contactInfoTitle) {
      this.updateText(contactInfoTitle, trans.contactPage.contactInfoTitle, animate);
    }
    
    // عناوين معلومات الاتصال
    const contactItems = document.querySelectorAll('.contact-item h3');
    if (contactItems.length >= 4) {
      this.updateText(contactItems[0], trans.contactPage.phone, animate);
      this.updateText(contactItems[1], trans.contactPage.email, animate);
      this.updateText(contactItems[2], trans.contactPage.address, animate);
      this.updateText(contactItems[3], trans.contactPage.workingHours, animate);
    }
    
    // تحديث نص العنوان وساعات العمل
    const contactParagraphs = document.querySelectorAll('.contact-item p');
    if (contactParagraphs.length >= 4) {
      if (this.currentLang === 'en') {
        this.updateText(contactParagraphs[2], trans.contactPage.addressText, animate);
        this.updateText(contactParagraphs[3], trans.contactPage.workingHoursText, animate);
      }
    }
    
    // تابعنا على
    const followUsTitle = document.querySelector('.contact-info > div:last-child h3');
    if (followUsTitle) {
      this.updateText(followUsTitle, trans.contactPage.followUs, animate);
    }
    
    // الأسئلة الشائعة
    const faqTitle = document.querySelectorAll('.section-title')[0];
    if (faqTitle) {
      this.updateText(faqTitle, trans.contactPage.faqTitle, animate);
    }
    
    // أسئلة FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    const faqData = [
      trans.contactPage.faq1,
      trans.contactPage.faq2,
      trans.contactPage.faq3,
      trans.contactPage.faq4
    ];
    
    faqItems.forEach((item, index) => {
      if (faqData[index]) {
        const question = item.querySelector('.faq-question span');
        const answer = item.querySelector('.faq-answer');
        if (question && answer) {
          this.updateText(question, faqData[index].question, animate);
          this.updateText(answer, faqData[index].answer, animate);
        }
      }
    });
  }

  updateText(selector, text, animate) {
    const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!element) return;
    
    // حفظ الـ style attribute الأصلي
    const originalStyle = element.getAttribute('style');
    
    if (animate) {
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        // حفظ الأيقونات إذا كانت موجودة
        const icons = element.querySelectorAll('i, .fas, .fab, .far');
        if (icons.length > 0) {
          // حفظ HTML الأيقونات
          const iconHTML = Array.from(icons).map(icon => icon.outerHTML).join('');
          element.innerHTML = iconHTML + ' ' + text;
        } else {
          element.textContent = text;
        }
        // استعادة الـ style الأصلي
        if (originalStyle) {
          element.setAttribute('style', originalStyle);
        }
        element.style.opacity = '1';
      }, 150);
    } else {
      // حفظ الأيقونات إذا كانت موجودة
      const icons = element.querySelectorAll('i, .fas, .fab, .far');
      if (icons.length > 0) {
        const iconHTML = Array.from(icons).map(icon => icon.outerHTML).join('');
        element.innerHTML = iconHTML + ' ' + text;
      } else {
        element.textContent = text;
      }
      // استعادة الـ style الأصلي
      if (originalStyle) {
        element.setAttribute('style', originalStyle);
      }
    }
  }

  updateToggleButton() {
    if (!this.toggleBtn) return;
    
    const langText = this.toggleBtn.querySelector('.lang-text');
    if (langText) {
      // عرض اللغة الحالية (AR للعربي، EN للإنجليزي)
      langText.textContent = this.currentLang === 'ar' ? 'AR' : 'EN';
      
      // تأثير بصري
      this.toggleBtn.classList.add('changing');
      setTimeout(() => this.toggleBtn.classList.remove('changing'), 500);
    }
  }
  
  updateDropdownSelection() {
    if (!this.dropdown) return;
    
    const options = this.dropdown.querySelectorAll('.language-option');
    options.forEach(option => {
      const lang = option.getAttribute('data-lang');
      if (lang === this.currentLang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }
}

// تهيئة مدير اللغة
const languageManager = new LanguageManager();
