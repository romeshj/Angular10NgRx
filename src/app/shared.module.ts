import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { HighlightRendererDirective } from './directives/highlight-renderer.directive';
import { HighlightHostBindingDirective } from './directives/highlight-host-binding.directive';

@NgModule({
  declarations: [        
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,	
    HighlightDirective,
    HighlightRendererDirective,
    HighlightHostBindingDirective
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,	
    HighlightDirective,
    HighlightRendererDirective,
    HighlightHostBindingDirective,
    CommonModule
  ],
})
export class SharedModule {}
