document.addEventListener('DOMContentLoaded', function() {
    // بيانات المنتجات
    const products = [
        {
            id: 1,
            name: "هاتف ذكي",
            price: "1500 ريال",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c21hcnRwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            category: "electronics"
        },
        {
            id: 2,
            name: "ساعة ذكية",
            price: "800 ريال",
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnR3YXRjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            category: "electronics"
        },
        {
            id: 3,
            name: "قميص رجالي",
            price: "120 ريال",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWVuJTIwc2hpcnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            category: "men"
        },
        {
            id: 4,
            name: "فستان نسائي",
            price: "350 ريال",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d29tZW4lMjBkcmVzc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
            category: "women"
        },
        {
            id: 5,
            name: "لعبة أطفال",
            price: "75 ريال",
            image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpbGRyZW4lMjB0b3l8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            category: "kids"
        },
        {
            id: 6,
            name: "حذاء رياضي",
            price: "250 ريال",
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c25lYWtlcnN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
            category: "men"
        }
    ];

    // توليد بطاقات المنتجات
    const productsContainer = document.getElementById('productsContainer');
    
    products.forEach(product => {
        const productCard = `
            <div class="col-md-4 col-lg-4">
                <div class="card animate-on-scroll">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.price}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">
                            <i class="bi bi-cart-plus"></i> أضف إلى السلة
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        productsContainer.innerHTML += productCard;
    });

    // تغيير لون شريط التنقل
    const themeToggle = document.getElementById('themeToggle');
    const mainNav = document.getElementById('mainNav');
    let colorIndex = 1;
    
    themeToggle.addEventListener('click', function() {
        colorIndex = (colorIndex % 4) + 1;
        mainNav.classList.remove('navbar-color-1', 'navbar-color-2', 'navbar-color-3', 'navbar-color-4');
        mainNav.classList.add(`navbar-color-${colorIndex}`);
    });

    // تأثيرات التمرير
    function checkScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
                
                // تأثير تدوير للعناصر التي تحتوي على أيقونات
                if (element.querySelector('.bi')) {
                    element.querySelector('.bi').classList.add('rotate-on-scroll', 'rotating');
                }
            } else {
                element.classList.remove('visible');
                
                if (element.querySelector('.bi')) {
                    element.querySelector('.bi').classList.remove('rotating');
                }
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // التحقق مرة أولى عند التحميل

    // معالجة نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    const messageModal = new bootstrap.Modal(document.getElementById('messageModal'));
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // الحصول على القيم
        const userName = document.getElementById('userName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const comments = document.getElementById('comments').value;
        
        // هنا يمكنك إضافة كود لإرسال البيانات إلى الخادم
        console.log({
            userName,
            phone,
            email,
            comments
        });
        
        // إظهار رسالة التأكيد
        messageModal.show();
        
        // إعادة تعيين النموذج
        contactForm.reset();
    });

    // إضافة تأثير عند النقر على أزرار "أضف إلى السلة"
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.parentElement.classList.contains('add-to-cart')) {
            const button = e.target.classList.contains('add-to-cart') ? e.target : e.target.parentElement;
            const productId = button.getAttribute('data-id');
            const product = products.find(p => p.id == productId);
            
            // تغيير لون الزر مؤقتاً
            button.classList.remove('btn-primary');
            button.classList.add('btn-success');
            button.innerHTML = '<i class="bi bi-check"></i> تم الإضافة';
            
            setTimeout(() => {
                button.classList.remove('btn-success');
                button.classList.add('btn-primary');
                button.innerHTML = '<i class="bi bi-cart-plus"></i> أضف إلى السلة';
            }, 2000);
            
            // يمكنك هنا إضافة المنتج إلى سلة التسوق
            console.log(`تمت إضافة المنتج ${product.name} إلى السلة`);
        }
    });

    // تحسين القوائم المنسدلة للشاشات الصغيرة
    const dropdowns = document.querySelectorAll('.dropdown-submenu .dropdown-toggle');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const submenu = this.nextElementSibling;
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // إغلاق القوائم المنسدلة عند النقر خارجها (للشاشات الصغيرة)
    document.addEventListener('click', function() {
        if (window.innerWidth < 768) {
            const openSubmenus = document.querySelectorAll('.dropdown-submenu .dropdown-menu');
            openSubmenus.forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });
});