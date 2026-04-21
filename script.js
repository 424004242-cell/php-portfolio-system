document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.getElementById('registerForm');
    const btnInteract = document.getElementById('btnInteract');

    // 1. Registration Logic

    if (registerForm) {
        const password = document.getElementById('regPassword');
        const confirm = document.getElementById('regConfirm');
        const strengthMeter = document.getElementById('strengthMeter');
        const strengthText = document.getElementById('strengthText');

        const updateStrength = () => {
            const val = password.value;
            let strength = 0;

            if (val.length >= 6) strength++;
            if (/[A-Z]/.test(val)) strength++;
            if (/[0-9]/.test(val)) strength++;
            if (/[^A-Za-z0-9]/.test(val)) strength++;

            const colors = ['#f8f9fa', '#dc3545', '#ffc107', '#0dcaf0', '#198754'];
            const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];

            strengthMeter.style.backgroundColor = colors[strength];
            strengthMeter.style.width = (strength * 25) + '%';
            strengthText.innerText = labels[strength];
        };

        const updateMatch = () => {
            if (confirm.value === '') return;
            const isMatch = password.value === confirm.value;
            confirm.classList.toggle('is-invalid', !isMatch);
            confirm.classList.toggle('is-valid', isMatch);
        };

        password.addEventListener('input', () => {
            updateStrength();
            updateMatch();
        });

        confirm.addEventListener('input', updateMatch);

        $('#registerForm').on('submit', function (e) {
            e.preventDefault();

            const msgDiv = $('#registerMsg');
            const btnReg = $('#btnSubmitReg');

            msgDiv.hide().removeClass('alert-success alert-danger').text('');
            btnReg.prop('disabled', true).text('Registering...');

            $.ajax({
                url: 'auth.php?action=register',
                type: 'POST',
                data: $(this).serialize(),
                dataType: 'json',

                success: function (response) {
                    if (response.status === 'success') {
                        msgDiv.addClass('alert alert-success')
                            .text('✅ ' + response.message)
                            .show();

                        setTimeout(() => {
                            window.location.href = response.redirect;
                        }, 1500);
                    } else {
                        msgDiv.addClass('alert alert-danger')
                            .text('❌ ' + response.message)
                            .show();

                        btnReg.prop('disabled', false).text('Register Now');
                    }
                },

                error: function () {
                    msgDiv.addClass('alert alert-danger')
                        .text('❌ Something went wrong. Please try again.')
                        .show();

                    btnReg.prop('disabled', false).text('Register Now');
                }
            });
        });
    }

    // 2. About Me Modal

    const btnAboutModal = document.getElementById('btnAboutModal');

    if (btnAboutModal) {
        btnAboutModal.addEventListener('click', () => {

            const modalEl = document.getElementById('aboutModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();

            $('#aboutModalBody').html(
                '<div class="text-center py-3">' +
                '  <div class="spinner-border spinner-border-sm text-primary"></div>' +
                '  <span class="ms-2 text-muted">Loading profile...</span>' +
                '</div>'
            );

            $.ajax({
                url: 'get_profile.php',
                type: 'GET',
                dataType: 'json',

                success: function (response) {
                    if (response.status === 'success') {
                        const d = response.data;

                        // PROFILE IMAGE
                        let image =
                            '<div class="text-center mb-3">' +
                            '<img src="uploads/' + (d.profile_photo ? d.profile_photo : 'default.png') + '" ' +
                            'onerror="this.src=\'uploads/default.png\'" ' +
                            'class="rounded-circle" width="100" height="100" style="object-fit:cover;">' +
                            '</div>';

                        // PROFILE DETAILS
                        let rows =
                            '<li class="list-group-item d-flex justify-content-between px-0">' +
                            '<span class="text-muted">Username</span>' +
                            '<strong>' + (d.username || '—') + '</strong>' +
                            '</li>' +

                            '<li class="list-group-item d-flex justify-content-between px-0">' +
                            '<span class="text-muted">Full Name</span>' +
                            '<strong>' + (d.full_name || '—') + '</strong>' +
                            '</li>' +

                            '<li class="list-group-item d-flex justify-content-between px-0">' +
                            '<span class="text-muted">Course</span>' +
                            '<strong>' + (d.course || '—') + '</strong>' +
                            '</li>' +

                            '<li class="list-group-item d-flex justify-content-between px-0">' +
                            '<span class="text-muted">Year Level</span>' +
                            '<strong>' + (d.year_level || '—') + '</strong>' +
                            '</li>' +

                            '<li class="list-group-item d-flex justify-content-between px-0">' +
                            '<span class="text-muted">Email</span>' +
                            '<strong>' + (d.email || '—') + '</strong>' +
                            '</li>' +

                            '<li class="list-group-item d-flex justify-content-between px-0">' +
                            '<span class="text-muted">Member Since</span>' +
                            '<strong>' + (d.created_at || '—') + '</strong>' +
                            '</li>';

                        $('#aboutModalBody').html(
                            image +
                            '<ul class="list-group list-group-flush">' + rows + '</ul>'
                        );

                    } else {
                        $('#aboutModalBody').html(
                            '<p class="text-danger text-center py-2">⚠️ ' + response.message + '</p>'
                        );
                    }
                },

                error: function () {
                    $('#aboutModalBody').html(
                        '<p class="text-danger text-center py-2">⚠️ Failed to load profile.</p>'
                    );
                }
            });
        });
    }

    // 3. Skills Modal

    const btnSkillsModal = document.getElementById('btnSkillsModal');

    if (btnSkillsModal) {
        btnSkillsModal.addEventListener('click', () => {

            const modalEl = document.getElementById('skillsModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();

            $('#skillsModalBody').html(
                '<div class="text-center py-3">' +
                '<div class="spinner-border spinner-border-sm text-success"></div>' +
                '<span class="ms-2 text-muted">Loading skills...</span>' +
                '</div>'
            );

            $.ajax({
                url: 'get_skills.php',
                type: 'GET',
                dataType: 'json',

                success: function (response) {

                    if (response.status === 'success' && response.data.length > 0) {

                        let grouped = {};

                        response.data.forEach(skill => {
                            const category = skill.category ?? 'General';

                            if (!grouped[category]) {
                                grouped[category] = [];
                            }

                            grouped[category].push({
                                name: skill.name ?? 'Unnamed Skill',
                                color: skill.color ?? 'bg-secondary'
                            });
                        });

                        let html = '';

                        $.each(grouped, function (category, items) {

                            html += '<p class="fw-semibold text-muted small text-uppercase mb-2">' + category + '</p>';
                            html += '<div class="mb-3">';

                            items.forEach(skill => {
                                html += '<span class="badge ' + skill.color +
                                    ' me-1 mb-1 px-3 py-2" style="border-radius:50px;">' +
                                    skill.name +
                                    '</span>';
                            });

                            html += '</div>';
                        });

                        $('#skillsModalBody').html(html);

                    } else if (response.status === 'success') {
                        $('#skillsModalBody').html('<p class="text-muted text-center">No skills found.</p>');
                    } else {
                        $('#skillsModalBody').html('<p class="text-danger text-center">⚠️ ' + response.message + '</p>');
                    }
                },

                error: function () {
                    $('#skillsModalBody').html('<p class="text-danger text-center">⚠️ Failed to load skills.</p>');
                }
            });
        });
    }

 
    // 4. Dashboard Interaction
    
    if (btnInteract) {
        btnInteract.addEventListener('click', () => {

            const container = document.getElementById('mainContainer');

            const toast = document.createElement('div');
            toast.className = 'alert alert-info mt-3';
            toast.textContent = "External JS successfully manipulated the DOM!";

            container.appendChild(toast);

            setTimeout(() => toast.remove(), 2500);
        });
    }

});
