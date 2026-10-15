import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  standalone: false,
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  openFaqIndex: number | null = null;

  constructor(private titleService: Title, private metaService: Meta) {}

  ngOnInit(): void {
    this.titleService.setTitle('Empresa de aires acondicionados con soluciones integrales reales. Ecoclima 21.');
    this.metaService.updateTag({
      name: 'description',
      content: 'Empresa de aires acondicionados experta en climatización, instalación, mantenimiento y asesoría energética para hogares, oficinas e industria en toda la Comunidad.'
    });
    this.metaService.updateTag({
      name: 'keywords',
      content: 'Empresa de aires acondicionados, Climatización y aire acondicionado, Instalaciones de aire acondicionado en madrid, Instaladores de aire acondicionado en madrid, Instalación climatización madrid'
    });
  }

  toggleFaq(index: number) {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  isFaqOpen(index: number): boolean {
    return this.openFaqIndex === index;
  }
}

