let qs = (element) => {
  return document.querySelector(element);
};

window.addEventListener("load", () => {
  let $inputName = qs("#inputName"),
    $nameErrors = qs("#nameErrors"),
    $lastName = qs("#last_name"),
    $lastNameErrors = qs("#last_nameErrors"),
    $email = qs("#email"),
    $emailErrors = qs("#emailErrors"),
    $inputPhone = qs("#phone"),
    $phoneError = qs("#phoneError"),
    $form = qs("#form"),
    $file = qs("#avatar"),
    $fileErrors = qs("#fileErrors"),
    $imgPreview = qs("#img-preview"),
    $submit = qs("button[type='submit']");

  //validaciones
  $inputName.addEventListener("blur", () => {
    switch (true) {
      case !$inputName.value.trim():
        $nameErrors.innerText = "El campo nombre es obligatorio";
        $inputName.classList.add("is-invalid");
        break;
      case $inputName.value.trim().length < 2:
        $nameErrors.innerText =
          "El campo nombre debe tener al menos 2 caracteres";
        $inputName.classList.add("is-invalid");
        break;
      default:
        $inputName.classList.remove("is-invalid");
        $inputName.classList.add("is-valid");
        $nameErrors.innerText = "";
        break;
    }
  });

  $lastName.addEventListener("blur", () => {
    if (!$lastName.value.trim()) {
      $lastNameErrors.innerText = "El campo apellido es obligatorio";
      $lastName.classList.add("is-invalid");
    } else if ($lastName.value.trim().length < 2) {
      $lastNameErrors.innerText =
        "El campo apellido debe tener al menos 2 caracteres";
      $lastName.classList.add("is-invalid");
    } else {
      $lastNameErrors.innerText = "";
      $lastName.classList.remove("is-invalid");
    }
  });

  $email.addEventListener("blur", () => {
    if (!$email.value.trim()) {
      $emailErrors.innerText = "El campo email es obligatorio";
      $email.classList.add("is-invalid");
    } else {
      $emailErrors.innerText = "";
      $email.classList.remove("is-invalid");
    }
  });

  $inputPhone.addEventListener("blur", () => {
    const phoneValue = $inputPhone.value.trim();
    $phoneError.innerText = "";

    if (!phoneValue) {
      $phoneError.innerText = "El campo teléfono es obligatorio";
      $inputPhone.classList.add("is-invalid");
    } else if (phoneValue.length < 10) {
      $phoneError.innerText =
        "El campo teléfono debe tener al menos 10 caracteres";
      $inputPhone.classList.add("is-invalid");
    } else if (!/^[0-9]+$/.test(phoneValue)) {
      $phoneError.innerText = "El campo teléfono solo puede contener números";
      $inputPhone.classList.add("is-invalid");
    } else {
      $inputPhone.classList.remove("is-invalid");
      $inputPhone.classList.add("is-valid");
    }
  });

  

  //validar antes de enviar
  $form.addEventListener("submit", function (event) {
    const invalidInputs = $form.querySelectorAll(".is-invalid");
    if (invalidInputs.length > 0) {
      event.preventDefault();
      alert(
        "Existen errores en el formulario. Por favor, revisa los campos marcados en rojo."
      );
    }
  });
});
