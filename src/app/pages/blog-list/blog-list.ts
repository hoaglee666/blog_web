import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService, Blog } from '../../services/blog';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-blog-list',
  imports: [CommonModule],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css',
})
export class BlogList implements OnInit {
  blogs: Blog[] = [];
  filteredBlogs: Blog[] = [];
  isLoading = true;
  searchTerm = '';
  selectedTag: string = '';
  allTags: string[] = [];

  //demo: rxjs subject for search input
  private searchSubject = new Subject<string>();

  constructor(private blogService: BlogService, private router: Router) {
    //demo: async/promises, event handling
    //debounce search input to reduce number of searches
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((term) => {
      this.performSearch(term);
    });
  }

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getBlogs().subscribe({
      next: (blogs) => {
        this.blogs = blogs;
        this.filteredBlogs = blogs;
        this.extractTags();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading blogs:', error);
        this.isLoading = false;
      },
    });
  }

  extractTags(): void {
    const tagSet = new Set<string>();
    this.blogs.forEach((blog) => {
      blog.tags.forEach((tag) => tagSet.add(tag));
    });
    this.allTags = Array.from(tagSet).sort();
  }

  //demo: event handling
  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.searchSubject.next(this.searchTerm);
  }

  performSearch(term: string): void {
    if (!term.trim()) {
      this.filteredBlogs = this.blogs;
      return;
    }

    this.blogService.searchBlogs(term).subscribe({
      next: (results) => {
        this.filteredBlogs = results;
      },
    });
  }

  filterByTag(tag: string): void {
    if (tag === this.selectedTag) {
      //deselect tag
      this.selectedTag = '';
      this.filteredBlogs = this.blogs;
      return;
    }

    this.selectedTag = tag;
    this.blogService.getBlogsByTag(tag).subscribe({
      next: (results) => {
        this.filteredBlogs = results;
      },
    });
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.selectedTag = '';
    this.filteredBlogs = this.blogs;
  }

  navigateToBlog(id: number): void {
    this.router.navigate(['/blog', id]);
  }
}
