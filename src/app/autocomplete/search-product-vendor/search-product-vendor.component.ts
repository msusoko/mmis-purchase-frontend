import { Component, OnInit, Inject, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search-product-vendor',
  templateUrl: './search-product-vendor.component.html',
  styles: []
})
export class SearchProductVendorComponent implements OnInit {

  private _labelerId: string;

  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();

  @Input() labelerId;
  set setLabelerId(value: string) {
    this._labelerId = value;
    this.setApiUrl(value);
  }

  _disabled = false;

  @Input('disabled')
  set setDisabled(value: boolean) {
    this._disabled = value;
  }

  token: any;
  query: any = null;
  url: any = null;

  constructor(
    @Inject('API_URL') private apiUrl: string) {
    this.token = sessionStorage.getItem('token');
    this.url = `${this.apiUrl}/products/search/autocomplete-labeler?token=${this.token}&labelerId=${this._labelerId}`;
  }

  setApiUrl(labelerId: any) {
    this.url = `${this.apiUrl}/products/search/autocomplete-labeler?token=${this.token}&labelerId=${labelerId}`;
  }

  ngOnInit() {
  }

  clearProductSearch() {
    this.query = null;
  }

  clearSelected(event: any) {
    if (event) {
      if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
        this.onChange.emit(false);
      } else {
        this.onChange.emit(true);
      }
    } else {
      this.onChange.emit(false);
    }
  }

  handleResultSelected(event: any) {
    this.onSelect.emit(event);
    this.query = event.product_name;
  }

}
