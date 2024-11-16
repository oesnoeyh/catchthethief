// 사용자 데이터 저장 객체
const userData = {};

// 스크롤 이벤트로 요금제 섹션 등장
document.addEventListener("scroll", function () {
    const scrollY = window.scrollY;
    const pricingSection = document.getElementById("pricing-section");
    const paymentSection = document.getElementById("payment-section");

    if (scrollY > 100) {
        pricingSection.style.transform = "translateY(0)";
    }

    if (scrollY > window.innerHeight) {
        paymentSection.style.transform = "translateY(0)";
    }
});

// 팝업 열기
function openPopup(popupId) {
    closePopup(); // 기존 팝업 닫기
    document.getElementById(popupId).classList.remove('hidden');
}

// 팝업 닫기
function closePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => popup.classList.add('hidden'));
}

// 요금제 선택 시 처리
function selectPlan(planType) {
    alert(`${planType} 요금제를 선택하셨습니다. 계좌 정보를 확인하세요.`);
    document.getElementById('pricing-section').classList.add('hidden');
    document.getElementById('payment-section').classList.remove('hidden');
    document.getElementById('payment-section').style.transform = "translateY(100%)";
}

// 회원가입 처리
document.getElementById('signup-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    const phoneNumber = document.getElementById('phone_number').value.trim();
    const email = document.getElementById('email_address').value.trim();

    if (username && password && phoneNumber && email) {
        if (!userData[username]) {
            userData[username] = { password, phoneNumber, email };
            alert('회원가입이 완료되었습니다!');
            closePopup();
        } else {
            alert('이미 사용 중인 아이디입니다. 다른 아이디를 입력해주세요.');
        }
    } else {
        alert('모든 필드를 입력해주세요.');
    }
});

// 로그인 처리
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (userData[username] && userData[username].password === password) {
        alert(`로그인 성공! ${username}님 환영합니다.`);
        closePopup();
    } else {
        alert('아이디 또는 비밀번호가 잘못되었습니다.');
    }
});

// 인증 후 파일 다운로드 처리
document.querySelector('#payment-section .btn').addEventListener('click', function () {
    const inputCode = document.querySelector('#payment-section input[type="text"]').value.trim();

    if (!inputCode) {
        alert('인증번호를 입력해주세요.');
        return;
    }

    if (inputCode === '1234') {
        alert('인증 성공! 파일을 다운로드합니다.');
        const link = document.createElement('a');
        link.href = 'yourfile.exe';
        link.download = 'yourfile.exe';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('인증 실패. 관리자에게 문의하세요.');
    }
});
