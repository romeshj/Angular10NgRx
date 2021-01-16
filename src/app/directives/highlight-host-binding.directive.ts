import { Directive, HostListener, HostBinding , OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightHostBinding]'
})
export class HighlightHostBindingDirective  implements OnInit{

  constructor() { }
  
  ngOnInit(){
  }
	
  @HostBinding('style.backgroundColor') backgroundColor : string = 'transparent';
  
  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = 'red';
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = 'transparent';
  }
}



