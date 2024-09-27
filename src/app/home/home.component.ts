import { Component, HostListener } from '@angular/core';
import { ContactService, Resumecount } from '../service/contact.service';
import { CohereService } from '../cohere.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private portfolioService: ContactService,private cohereService: CohereService) {}

 
  downloadFile() {
    const link = document.createElement('a');
    link.href = 'assets/SIVARAAJ_CV.pdf';
    link.download = 'SIVARAAJ_CV.pdf';
    link.click();
    this.incrementResumeCount();
  }



  incrementResumeCount() {
    this.portfolioService.postResume().subscribe(
      (response: Resumecount) => {
       // console.log('Resume count incremented:', response.count);
      },
      (error) => {
        console.error('Error incrementing resume count:', error);
      }
    );
  }

  isChatInputVisible: boolean = false; 

  toggleChatInput() {
    this.isChatInputVisible = !this.isChatInputVisible; // Toggle visibility
  }
  userMessage: string = '';
  botResponse: string = '';

  async onSendMessage() {
    if (this.userMessage.trim()) {
      const response = await this.cohereService.chat(this.userMessage);
      //this.botResponse=  `You said: "${this.userMessage}". This is a response from the bot.${response}`;
       this.botResponse = response;  // Update the bot response in the UI
      this.userMessage = '';  
    }
  }
   
}
