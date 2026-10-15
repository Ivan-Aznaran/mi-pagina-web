import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Title as BrowserTitle, Meta } from '@angular/platform-browser';
import { Chart, ChartConfiguration, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip, Legend } from 'chart.js';

// Registrar los elementos que vamos a usar
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  standalone: false,
  styleUrls: ['./precios.component.css']
})
export class PreciosComponent implements OnInit, AfterViewInit {
  @ViewChild('graficaAire') graficaAire!: ElementRef<HTMLCanvasElement>;
  @ViewChild('graficaCalefaccion') graficaCalefaccion!: ElementRef<HTMLCanvasElement>;

  constructor(
    private router: Router,
    private titleService: BrowserTitle,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Compañía energía renovable con equipos de climatización eficientes.');
    this.metaService.updateTag({
      name: 'description',
      content: 'Compañía energía renovable que ofrece aire acondicionado, calefacción y aerotermia con equipos de bajo consumo y alta eficiencia para viviendas y negocios.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Compañia energia renovable, Ahorro energético vivienda, Eficiencia energética hogar, Calefacción por aerotermia, Calderas de aerotermia'
    });
  }

  irARegistro(plan: string) {
    this.router.navigate(['/registro'], { queryParams: { plan } });
  }

  ngAfterViewInit() {
    this.crearGraficas();
  }

  crearGraficas() {
    const anios = [2020, 2021, 2022, 2023, 2024, 2025];

    const configAire: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: anios,
        datasets: [
          { label: 'Daikin', data: [30, 32, 34, 35, 36, 37], borderColor: '#2F3A52', fill: false },
          { label: 'Mitsubishi Electric', data: [28, 29, 30, 31, 32, 33], borderColor: '#4A9194', fill: false },
          { label: 'LG', data: [15, 14, 13, 12, 11, 10], borderColor: '#C94A4A', fill: false },
          { label: 'Fujitsu', data: [12, 11, 10, 9, 8, 7], borderColor: '#E6A23C', fill: false },
          { label: 'Hisense', data: [10, 9, 8, 8, 8, 8], borderColor: '#6C63FF', fill: false }
        ]
      },
      options: this.getOpciones()
    };
    new Chart(this.graficaAire.nativeElement, configAire);

    const configCalefaccion: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: anios,
        datasets: [
          { label: 'Daikin', data: [25, 26, 27, 28, 29, 30], borderColor: '#2F3A52', fill: false },
          { label: 'Mitsubishi Electric (Ecodan)', data: [22, 23, 24, 25, 26, 27], borderColor: '#4A9194', fill: false },
          { label: 'Panasonic (Aquarea)', data: [18, 17, 16, 15, 14, 13], borderColor: '#C94A4A', fill: false },
          { label: 'Vaillant', data: [15, 14, 13, 12, 11, 10], borderColor: '#E6A23C', fill: false },
          { label: 'Saunier Duval / Ariston', data: [10, 10, 10, 10, 10, 10], borderColor: '#6C63FF', fill: false }
        ]
      },
      options: this.getOpciones()
    };
    new Chart(this.graficaCalefaccion.nativeElement, configCalefaccion);
  }

  private getOpciones() {
    return {
      responsive: true,
      plugins: {
        legend: { position: 'bottom' as const },
        tooltip: { mode: 'index' as const, intersect: false }
      },
      interaction: { mode: 'nearest' as const, axis: 'x' as const, intersect: false },
      scales: {
        y: {
          type: 'linear' as const,
          title: { display: true, text: 'Demanda relativa (%)' },
          beginAtZero: true
        },
        x: {
          type: 'category' as const,
          title: { display: true, text: 'Años' }
        }
      }
    };
  }
}
