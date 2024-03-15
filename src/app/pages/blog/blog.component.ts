import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../shared/services/posts.service';
import { PostI } from '../../../shared/models/posts.module';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: PostI[] = [];

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    this.postsService.findAll().subscribe({
      next: (response: PostI[]) => {
        this.posts = response;
        console.log(this.posts)
      },
      error: (error: any) => {
        console.error('login failed:', error);
      }
    });
  }
}
