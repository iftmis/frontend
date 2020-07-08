import { HttpParams } from '@angular/common/http';

export const ITEMS_PER_PAGE = 20;
export const PAGE_SIZE_OPTIONS = [1, 5, 10, 15, 20, 50, 100];

export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();

  if (req) {
    Object.keys(req).forEach(key => {
      if (key !== 'sort') {
        options = options.set(key, req[key]);
      }
    });

    if (req.sort) {
      req.sort.forEach((val: string) => {
        options = options.append('sort', val);
      });
    }
  }

  return options;
};
