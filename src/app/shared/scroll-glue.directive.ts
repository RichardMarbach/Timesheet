import { Directive, AfterContentInit, OnDestroy, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[scrollGlue]'
})
export class ScrollGlueDirective implements AfterContentInit, OnDestroy {
  private el: any;
  private isLocked = true;
  private _observer: MutationObserver;

  constructor(el: ElementRef) {
    this.el = el.nativeElement;
   }

   @HostListener('scroll') onScroll() {
     const percent = (this.el.scrollHeight * 0.1);

     // Unless close to the very bottom it should always jump down
     this.isLocked = (this.el.scrollHeight - this.el.scrollTop) > percent;
   }

   ngAfterContentInit() {
     this.el.scrollTop = this.el.scrollHeight;
     this._observer = new MutationObserver(mutations => {
       if (this.isLocked) {
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
