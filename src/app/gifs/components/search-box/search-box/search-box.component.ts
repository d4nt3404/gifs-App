import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifService: GifsService ) {

  }

  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }

}
