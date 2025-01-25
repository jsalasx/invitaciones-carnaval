import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Invitado } from '../../interfaces/invitado.i';
import { ApiService } from '../../services/api.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { DialogModule } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    DialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  form: FormGroup; // Formulario reactivo
  disabledSubmit = false; // Deshabilitar botón de envío mientras se procesa

  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  private fb = inject(FormBuilder); // Inyectar FormBuilder
  private apiService = inject(ApiService); // Inyectar ApiService
  familia: string = "";
  numPersonas: number = 0;

  constructor(private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      familia: ['', Validators.required],
      numPersonas: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      console.warn('Formulario inválido');
      return;
    }

    // Deshabilitar el botón mientras se procesa la solicitud
    this.disabledSubmit = true;

    const invitado: Invitado = {
      nombre: this.form.value.familia,
      numAcompanantes: this.form.value.numPersonas,
    };

    console.log('Enviando invitado:', invitado);

    this.apiService
      .guardarInvitado(invitado)
      .pipe(
        catchError((error) => {
          this.openToastError();
          console.error('Error al guardar invitado:', error);
          return of(null);
        }),
        finalize(() => {
          // Rehabilitar el botón de envío

          this.disabledSubmit = false;
        })
      )
      .subscribe((data) => {
        if (data) {
          console.log('Invitado guardado correctamente:', data);
          this.openToast();
          this.dialogRef.close(true); // Cierra el diálogo con éxito
        } else {
          console.warn('No se pudo guardar el invitado.');
        }
      });
  }

  openToast(): void {
    this.snackBar.open('Invitado registrado', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center', // Posición horizontal (start, center, end, left, right)
      verticalPosition: 'bottom', // Posición vertical (top, bottom)
    });

  }
  openToastError(): void {
    this.snackBar.open('Error al guardar invitado.', 'Cerrar', {
      duration: 3000, // Duración en milisegundos
      horizontalPosition: 'center', // Posición horizontal (start, center, end, left, right)
      verticalPosition: 'bottom', // Posición vertical (top, bottom)
    });
  }
}