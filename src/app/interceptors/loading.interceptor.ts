import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../assets/loading/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private loadingService: LoadingService) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.headers.get('skipInterceptor')) {
            const clonedReq = req.clone({
                headers: req.headers.delete('skipInterceptor'),
            });
            return next.handle(clonedReq);
        } else {
            this.loadingService.setLoading(true);

            return next
                .handle(req)
                .pipe(finalize(() => this.loadingService.setLoading(false)));
        }
    }
}
