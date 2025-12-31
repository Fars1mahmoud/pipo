// كلمة المرور الصحيحة
const CORRECT_PASSWORD = "2026";

// الانتظار حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // الحصول على العناصر من DOM
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const errorMessage = document.getElementById('error-message');
    
    // إضافة حدث النقر على زر الدخول
    loginBtn.addEventListener('click', function() {
        // الحصول على القيمة المدخلة في حقل كلمة المرور
        const enteredPassword = passwordInput.value.trim();
        
        // التحقق مما إذا كانت كلمة المرور فارغة
        if (enteredPassword === "") {
            errorMessage.textContent = "يرجى إدخال كلمة المرور";
            passwordInput.focus();
            return;
        }
        
        // التحقق من صحة كلمة المرور
        if (enteredPassword === CORRECT_PASSWORD) {
            // إذا كانت صحيحة، إزالة رسالة الخطأ وتخزين حالة المصادقة
            errorMessage.textContent = "";
            localStorage.setItem('authenticated', 'true');
            
            // إضافة تأثير بصري للنجاح
            loginBtn.innerHTML = '<i class="fas fa-check"></i> تم المصادقة بنجاح!';
            loginBtn.style.background = 'linear-gradient(to right, #4ecdc4, #44a08d)';
            
            // الانتقال إلى صفحة التهنئة بعد تأخير بسيط
            setTimeout(function() {
                window.location.href = "greeting.html";
            }, 1000);
        } else {
            // إذا كانت غير صحيحة، عرض رسالة خطأ
            errorMessage.textContent = "كلمة المرور غير صحيحة، يرجى المحاولة مرة أخرى";
            passwordInput.value = "";
            passwordInput.focus();
            
            // إضافة تأثير اهتزاز للحقل
            passwordInput.style.borderColor = "#ff6b6b";
            passwordInput.classList.add('shake');
            
            // إزالة تأثير الاهتزاز بعد الانتهاء من التحريك
            setTimeout(function() {
                passwordInput.classList.remove('shake');
            }, 500);
        }
    });
    
    // السماح بالدخول باستخدام زر Enter
    passwordInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            loginBtn.click();
        }
    });
    
    // إزالة رسالة الخطأ عند البدء بالكتابة
    passwordInput.addEventListener('input', function() {
        errorMessage.textContent = "";
        passwordInput.style.borderColor = "rgba(255, 255, 255, 0.2)";
    });
    
    // إضافة تأثير اهتزاز CSS
    const style = document.createElement('style');
    style.textContent = `
        .shake {
            animation: shake 0.5s;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});