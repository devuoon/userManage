// 현재 연도 가져오기
const currentYear = new Date().getFullYear();

// joinYear input 요소 가져오기
const joinYearInput = document.getElementById('joinYear');

// 기본값을 현재 연도로 설정
joinYearInput.value = currentYear;

// 최소값과 최대값 설정
joinYearInput.min = 1990;
joinYearInput.max = currentYear;


let currentAction = 'add';
let currentNo = null;

document.getElementById('addMemberBtn').addEventListener('click', async function() {
    currentAction = 'add';
    try {
        const response = await fetch("http://localhost:3000/api/member");
        const data = await response.json();
        const nextNo = data.length + 1;
        document.getElementById('no').value = nextNo;
    } catch (error) {
        console.error('Error:', error);
    }
});

// 수정 버튼 클릭 시 데이터 불러오기 (체크박스 선택 시)
document.getElementById('addMemberBtn2').addEventListener('click', async function() {
    const selected = document.querySelectorAll('#tBody input[type="checkbox"]:checked');
    if (selected.length !== 1) {
        alert('수정하려면 하나의 행만 선택하세요.');
        return;
    }

    const tr = selected[0].closest('tr');
    const no = tr.children[1].textContent;

    try {
        const response = await fetch(`http://localhost:3000/api/member/${no}`);
        const data = await response.json();
        document.getElementById('no').value = data.no;
        document.getElementById('birth').value = data.birth;
        document.getElementById('name').value = data.name;
        document.getElementById('joinYear').value = data.joinYear;
        document.getElementById('joinMonth').value = data.joinMonth;
        document.getElementById('introduce').value = data.introduce;

        // 모달 타이틀 및 버튼 텍스트 변경
        document.getElementById('exampleModalLabel').textContent = '멤버 수정';
        document.getElementById('submitBtn').textContent = '수정';

        currentAction = 'edit';
        currentNo = no;

        const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    } catch (error) {
        console.error('Error:', error);
    }
});

// 폼 제출 버튼 클릭 시 데이터 추가/수정
document.getElementById('submitBtn').addEventListener('click', async function() {
    const no = parseInt(document.getElementById('no').value); // Ensure `no` is a number
    const birth = document.getElementById('birth').value;
    const name = document.getElementById('name').value;
    const joinYear = document.getElementById('joinYear').value;
    const joinMonth = document.getElementById('joinMonth').value;
    const introduce = document.getElementById('introduce').value;

    const memberData = {
        no,
        birth,
        name,
        joinYear,
        joinMonth,
        introduce
    };

    let method = 'POST';
    let url = 'http://localhost:3000/api/member';

    if (currentAction === 'edit') {
        method = 'PUT';
        url = `http://localhost:3000/api/member/${currentNo}`;
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(memberData)
        });
        const data = await response.json();
        const tbody = document.getElementById('tBody');
        if (currentAction === 'add') {
            const tr = document.createElement('tr');
            tr.dataset.no = data.user.no;
            tr.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${data.user.no}</td>
                <td>${data.user.birth}</td>
                <td>${data.user.name}</td>
                <td>${data.user.joinYear}</td>
                <td>${data.user.joinMonth}</td>
                <td>${data.user.introduce}</td>
                <td><button class="btn btn-outline-secondary edit-btn">수정</button></td>
                <td><button class="btn btn-outline-danger delete-btn">삭제</button></td>
            `;
            tbody.appendChild(tr);
        } else {
            const tr = document.querySelector(`#tBody tr[data-no="${currentNo}"]`);
            tr.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${data.user.no}</td>
                <td>${data.user.birth}</td>
                <td>${data.user.name}</td>
                <td>${data.user.joinYear}</td>
                <td>${data.user.joinMonth}</td>
                <td>${data.user.introduce}</td>
                <td><button class="btn btn-outline-secondary edit-btn">수정</button></td>
                <td><button class="btn btn-outline-danger delete-btn">삭제</button></td>
            `;
        }

        const modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
        modal.hide();

        document.getElementById('no').value = '';
        document.getElementById('birth').value = '';
        document.getElementById('name').value = '';
        document.getElementById('joinYear').value = '';
        document.getElementById('joinMonth').value = '';
        document.getElementById('introduce').value = '';

        // 모달 타이틀 및 버튼 텍스트 초기화
        document.getElementById('exampleModalLabel').textContent = '멤버 추가';
        document.getElementById('submitBtn').textContent = '등록';
    } catch (error) {
        console.error('Error:', error);
    }
});

async function loadMembers() {
    try {
        const response = await fetch("http://localhost:3000/api/member");
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        const tbody = document.getElementById('tBody');
        data.forEach((member) => {
            const tr = document.createElement('tr');
            tr.dataset.no = member.no;
            tr.innerHTML = `
                <td><input type="checkbox"></td>
                <td>${member.no}</td>
                <td>${member.birth}</td>
                <td>${member.name}</td>
                <td>${member.joinYear}</td>
                <td>${member.joinMonth}</td>
                <td>${member.introduce}</td>
                <td><button class="btn btn-outline-secondary edit-btn">수정</button></td>
                <td><button class="btn btn-outline-danger delete-btn">삭제</button></td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

loadMembers();

// 수정 및 삭제 버튼 클릭 이벤트 처리
document.getElementById('tBody').addEventListener('click', async function(event) {
    if (event.target.classList.contains('edit-btn')) {
        const tr = event.target.closest('tr');
        const no = tr.children[1].textContent;

        try {
            const response = await fetch(`http://localhost:3000/api/member/${no}`);
            const data = await response.json();
            document.getElementById('no').value = data.no;
            document.getElementById('birth').value = data.birth;
            document.getElementById('name').value = data.name;
            document.getElementById('joinYear').value = data.joinYear;
            document.getElementById('joinMonth').value = data.joinMonth;
            document.getElementById('introduce').value = data.introduce;

            // 모달 타이틀 및 버튼 텍스트 변경
            document.getElementById('exampleModalLabel').textContent = '멤버 수정';
            document.getElementById('submitBtn').textContent = '수정';

            currentAction = 'edit';
            currentNo = no;

            const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            modal.show();
        } catch (error) {
            console.error('Error:', error);
        }
    }

    if (event.target.classList.contains('delete-btn')) {
        alert('해당 유저를 삭제하시겠습니까?');
        const tr = event.target.closest('tr');
        const no = tr.children[1].textContent; // 해당 행의 `no` 값을 가져옴

        try {
            const response = await fetch(`http://localhost:3000/api/member/${no}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json();
            console.log(data.message);
            tr.remove(); // 테이블에서 해당 행을 제거
        } catch (error) {
            console.error('Error:', error);
        }
    }
});