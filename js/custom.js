$(document).ready(function () {

    // =========================================================
    // 1. GLOBAL MODAL HANDLER (unchanged behaviour)
    // =========================================================
    function showSystemModal(message, isSuccess = true, reloadOnClose = false, redirectUrl = null) {
        const lowerMsg = String(message).toLowerCase();
        if (
            lowerMsg.includes('error') ||
            lowerMsg.includes('invalid') ||
            lowerMsg.includes('fill in') ||
            lowerMsg.includes('taken') ||
            lowerMsg.includes('match') ||
            lowerMsg.includes('incorrect') ||
            lowerMsg.includes('empty')
        ) {
            isSuccess = false;
        }

        const modalTitle = $('#alertModalTitle');
        const modalIcon  = $('#alertModalIcon');
        const modalMsg   = $('#alertMsg');

        if (isSuccess) {
            modalTitle.html('<i class="bi bi-check-circle me-2"></i>Success');
            modalIcon.html('<i class="bi bi-check-circle-fill" style="font-size: 4rem; color: #3fa33d;"></i>');
        } else {
            modalTitle.html('<i class="bi bi-exclamation-triangle me-2" style="color: #dc3545;"></i>Notice');
            modalIcon.html('<i class="bi bi-exclamation-circle-fill" style="font-size: 4rem; color: #dc3545;"></i>');
        }

        modalMsg.html(message);

        const alertModalEl = document.getElementById('systemAlertModal');
        const alertModal = new bootstrap.Modal(alertModalEl);
        alertModal.show();

        if (isSuccess && (reloadOnClose || redirectUrl)) {
            alertModalEl.addEventListener('hidden.bs.modal', function () {
                if (redirectUrl) { window.location.href = redirectUrl; }
                else if (reloadOnClose) { window.location.reload(); }
            }, { once: true });
        }
    }
    window.showSystemModal = showSystemModal;

    // =========================================================
    // 2. CART ACTIONS (demo — localStorage)
    // =========================================================
    $(document).on('click', '#cartBtn', function (e) {
        e.preventDefault();

        // product ID can come from data-product OR the trailing number in value
        const productId = $(this).data('product') || extractId($(this).val());
        const isRemoving = String($(this).val() || '').includes('/remove/');

        if (isRemoving) {
            DemoCart.remove(productId);
            if (window.location.pathname.includes('/cart/')) {
                showSystemModal('Item removed from cart.', true, true);
            } else {
                showSystemModal('Item removed from cart.', true, false);
            }
        } else {
            const qty = Number($('#quantity').val()) || 1;
            DemoCart.add(productId, qty);
            showSystemModal('Item added to your cart!', true, false);
        }
        $('#actionMsg').html('');
    });

    // =========================================================
    // 3. WISHLIST ACTIONS (demo — localStorage, toggle)
    // =========================================================
    $(document).on('click', '#wishlistBtn', function (e) {
        e.preventDefault();
        const productId = $(this).data('product') || extractId($(this).val());
        const onWishlistPage = window.location.pathname.includes('/wishlist/');

        const added = DemoCart.wishToggle(productId);

        if (onWishlistPage) {
            showSystemModal(added ? 'Added to wishlist.' : 'Removed from wishlist.', true, true);
        } else {
            showSystemModal(added ? 'Added to your wishlist!' : 'Removed from your wishlist.', true, false);
        }
        $('#actionMsg').html('');
    });

    // =========================================================
    // 4. PLACE ORDER (demo only)
    // =========================================================
    $(document).on('click', '#placeOrderBtn', function (e) {
        e.preventDefault();
        const citytown = $('#citytown').val();
        const address  = $('#address').val();

        if (!citytown || !address || !address.trim()) {
            showSystemModal('Please fill in your delivery details.', false);
            return;
        }

        // Clear cart on successful demo order, then redirect to profile
        DemoCart.clear();
        showSystemModal(
            'Order placed successfully!<br><small class="text-muted">(Demo — no real order was placed.)</small>',
            true,
            false,
            getRootPath() + 'profile/index.html'
        );
    });

    // =========================================================
    // 5. CUSTOMER FORMS (login, register, account, password, contact)
    // =========================================================
    $(document).on('submit', '#loginForm, #registerForm, #accountForm, #passwordForm, #contactForm', function (event) {
        event.preventDefault();
        const form = $(this);
        const formId = form.attr('id');

        // HTML5 validation runs first
        if (!form[0].checkValidity()) {
            form[0].reportValidity();
            return;
        }

        if (formId === 'contactForm') {
            showSystemModal('Thank you! Your message has been sent.<br><small class="text-muted">(Demo — no email was sent.)</small>', true, false);
            form[0].reset();
            return;
        }

        if (formId === 'loginForm') {
            showSystemModal('Welcome back!', true, false, getRootPath() + 'profile/index.html');
        } else if (formId === 'registerForm') {
            showSystemModal('Account created!', true, false, getRootPath() + 'profile/index.html');
        } else if (formId === 'accountForm' || formId === 'passwordForm') {
            showSystemModal('Your changes have been saved.', true, true);
        }
    });

    // =========================================================
    // 6. ADMIN FORMS (demo)
    // =========================================================
    $(document).on('submit', '.admin-form', function (e) {
        e.preventDefault();
        const form = $(this);
        if (!form[0].checkValidity()) {
            form[0].reportValidity();
            return;
        }
        const redirectOnSuccess = form.data('redirect') || 'admin/index.html';
        showSystemModal('Saved successfully.', true, false, getRootPath() + redirectOnSuccess);
    });

    // =========================================================
    // 7. ADMIN REMOVE BUTTONS (demo)
    // =========================================================
    $(document).on('click', '.admin-remove-btn', function (e) {
        e.preventDefault();
        if (!confirm('Are you sure you want to delete this? This action cannot be undone.')) return;
        const redirectOnSuccess = $(this).data('redirect') || 'admin/index.html';
        showSystemModal('Item deleted successfully.', true, false, getRootPath() + redirectOnSuccess);
    });

    // =========================================================
    // 8. ADMIN LOGIN (demo)
    // =========================================================
    $(document).on('submit', '#adminLoginForm', function (e) {
        e.preventDefault();
        const form = $(this);
        if (!form[0].checkValidity()) { form[0].reportValidity(); return; }
        showSystemModal('Welcome back to the Admin Panel!', true, false, getRootPath() + 'admin/index.html');
    });

    // =========================================================
    // 9. ADMIN ACCOUNT / PASSWORD (demo)
    // =========================================================
    $(document).on('submit', '#adminAccountForm, #adminPasswordForm', function (e) {
        e.preventDefault();
        const form = $(this);
        if (!form[0].checkValidity()) { form[0].reportValidity(); return; }
        showSystemModal('Changes saved successfully.', true, true);
    });

    // =========================================================
    // 10. ORDER STATUS UPDATE (demo)
    // =========================================================
    $(document).on('submit', '#orderStatusForm', function (e) {
        e.preventDefault();
        const form = $(this);
        const redirectOnSuccess = form.data('redirect') || 'admin/orders/index.html';
        showSystemModal('Order status updated.', true, false, getRootPath() + redirectOnSuccess);
    });

    // =========================================================
    // HELPERS
    // =========================================================
    function extractId(value) {
        // handles both ".../add/12" and ".../remove/12"
        const m = String(value || '').match(/(\d+)\s*$/);
        return m ? Number(m[1]) : null;
    }

    function getRootPath() {
        // Determine how many folders deep we are, then walk back to root
        // Every page has <body data-root="../"> etc. set explicitly.
        return document.body.dataset.root || '';
    }
});