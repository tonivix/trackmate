import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {User, UserService} from '../../services/user.service';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    items: Observable<User[]>;

    constructor(userService: UserService) {
        this.items = userService.GetUsers();
    }

}
