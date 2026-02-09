/**
 * FORM-VALIDATION.JS
 * Validation du formulaire de contact avec messages d'erreur en français
 */

document.addEventListener('DOMContentLoaded', () => {
  initFormValidation();
});

/**
 * Initialise la validation du formulaire
 */
function initFormValidation() {
  const form = document.querySelector('.contact-form');
  
  if (!form) return;
  
  const nameInput = form.querySelector('#name');
  const emailInput = form.querySelector('#email');
  const messageInput = form.querySelector('#message');
  
  // Validation en temps réel au blur (quand l'utilisateur quitte le champ)
  if (nameInput) {
    nameInput.addEventListener('blur', () => validateName(nameInput));
    nameInput.addEventListener('input', () => clearError(nameInput));
  }
  
  if (emailInput) {
    emailInput.addEventListener('blur', () => validateEmail(emailInput));
    emailInput.addEventListener('input', () => clearError(emailInput));
  }
  
  if (messageInput) {
    messageInput.addEventListener('blur', () => validateMessage(messageInput));
    messageInput.addEventListener('input', () => clearError(messageInput));
  }
  
  // Validation à la soumission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit(form, nameInput, emailInput, messageInput);
  });
}

/**
 * Valider le champ nom
 */
function validateName(input) {
  const value = input.value.trim();
  const formGroup = input.closest('.form-group');
  
  if (!value) {
    showError(formGroup, 'Ce champ est obligatoire');
    return false;
  }
  
  if (value.length < 2) {
    showError(formGroup, 'Le nom doit contenir au moins 2 caractères');
    return false;
  }
  
  clearError(input);
  return true;
}

/**
 * Valider le champ email
 */
function validateEmail(input) {
  const value = input.value.trim();
  const formGroup = input.closest('.form-group');
  
  if (!value) {
    showError(formGroup, 'Ce champ est obligatoire');
    return false;
  }
  
  if (!isValidEmail(value)) {
    showError(formGroup, 'Veuillez utiliser une adresse e-mail valide');
    return false;
  }
  
  clearError(input);
  return true;
}

/**
 * Valider le champ message
 */
function validateMessage(input) {
  const value = input.value.trim();
  const formGroup = input.closest('.form-group');
  
  if (!value) {
    showError(formGroup, 'Ce champ est obligatoire');
    return false;
  }
  
  if (value.length < 10) {
    showError(formGroup, 'Le message doit contenir au moins 10 caractères');
    return false;
  }
  
  clearError(input);
  return true;
}

/**
 * Vérifier si l'email est valide
 */
function isValidEmail(email) {
  // Regex pour validation d'email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Afficher un message d'erreur
 */
function showError(formGroup, message) {
  // Ajouter la classe d'erreur au form-group
  formGroup.classList.add('has-error');
  
  // Trouver ou créer le span d'erreur
  let errorSpan = formGroup.querySelector('.form-error');
  
  if (!errorSpan) {
    errorSpan = document.createElement('span');
    errorSpan.className = 'form-error';
    errorSpan.setAttribute('role', 'alert');
    formGroup.appendChild(errorSpan);
  }
  
  // Définir le message d'erreur
  errorSpan.textContent = message;
  
  // Mettre le focus sur le champ en erreur
  const input = formGroup.querySelector('input, textarea');
  if (input) {
    input.setAttribute('aria-invalid', 'true');
  }
}

/**
 * Effacer le message d'erreur
 */
function clearError(input) {
  const formGroup = input.closest('.form-group');
  
  if (!formGroup) return;
  
  formGroup.classList.remove('has-error');
  
  const errorSpan = formGroup.querySelector('.form-error');
  if (errorSpan) {
    errorSpan.textContent = '';
  }
  
  input.removeAttribute('aria-invalid');
}

/**
 * Gérer la soumission du formulaire
 */
function handleFormSubmit(form, nameInput, emailInput, messageInput) {
  // Valider tous les champs
  const isNameValid = validateName(nameInput);
  const isEmailValid = validateEmail(emailInput);
  const isMessageValid = validateMessage(messageInput);
  
  // Si tous les champs sont valides
  if (isNameValid && isEmailValid && isMessageValid) {
    // Simuler l'envoi du formulaire (à remplacer par un vrai appel API)
    submitForm(form, {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      message: messageInput.value.trim()
    });
  } else {
    // Focus sur le premier champ en erreur
    const firstError = form.querySelector('.has-error input, .has-error textarea');
    if (firstError) {
      firstError.focus();
    }
  }
}

/**
 * Soumettre le formulaire (simulation)
 */
function submitForm(form, data) {
  console.log('Données du formulaire:', data);
  
  // Désactiver le bouton de soumission
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'ENVOI EN COURS...';
  }
  
  // Simuler un délai d'envoi
  setTimeout(() => {
    // Afficher un message de succès
    showSuccessMessage(form);
    
    // Réinitialiser le formulaire
    form.reset();
    
    // Réactiver le bouton
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'SEND MESSAGE';
    }
    
    // Faire défiler jusqu'au message de succès
    const successMessage = document.querySelector('.form-success');
    if (successMessage) {
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, 1500);
}

/**
 * Afficher un message de succès
 */
function showSuccessMessage(form) {
  // Vérifier si le message existe déjà
  let successMessage = form.querySelector('.form-success');
  
  if (!successMessage) {
    successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.setAttribute('role', 'status');
    successMessage.setAttribute('aria-live', 'polite');
    form.insertBefore(successMessage, form.firstChild);
  }
  
  successMessage.innerHTML = `
    <p><strong>Message envoyé avec succès !</strong></p>
    <p>Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
  `;
  
  successMessage.classList.add('active');
  
  // Masquer le message après 5 secondes
  setTimeout(() => {
    successMessage.classList.remove('active');
  }, 5000);
}

/**
 * Nettoyer tous les messages d'erreur
 */
function clearAllErrors(form) {
  const formGroups = form.querySelectorAll('.form-group');
  
  formGroups.forEach(group => {
    group.classList.remove('has-error');
    const errorSpan = group.querySelector('.form-error');
    if (errorSpan) {
      errorSpan.textContent = '';
    }
    
    const input = group.querySelector('input, textarea');
    if (input) {
      input.removeAttribute('aria-invalid');
    }
  });
}

// Export pour utilisation dans d'autres fichiers si nécessaire
export {
  initFormValidation,
  validateName,
  validateEmail,
  validateMessage,
  isValidEmail,
  showError,
  clearError,
  handleFormSubmit,
  submitForm,
  showSuccessMessage,
  clearAllErrors
};
