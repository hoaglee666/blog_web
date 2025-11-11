import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-blog',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.css',
})
export class CreateBlog implements OnInit {
  //demo: reactive form
  blogForm!: FormGroup;
  isSubmitting = false;
  submitSuccess = false;

  //available tags
  availableTags = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'Web Development',
    'CSS',
    'HTML',
    'Responsive Design',
    'Programming',
    'State Management',
    'RxJS',
    'Mobile-First',
  ];

  constructor(private fb: FormBuilder, private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      excerpt: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(200)]],
      content: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(3000)]],
      imageUrl: [
        'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
        Validators.required,
      ],
      tags: this.fb.array([], Validators.required), //array for multi tags
    });
  }

  get tagsArray(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  onTagChange(event: Event, tag: string): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.tagsArray.push(this.fb.control(tag));
    } else {
      const index = this.tagsArray.controls.findIndex((x) => x.value === tag);
      if (index >= 0) {
        this.tagsArray.removeAt(index);
      }
    }
  }

  isTagSelected(tag: string): boolean {
    return this.tagsArray.controls.some((control) => control.value === tag);
  }

  //demo: form validate
  isFieldInvalid(fieldName: string): boolean {
    const field = this.blogForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getErrorMessage(fieldName: string): string {
    const field = this.blogForm.get(fieldName);

    if (field?.hasError('required')) {
      return `${this.capitalizeFirst(fieldName)} is required`;
    }
    if (field?.hasError('minlength')) {
      const minLength = field.errors?.['minlength'].requiredLength;
      return `${this.capitalizeFirst(fieldName)} must be at least ${minLength} characters`;
    }
    if (field?.hasError('maxlength')) {
      const maxLength = field.errors?.['maxlength'].requiredLength;
      return `${this.capitalizeFirst(fieldName)} must not exceed ${maxLength} characters`;
    }

    return '';
  }

  capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  //demo: form submit
  onSubmit(): void {
    if (this.blogForm.invalid) {
      //mark all field to show error
      Object.keys(this.blogForm.controls).forEach((key) => {
        this.blogForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isSubmitting = true;

    const formValue = this.blogForm.value;
    const newBlog = {
      title: formValue.title,
      author: formValue.author,
      excerpt: formValue.excerpt,
      content: formValue.content,
      imageUrl: formValue.imageUrl,
      tags: formValue.tags,
    };

    this.blogService.createBlog(newBlog).subscribe({
      next: (blog) => {
        this.submitSuccess = true;
        this.isSubmitting = false;
        //show success mess then navi
        setTimeout(() => {
          this.router.navigate(['/blog', blog.id]);
        }, 2000);
      },
      error: (error) => {
        console.log('Error creating blog', error);
        this.isSubmitting = false;
        alert('Error creating blog. Try again');
      },
    });
  }

  resetForm(): void {
    this.blogForm.reset({
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    });
    this.tagsArray.clear();
  }
}
