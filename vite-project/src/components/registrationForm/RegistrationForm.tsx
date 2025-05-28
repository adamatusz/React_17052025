import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import '../weather.css'

// Interfejs dla danych formularza
interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// Interfejs dla błędów formularza
interface RegistrationFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string; // Ogólny błąd, jeśli potrzebny
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegistrationFormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Opcjonalnie: można czyścić błąd danego pola przy zmianie
    if (errors[name as keyof RegistrationFormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: RegistrationFormErrors = {};
    let isValid = true;

    // 1. Wszystkie pola muszą być wypełnione
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Imię jest wymagane.';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Nazwisko jest wymagane.';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) { // 2. Email musi być poprawny
      newErrors.email = 'Podaj poprawny adres email.';
      isValid = false;
    }

    // 3. Walidacja hasła
    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane.';
      isValid = false;
    } else {
      if (formData.password.length < 14) {
        newErrors.password = (newErrors.password || '') + 'Hasło musi mieć co najmniej 14 znaków. ';
        isValid = false;
      }
      if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = (newErrors.password || '') + 'Hasło musi zawierać co najmniej jedną dużą literę. ';
        isValid = false;
      }
      if (!/[a-z]/.test(formData.password)) {
        newErrors.password = (newErrors.password || '') + 'Hasło musi zawierać co najmniej jedną małą literę. ';
        isValid = false;
      }
      if (!/[^A-Za-z0-9]/.test(formData.password)) { // Sprawdza czy jest znak niebędący literą ani cyfrą
        newErrors.password = (newErrors.password || '') + 'Hasło musi zawierać co najmniej jeden znak specjalny. ';
        isValid = false;
      }
    }

    // 4. Hasło i powtórz hasło muszą mieć tę samą wartość
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Powtórzenie hasła jest wymagane.';
      isValid = false;
    } else if (formData.password && formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Hasła nie są takie same.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Dane formularza (poprawne):', formData);
      alert('Rejestracja zakończona pomyślnie!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setErrors({});
    } else {
      console.log('Formularz zawiera błędy.');
    }
  };

  return (
    <form className='weather-container' onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="firstName">Imię:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          aria-describedby={errors.firstName ? "firstNameError" : undefined}
        />
        {errors.firstName && <p id="firstNameError" style={{ color: 'red' }}>{errors.firstName}</p>}
      </div>
      <div>
        <label htmlFor="lastName">Nazwisko:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          aria-describedby={errors.lastName ? "lastNameError" : undefined}
        />
        {errors.lastName && <p id="lastNameError" style={{ color: 'red' }}>{errors.lastName}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          aria-describedby={errors.email ? "emailError" : undefined}
        />
        {errors.email && <p id="emailError" style={{ color: 'red' }}>{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="password">Hasło:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          aria-describedby={errors.password ? "passwordError" : undefined}
        />
        {errors.password && <p id="passwordError" style={{ color: 'red', whiteSpace: 'pre-line' }}>{errors.password}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Powtórz Hasło:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          aria-describedby={errors.confirmPassword ? "confirmPasswordError" : undefined}
        />
        {errors.confirmPassword && <p id="confirmPasswordError" style={{ color: 'red' }}>{errors.confirmPassword}</p>}
      </div>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
      <button type="submit">Zarejestruj się</button>
    </form>
  );
};

export default RegistrationForm;