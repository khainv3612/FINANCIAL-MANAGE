import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {
  public usernameErr = 'Username is from 5 to 15 characters';
  public phoneErr = 'Phone is from 10 to 12 numbers';
  public emailFormat = 'Email is invalid format';
  public passWordFormat = 'Password between 8 to 15 characters, at least one lowercase letter, one uppercase letter, one numeric digit, and one special character';
  public passNotMatch = 'Repassword is not matched';
  public repassErr = 'Repassword is not null';
  public usernameNull = 'Username cannot be empty';
  public passwordNull = 'Password cannot be empty';
  public deleteSuccess = 'Delete success!';
  public deleteUnsuccess = 'Something Error!';
  public publishSuccess = 'Publish post success!';
  public publishUnsuccess = 'Something Error!';
  public notNullField = 'Field is not be empty!';

  static getValidatorErrorMessage(validatorName, validatorValue?: any): any {
    const config = {
      required: 'Required',
      invalidCreditCard: 'Is invalid credit card number',
      invalidEmailAddress: 'Invalid email address',
      invalidPassword:
        'Invalid password. Password must be at least 6 characters long, and contain a number.',
      minlength: `Minimum length ${validatorValue.requiredLength}`
    };

    return config[validatorName];
  }

  static emailValidator(control): any {
    if (
      control.value.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
      )
    ) {
      return null;
    } else {
      return {invalidEmailAddress: true};
    }
  }

  static passwordValidator(control): any {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/)) {
      return null;
    } else {
      return {invalidPassword: true};
    }
  }
}
