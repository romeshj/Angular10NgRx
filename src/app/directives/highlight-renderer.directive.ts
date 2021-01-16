import { Directive, ElementRef, Renderer2, HostListener , OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightRenderer]'
})
export class HighlightRendererDirective  implements OnInit {

  constructor(private elementRef : ElementRef, private renderer : Renderer2) { }
  
  ngOnInit(){
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
		this.elementRef.nativeElement,
		'background-color',
		'blue'
	)
  }
  
  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
		this.elementRef.nativeElement,
		'background-color',
		'transparent'
	)
  }
}
