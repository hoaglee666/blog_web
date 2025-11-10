import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, filter, Observable, of } from 'rxjs';
import { BLog } from '../models/blog.model';

export interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  createdAt: Date;
  tags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  //mock data
  private mockBlogs: Blog[] = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      author: 'Jane Doe',
      content: 'Angular is a platform for building mobile and desktop web applications...',
      excerpt: 'Learn the basics of Angular and how to get started with building applications.',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
      createdAt: new Date('2023-01-15T10:00:00Z'),
      tags: ['Angular', 'TypeScript', 'Web Development'],
    },
    {
      id: 2,
      title: 'Understanding TypeScript',
      author: 'John Doe',
      content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript...',
      excerpt: 'Discover the features of TypeScript and how it enhances JavaScript development.',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
      createdAt: new Date('2023-02-20T14:30:00Z'),
      tags: ['TypeScript', 'JavaScript', 'Programming'],
    },
    {
      id: 3,
      title: 'Responsive Web Design Principles',
      author: 'Mike Johnson',
      content:
        "Creating responsive websites is essential in today's mobile-first world. We will explore CSS media queries, flexible grids, and responsive images to create websites that look great on all devices.",
      excerpt: 'Master the art of creating websites that work perfectly on any device.',
      imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
      createdAt: new Date('2024-03-10'),
      tags: ['CSS', 'Responsive Design', 'Mobile-First'],
    },
    {
      id: 4,
      title: 'State Management in Angular',
      author: 'Sarah Williams',
      content:
        'Managing state in large Angular applications can be challenging. Learn about different approaches including services, RxJS, and state management libraries like NgRx.',
      excerpt: 'Explore different strategies for managing application state in Angular.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      createdAt: new Date('2024-04-05'),
      tags: ['Angular', 'State Management', 'RxJS'],
    },
  ];

  constructor(private http: HttpClient) {}

  //get:fetch all blogs
  getBlogs(): Observable<Blog[]> {
    //use mock data, real data = this.http.get<Blog[]>(this.apiUrl);
    return of(this.mockBlogs).pipe(delay(500)); //network delay
  }

  //get:fetch blog by id
  getBlogById(id: number): Observable<Blog | undefined> {
    return of(this.mockBlogs.find((blog) => blog.id === id)).pipe(delay(500)); //network delay
  }

  //post: create new blog
  createBlog(blog: Omit<Blog, 'id' | 'createdAt'>): Observable<Blog> {
    const newBlog: BLog = {
      ...blog,
      id: Math.max(...this.mockBlogs.map((b) => b.id)) + 1,
      createdAt: new Date(),
    };
    this.mockBlogs.push(newBlog);
    return of(newBlog).pipe(delay(500)); //network delay
  }

  //put: update blog
  updateBlog(id: number, blog: Partial<Blog>): Observable<BLog | null> {
    const index = this.mockBlogs.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.mockBlogs[index] = { ...this.mockBlogs[index], ...blog };
      return of(this.mockBlogs[index]).pipe(delay(500)); //network delay
    }
    return of(null);
  }

  //delete: remove blog
  deleteBlog(id: number): Observable<boolean> {
    const index = this.mockBlogs.findIndex((b) => b.id === id);
    if (index !== -1) {
      this.mockBlogs.splice(index, 1);
      return of(true).pipe(delay(500)); //network delay
    }
    return of(false);
  }

  //search blog by title or tags
  searchBlogs(query: string): Observable<Blog[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.mockBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(lowerQuery) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
    return of(filtered).pipe(delay(300)); //network delay
  }

  //get blog by tags
  getBlogsByTag(tag: string): Observable<Blog[]> {
    const filtered = this.mockBlogs.filter((blog) => blog.tags.includes(tag));
    return of(filtered).pipe(delay(300)); //network delay
  }
}
