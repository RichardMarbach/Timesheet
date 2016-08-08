import { Directive, AfterContentInit, OnDestroy, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scrollGlue]'
})
export class ScrollGlueDirective implements AfterContentInit, OnDestroy {
  private el: any;
  private isLocked = true;
  private _observer: MutationObserver;
  private _oldScrollHeight = 0;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
   }

   @HostListener('scroll') onScroll() {
     const percent = (this.el.scrollHeight / 100);
     if (this.el.scrollHeight - this.el.scrollTop > (10 * percent)) {
       this.isLocked = true;
     } else {
       this.isLocked = false;
     }
   }

   ngAfterContentInit() {
     this.el.scrollTop = this.el.scrollHeight;
     this._observer = new MutationObserver(mutations => {
       if (this.isLocked) {
         this._oldScrollHeight = this.el.scrollHeight;
         this.el.scrollTop = this.el.scrollHeight;
       }
     });

     const config = { childList: true, subtree: true };
     const target = this.el;

     this._observer.observe(target, config);
   }

   ngOnDestroy() {
     this._observer.disconnect();
   }
}
