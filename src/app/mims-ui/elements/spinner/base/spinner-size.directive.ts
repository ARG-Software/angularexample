import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
@Directive({
  selector: '[spinnersize]'
})
export class ButtonSizeDirective implements OnInit {
  @Input() public buttonsize: string;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  public ngOnInit(): void {
    switch (this.buttonsize) {
      case 'small':
        this.renderer.addClass(this.elementRef.nativeElement, 'spinner-sm');
        break;
      case 'medium':
        this.renderer.addClass(this.elementRef.nativeElement, 'spinner-md');
        break;
      default:
        break;
    }
  }
}
