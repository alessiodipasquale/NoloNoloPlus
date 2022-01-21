function doLogin() {
    if ($("#username").val() != "" && $("#password").val() != "") {
        httpPost('loginBack', {username: $("#username").val(), password: $("#password").val()}, false)
        .done((res) => {
            localStorage.setItem("token", res.token);
            window.location.pathname = "back-office/layout/layout.html"
        }).catch(err => {
          if (err.status == 401)
            alert("Non autorizzato.")
          else alert("Credenziali errate.")
        })
      } else {
        alert("Inserisci dati validi.");
      }
}