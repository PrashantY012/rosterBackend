document.addEventListener('DOMContentLoaded', () => {
    const rosterForm = document.getElementById('roster-form');
    const rosterList = document.getElementById('roster-list');

    rosterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const roleInput = document.getElementById('role');

        const name = nameInput.value.trim();
        const role = roleInput.value.trim();

        if (name && role) {
            addRosterItem(name, role);
            nameInput.value = '';
            roleInput.value = '';
        }
    });

    function addRosterItem(name, role) {
        const li = document.createElement('li');
        const nameSpan = document.createElement('span');
        const roleSpan = document.createElement('span');
        const removeButton = document.createElement('button');

        nameSpan.textContent = name;
        roleSpan.textContent = role;
        removeButton.textContent = 'Remove';

        removeButton.addEventListener('click', () => {
            rosterList.removeChild(li);
        });

        li.appendChild(nameSpan);
        li.appendChild(roleSpan);
        li.appendChild(removeButton);
        rosterList.appendChild(li);
    }
});
