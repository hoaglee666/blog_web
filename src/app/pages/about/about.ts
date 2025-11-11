import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  features = [
    {
      icon: '⚡',
      title: 'Fast Performance',
      description: 'Built with Angular for optimal speed and efficiency',
    },
    {
      icon: '🎨',
      title: 'Modern Design',
      description: 'Clean and intuitive user interface with smooth animations',
    },
    {
      icon: '📱',
      title: 'Fully Responsive',
      description: 'Works seamlessly across all devices and screen sizes',
    },
    {
      icon: '🔍',
      title: 'SEO Optimized',
      description: 'Built with semantic HTML for better search rankings',
    },
  ];

  technologies = ['Angular', 'TypeScript', 'RxJS', 'CSS3', 'HTML5', 'Responsive Design'];
}
