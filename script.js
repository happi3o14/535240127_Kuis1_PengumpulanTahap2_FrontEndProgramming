//LOGIN
var loginBtn = document.getElementById("loginBtn");
if (loginBtn) {
    loginBtn.onclick = function () {
        var email = document.getElementById("loginEmail").value;
        var pass = document.getElementById("loginPass").value;
        var msg = document.getElementById("loginMsg");

        if (email === "" || pass === "") {
            msg.innerHTML = "<div class='notice error'>Email and password must be filled!</div>";
            return;
        }

        if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            msg.innerHTML = "<div class='notice error'>Email format invalid!</div>";
            return;
        }

        var users = JSON.parse(localStorage.getItem("users")) || [];
        var foundUser = users.find(u => u.email === email && u.password === pass);

        if (foundUser) {
            msg.innerHTML = "<div class='notice ok'>Login successful!</div>";
            sessionStorage.setItem("loggedInUser", email);
            setTimeout(function () {
                window.location = "home.html";
            }, 1000);
        } else {
            msg.innerHTML = "<div class='notice error'>Incorrect email or password!</div>";
        }
    }
}
//LOGIN

//SIGN UP
var signUpBtn = document.getElementById("signUpBtn");
if (signUpBtn) {
    signUpBtn.onclick = function () {
        var email = document.getElementById("signUpEmail").value;
        var pass = document.getElementById("signUpPass").value;
        var pass2 = document.getElementById("signUpDoublePass").value;
        var nama = document.getElementById("signUpName").value;
        var hp = document.getElementById("signUpPhone").value;
        var msg = document.getElementById("signUpMsg");

        if (email === "" || pass === "" || pass2 === "" || nama === "" || hp === "") {
            msg.innerHTML = "<div class='notice error'>All fields must be filled in!</div>";
            return;
        }

        if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
            msg.innerHTML = "<div class='notice error'>Invalid email!</div>";
            return;
        }

        if (pass.length < 8) {
            msg.innerHTML = "<div class='notice error'>Password must be at least 8 characters!</div>";
            return;
        }

        if (pass !== pass2) {
            msg.innerHTML = "<div class='notice error'>Password confirmation is not the same!</div>";
            return;
        }

        if (nama.length < 3 || nama.length > 32) {
            msg.innerHTML = "<div class='notice error'>Name must be at least 3 and a maximum of 32 characters!</div>";
            return;
        }

        if (/\d/.test(nama)) {
            msg.innerHTML = "<div class='notice error'>Name cannot contain numbers!</div>";
            return;
        }

        if (hp.length < 10 || hp.length > 16 || hp[0] != "0" || hp[1] != "8" || isNaN(hp)) {
            msg.innerHTML = "<div class='notice error'>Phone number invalid (must 08xx, number, 10-16 digits)!</div>";
            return;
        }

        var users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.some(u => u.email === email)) {
            msg.innerHTML = "<div class='notice error'>Email already registered!</div>";
            return;
        }

        var newUser = { email: email, password: pass, nama: nama, hp: hp };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        msg.innerHTML = "<div class='notice ok'>Sign Up successful, please login.</div>";
        setTimeout(function () {
            window.location = "login.html";
        }, 1500);
    }
}
//SIGN UP

//LOGOUT
var logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.onclick = function () {
        sessionStorage.removeItem("loggedInUser");
        window.location = "login.html";
    }
}
//LOGOUT

//CEK LOGIN
if (window.location.pathname.indexOf("home.html") !== -1 ||
    window.location.pathname.indexOf("healthDetail") !== -1 ||
    window.location.pathname.indexOf("carDetail") !== -1 ||
    window.location.pathname.indexOf("lifeDetail") !== -1 ||
    window.location.pathname.indexOf("checkout.html") !== -1 ||
    window.location.pathname.indexOf("history.html") !== -1) {
    var cekUser = sessionStorage.getItem("loggedInUser");
    if (!cekUser) {
        alert("You have to log in first!");
        window.location = "login.html";
    }
}
//CEK LOGIN

