import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public tagHistory: string [] = [];

  //@ViewChild('lblTagInput')
  //public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifService: GifsService) {

  }

  get tags(): string[] {
    return this.gifService.tagsHistory;
  }

  gifsSelected(tag: string):void {
    this.gifService.searchTag(tag);
  }

}
