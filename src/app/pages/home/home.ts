import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BlogService, Blog } from '../../services/blog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  featuredBlogs: Blog[] = [];
  isLoading = true;

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.loadFeaturedBlogs();
  }

  loadFeaturedBlogs(): void {
    // demo: promises, async, http client usage
    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        this.featuredBlogs = blogs.slice(0, 3); //take first 3 as featured
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading blogs', err);
        this.isLoading = false;
      },
    });
  }

  navigateToBlog(id: number): void {
    //demo: DOM mallipulation, routing
    this.router.navigate(['/blog', id]);
  }

  navigateToAllBlogs(): void {
    this.router.navigate(['/blogs']);
  }
}