//PERHITUNGAN
if (window.location.pathname.indexOf("healthDetail.html") !== -1) {
    localStorage.setItem("selectedProduct", "Health Insurance");
} else if (window.location.pathname.indexOf("carDetail.html") !== -1) {
    localStorage.setItem("selectedProduct", "Car Insurance");
} else if (window.location.pathname.indexOf("lifeDetail.html") !== -1) {
    localStorage.setItem("selectedProduct", "Life Insurance");
}

//PERHITUNGAN MOBIL
if (window.location.pathname.indexOf("carDetail.html") !== -1) {
    var calculateBtn = document.getElementById("calculateBtn");

    if (calculateBtn) {
        calculateBtn.onclick = function () {
            var form = document.getElementById("carForm");

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            var carPrice = parseInt(document.getElementById("carPrice").value);
            var carYear = parseInt(document.getElementById("carYear").value);
            var currentYear = new Date().getFullYear();
            var carAge = currentYear - carYear;
            var premium = 0;

            if (carAge >= 0 && carAge <= 3) {
                premium = 0.025 * carPrice;
            } else if (carAge > 3 && carAge <= 5) {
                if (carPrice < 200000000) {
                    premium = 0.04 * carPrice;
                } else {
                    premium = 0.03 * carPrice;
                }
            } else if (carAge > 5) {
                premium = 0.05 * carPrice;
            }
            
            document.getElementById("premiumAmount").textContent = "Rp" + premium.toLocaleString('id-ID');
            document.getElementById("premiumResult").style.display = "block";
            localStorage.setItem("selectedPrice", "Rp" + premium.toLocaleString('id-ID'));
        }
    }
    
    var buyBtn = document.getElementById("buyBtn");
    
    if (buyBtn) {
        buyBtn.onclick = function () {
            window.location = "checkout.html";
        }
    }
}

//PERHITUNGAN KESEHATAN
if (window.location.pathname.indexOf("healthDetail.html") !== -1) {
    var calculateHealthBtn = document.getElementById("calculateHealthBtn");

    if (calculateHealthBtn) {
        calculateHealthBtn.onclick = function () {
            var form = document.getElementById("healthForm");

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            var dob = new Date(document.getElementById("healthDOB").value);
            var today = new Date();
            var age = today.getFullYear() - dob.getFullYear();
            var m = 0;

            if (age <= 20) {
                m = 0.1;
            } else if (age > 20 && age <= 35) {
                m = 0.2;
            } else if (age > 35 && age <= 50) {
                m = 0.25;
            } else {
                m = 0.4;
            }
            
            var k1 = document.getElementById("smokeYes").checked ? 1 : 0;
            var k2 = document.getElementById("hypertensionYes").checked ? 1 : 0;
            var k3 = document.getElementById("diabetesYes").checked ? 1 : 0;
            var P = 2000000;
            var premium = P + (m * P) + (k1 * 0.5 * P) + (k2 * 0.4 * P) + (k3 * 0.5 * P);
            document.getElementById("healthPremiumAmount").textContent = "Rp" + premium.toLocaleString('id-ID');
            document.getElementById("healthPremiumResult").style.display = "block";
            localStorage.setItem("selectedPrice", "Rp" + premium.toLocaleString('id-ID'));
        }
    }
    
    var healthBuyBtn = document.getElementById("healthBuyBtn");

    if (healthBuyBtn) {
        healthBuyBtn.onclick = function () {
            window.location = "checkout.html";
        }
    }
}

