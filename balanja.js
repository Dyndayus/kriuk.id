"use strict";
(function () {

    // Anda tidak ada akses ke document di sini, anda akses window
    window.addEventListener("load", init);

    function init() {
        // Disini anda bisa akses document
        document.querySelectorAll(".cart-item").forEach(updateLineTotal);
        updateTotals();
        bindQuantityControls();
        bindOrderButton();
    }

    // Format uang rupiah
    function formatIDR(num) {
        return "Rp " + num.toLocaleString("id-ID");
    }

    // Hitung dan render total baris untuk item keranjang
    function updateLineTotal(item) {
        const price = Number(item.dataset.price);
        const qtyEl = item.querySelector(".qty");
        const lineTotalEl = item.querySelector(".line-total");
        const qty = Number(qtyEl.textContent);
        const lineTotal = price * qty;
        lineTotalEl.textContent = formatIDR(lineTotal);
    }

    // Hitung ulang subtotal dan total keseluruhan
    function updateTotals() {
        const items = document.querySelectorAll(".cart-item");
        let subtotal = 0;

        items.forEach(item => {
            const price = Number(item.dataset.price);
            const qty = Number(item.querySelector(".qty").textContent);
            subtotal += price * qty;
        });

        const shipping = 5000;
        const subtotalEl = document.getElementById("subtotal");
        const shippingEl = document.getElementById("shipping");
        const grandEl = document.getElementById("grandTotal");

        subtotalEl.textContent = formatIDR(subtotal);
        shippingEl.textContent = formatIDR(shipping);
        grandEl.textContent = formatIDR(subtotal + shipping);
    }

    // Mengendalikan tombol + dan -
    function bindQuantityControls() {
        document.querySelectorAll(".cart-item").forEach(item => {
            const minusBtn = item.querySelector(".btn-minus");
            const plusBtn = item.querySelector(".btn-plus");
            const qtyEl = item.querySelector(".qty");

            minusBtn.addEventListener("click", () => {
                let qty = Number(qtyEl.textContent);
                if (qty > 0) {
                    qtyEl.textContent = qty - 1;
                    updateLineTotal(item);
                    updateTotals();
                }
            });

            plusBtn.addEventListener("click", () => {
                let qty = Number(qtyEl.textContent);
                qtyEl.textContent = qty + 1;
                updateLineTotal(item);
                updateTotals();
            });
        });
    }

    // Notifikasi sederhana
    function showNotification(msg) {
        const notify = document.getElementById("notify");
        notify.textContent = msg;
        notify.classList.add("show");
        setTimeout(() => notify.classList.remove("show"), 2000);
    }

    // Tombol pesan sekarang
    function bindOrderButton() {
        const btn = document.getElementById("btnOrder");
        btn.addEventListener("click", () => {
            showNotification("Terimakasih, pesananmu sedang di proses");
        });
    }

})();
