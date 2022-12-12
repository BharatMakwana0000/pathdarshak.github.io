const Creadidantial = [{
    username: "Bharat",
    password: "password"
},
{
    username: "Ram",
    password: "vanvas"

},
{
    username: "User",
    password: "User"
}
    ,
{
    username: "Admin",
    password: "Admin"
}
]

const Login = () => {
    Swal.fire({
        title: 'Login Form',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        html: `<input type="text" id="login" class="swal2-input" placeholder="Username" pattern="[A-Za-z]">
  <input type="password" id="password" class="swal2-input" placeholder="Password">`,
        confirmButtonText: 'Sign in',
        focusConfirm: false,
        allowOutsideClick: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value
            const password = Swal.getPopup().querySelector('#password').value
            if (!login || !password) {
                Swal.showValidationMessage(`Please enter username and password`)
            }
            else {
                let LoginVal = false;
                for (let index = 0; index < Creadidantial.length; index++) {
                    const element = Creadidantial[index];
                    if (login == element.username && password == element.password) {
                        LoginVal = true;
                        break;
                    }
                    else {

                        LoginVal = false;
                    }
                }
                if (!LoginVal)
                    Swal.showValidationMessage(`Please enter currect username and password`)
            }

            return { login: login, password: password }
        }
    }).then((result) => {
        Swal.fire(
            `Good job! ${result.value.login}`,
            'You Successfully Login..!',
            'success'
        ).then(() =>
            $(".overlay").css("z-index", "9999999"))
    });
}