//PERHITUNGAN JIWA
if (window.location.pathname.indexOf("lifeDetail.html") !== -1) {
    var calculateLifeBtn = document.getElementById("calculateLifeBtn");

    if (calculateLifeBtn) {
        calculateLifeBtn.onclick = function () {
            var form = document.getElementById("lifeForm");

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            
            var dob = new Date(document.getElementById("lifeDOB").value);
            var today = new Date();
            var age = today.getFullYear() - dob.getFullYear();
            var coverage = parseInt(document.getElementById("covAmt").value);
            var m = 0;

            if (age <= 30) {
                m = 0.002;
            } else if (age > 30 && age <= 50) {
                m = 0.004;
            } else {
                m = 0.01;
            }
            
            var premium = m * coverage;
            document.getElementById("lifePremiumAmount").textContent = "Rp" + premium.toLocaleString('id-ID') + "/month";
            document.getElementById("lifePremiumResult").style.display = "block";
            localStorage.setItem("selectedPrice", "Rp" + premium.toLocaleString('id-ID') + "/month");
        }
    }
    
    var lifeBuyBtn = document.getElementById("lifeBuyBtn");

    if (lifeBuyBtn) {
        lifeBuyBtn.onclick = function () {
            window.location = "checkout.html";
        }
    }
}
//PERHITUNGAN

//CHECKOUT
if (window.location.pathname.indexOf("healthDetail.html") !== -1 ||
    window.location.pathname.indexOf("carDetail.html") !== -1 ||
    window.location.pathname.indexOf("lifeDetail.html") !== -1) {
    var buyBtn = document.getElementById("buyBtn");

    if (buyBtn) {
        buyBtn.onclick = function () {
            window.location = "checkout.html";
        }
    }
}
//CHECKOUT

//PEMBAYARAN
if (window.location.pathname.indexOf("checkout.html") !== -1) {
    var payBtn = document.getElementById("payBtn");
    
    if (payBtn) {
        payBtn.onclick = function () {
            var metode = document.getElementById("payMtd").value;
            var product = localStorage.getItem("selectedProduct") || "Asuransi Umum";
            var price = localStorage.getItem("selectedPrice") || "Rp1.000.000";
            var email = sessionStorage.getItem("loggedInUser");

            if (!email) {
                alert("You must login first!");
                window.location = "login.html";
                return;
            }

            var today = new Date();
            var tanggal = today.getDate().toString().padStart(2, "0") + "-" +
                          (today.getMonth() + 1).toString().padStart(2, "0") + "-" +
                          today.getFullYear();
            var key = "payHst_" + email;
            var payHistory = [];
            try {
                payHistory = JSON.parse(localStorage.getItem(key)) || [];
                if (!Array.isArray(payHistory)) payHistory = [];
            } catch (e) {
                payHistory = [];
            }

            payHistory.push({
                produk: product,
                jenis: metode,
                tanggal: tanggal,
                harga: price,
                status: "Paid Off"
            });

            localStorage.setItem(key, JSON.stringify(payHistory));
            alert("Pembayaran dengan metode: " + metode + " berhasil!");
            window.location = "history.html";
        }
    }
}
//PEMBAYARAN

//HISTORI PEMBAYARAN
if (window.location.pathname.indexOf("history.html") !== -1) {
    var hstTable = document.getElementById("hstTable");
    var email = sessionStorage.getItem("loggedInUser");

    if (!email) {
        alert("You must login first!");
        window.location = "login.html";
    }

    if (hstTable) {
        var key = "payHst_" + email;
        var payHistory = [];
        
        try {
            payHistory = JSON.parse(localStorage.getItem(key)) || [];
            if (!Array.isArray(payHistory)) payHistory = [];
        } catch (e) {
            payHistory = [];
        }

        if (payHistory.length > 0) {
            payHistory.forEach(function (item) {
                var row = hstTable.insertRow(-1);
                row.insertCell(0).innerText = item.produk;
                row.insertCell(1).innerText = item.jenis;
                row.insertCell(2).innerText = item.tanggal;
                row.insertCell(3).innerText = item.harga;
                row.insertCell(4).innerText = item.status;
            });
        } else {
            var row = hstTable.insertRow(-1);
            var cell = row.insertCell(0);
            cell.colSpan = 5;
            cell.innerText = "There is no payment history yet.";
            cell.style.textAlign = "center";
        }
    }
}
//HISTORI PEMBAYARAN