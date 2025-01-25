import { Component, OnInit } from '@angular/core';
import { Invitado } from '../../interfaces/invitado.i';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.scss'
})
export class TablaComponent implements OnInit {
  invitados: Invitado[] = [];
  totalPersonas:number = 0;

  constructor(private apiService: ApiService) { }
  ngOnInit(): void {
    this.getInvitados();
  }


  getInvitados() {
    this.apiService.obtenerInvitados().subscribe(res => {
      this.invitados = res;
      this.totalPersonas = this.invitados.reduce((acc, invitado) => acc + invitado.numAcompanantes, 0);
    });
  }
}
