export function Serialize(form) {
  // Setup our serialized data
  var serialized = [];

  // Loop through each field in the form
  for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i];

    // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button')
      continue;

    // If a multi-select, get all selections
    if (field.type === 'select-multiple') {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
        serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.options[n].value));
      }
    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      // Convert field data to a query string
      serialized.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value));
    }
  }

  return serialized.join('&');
}

export function QueryStringToJSON(qString) {
  const arr = qString.split('&');
  var result = arr.reduce((prop, str) => {
    prop[str.split('=')[0]] = decodeURIComponent(str.split('=')[1]);
    return prop;
  }, {});
  return result;
}

export function initFormSubmit(formId) {
  const form = document.getElementById(formId);
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      var serializedForm = Serialize(form);
      var json = QueryStringToJSON(serializedForm);
      var jsonString = JSON.stringify(json);

      // fetch('http://localhost:5000/contact', {
      fetch('https://sangoo.herokuapp.com/contact', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonString,
      })
        .then(() => {
          document.getElementById(formId).reset();
          document.getElementById('form-confirmation').classList.add('form-confirmation--active');
        })
        .catch(error => console.error(error));
    });
  }
}

const formConfirmationClose = document.getElementById('form-confirmation-close');
if (formConfirmationClose) {
  formConfirmationClose.addEventListener('click', e => {
    document.getElementById('form-confirmation').remove('form-confirmation--active');
  });
}

// Initialize new forms here
initFormSubmit('contact-form'); // add id
initFormSubmit('order-form');
initFormSubmit('info-form');
initFormSubmit('info-form-bpmn');
initFormSubmit('info-form-caring');
