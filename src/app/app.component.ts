import { CommonModule } from '@angular/common';
import { Component, inject, model, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'invitaciones';flags = Array(10).fill(0); // Genera 10 elementos para iterar
  private audio = new Audio();
  private isPlaying = false;
  confettiArray: { left: string; top: string; color: string; delay: string; duration: string }[] = [];
  ngOnInit(): void {
    console.log("hola");
    for (let i = 0; i < 150; i++) {
      this.confettiArray.push({
        left: `${Math.random() * 100}%`, // Posición horizontal aleatoria
        top: `${Math.random() * -50}px`, // Aparece desde arriba y fuera de la pantalla
        color: this.getRandomColor(), // Color aleatorio
        delay: `${Math.random() * 2}s`, // Retraso aleatorio para cada partícula
        duration: `${2 + Math.random() * 3}s` // Duración de la animación (entre 2 y 5 segundos)
      });
    }

    this.playMusic();


  }

  playMusic() {
   if (this.isPlaying) {
      // Si ya se está reproduciendo, no hacer nada
      return;
    }
    this.audio.src = 'musica_carnaval.mp3';
    this.audio.volume = 0.5; // Ajusta el volumen (50%)
    this.audio.load();
    // this.audio.play().then(() => {
    //   this.isPlaying = true;
    // }).
    // catch(error => {
    //   console.error('Reproducción automática bloqueada:', error);
    // });
    this.openDialog();
  }

  pauseMusic() {
    this.audio.pause();
  }
  getRandomColor(): string {
    const colors = ['#ff6f61', '#ffd54f', '#4fc3f7', '#81c784', '#ba68c8'];
    return colors[Math.floor(Math.random() * colors.length)];
  }


  readonly animal = signal('');
  readonly name = model('');
  readonly dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {name: this.name(), animal: this.animal()},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    });
  }

}