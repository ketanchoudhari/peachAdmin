import { Component } from '@angular/core';
import { MessagesService } from '../messages.service';
import { CreateRulesResponse, MessagesRules } from '../models/rules.model';
import { GenericResponse } from 'src/app/shared/types/generic-response';


@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent {
  rules = undefined;
  currentIPAddress!: string;
  loading = true;
  // Editor = ClassicEditor  ;
  messageRules = '';
  
  isNewRulesVisible = false;


  constructor(
    private MessagesService: MessagesService,
    // private loadingService: LoadingService,
    // private commonService: CommonService
  ) {
   
  }
  listRules(): void {
    // this.loadingService.setLoading(true);
    this.MessagesService
      // .listRules()
      .subscribe((res: GenericResponse<MessagesRules[]>) => {
        if (res.errorCode !== 1) {
          if (res.result.length === 0) {
            this.isNewRulesVisible = false;
          } else {
            this.isNewRulesVisible = false;
            // this.rules = atob(res.result[0].rules);
          }
          this.loading = false;
          // this.loadingService.setLoading(false);
        } else {
          this.isNewRulesVisible = true;
          this.loading = false;
          // this.loadingService.setLoading(false);
        }
      });
  }
  addRules(): void {
    const rules: MessagesRules = {
      rules: btoa(this.messageRules),
    };
    this.MessagesService
      .changeRules(rules)
      .subscribe((res: GenericResponse<CreateRulesResponse>) => {
        if (res.errorCode === 0) {
          this.rules = this.messageRules;
          this.isNewRulesVisible = false;
        } else {
          alert(res.errorDescription);
        }
      });
  }


}
