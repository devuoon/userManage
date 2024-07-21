let currentAction = 'add';
let currentNo = null;

document.getElementById('addMemberBtn').addEventListener('click', function() {
    currentAction = 'add';
    fetch("http://localhost:3000/api/member")
        .then(response => response.json())
        .then(data => {
            const nextNo = data.length + 1;
            document.getElementById('no').value = nextNo;
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('submitBtn').addEventListener('click', function() {
    const no = document.getElementById('no').value;
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

    fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberData)
    })
        .then(response => response.json())
        .then(data => {
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
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('tBody').addEventListener('click', function(event) {
    const tr = event.target.closest('tr');
    const no = tr.children[1].textContent;

    if (event.target.classList.contains('edit-btn')) {
        currentAction = 'edit';
        currentNo = no;

        fetch(`http://localhost:3000/api/member/${no}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('no').value = data.no;
                document.getElementById('birth').value = data.birth;
                document.getElementById('name').value = data.name;
                document.getElementById('joinYear').value = data.joinYear;
                document.getElementById('joinMonth').value = data.joinMonth;
                document.getElementById('introduce').value = data.introduce;

                const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
                modal.show();
            })
            .catch(error => console.error('Error:', error));
    }

    if (event.target.classList.contains('delete-btn')) {
        fetch(`http://localhost:3000/api/member/${no}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                tr.remove();
                console.log(data.message);
            })
            .catch(error => console.error('Error:', error));
    }
});

document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('#tBody input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

document.getElementById('editSelected').addEventListener('click', function() {
    const selected = document.querySelectorAll('#tBody input[type="checkbox"]:checked');
    if (selected.length !== 1) {
        alert('수정하려면 하나의 행만 선택하세요.');
        return;
    }

    const tr = selected[0].closest('tr');
    const no = tr.children[1].textContent;
    currentAction = 'edit';
    currentNo = no;

    fetch(`http://localhost:3000/api/member/${no}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('no').value = data.no;
            document.getElementById('birth').value = data.birth;
            document.getElementById('name').value = data.name;
            document.getElementById('joinYear').value = data.joinYear;
            document.getElementById('joinMonth').value = data.joinMonth;
            document.getElementById('introduce').value = data.introduce;

            const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
            modal.show();
        })
        .catch(error => console.error('Error:', error));
});

document.getElementById('deleteSelected').addEventListener('click', function() {
    const selected = document.querySelectorAll('#tBody input[type="checkbox"]:checked');
    if (selected.length === 0) {
        alert('삭제하려면 행을 선택하세요.');
        return;
    }

    selected.forEach(checkbox => {
        const tr = checkbox.closest('tr');
        const no = tr.children[1].textContent;

        fetch(`http://localhost:3000/api/member/${no}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                tr.remove();
                console.log(data.message);
            })
            .catch(error => console.error('Error:', error));
    });
});

fetch("http://localhost:3000/api/member")
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
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
    })
    .catch((error) => console.error('Error fetching data:', error));