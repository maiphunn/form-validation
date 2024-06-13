function Validator(options) {

    var selectorRule = {};

    function validate(inputElm, rule) {
        var errorMessage = rule.test(inputElm.value)
        var errorElm = inputElm.parentElement.querySelector(options.errorSelector)

        if (errorMessage) {
            errorElm.innerText = errorMessage
            inputElm.parentElement.classList.add('invalid')
        } else {
            errorElm.innerText = ''
            inputElm.parentElement.classList.remove('invalid')
        }
    }

    var formElm = document.querySelector(options.form)
    if (formElm) {
        options.rules.forEach(function (rule) {
            var inputElm = formElm.querySelector(rule.selector)

            if (inputElm) {
                inputElm.onblur = function () {
                    validate(inputElm, rule)
                }

                inputElm.oninput = function () {
                    var errorElm = inputElm.parentElement.querySelector(options.errorSelector)
                    errorElm.innerText = ''
                    inputElm.parentElement.classList.remove('invalid')
                }
            }
        })
    }
}


Validator.isRequired = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            return value.trim() ? undefined : 'Vui lòng nhập vào trường này'
        }
    }
}

Validator.isEmail = function (selector) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email'
        }
    }
}

Validator.password = function (selector, min) {
    return {
        selector: selector,
        test: function (value) {
            var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            return regex.test(value) ? undefined : 'Nhập mật khẩu và gửi 7 đến 15 ký tự chứa ít nhất một chữ số và ký tự đặc biệt'
        }
    }
}

Validator.isCofirmed = function (selector, getConfirmValue, message) {
    return {
        selector: selector,
        test: function (value) {
            return value === getConfirmValue ? undefined : message || 'Giá trị nhập vào không chính xác'
        }
    }
}