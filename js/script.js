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
