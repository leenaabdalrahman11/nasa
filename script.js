// إعداد الحاوية للنجوم
const starContainer = document.getElementById('sky');
const numStars = 1000;

// إنشاء النجوم
for (let i = 0; i < numStars; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  
  const size = Math.random() * 3 + 1 + 'px'; // حجم النجمة
  star.style.width = size;
  star.style.height = size;

  // تعيين موضع النجمة بشكل عشوائي
  star.style.top = Math.random() * 100 + '%'; 
  star.style.left = Math.random() * 100 + 'vw'; 

  // تعيين عمق النجمة بشكل عشوائي
const depth = Math.random() * 500 + 100; // بين 100 إلى 600
  star.style.transform = `translateZ(${depth}px)`; // العمق

  const duration = Math.random() * 30 + 5 + 's'; 
  star.style.animationDuration = duration;

  starContainer.appendChild(star);
}

// إعداد مشهد Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000); // الحد الأقصى للعمق إلى 10000
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// إعداد النجوم في المشهد
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 }); // حجم النجوم
const starsVertices = [];

// إنشاء مجموعة كبيرة من النجوم
for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000; // موقع النجمة في المحور X
    const y = (Math.random() - 0.5) * 2000; // موقع النجمة في المحور Y
    const z = (Math.random() - 0.5) * 10000; // موقع النجمة في المحور Z
    starsVertices.push(x, y, z);
}

starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

// تعيين موضع الكاميرا
camera.position.z = 1000; // اجعلها أبعد قليلاً

// التحكم بالكاميرا باستخدام حركة الماوس
document.addEventListener('mousemove', (event) => {
    if (document.pointerLockElement) {
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        camera.rotation.y -= movementX * 0.002; // ضبط الحساسية
        camera.rotation.x -= movementY * 0.002;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x)); // تحديد الدوران العمودي
    }
});

// الدالة الرئيسية للتشغيل المتكرر
const animate = function () {
    requestAnimationFrame(animate);
    stars.rotation.x += 0.0005; // تدوير النجوم
    stars.rotation.y += 0.0005; // تدوير النجوم
    renderer.render(scene, camera); // عرض المشهد
};

animate();

// ضبط حجم الشاشة عند تغيير حجم نافذة المتصفح
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix(); // تحديث مصفوفة العرض
});
