import { Component, OnInit } from '@angular/core';
import { Blog, BlogService } from '../../services/blog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.css',
})
export class BlogDetail implements OnInit {
  blog: Blog | undefined;
  isLoading = true;
  relatedBlogs: Blog[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    //demo: route param
    this.route.params.subscribe((params) => {
      const id = +params['id']; //string to num
      this.loadBlog(id);
    });
  }

  loadBlog(id: number): void {
    this.isLoading = true;
    this.blogService.getBlogById(id).subscribe({
      next: (blog) => {
        if (blog) {
          this.blog = blog;
          this.loadRelatedBlogs(blog.tags);
        } else {
          //not found -> blog lists
          this.router.navigate(['/blogs']);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading post:', error);
        this.isLoading = false;
        this.router.navigate(['/blogs']);
      },
    });
  }

  loadRelatedBlogs(tags: string[]): void {
    if (tags.length === 0) return;

    //similar tags
    this.blogService.getBlogsByTag(tags[0]).subscribe({
      next: (blogs) => {
        this.relatedBlogs = blogs.filter((b) => b.id !== this.blog?.id).slice(0, 3);
      },
    });
  }

  goBack(): void {
    this.router.navigate(['/blogs']);
  }

  navigateToBlog(id: number): void {
    this.router.navigate(['/blog', id]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  shareBlog(): void {
    //demo: web api
    const url = window.location.href;

    if (navigator.share) {
      //native share if possible
      navigator
        .share({
          title: this.blog?.title,
          text: this.blog?.excerpt,
          url: url,
        })
        .catch((err) => console.log('Error sharing:', err));
    } else {
      //fallback: copy
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard');
      });
    }
  }
}
