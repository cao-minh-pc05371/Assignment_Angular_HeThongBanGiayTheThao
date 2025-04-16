import {
  Component,
  HostBinding,
  Input,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { NavItem } from './nav-item';
import { Router } from '@angular/router';
import { NavService } from '../../../../services/nav.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

import { TranslateModule } from '@ngx-translate/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-item',
  imports: [TranslateModule, TablerIconsModule, MaterialModule, CommonModule],
  templateUrl: './nav-item.component.html',
  styleUrls: [],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class AppNavItemComponent implements OnChanges {
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() item: NavItem | any;

  expanded: any = false;

  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() depth: any;

  constructor(public navService: NavService, public router: Router) {}

  ngOnChanges() {
    const url = this.navService.currentUrl();

    if (this.item?.route && url) {
      // Kiểm tra xem route của menu này có phải là parent URL của URL hiện tại không
      const isExactParent = this.isParentRoute(this.item.route, url);

      // Kiểm tra xem có bất kỳ menu con nào của item này khớp với URL hiện tại không
      let hasMatchingChild = false;
      if (this.item.children && this.item.children.length > 0) {
        hasMatchingChild = this.item.children.some((child: NavItem) => {
          return child.route && url.includes(child.route);
        });
      }

      this.expanded = isExactParent || hasMatchingChild;
      this.ariaExpanded = this.expanded;
    }
  }

  /**
   * Kiểm tra xem route có phải là parent route của URL hiện tại không
   */
  isParentRoute(itemRoute: string, currentUrl: string): boolean {
    // Xử lý URL hiện tại để loại bỏ các tham số, fragment
    const cleanUrl = currentUrl.split('?')[0].split('#')[0];

    // Loại bỏ dấu / cuối cùng nếu có
    const normalizedItemRoute = itemRoute.endsWith('/')
      ? itemRoute.slice(0, -1)
      : itemRoute;

    // Kiểm tra nếu URL hiện tại bắt đầu chính xác bằng route của item
    // và sau đó có một dấu / hoặc kết thúc
    const exactParentMatch =
      cleanUrl === normalizedItemRoute ||
      cleanUrl === normalizedItemRoute + '/' ||
      cleanUrl.startsWith(normalizedItemRoute + '/');

    return exactParentMatch;
  }

  onItemSelected(item: NavItem) {
    // Nếu item không có children, chuyển hướng đến route
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    } else {
      // Nếu item có children, toggle trạng thái expanded mà không chuyển hướng
      this.expanded = !this.expanded;
    }

    // Scroll to top
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    // Đóng menu trên mobile nếu cần
    if (window.innerWidth < 1024 && !this.expanded) {
      this.notify.emit();
    }
  }

  openExternalLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  onSubItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      if (this.expanded && window.innerWidth < 1024) {
        this.notify.emit();
      }
    }
  }
}
