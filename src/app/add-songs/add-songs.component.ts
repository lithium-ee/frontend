import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-add-songs',
    templateUrl: './add-songs.component.html',
    styleUrls: ['./add-songs.component.scss'],
})
export class AddSongsComponent {
    constructor(private apiService: ApiService) {}

    songName: string = '';
    message: string = '';
    submit() {
        this.apiService.addSong(this.songName).subscribe({
            next: () => {
                this.message = 'Song added successfully!';
            },
            error: () => {
                this.message = 'Something went wrong. Please try again.';
            },
        });
    }
}
